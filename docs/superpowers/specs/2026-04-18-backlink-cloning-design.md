# backlink-cloning — Design Spec

**Date**: 2026-04-18
**Status**: Approved (brainstorming complete)
**Owner**: Nadir
**Type**: New skill (`~/.claude/skills/backlink-cloning/`)

## Goal

Reverse-engineer competitor backlink profiles using Common Crawl, then hand off the discovered linking domains to `/backlink-blitz` so it deposits new backlinks on the same platforms.

The core insight: if a competitor (e.g. `mesdepanneurs.co`) has a backlink from `annuaire-x.ma`, then `annuaire-x.ma` accepts the niche and we should also be listed there.

## Non-goals (YAGNI)

- Anchor text extraction from source pages
- Quality filtering (paywall / KYC / captcha detection)
- Non-Common-Crawl data sources (OpenLinkProfiler, Webometrics, Bing, Google `site:`)
- Auto-launch of `/backlink-blitz` without user confirmation
- Automatic Tier (A–F) classification
- Rewrite in TypeScript / Python — bash + duckdb stays
- Unit tests
- UI / dashboard / server

## User flow

```
user: /backlink-cloning mesdepanneurs.co,mano.ma,bricool.ma
  ↓
Claude reads SKILL.md, runs backlink-cloning.sh
  ↓
script: download cache (16GB, once) → DuckDB query → CDX queries → markdown output
  ↓
Claude reads output file, summarizes:
  "Trouvé X domaines référents (Y avec source_url, Z communs à plusieurs concurrents).
   Lancer /backlink-blitz sur ces cibles ? (oui/non)"
  ↓
user: oui
  ↓
Claude invokes /backlink-blitz with the markdown file path as input
```

## Architecture

```
~/.claude/skills/backlink-cloning/
├── SKILL.md              # frontmatter + behavioral instructions for Claude
└── backlink-cloning.sh  # executable bash, extends the retlehs gist
```

Single bash script, no subagents, no parallel orchestration beyond `xargs -P 8` for CDX queries.

## Pipeline stages

| Stage | What | Tool |
|---|---|---|
| 1 | Cache `domain-vertices.txt.gz` + `domain-edges.txt.gz` | `curl -C -` (resumable) |
| 2 | Multi-target DuckDB query in one scan | `duckdb` |
| 3 | Per-(linking_domain × target) CDX query, top 20 source URLs | `curl` + `jq` + `xargs -P 8` |
| 4 | Merge, dedup, compute `found_on_competitors` column | `awk` / shell |
| 5 | Write markdown output file | shell heredoc |
| 6 | Echo summary + handoff prompt | echo |

### Stage 2 — DuckDB query (multi-target, single scan)

Reverse-encode each input domain (`mano.ma` → `ma.mano`), batch into one query:

```sql
WITH vertices AS (
  SELECT * FROM read_csv('${VERTICES}', delim='\t', header=false,
    columns={'id':'BIGINT','rev_domain':'VARCHAR','num_hosts':'BIGINT'})
),
targets AS (
  SELECT id, rev_domain AS rev_target FROM vertices WHERE rev_domain IN (${REV_LIST})
),
inbound AS (
  SELECT e.from_id, t.rev_target FROM read_csv('${EDGES}', delim='\t', header=false,
    columns={'from_id':'BIGINT','to_id':'BIGINT'}) e
  JOIN targets t ON e.to_id = t.id
)
SELECT
  array_to_string(list_reverse(string_split(v.rev_domain, '.')), '.') AS linking_domain,
  array_to_string(list_reverse(string_split(i.rev_target, '.')), '.') AS target_domain,
  v.num_hosts
FROM inbound i
JOIN vertices v ON v.id = i.from_id
ORDER BY v.num_hosts DESC, linking_domain
```

Output written to `/tmp/backlink-cloning-edges-${RUN_ID}.tsv`.

### Stage 3 — CDX queries (parallel, capped)

**Two release identifiers exist** — keep them straight:

- `CC_RELEASE` (default `cc-main-2026-jan-feb-mar`) = the **hyperlinkgraph** release used by Stages 1–2.
- `CDX_RELEASE` (default `CC-MAIN-2026-13`) = the **URL index** release used by Stage 3. Distinct naming convention.

