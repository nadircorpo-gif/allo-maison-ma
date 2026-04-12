# allo-maison.ma — Platform Design Spec

**Date**: 2026-04-11
**Status**: Approved
**Domain**: allo-maison.ma (registered 2026-04-11, history since 2017)

---

## 1. Vision & Positionnement

**Vision**: La premiere plateforme de services a domicile de confiance au Maroc — artisans verifies, prix transparents, satisfaction garantie.

**Positionnement**: Premium-Accessible + Securite comme ADN. Le luxe du service pro, accessible a tous, avec des prestataires verifies et encadres. "Depuis 2017."

**Tagline hero**: "Confiez votre maison a des Pros Certifies"

**Proposition de valeur unique**: Verification rigoureuse (CIN, casier judiciaire, competences OFPPT) + Garantie financiere jusqu'a 2000 DH + WhatsApp-first communication.

---

## 2. Business Model

### Revenue
- **Commission marketplace**: 10-15% sur chaque mission completee
- **Boost/publicite artisans**: placement prioritaire (optionnel)
- **Services premium**: assurance etendue, artisan dedie

### Cote Client (gratuit)
- Recherche & decouverte de pros
- Booking direct (services simples) ou devis comparatifs (gros travaux)
- Chat in-app + WhatsApp accessible
- Tracking temps reel "On My Way"
- Garantie satisfaction jusqu'a 2000 DH
- Avis verifies par SMS

### Cote Artisan (outils gratuits)
- App scheduling / CRM / facturation
- Page booking partageable WhatsApp
- Dashboard analytics (missions, revenus, avis)
- Commission 10-15% uniquement sur missions via plateforme

---

## 3. Stack Technique

- **Framework**: Next.js (App Router, Server Components)
- **Backend**: Convex (realtime database, server functions, auth)
- **Hosting**: Vercel
- **Styling**: Tailwind CSS + shadcn/ui
- **Font**: Inter (excellent support arabe)
- **Analytics**: GA4 (propriete a creer au setup)
- **Email**: Resend API
- **Paiement**: a definir (CMI, cash, mobile money)
- **Communication**: WhatsApp Business API + chat in-app
- **CDN images**: Vercel Image Optimization / Unsplash (lanceme)

---

## 4. Design System

### 4.1 Palette de Couleurs

| Token | Hex | Usage |
|-------|-----|-------|
| Primary Blue | #1E40AF | CTA, liens, nav active |
| Deep Blue | #1E3A5F | Textes forts, boutons secondaires |
| Blue Light | #EFF6FF | Fonds cartes, hover states |
| Trust Green | #10B981 | Badges verification UNIQUEMENT |
| Green Light | #F0FDF4 | Fond badges verification |
| Ink | #0F172A | Titres |
| Muted | #64748B | Corps de texte |
| Surface | #F8FAFC | Fonds sections alternees |
| Amber | #F59E0B | Urgences, promos, etoiles |
| WhatsApp | #25D366 | Bouton WhatsApp |

### 4.2 Typographie

| Element | Taille | Poids | Tracking |
|---------|--------|-------|----------|
| H1 Hero | 42px (desktop) / 28px (mobile) | 800 | -0.5px |
| H2 Section | 28px / 22px | 700 | -0.3px |
| H3 Card | 20px / 18px | 600 | 0 |
| Body | 16px | 400 | 0, line-height 1.6 |
| Small/Caption | 13px | 500 | 0 |

Font: Inter, system-ui, -apple-system, sans-serif

### 4.3 Spacing & Radius

| Element | Border Radius |
|---------|--------------|
| Boutons | 8px |
| Cartes | 12px |
| Badges | 20px (pill) |
| Avatars | 50% (circle) |

Ombres:
- sm: `0 1px 3px rgba(0,0,0,0.06)` — cartes au repos
- md: `0 4px 16px rgba(0,0,0,0.08)` — hover
- lg: `0 8px 32px rgba(0,0,0,0.12)` — modales

### 4.4 Composants Cles

**Boutons**:
- Primaire: bg #1E40AF, text white, radius 8px
- Secondaire: bg white, border 2px #1E40AF, text #1E40AF
- WhatsApp: bg #25D366, text white
- Urgence: bg #F59E0B, text white

**Badges de Verification** (vert uniquement):
- Pill: bg #F0FDF4, border #BBF7D0, text #166534
- Icone check: cercle #10B981, check blanc
- Types: "Identite verifiee", "Casier verifie", "Competences certifiees", "Artisan Elite" (bleu)

**Carte Service**:
- Photo/icone gradient + nom + etoiles + nb avis + "A partir de X DH"

**Carte Artisan**:
- Avatar cercle + nom + metier + ville + etoiles + note + prix/h + mini-badges (CIN, Casier, OFPPT)

---

## 5. Architecture des Pages

### 5.1 Homepage (validee visuellement)

