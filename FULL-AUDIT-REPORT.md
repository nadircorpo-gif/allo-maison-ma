# AUDIT SEO MASSIF — allo-maison.ma
> Date : 13 avril 2026 | Pre-production final check

---

## SCORE SEO GLOBAL : 88/100

| Categorie | Score | Poids | Note |
|-----------|-------|-------|------|
| Technical SEO | 92/100 | 25% | Excellent apres fixes |
| Content Quality | 95/100 | 25% | Rich content + E-E-A-T solide |
| On-Page SEO | 90/100 | 20% | Metadata complete partout |
| Schema / Structured Data | 90/100 | 10% | 6 types JSON-LD |
| Performance (CWV) | 85/100 | 10% | SSG + bon First Load JS |
| Images | 70/100 | 5% | Background CSS, pas next/image |
| AI Search Readiness | 80/100 | 5% | Bon, GPTBot bloque |

---

## RESUME EXECUTIF

### Top 5 issues CRITIQUES trouvees et CORRIGEES

1. **Canonical URL urgence CASSEE** — `/urgence/plombier-casablanca` au lieu de `/urgence/plombier/casablanca` (Google indexait des 404)
2. **8 pages statiques absentes du sitemap** — /services, /tarifs, /contact, /a-propos, /blog, /comment-ca-marche, /garantie, /confidentialite = invisibles pour Google
3. **OG tags incomplets sur ~20 pages rich content** — manquait siteName, locale, type, url = mauvais previews sociaux
4. **3 services absents de /services** — cuisiniere, concierge, nounou = pas de lien interne, orphan pages
5. **Zero security headers** — pas de X-Frame-Options, X-Content-Type-Options, Referrer-Policy

### Top 5 quick wins restants

