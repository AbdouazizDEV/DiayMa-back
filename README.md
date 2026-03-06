# 🌍 SunuMarket API - DiayeMa Backend

API REST pour **DiayeMa**, une plateforme e-commerce destinée à la population de Bambey (Sénégal).

## 📋 Stack Technique

- **Framework Backend** : NestJS (dernière version stable)
- **Langage** : TypeScript (strict mode)
- **Base de données** : PostgreSQL 15+
- **ORM** : TypeORM
- **Stockage fichiers** : Cloudinary
- **Documentation** : Swagger/OpenAPI
- **Validation** : class-validator + class-transformer
- **Authentification** : JWT (Access + Refresh tokens)
- **Hash passwords** : bcrypt
- **Variables d'environnement** : @nestjs/config
- **Rate Limiting** : @nestjs/throttler

## 🏗️ Architecture

Le projet suit les principes **SOLID** et les bonnes pratiques du **Clean Code** :

- **Single Responsibility** : Chaque classe a une seule responsabilité
- **Repository Pattern** : Séparation de la logique d'accès aux données
- **Service Layer** : Logique métier dans les services
- **DTO Pattern** : Validation et transformation des données
- **Guards & Decorators** : Sécurité et autorisation

## 📁 Structure du Projet

```
src/
├── config/                    # Configuration modules
│   ├── database.config.ts
│   ├── cloudinary.config.ts
│   └── jwt.config.ts
│
├── common/                    # Shared resources
│   ├── decorators/           # Custom decorators (@Roles, @Public, @CurrentUser)
│   ├── guards/               # Auth, Role guards
│   ├── interceptors/         # Transform, Logging
│   ├── pipes/                # Validation pipes
│   ├── filters/              # Exception filters
│   ├── interfaces/           # Shared interfaces
│   ├── constants/            # Constants, enums
│   ├── utils/                # Helper functions
│   └── dto/                  # Shared DTOs
│
├── modules/
│   ├── auth/                 # Authentification
│   ├── users/                # Gestion des utilisateurs
│   ├── shops/                # Gestion des boutiques
│   ├── products/             # Gestion des produits
│   ├── orders/               # Gestion des commandes
│   ├── payments/             # Gestion des paiements
│   ├── reviews/              # Gestion des avis
│   ├── notifications/        # Gestion des notifications
│   ├── deliveries/           # Gestion des livraisons
│   ├── categories/           # Gestion des catégories
│   └── uploads/              # Gestion des uploads (Cloudinary)
│
└── database/
    ├── migrations/
    ├── seeds/
    └── factories/
```

## 🚀 Installation

### Prérequis

- Node.js 18+
- PostgreSQL 15+
- npm ou yarn

### Étapes d'installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd "DiayMa Back"
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```

Éditer le fichier `.env` avec vos configurations :
```env
# Application
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:3001

# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=sunumarket_db

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRATION=15m
JWT_REFRESH_SECRET=your-refresh-secret-key-change-in-production
JWT_REFRESH_EXPIRATION=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

4. **Créer la base de données PostgreSQL**
```bash
createdb sunumarket_db
```

5. **Lancer l'application**
```bash
# Mode développement
npm run start:dev

# Mode production
npm run start:prod
```

## 📚 Documentation API

Une fois l'application démarrée, la documentation Swagger est disponible à :

**http://localhost:3000/api/docs**

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests en mode watch
npm run test:watch

# Couverture de code
npm run test:cov

# Tests E2E
npm run test:e2e
```

## 🔒 Sécurité

- **JWT Authentication** : Access tokens (15min) + Refresh tokens (7 jours)
- **Password Hashing** : bcrypt avec 10 rounds
- **Rate Limiting** : Protection contre les attaques par force brute
- **Input Validation** : Validation automatique avec class-validator
- **CORS** : Configuré pour le frontend
- **Guards** : Protection des routes avec JwtAuthGuard et RolesGuard

## 📝 Rôles disponibles

- `admin` : Administrateur système
- `acheteur` : Client/acheteur
- `vendeur` : Vendeur/boutique
- `livreur` : Livreur

## 🛠️ Commandes disponibles

```bash
# Développement
npm run start:dev      # Mode watch
npm run start:debug    # Mode debug

# Production
npm run build          # Compiler le projet
npm run start:prod     # Lancer en production

# Qualité de code
npm run lint           # Linter le code
npm run format         # Formater le code avec Prettier
```

## 📌 Prochaines étapes

### Phase 1 - Setup & Auth ✅
- [x] Configuration projet + Database
- [x] Module Users (structure)
- [x] Module Auth (structure)
- [x] Guards & Decorators
- [x] Exception Filters
- [x] Swagger setup

### Phase 2 - Core Business
- [ ] Module Users (CRUD complet)
- [ ] Module Auth (Login, Register, JWT)
- [ ] Module Shops
- [ ] Module Products
- [ ] Module Categories
- [ ] Module Uploads (Cloudinary)

### Phase 3 - Orders & Payments
- [ ] Module Cart
- [ ] Module Orders
- [ ] Module Payments
- [ ] Module Deliveries

### Phase 4 - Features
- [ ] Module Reviews
- [ ] Module Notifications
- [ ] Module Statistics
- [ ] Tests E2E

## 🤝 Contribution

Le projet suit strictement les principes SOLID et Clean Code. Avant de contribuer :

1. Respecter les conventions de nommage
2. Fonctions maximum 20 lignes
3. Fichiers maximum 200 lignes
4. Tests unitaires obligatoires
5. Documentation Swagger complète
6. Pas de code dupliqué (DRY)

## 📄 License

MIT
