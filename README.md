# EPSA — Gestion des accidents du travail

Application web fullstack de gestion des accidents du travail (AT), développée dans le cadre d'un test technique.

Elle permet à un administrateur de s'authentifier, de déclarer des accidents du travail et d'exporter les données au format Excel ou PDF.

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Frontend | React, TypeScript, Vite, TailwindCSS, shadcn/ui |
| Backend | AdonisJS, TypeScript |
| Base de données | PostgreSQL |
| Validation | Zod (front), VineJS (back) |
| Export | ExcelJS, PDFKit |
| Containerisation | Docker |

---

## Prérequis

- Node.js >= 24
- pnpm
- Docker

---

## Installation et lancement

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd epsa-app
```

### 2. Lancer la base de données

```bash
cd epsa-api
docker-compose up -d
```

### 3. Installer les dépendances backend

```bash
pnpm install
```

### 4. Lancer les migrations et le seed

```bash
cp .env.example .env
node ace generate:key
Copie la clé générée et remplace la valeur de `APP_KEY` dans le fichier `.env`.
node ace migration:run
node ace db:seed
```

### 5. Lancer le serveur backend

```bash
node ace serve --watch
```

Le serveur tourne sur `http://localhost:3333`

---

### 7. Installer les dépendances frontend

Ouvre un nouveau terminal :

```bash
cd epsa-front
pnpm install
```

### 8. Lancer le serveur frontend

```bash
pnpm run dev
```

L'application tourne sur `http://localhost:5173`

---

## Identifiants de connexion

| Champ | Valeur |
|-------|--------|
| Email | Gilles@epsa.com |
| Mot de passe | epsa |

---

## Fonctionnalités

- **Authentification** — login sécurisé avec JWT, déconnexion
- **Tableau de bord** — KPIs en temps réel (effectif, AT déclarés, en attente)
- **Déclaration d'AT** — formulaire avec validation côté front (Zod) et back (VineJS)
- **Export Excel** — téléchargement du tableau des AT au format `.xlsx`
- **Export PDF** — téléchargement du rapport au format `.pdf`

---