```
Navbar: Logo | Services | Comment ca marche | Tarifs | FR|AR | Connexion
  |
Hero: Badge securite vert ("Depuis 2017 — Chaque pro verifie: CIN, casier, competences")
  + H1: "Confiez votre maison a des Pros Certifies"
  + Sous-titre: "trouvez le bon pro en quelques clics et payez uniquement apres satisfaction"
  + Search bar: [De quoi avez-vous besoin?] [Ville] [Rechercher]
  + Stats: 500+ artisans depuis 2017 | 4.8/5 satisfaction | Garantie jusqu'a 2000 DH
  |
Categories: Pills scrollables horizontales (Plomberie, Electricite, Peinture, Menage, Clim, Serrurerie, Bricolage, Renovation, Jardinage, Informatique, Demenagement)
  |
Comment ca marche: 3 etapes
  1. Decrivez votre besoin (gratuit, 30 secondes)
  2. Choisissez votre pro (comparez profils, avis, prix — chat/WhatsApp)
  3. Payez apres satisfaction (paiement securise apres votre accord)
  |
Confiance & Securite:
  H2: "Qui entre chez vous ? On a verifie."
  3 cartes: Identite verifiee | Competences prouvees | Suivi en continu
  |
Banniere Garantie:
  "Pas satisfait ? On regle le probleme."
  Remboursement jusqu'a 2000 DH ou autre pro a nos frais. Zero risque.
  |
Services populaires: Grille 4x2, chaque carte = icone + nom + etoiles + avis + "A partir de X DH"
  |
Villes: 6 cartes photo (Casablanca, Rabat, Marrakech, Tanger, Fes, Agadir) + compteur artisans
  |
Temoignages: 3 avis verifies avec nom + quartier + chiffres specifiques
  |
CTA Final: "Votre prochain pro est a quelques clics" + [Trouver mon pro] + [WhatsApp]
  |
Footer: Logo + desc "Depuis 2017" + Services links + Villes links + About links + Social + (c) 2017-2026
```

### 5.2 Pages SEO Programmatiques (270+ pages)

**Pages service x ville** (160 pages):
- URL: `/[service]-[ville]` (ex: `/plombier-casablanca`)
- Contenu: H1 "[Service] a [Ville]", description, prix moyens, liste artisans verifies, avis, FAQ schema
- Schema: `LocalBusiness` + `Service` + `AggregateRating` + `FAQPage`

**Pages quartier** (50+ pages):
- URL: `/[service]-[quartier]-[ville]` (ex: `/plombier-maarif-casablanca`)
- Contenu: ultra-local, artisans du quartier

**Pages urgence** (18 pages):
- URL: `/urgence/[service]/[ville]` (ex: `/urgence/plombier/casablanca`)
- Contenu: click-to-call, WhatsApp, intervention rapide
- Design: banniere amber urgence, CTA prominent

**Guides de prix** (30+ pages):
- URL: `/prix/[service]-[ville]-2026` (ex: `/prix/plombier-casablanca-2026`)
- Contenu: tableaux de prix, calculateur, FAQ
- Schema: `FAQPage` + `Table`

**Contenus piliers GEO/AI** (10 pages):
- `/guide/droits-employe-maison-maroc` (Loi 19-12)
- `/guide/normes-electriques-maroc`
- `/guide/comment-trouver-artisan-confiance`
- `/guide/assurance-decennale-maroc-2026`
- `/guide/combien-gagne-plombier-maroc`
- + versions arabes avec hreflang

### 5.3 Pages Core App

- `/services` — catalogue complet des services
- `/comment-ca-marche` — flow detaille
- `/garantie` — page dediee Garantie Allo-Maison
- `/devenir-artisan` — inscription pro (supply side)
- `/connexion` — login/signup
- `/profil/[artisan-id]` — profil artisan public
- `/dashboard` — espace client (mes missions, avis)
- `/pro/dashboard` — espace artisan (planning, revenus, avis)
- `/blog` — contenus SEO saisonniers

---

## 6. Fonctionnalites Cles

### 6.1 Dual-Path Booking

| Type de service | Flow |
|----------------|------|
| Simple (menage, bricolage, montage) | Booking direct: choisir creneau -> artisan assigne -> confirmation |
| Complexe (renovation, plomberie lourde, electricite) | Devis comparatifs: decrire besoin -> recevoir 2-3 devis -> comparer -> choisir |

### 6.2 Systeme de Verification (inspire Checkatrade)

