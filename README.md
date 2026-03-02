# 🔥 Pipeline Flow — CRM Tinder

Pipeline Flow est né d'une frustration simple : la pagination et l'interface de noCRM.io rendaient la qualification de leads pénible et lente. Naviguer entre les pages, ouvrir chaque fiche, qualifier, revenir en arrière… à ~30 fiches par jour, c'était un gouffre de temps.

L'idée : un système de swipe inspiré de Tinder pour traiter les opportunités une par une, sans friction. Swipe gauche pour éliminer, swipe droit pour conserver, édition inline de la description, changement de pipeline en un clic.
Résultat : 100+ fiches qualifiées et normalisées par jour, soit 3x plus qu'avec l'interface native noCRM.

Deux modes de travail :
- **Opportunités** — trier les leads existants (conserver / supprimer)
- **Prospects** — qualifier des prospects depuis les listes noCRM et les convertir en leads

---

## Stack technique

| Couche | Techno | Port |
|--------|--------|------|
| Frontend | Next.js 16 (App Router) + Tailwind CSS | `3001` |
| Backend | NestJS + Axios | `3000` |
| API externe | noCRM.io API v2 | — |

---

## Installation

### Prérequis

- Node.js ≥ 18
- npm ou yarn

### Backend (NestJS)

```bash
cd back
npm install
npm run start:dev        # démarre sur http://localhost:3000
```

### Frontend (Next.js)

```bash
cd front
npm install
npm run dev              # démarre sur http://localhost:3001
```

### Variables d'environnement & Constantes

**Frontend** : Le frontend ne nécessite pas de `.env`, par contre vous devez modifier les constantes selon votre configuration.
Dans `/app/refactored/constants/index.ts`, vous trouverez une constante nommée `stepPipelines` : remplacez les `id` et les `name` par vos propres valeurs. Vous trouverez les IDs dans votre compte noCRM à l'adresse : `/admin/account/objects_ids`.

**Backend** : la clé API et le subdomain noCRM sont configurés dans `nocrm.service.ts`, mais avant cela vous devez créer un `.env` à la racine du backend. Le `.env` se présente sous la forme :

```bash
NOCRM_API_KEY="xxxxx"
SUBDOMAIN="xxxxx"
```

---

## Architecture Frontend

```
app/refactored/
├── page.tsx                              ← Point d'entrée (switch Opportunités / Prospects)
├── types/index.ts                        ← Types partagés (LeadCard, ProspectCard, etc.)
├── constants/index.ts                    ← API_BASE, stepPipelines
├── styles/global-styles.tsx              ← Animations et styles CSS partagés
│
├── hooks/
│   ├── useLeadNavigation.ts              ← Fetch leads, cursor, swipe, progress
│   ├── useComments.ts                    ← Chargement commentaires d'un lead
│   ├── useDescriptionEditor.ts           ← CRUD description inline
│   ├── useSirenDetector.ts               ← Extraction SIREN depuis la description
│   ├── useKeyboardNavigation.ts          ← Raccourcis clavier (← → Espace Escape)
│   ├── useProspectNavigation.ts          ← Fetch prospects, qualify, swipe
│   └── useProspectParser.ts              ← Parse du tableau brut → objet structuré
│
└── components/
    ├── layout/                           ← Composants partagés
    │   ├── Header.tsx                    ← Logo + titre + toggle mode + progress bar
    │   ├── ModeToggle.tsx                ← Switch Opportunités / Prospects
    │   ├── ProgressBar.tsx               ← Barre de progression + bouton refresh
    │   └── ErrorBanner.tsx               ← Bandeau d'erreur
    │
    └── opportunity/                      ← Mode Opportunités
        ├── OpportunityView.tsx           ← Composition complète de la vue
        ├── LeadCard.tsx                  ← Carte lead (badges, titre, description, meta)
        ├── LeadCardSkeleton.tsx          ← Skeleton loading
        ├── EmptyPipeline.tsx             ← État vide "Pipeline vide"
        ├── StepDropdown.tsx              ← Dropdown changement de pipeline/step
        ├── DescriptionBlock.tsx          ← Affichage et édition de la description
        ├── CommentsSidebar.tsx           ← Panneau latéral historique commentaires
        └── SwipeFooter.tsx               ← Boutons Supprimer / Conserver + légende clavier

app/prospects/                            ← Mode Prospects
├── ProspectView.tsx                      ← Composition complète de la vue
├── ProspectCardDisplay.tsx               ← Carte prospect (nom, budget, infos, liens, contacts)
├── ProspectInfoGrid.tsx                  ← Grille secteur / CA / salariés / ville
├── ProspectLinks.tsx                     ← Liens externes (site, téléphone, LinkedIn, Pappers)
├── ContactsList.tsx                      ← Liste des contacts avec email / LinkedIn
├── ProspectSwipeFooter.tsx               ← Boutons Passer / Qualifier
├── ProspectCardSkeleton.tsx              ← Skeleton loading
└── EmptyProspectList.tsx                 ← État vide "Liste terminée"
```