Both overridable via env vars; the script ships sane defaults that pair the most recent quarterly hyperlinkgraph with the most recent weekly CDX index.

For each `(linking_domain, target_domain)` pair, query the Common Crawl URL index to find source pages:

```bash
curl -s "https://index.commoncrawl.org/${CDX_RELEASE}-index?url=*.${linking_domain}/*&output=json" \
  | jq -r --arg t "${target_domain}" 'select(.url | contains($t)) | .url' \
  | head -20
```

Ordering: CDX returns captures in chronological order by default. The script keeps the **most recent 20 unique source URLs** per pair (dedup on URL string before the `head -20` cut).

Fallback if direct match yields nothing: querying the linking_domain index then post-filtering via a WARC fetch for outbound links is **out of scope** for v1 — we accept "no source URL found" as a valid result and emit `—`.

Parallelism: `xargs -P 8` over the unique `(linking_domain, target)` pairs.
Cap: 20 source URLs per pair to bound output volume.

CDX cache: each pair's response cached at `~/.cache/backlink-cloning/{release}/cdx-cache/{linking_domain}__{target}.json` so repeat runs skip the network.

### Stage 4 — Merge + `found_on_competitors`

When `>1` target domains are passed, group rows by `linking_domain` and compute the comma-separated list of targets it links to. This is the "common platform" signal — domains linking to 2+ competitors are highest-value targets for `/backlink-blitz`.

### Stage 5 — Output format

File: `./backlink-cloning-{primary-domain}-{YYYY-MM-DD}.md` in the current working directory.

Format **identical** to `backlink-blitz-allo-maison-tracking.md` so `/backlink-blitz` can ingest it without transformation:

```markdown
# Backlink Cloning — {primary-domain}
**Generated**: {YYYY-MM-DD HH:MM}
**Targets analyzed**: {comma-separated input domains}
**Common Crawl release**: {release}
**Cache**: ~/.cache/backlink-cloning/{release}/

## Discovered linking domains

| # | Linking Domain | Source URL | num_hosts | Found On | Status | Anchor | Tier | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | annuaire-x.ma | https://annuaire-x.ma/cat/plomberie | 145 | mesdepanneurs.co, mano.ma | — | — | — | — |
| 2 | blog-y.fr | — | 89 | bricool.ma | — | — | — | — |
| ... | | | | | | | | |

## Summary
- Total linking domains: X
- With source_url resolved: Y
- Common to 2+ competitors: Z
```

Columns left empty (`—`) so `/backlink-blitz` can fill them as it deposits.

## SKILL.md (Claude-facing instructions)

```yaml
---
name: backlink-cloning
description: Use when the user wants to extract competitor backlinks from Common Crawl, find where competitors get links, reverse-engineer link profiles, or feed targets into /backlink-blitz. Triggers on "common crawl backlinks", "extract backlinks", "competitor backlink profile", "où mes concurrents posent leurs liens", "backlink cloning", or providing one or more competitor domains for backlink reconnaissance.
---
```

Behavioral steps Claude follows when invoked:

1. Parse args: 1 domain or N comma-separated. If empty, ask user for the competitor domain(s).
2. Pre-flight checks (sequential, fast):
   - `command -v duckdb` → if missing, instruct `brew install duckdb` and stop.
   - `command -v jq` → if missing, instruct `brew install jq` and stop.
   - `df -k ~/.cache` → if free space < 20 GB and cache not yet downloaded, warn user (continue anyway).
3. Run `bash ~/.claude/skills/backlink-cloning/backlink-cloning.sh "$domains"` in foreground.
4. After script completes, read the generated markdown file from cwd.
5. Compute summary: total rows (X), rows with source_url (Y), rows with `Found On` containing comma (Z).
6. Output prompt to user:
   > "Trouvé **X** domaines référents (**Y** avec source_url, **Z** communs à plusieurs concurrents). Fichier : `{path}`. Lancer `/backlink-blitz` sur ces cibles ? (oui/non)"
7. On "oui" / "yes" / "y" → invoke `/backlink-blitz` and pass the markdown file path as input context.
8. On "non" → stop, file remains for later use.