Etapes de verification artisan:
1. CIN (carte d'identite nationale)
2. Casier judiciaire
3. Certificats/diplomes (OFPPT ou equivalent)
4. References clients (minimum 2)
5. Entretien telephonique ou en personne
6. Photo de profil professionnelle

Badges affiches: CIN ok | Casier ok | Competences ok | Artisan Elite (top 10%)

### 6.3 Garantie Allo-Maison

- Remboursement jusqu'a 2000 DH si travail non conforme
- OU envoi d'un autre artisan a nos frais
- Fenetre de reclamation: 7 jours apres mission
- Conditions: booking et paiement via la plateforme

### 6.4 Communication

- Chat in-app (default) entre client et artisan
- Bouton WhatsApp accessible (redirection vers WhatsApp Business de l'artisan)
- Notifications SMS pour confirmations et rappels
- "On My Way" tracking GPS temps reel

### 6.5 Paiement

- Cash a la livraison (option par defaut — marche marocain)
- Carte bancaire (CMI)
- Mobile money (futur)
- Paiement declenche APRES validation client

### 6.6 Avis & Reputation

- Demande d'avis automatique par SMS 1h apres mission
- Avis lies a des missions reelles (pas d'avis anonymes)
- Note 1-5 etoiles + commentaire texte
- Artisan peut repondre aux avis
- Artisans mal notes (< 3.5 sur 10+ avis) retires de la plateforme

---

## 7. Internationalisation

- **Langue par defaut**: Francais
- **Toggle**: FR | AR dans le header
- **Implementation**: hreflang fr-MA / ar-MA
- **Contenu arabe**: pages cles + profils artisans
- **Direction**: LTR (francais) / RTL (arabe) avec Tailwind CSS `dir="rtl"`

---

## 8. SEO Strategy

### Volume Adressable: ~250K-435K recherches/mois

### Architecture URL SEO
```
/                              → Homepage
/[service]-[ville]             → 160 pages programmatiques
/[service]-[quartier]-[ville]  → 50+ pages quartier
/urgence/[service]/[ville]     → 18 pages urgence
/prix/[service]-[ville]-2026   → 30+ guides de prix
/guide/[topic]                 → 10 contenus piliers
/blog/[slug]                   → Articles saisonniers
/ar/[mirror-structure]         → Version arabe
```

### Schema Markup Site-Wide
- `Organization` (allo-maison.ma, fondee 2017)
- `WebSite` avec `SearchAction`
- `BreadcrumbList` sur toutes les pages
- `LocalBusiness` / `HomeAndConstructionBusiness`
- `FAQPage` sur chaque page service/prix
- `HowTo` sur les guides
- `Service` + `Offer` + `AggregateRating` sur les pages service

### Calendrier Editorial
| Periode | Focus |
|---------|-------|
| Lancement | 160 pages service x ville programmatiques |
| Mois 1 | 10 guides de prix + 18 pages urgence |
| Mois 2 | Pages quartier + contenu arabe |
| Mois 3 | Guides juridiques GEO/AI |
| Pre-Ramadan | Contenu saisonnier Ramadan |
| Pre-ete | Contenu climatisation |
| Pre-hiver | Contenu etancheite/chauffage |

---

## 9. Concurrence

### Maroc (direct)
| Concurrent | Force | Faiblesse |
|-----------|-------|-----------|
| AlloPro.ma | SEO, marketplace | Pas de verification rigoureuse |
| BriCool.ma | Couverture nationale | UX basique, pas de garantie |
| Chronomenage | Leader menage, 85K+ services | Mono-service (menage) |
| M3allem.ma | Pages ville programmatiques | Annuaire simple, pas de booking |
| Bricolat.co.ma | Meilleur contenu prix/guides | Pas de marketplace, contenu only |

### Differentiation allo-maison.ma
1. Verification rigoureuse (CIN + casier + competences)
2. Garantie financiere 2000 DH
3. WhatsApp-first
4. Bilingue FR/AR natif
5. Categories culturelles (Ramadan, Mariage, Aid)
6. Outils gratuits pour artisans
7. Design premium (inspire Batmaid/Thumbtack)

---

## 10. Phases de Lancement

### Phase 1 — MVP (Mois 1-2)
- Homepage + pages service x ville (top 6 services x 6 villes = 36 pages)
- Flow booking simple (formulaire -> WhatsApp)
- 10 profils artisans verifies (Casablanca)
- SEO de base (schema, meta, sitemap)
- GA4 setup

### Phase 2 — Marketplace (Mois 3-4)
- Chat in-app
- Systeme d'avis
- Dashboard artisan (planning, missions)
- Dashboard client (historique, favoris)
- Paiement en ligne (CMI)
- 50+ artisans verifies

### Phase 3 — Scale (Mois 5-6)
- App mobile (React Native ou PWA)
- Tracking GPS "On My Way"
- IA repondeur Darija/FR
- Expansion multi-villes (Rabat, Marrakech, Tanger)
- Guides de prix et contenu GEO
- 200+ artisans

### Phase 4 — Domination (Mois 7+)
- Outils SaaS gratuits pour artisans
- Consumer financing pour gros travaux
- Programme Artisan Elite
- Pages quartier programmatiques
- Contenu arabe complet
- 500+ artisans, 6+ villes

---

## 11. Metriques de Succes

| Metrique | Objectif M3 | Objectif M6 | Objectif M12 |
|----------|------------|------------|-------------|
| Artisans verifies | 50 | 200 | 500 |
| Missions completees | 100 | 1,000 | 5,000 |
| Trafic organique | 5K/mois | 20K/mois | 50K/mois |
| Note moyenne | 4.5/5 | 4.7/5 | 4.8/5 |
| Villes couvertes | 1 (Casa) | 3 | 6 |
| Pages indexees | 50 | 150 | 300+ |