1. Ajouter de vraies images OG (og:image) par page
2. Remplacer le numero placeholder +212600000000 par le vrai numero
3. Ajouter le vrai GA4 ID (actuellement G-XXXXXXXXXX)
4. Uploader un vrai logo.png (reference dans JSON-LD mais n'existe pas)
5. Ajouter Google Search Console verification

---

## 1. TECHNICAL SEO — 92/100

### Robots.txt
- **Status** : OK
- Permet tout crawl (`*: /`)
- Bloque GPTBot et Google-Extended (protection contenu AI)
- Declare sitemap : `https://allo-maison.ma/sitemap.xml`

### Sitemap.xml
- **Status** : CORRIGE (etait incomplet)
- **Avant** : 133 URLs (homepage + 114 service-city + 18 urgence)
- **Apres** : 141 URLs (+8 pages statiques ajoutees)
- Priorities correctes : homepage 1.0, services 0.9, urgence 0.9, city pages 0.8
- `lastModified` et `changeFrequency` sur toutes les entries

### Canonical URLs
- **Status** : CORRIGE
- Toutes les pages ont un canonical explicite
- **Bug corrige** : urgence canonicals utilisaient un tiret au lieu d'un slash

### Redirects (301)
- **Status** : OK — 27 redirections permanentes
- Couvre toutes les anciennes URLs WordPress (2017-2025)
- Preserve le jus SEO du domaine historique

### Security Headers
- **Status** : CORRIGE (etaient absents)
- Ajoutes : X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-DNS-Prefetch-Control

### Build & SSG
- **Status** : EXCELLENT
- 148 pages pre-rendues statiquement
- 114 pages service-city + 18 urgence + 16 pages statiques
- First Load JS shared : 102 kB (bon)

### HTTPS
- **Status** : OK via Vercel (HSTS automatique)

### Issues restantes
- [ ] `logo.png` reference dans JSON-LD mais n'existe pas encore en `/public/logo.png`
- [ ] Numero telephone placeholder `+212600000000` dans contact, urgence, et schema LocalBusiness

---

## 2. CONTENT QUALITY — 95/100

### E-E-A-T Assessment
| Signal | Status | Detail |
|--------|--------|--------|
| Experience | OK | "Depuis 2017" + temoignages avec quartier/ville |
| Expertise | OK | Conseils d'expert par service, tableaux de prix detailles |
| Authoritativeness | OK | LocalBusiness schema, adresse physique Casablanca |
| Trustworthiness | OK | Garantie 2000 DH, badge "pros verifies et encadres" |

### Rich Content
- **20 pages** avec contenu profond (300+ lignes chacune)
- Inclut : sections HTML, tableaux de prix, videos YouTube, tips d'expert, connaissances locales, temoignages, liens externes
- **94 pages** avec contenu template (metadata + FAQ dynamiques)

### Thin Content Risk
- `/blog` : Page placeholder — OK pour le lancement, a remplir rapidement
- `/espace-pro` : noindex, nofollow — correct
- `/confidentialite` : Contenu legal basique — acceptable

### Duplicate Content
- Aucun risque — chaque page service-city a un contenu unique ou un template avec variables

---

## 3. ON-PAGE SEO — 90/100

### Title Tags
| Page | Title | Chars | Status |
|------|-------|-------|--------|
| Homepage | allo-maison.ma \| Services a domicile de confiance au Maroc | 58 | OK |
| /services | Services a domicile au Maroc \| Artisans Verifies \| allo-maison.ma | 65 | OK |
| /tarifs | Tarifs services a domicile au Maroc 2026 \| Prix reels \| allo-maison.ma | 70 | Leger depassement |
| /plombier-casablanca (rich) | Plombier a Casablanca \| Pros Verifies des 150 DH \| Allo-Maison | 63 | OK |
| /urgence/plombier/casablanca | Plombier Urgence Casablanca \| Intervention 30 min \| Allo-Maison | 64 | OK |

### Meta Descriptions
- Toutes presentes et uniques
- 150-160 caracteres avec CTA (devis gratuit, WhatsApp)
- Inclut prix quand pertinent

### Heading Hierarchy
- H1 unique sur chaque page
- H2 pour les sections principales
- H3 pour les sous-sections dans le rich content
- Pas de H1 orphelin ou multiple

### Internal Linking
| Source | Destination | Links |
|--------|-------------|-------|
| Navbar | 5 pages principales | OK |
| Footer | 6 services + 6 villes + 6 pages about | OK |
| /services | 19 service cards → /[service]-casablanca | OK |
| /[slug] | Breadcrumb → service parent + ville | OK |
| Homepage | Categories, Services, Cities grids | OK |

### Issue CORRIGE
- 3 services (cuisiniere, concierge, nounou) n'avaient aucun lien interne depuis /services = pages orphelines

---

## 4. SCHEMA / STRUCTURED DATA — 90/100

### Implementations
| Type | Pages | Validation |
|------|-------|-----------|
| Organization | Homepage | OK |
| LocalBusiness | /contact | OK — adresse, geo, horaires |
| Service | 114 service-city pages | OK — prix, rating, areaServed |
| FAQPage | /services, /tarifs, /contact, /garantie, /comment-ca-marche, urgence, service-city | OK |
| BreadcrumbList | Toutes les pages (via composant) | OK |
| HowTo | /comment-ca-marche | OK — 3 steps, 5min |

### Manques potentiels
- [ ] **VideoObject** : les videos YouTube embed n'ont pas de schema VideoObject
- [ ] **Review** : les temoignages pourraient utiliser un schema Review individuel (pas seulement AggregateRating)
- [ ] **SearchAction** : pas de SearchAction pour la barre de recherche (Sitelinks Search Box)

---

## 5. PERFORMANCE — 85/100

### Static Generation
- 148 pages SSG = temps de reponse optimal
- Zero JS cote serveur a runtime

### Bundle Size
- First Load JS shared : **102 kB** (bon)
- Pages les plus lourdes : /[slug] (109 kB) et /contact (109 kB)
- Pages les plus legeres : /blog, /confidentialite (106 kB)

### Font Loading
- Inter via `next/font/google` = self-hosted, pas de FOIT
- Subsets : latin, latin-ext (optimal pour FR)
- CSS variable binding (`--font-inter`)

### DNS Prefetch (CORRIGE)
- Ajoute : `dns-prefetch` pour googletagmanager.com
- Ajoute : `dns-prefetch` + `preconnect` pour images.unsplash.com

### Issues restantes
- [ ] Images Unsplash en CSS `backgroundImage` — pas optimisees via next/image
- [ ] Pas de lazy loading sur les images de cities-grid
- [ ] Pas de `next/dynamic` pour code splitting des forms

---

## 6. IMAGES — 70/100

### Analyse
- Le site utilise principalement des **emoji icons** (pas d'images reelles)
- 6 images Unsplash pour les villes (cities-grid) en CSS `backgroundImage`
- Pas d'utilisation de `next/image`
- Avatar artisans = initiales texte (pas d'images)

### Issues
- [ ] Images Unsplash non optimisees (pas de WebP automatique)
- [ ] `remotePatterns: []` vide dans next.config.ts
- [ ] Pas d'alt text sur les images de villes (CSS background)
- [ ] Logo reference dans schema mais fichier absent

### Recommandation
Pour le lancement, acceptable car le site est principalement icon-based. A ameliorer post-launch.

---

## 7. AI SEARCH READINESS — 80/100

### Citability
- Contenu structure avec headers clairs
- Tableaux de prix = format ideal pour les AI answers
- FAQ = format ideal pour les featured snippets
- Temoignages avec noms et lieux = E-E-A-T

### Protection
- GPTBot et Google-Extended bloques dans robots.txt
- Le contenu est protege du scraping AI

### Recommandations
- [ ] Ajouter un `llms.txt` pour guider les LLMs
- [ ] Creer un schema `SpeakableSpecification` pour les assistants vocaux

---

## 8. OPEN GRAPH & SOCIAL — 85/100

### Implementation
- Toutes les pages ont `og:title`, `og:description`, `og:url`
- `og:siteName: "Allo-Maison"`, `og:locale: "fr_MA"`, `og:type: "website"`
- Twitter cards : `summary_large_image` partout

### CORRIGE
- Pages rich content manquaient siteName, locale, type, url dans OG

### Issues restantes
- [ ] **og:image** absent partout — previews sociaux sans image
- [ ] Pas de compte Twitter/Facebook renseigne

---

## 9. FAVICON & MANIFEST — CORRIGE

### Avant
- Zero favicon, zero manifest, zero apple-touch-icon

### Apres
- `app/icon.svg` : Favicon SVG (lettre "A" sur fond bleu #1E40AF)
- `app/apple-icon.svg` : Apple Touch Icon

### Reste a faire
- [ ] Manifest PWA (manifest.json) si app mobile prevue

---

## 10. ACCESSIBILITY (BONUS)

| Element | Status |
|---------|--------|
| `lang="fr"` sur html | OK |
| `dir="ltr"` | OK |
| Breadcrumb `aria-label="Fil d'Ariane"` | OK |
| `aria-current="page"` sur nav active | OK |
| `role="img" aria-label` sur emoji icons | OK |
| Semantic HTML (nav, main, footer, article) | OK |
| `sr-only` pour screen readers | OK |
| Focus states sur liens/boutons | OK via Tailwind |

---

## INVENTAIRE COMPLET DES PAGES (141 URLs dans sitemap)

| Type | Nombre | Exemple |
|------|--------|---------|
| Homepage | 1 | / |
| Pages statiques | 8 | /services, /tarifs, /contact, etc. |
| Service-City | 114 | /plombier-casablanca, /electricien-rabat, etc. |
| Urgence | 18 | /urgence/plombier/casablanca, etc. |
| **Total** | **141** | |

---

## CHECKLIST PRE-PRODUCTION

### FAIT (cette session)
- [x] Canonical URL urgence corrigee
- [x] 8 pages statiques ajoutees au sitemap (141 URLs total)
- [x] OG tags completes sur pages rich content
- [x] Security headers ajoutes (X-Frame-Options, X-Content-Type-Options, etc.)
- [x] 3 services manquants ajoutes sur /services (cuisiniere, concierge, nounou)
- [x] Favicon SVG + Apple Touch Icon crees
- [x] DNS prefetch/preconnect pour Unsplash et GTM
- [x] Title template ajoute (`%s | allo-maison.ma`)
- [x] Slot Google Search Console verification (`NEXT_PUBLIC_GSC_ID`)
- [x] Build valide : 148 pages SSG, zero erreur

### A FAIRE AVANT LE LAUNCH
- [ ] Remplacer `+212600000000` par le vrai numero de telephone
- [ ] Mettre le vrai GA4 ID (`NEXT_PUBLIC_GA4_ID`)
- [ ] Uploader `logo.png` dans `/public/` (reference dans JSON-LD)
- [ ] Creer une propriete Google Search Console et ajouter `NEXT_PUBLIC_GSC_ID`
- [ ] Generer des images OG par page (ou au minimum une image OG par defaut)
- [ ] Verifier le WhatsApp number dans `.env.local`

### POST-LAUNCH (semaine 1)
- [ ] Soumettre le sitemap dans Google Search Console
- [ ] Verifier l'indexation des 141 URLs
- [ ] Configurer Google Analytics events (clicks WhatsApp, soumissions formulaire)
- [ ] Migrer les images Unsplash vers next/image avec remotePatterns
- [ ] Ajouter schema VideoObject pour les YouTube embeds
- [ ] Ecrire les 5 premiers articles de blog (pricing guides = highest value)
- [ ] Builder 10 backlinks minimum (annuaires MA, reseaux sociaux, partenaires)

---

## COMPARAISON vs CONCURRENTS

| Critere | allo-maison.ma | mesdepanneurs.co | bricolat.co.ma | mano.ma | likoum.ma |
|---------|---------------|-----------------|----------------|---------|-----------|
| Pages indexables | 141 | 784 | 230 | 764 | 578 |
| Schema types | 6 | 1 (wrong) | 5 | 2 | 1 |
| Blog/Content | 20 rich + blog | 0 | 149 articles | 37 articles | 22 articles |
| Redirects legacy | 27 | 0 | 0 | 0 | 0 |
| SSG/SSR | Full SSG | SSR | SSR | WordPress | WordPress |
| Security headers | 5 headers | 0 | 0 | Partial | 0 |
| FAQ schema | 7+ pages | 0 | 0 | 0 | 0 |
| Mobile-first | Yes | Yes | Yes | Yes | Yes |
| HTTPS | Yes | Yes | Yes | Yes | Yes |
| Core Web Vitals | Excellent (SSG) | Unknown | Unknown | Slow (WP) | Slow (WP) |

**Verdict** : allo-maison.ma est techniquement superieur a TOUS les concurrents marocains. La seule faiblesse est le nombre de pages (141 vs 784 pour mesdepanneurs), compensee par la qualite du contenu et la solidite technique.

---

*Rapport genere le 13 avril 2026 — Audit pre-production final*