## Cache strategy

| Path | Content | Size | TTL |
|---|---|---|---|
| `~/.cache/backlink-cloning/{release}/domain-vertices.txt.gz` | shared across all runs | ~2 GB | until release changes |
| `~/.cache/backlink-cloning/{release}/domain-edges.txt.gz` | shared across all runs | ~14 GB | until release changes |
| `~/.cache/backlink-cloning/{release}/cdx-cache/{linking}__{target}.json` | per-pair CDX result | small | until release changes |

Env var overrides:
- `CC_RELEASE` — hyperlinkgraph release (default `cc-main-2026-jan-feb-mar`)
- `CDX_RELEASE` — URL index release (default `CC-MAIN-2026-13`)

`--clear-cache` flag removes the entire `~/.cache/backlink-cloning/` directory.

## Error handling

| Case | Behavior |
|---|---|
| `duckdb` not installed | exit 1 + `brew install duckdb` instruction |
| `jq` not installed | exit 1 + `brew install jq` instruction |
| Download interrupted | `curl -C -` resumes on next run |
| CDX 503 / 429 | exponential backoff `2 → 4 → 8s`, max 3 retries, then emit `—` |
| CDX returns empty for a pair | `Source URL` column = `—` (not an error) |
| 0 backlinks total | exit 0 + message `"Aucun backlink CC trouvé pour {domain}. Vérifier le domaine ou changer de release CC."` |
| Disk free < 20 GB and cache absent | warn `"⚠ besoin de 16GB+ libre"`, continue |
| Invalid domain (no TLD, special chars) | exit 1 + clear validation error |

## Testing

- **Smoke**: `bash backlink-cloning.sh roots.io` — known-good profile from the gist owner.
- **Real**: `bash backlink-cloning.sh mesdepanneurs.co,mano.ma` — batch + dedup + `found_on_competitors`.
- **Sanity check**: top 5 linking domains compared against OpenLinkProfiler free preview.

No unit tests. Pure shell, one-shot execution, no business logic complex enough to warrant them.

## Decisions log (from brainstorming)

| Q | Decision | Rationale |
|---|---|---|
| Q1 Scope | D → revised B in Q6 | Multi-source not needed once anchors dropped; pure CC sufficient |
| Q2 Handoff | B (semi-manual w/ confirmation) | User wants review gate before Playwright spend |
| Q3 Input | D (flexible single or batch) | Both use cases real; batch enables `found_on_competitors` |
| Q4 Filtering | A (none) | Lean output, `/backlink-blitz` handles its own dedup against tracking history |
| Q5 Anchors | D (skip) | `/backlink-blitz` has its own anchor rotation; competitor anchors not needed |
| Q6 Multi-source | B (CC + CDX only) | 100% Common Crawl, no external dependencies |
| Q7 Tech | A (bash + duckdb + jq) | Matches the gist, zero new runtime deps |

## File deliverables

1. `~/.claude/skills/backlink-cloning/SKILL.md` (~80 lines)
2. `~/.claude/skills/backlink-cloning/backlink-cloning.sh` (~150 lines, extends the gist)

## Out-of-scope explicit confirmations

- No anchor text extraction
- No paywall/KYC/captcha pre-filter
- No OpenLinkProfiler / Webometrics / Bing / Google integration
- No auto-launch of `/backlink-blitz` (always confirmation-gated)
- No automatic Tier classification
- No TypeScript/Python rewrite
- No tests
- No UI

## Integration with `/backlink-blitz`

`/backlink-blitz` already accepts a tracking-file format with these columns. The output of `backlink-cloning` matches that schema 1:1. The handoff is purely the file path passed in the user-confirmed continuation.

`/backlink-blitz` should:
- Treat each row as a candidate platform.
- Cross-check against its own `morocco-home-services.md` registry — rows already there get the existing Tier; new rows are appended as Tier-Unknown.
- Cross-check against `backlink-blitz-allo-maison-tracking.md` — rows already attempted (`Failed`/`Skipped`) are skipped.
- Process remaining candidates with its standard Phase-1 / Phase-2 logic.

No code changes required in `/backlink-blitz` for this integration — the file format is already compatible.
