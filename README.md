# 🚙 Maz Travel — Plateforme Tourisme Marrakech (Production-Ready)

Plateforme premium full-stack pour agence de transport touristique privée à Marrakech, Maroc.

## ✨ Fonctionnalités

### 🌐 Site public (FR / EN / ES)
- **Hero vidéo** avec fallback image automatique + 15+ animations
- **Booking tabs** : Transfert (départ→arrivée, swap, date, heure) / Mise à disposition (lieu, durée)
- **Page Excursions** style ClickExcursions : sidebar recherche, filtres prix/tri, badges, pagination
- **Page Activités** avec filtres par catégorie
- **Page Transferts** avec routes prédéfinies + flotte véhicules
- **Page Mise à disposition** avec durées et usages
- **Page À propos** avec histoire + valeurs + équipe
- **Page Contact** formulaire + Google Maps + WhatsApp
- **Multi-devises** MAD / EUR / USD avec switch automatique selon langue
- Témoignages, FAQ, galerie, partenaires marquee, CTA, footer pro

### 👨‍💼 Espace Admin complet
- Dashboard avec stats temps réel (CA, devis, demandes, conversions)
- **Gestion des devis** : saisir prix multi-devises + message + envoi email auto au client
- **CRUD complet** : excursions, activités, transferts, véhicules, témoignages, galerie
- **Messages contact**
- **Paramètres** : taux de change, contacts, SEO, social
- Upload d'images

### 🔧 Technique
- JWT Auth, Zod validation, Multer upload, Nodemailer, Winston logs
- Helmet security, Rate limiting, CORS
- Prisma ORM + MySQL avec 11 tables
- i18n next-intl avec 3 langues complètes
- SEO : sitemap.xml, robots.txt, OpenGraph, métadonnées
- Animations premium (fade, scale, blob, marquee, ken-burns, tilt 3D)
- Mobile first responsive parfait
- Docker Compose : MySQL + Backend + Frontend + Nginx reverse proxy

## 🚀 Démarrage Docker (recommandé)

```bash
unzip maz-travel.zip
cd maz-travel
docker-compose up --build -d

# Attendre 30 secondes (MySQL init), puis :
docker-compose exec backend npx prisma migrate deploy
docker-compose exec backend node prisma/seed.js
```

### Accès

| Service | URL | Identifiants |
|---|---|---|
| 🌐 Site | http://localhost | — |
| 🔧 Admin | http://localhost/fr/admin | `admin@maztravel.ma` / `admin123` |
| 🔌 API | http://localhost/api/health | — |
| 🗄️ MySQL | localhost:3306 | `maz_user` / `maz_pass` |

## 🎬 Vidéo Hero — Personnalisation

Le hero charge `/public/videos/hero.mp4` avec fallback CDN automatique.

```bash
# Mets ta vidéo (MP4, 1920x1080, ≤ 5 Mo, ~15s) :
frontend/public/videos/hero.mp4
```

## 💻 Démarrage manuel (développement)

### Base de données
```bash
mysql -u root -p < database/init.sql
```

### Backend
```bash
cd backend
npm install
cp .env.example .env       # adapter DATABASE_URL et SMTP
npx prisma generate
npx prisma migrate dev --name init
node prisma/seed.js
npm run dev                # http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev                # http://localhost:3000
```

## 📁 Structure

```
maz-travel/
├── frontend/                  # Next.js 15 + Tailwind + next-intl
│   ├── public/videos/hero.mp4 # ta vidéo
│   ├── src/
│   │   ├── app/[locale]/      # 7 pages publiques + admin
│   │   ├── components/        # Header, Footer, Hero, BookingTabs, Sections, Admin
│   │   ├── i18n/, lib/, store/
│   │   └── messages/fr,en,es.json
│   └── Dockerfile
├── backend/                   # Express + Prisma + MySQL
│   ├── src/routes/            # 11 routes REST
│   ├── src/middleware/        # JWT, upload, validation
│   ├── src/templates/         # Email templates HTML
│   ├── prisma/                # Schema + seed
│   └── Dockerfile
├── database/init.sql
├── nginx/nginx.conf
└── docker-compose.yml
```

## 🔑 API Endpoints (REST)

| Méthode | Route | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/login` | Login admin | Non |
| GET | `/api/auth/me` | Profil admin | Oui |
| GET | `/api/excursions[?featured=1&lang=fr]` | Liste publique | Non |
| GET | `/api/excursions/:slug` | Détail | Non |
| POST/PUT/DELETE | `/api/excursions[/:id]` | CRUD | Oui |
| GET/POST/PUT/DELETE | `/api/activities` | CRUD activités | Mixte |
| GET/POST/PUT/DELETE | `/api/transfers` | CRUD routes transfert | Mixte |
| GET/POST | `/api/quotes` | Demandes devis | Mixte |
| PUT | `/api/quotes/:id/respond` | Répondre + envoyer email | Oui |
| GET/POST/DELETE | `/api/contacts` | Messages | Mixte |
| GET/POST/PUT/DELETE | `/api/testimonials` | CRUD | Mixte |
| GET/POST/DELETE | `/api/gallery` | CRUD | Mixte |
| GET | `/api/admin/stats` | Stats dashboard | Oui |
| GET/PUT | `/api/settings` | Paramètres | Mixte |
| POST | `/api/upload` | Upload image | Oui |

## 🆘 Dépannage

**MySQL ne démarre pas** → `lsof -i :3306`
**Reset DB** → `docker-compose exec backend npx prisma migrate reset --force`
**Port 80 occupé** → modifier `docker-compose.yml` : `"8080:80"`