---

## Architecture Backend

```
src/
├── main.ts                               ← Bootstrap NestJS + CORS
├── app.module.ts                         ← Module racine
└── nocrm/
    ├── nocrm.module.ts                   ← Module NestJS
    ├── nocrm.controller.ts               ← Routes API (voir section Endpoints)
    └── nocrm.service.ts                  ← Client HTTP vers l'API noCRM.io
```

### Service noCRM (`nocrm.service.ts`)

Le service encapsule tous les appels vers l'API noCRM.io v2 :

| Méthode | Description |
|---------|-------------|
| `listLeads(params)` | Liste les leads avec filtrage par step exclu et shuffle aléatoire |
| `moveLeadToStep(leadId, stepId)` | Déplace un lead vers un step donné |
| `updateLead(leadId, payload)` | Met à jour un lead (description, etc.) |
| `getLeadComments(leadId)` | Récupère les commentaires d'un lead |
| `getSpreadsheet(spreadsheetId)` | Récupère une liste de prospects (spreadsheet) |
| `createLeadFromProspect(spreadsheetId, rowId)` | Convertit une ligne prospect en lead |
| `assignLead(leadId, userId)` | Assigne un lead à un utilisateur |

**Filtrage des leads** : les leads appartenant à certains steps sont automatiquement exclus de la liste (`EXCLUDED_STEP_IDS`) pour éviter de re-traiter des leads déjà qualifiés, perdus ou classés.

---

## Endpoints API

Toutes les routes sont préfixées par `/cards`.

### Mode Opportunités

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/cards/next?status=todo,standby&offset=0&limit=1` | Récupère le prochain lead à qualifier |
| `POST` | `/cards/:id/lose` | Déplace un lead vers le step "Perdus" (id : 460220) |
| `PATCH` | `/cards/:leadID` | Met à jour la description d'un lead |
| `POST` | `/cards/:leadID/step` | Change le step/pipeline d'un lead |
| `GET` | `/cards/:leadID/comments` | Récupère l'historique des commentaires |

⚠️ Noubliez pas de changer l'id de la constante stepId par votre propre id ou vous souhaitez renvoyer les opportunités indésirables. (ligne 59 - nocrm.controller.ts)

### Mode Prospects

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/cards/next/prospectList?listId=265238` | Récupère un prospect aléatoire non converti |
| `POST` | `/cards/qualify` | Convertit un prospect en lead, l'assigne et le place dans le step "A qualifier" |

---

## Raccourcis clavier

| Touche | Mode Opportunités | Mode Prospects |
|--------|-------------------|----------------|
| `←` | Supprimer (step Perdus) | Passer (suivant) |
| `→` | Conserver (suivant) | Qualifier (créer lead) |
| `Espace` | Conserver | Qualifier |
| `Escape` | Annuler édition description | — |

---

## Fonctionnalités

- **Swipe animé** avec animations CSS (slide in, swipe left/right)
- **Édition inline** de la description des leads avec sauvegarde API
- **Changement de step** via dropdown sur la carte
- **Détection automatique du SIREN** dans les descriptions pour lien Pappers.fr
- **Historique des commentaires** dans un panneau latéral
- **Parsing des prospects** : extraction structurée (secteur, CA, salariés, ville, contacts) depuis le format brut noCRM
- **Lien Pappers.fr** automatique sur les opportunités et prospects
- **Skeleton loading** pendant le chargement
- **Responsive** mobile / desktop

---

## Développement

```bash
# Lancer les deux en parallèle
cd back && npm run start:dev &
cd front && npm run dev
```

⚠️ Le frontend tourne sur `http://localhost:3001` et proxy les appels API vers `http://localhost:3000`. Faites attention lors du lancement a ne pas intervertir !
