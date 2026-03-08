# MyStudyPlanner - Projet React L3 Informatique

## 📚 Description

MyStudyPlanner est une application web permettant aux étudiants de gérer leurs devoirs, travaux pratiques (TP) et projets. Ce projet pédagogique illustre les concepts fondamentaux de React et du développement web moderne.

## 🎯 Fonctionnalités

- **Authentification simulée** : Connexion et déconnexion utilisateur
- **Gestion des tâches** : Création, modification, suppression de devoirs/TP/projets
- **Suivi d'avancement** : Marquage des tâches (À faire, En cours, Terminé)
- **Organisation par matière** : Classement des tâches par discipline
- **Tableau de bord** : Vue globale avec statistiques et progression
- **Filtres avancés** : Par matière, statut, priorité, type
- **Interface responsive** : Adaptée mobile, tablette et desktop

## 🛠️ Technologies utilisées

### Frontend

- **React 18** avec Hooks (useState, useEffect, useContext)
- **React Router DOM** pour la navigation
- **JavaScript ES6+**
- **CSS3** avec variables et design responsive

### Backend

- **Node.js**
- **Express.js**
- **Stockage JSON** (fichier db.json)

## 📁 Structure du projet

Examen-React/
├── backend/
│   ├── data/
│   │   └── db.json          # Base de données JSON
│   ├── server.js            # Serveur Express
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/      # Composants réutilisables
│   │   │   ├── Filtres.js
│   │   │   ├── Navbar.js
│   │   │   ├── ProtectedRoute.js
│   │   │   ├── StatCard.js
│   │   │   └── TacheCard.js
│   │   ├── context/         # Contextes React
│   │   │   ├── AuthContext.js
│   │   │   └── TachesContext.js
│   │   ├── pages/           # Pages de l'application
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   ├── NouvelleTask.js
│   │   │   ├── Register.js
│   │   │   └── Taches.js
│   │   ├── services/        # Services API
│   │   │   └── api.js
│   │   ├── styles/          # Fichiers CSS
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md

## 🚀 Installation et lancement

### Prérequis

- Node.js (v16 ou supérieur)
- npm ou yarn

### 1. Installation du backend

```bash
cd backend
npm install
```

### 2. Installation du frontend

```bash
cd frontend
npm install
```

### 3. Lancement

**Terminal 1 - Backend (Port 5000):**

```bash
cd backend
npm start
```

**Terminal 2 - Frontend (Port 3000):**

```bash
cd frontend
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 🔑 Comptes de test

| Utilisateur | Mot de passe |
| ----------- | ------------ |
| etudiant    | password123  |
| admin       | admin123     |

## 📡 API REST

### Authentification

- `POST /api/auth/login` - Connexion
- `POST /api/auth/register` - Inscription

### Matières

- `GET /api/matieres` - Liste des matières
- `POST /api/matieres` - Ajouter une matière

### Tâches

- `GET /api/taches` - Liste des tâches (avec filtres)
- `GET /api/taches/:id` - Détail d'une tâche
- `POST /api/taches` - Créer une tâche
- `PUT /api/taches/:id` - Modifier une tâche
- `PATCH /api/taches/:id/statut` - Changer le statut
- `DELETE /api/taches/:id` - Supprimer une tâche

### Statistiques

- `GET /api/stats/:userId` - Statistiques utilisateur

## 🎨 Concepts React mis en œuvre

### Hooks

- **useState** : Gestion de l'état local (formulaires, modales)
- **useEffect** : Effets de bord (chargement données, localStorage)
- **useContext** : État global (authentification, tâches)
- **useCallback** : Optimisation des fonctions
- **useNavigate/useParams** : Navigation programmatique

### Patterns

- **Provider Pattern** : AuthContext, TachesContext
- **Composition** : Composants imbriqués
- **Conditional Rendering** : Affichage conditionnel
- **Controlled Components** : Formulaires contrôlés

### Architecture

- **Séparation UI/Logique** : Composants vs Services
- **Routes protégées** : Composant ProtectedRoute
- **Architecture modulaire** : Découpage en composants

## 📱 Responsive Design

L'application s'adapte à toutes les tailles d'écran :

- **Desktop** : ≥ 1024px
- **Tablette** : 768px - 1023px
- **Mobile** : < 768px

## 🔧 Améliorations possibles

- [ ] Ajout de tests unitaires (Jest, React Testing Library)
- [ ] Authentification JWT avec tokens
- [ ] Base de données MongoDB/PostgreSQL
- [ ] Notifications push pour les échéances
- [ ] Mode sombre
- [ ] Export des données (PDF, CSV)
- [ ] Partage de tâches entre étudiants

## 👨‍💻 Auteur

**Gourbal Mahamat Issakh** - 2025-2026

## 📄 Licence

Projet académique - Tous droits réservés
