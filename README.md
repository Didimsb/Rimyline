# RimyLine ✨

Une boutique de mode élégante et sophistiquée créée avec React.js, offrant une expérience shopping exceptionnelle avec des collections soigneusement sélectionnées.

## 🌟 À Propos de RimyLine

RimyLine est une boutique de mode moderne qui célèbre l'élégance féminine à travers des pièces uniques où l'artisanat traditionnel rencontre le design contemporain. Notre boutique offre une expérience shopping exceptionnelle avec des tissus premium et des finitions artisanales de qualité supérieure.

### Nos Collections
- **Robes Élégantes** - Pièces sophistiquées pour toutes occasions
- **Abayas Modernes** - Tradition réinterprétée avec style contemporain  
- **Caftans Artisanaux** - Broderies traditionnelles et finitions dorées
- **Ensembles Chic** - Combinaisons parfaites pour la femme moderne
- **Textiles Premium** - Matériaux de qualité supérieure
- **Accessoires** - Foulards, bijoux et compléments élégants

## 🔐 Authentification

Le site dispose d'un système d'authentification sécurisé pour l'accès à l'administration :

### Identifiants de Connexion
- **Nom d'utilisateur** : `Vetia`
- **Mot de passe** : `Vetia_27350505`

### Fonctionnalités de Sécurité
- ✅ Chiffrement des mots de passe (Base64)
- ✅ Session avec expiration automatique (24h)
- ✅ Protection des routes d'administration
- ✅ Déconnexion sécurisée
- ✅ Redirection automatique vers login si non authentifié

### Accès à l'Administration
1. Cliquez sur "Administration" depuis n'importe quelle page
2. Saisissez les identifiants ci-dessus
3. Accédez au panneau d'administration
4. Utilisez le bouton "Déconnexion" pour quitter la session

## 🚀 Fonctionnalités

### Interface Publique
- ✅ Affichage de la liste des produits avec images, noms et prix
- ✅ Recherche et filtrage par catégorie
- ✅ Page de détails pour chaque produit
- ✅ Design responsive avec Tailwind CSS

### Interface d'Administration (Protégée)
- ✅ Authentification sécurisée requise
- ✅ Ajout de nouveaux produits
- ✅ Modification des produits existants
- ✅ Suppression des produits
- ✅ Interface d'administration intuitive
- ✅ Gestion de session avec déconnexion

## 🛠️ Technologies Utilisées

- **Frontend**: React.js, React Router, Axios, Tailwind CSS
- **Backend**: JSON Server (API REST simulée)
- **Base de données**: JSON (fichier db.json)

## 📦 Installation et Démarrage

### 1. Cloner le projet
```bash
git clone <votre-repo>
cd mon-site-annonces
```

### 2. Installer les dépendances du backend
```bash
cd backend
npm install
```

### 3. Installer les dépendances du frontend
```bash
cd ../frontend
npm install
```

### 4. Démarrer le backend (JSON Server)
```bash
cd ../backend
npm start
```
Le serveur API sera disponible sur http://localhost:5000

### 5. Démarrer le frontend React
```bash
cd ../frontend
npm start
```
L'application sera disponible sur http://localhost:3000

## 📁 Structure du Projet

```
mon-site-annonces/
├── frontend/                 # Application React
│   ├── src/
│   │   ├── components/       # Composants réutilisables
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   └── ProductForm.jsx
│   │   ├── pages/           # Pages de l'application
│   │   │   ├── Home.jsx
│   │   │   ├── Admin.jsx
│   │   │   └── ProductDetails.jsx
│   │   ├── App.js           # Configuration des routes
│   │   └── index.js         # Point d'entrée
│   ├── package.json
│   └── tailwind.config.js
└── backend/                 # API JSON Server
    ├── db.json             # Base de données JSON
    └── package.json
```

## 🎯 Utilisation

### Interface Publique
1. Accédez à http://localhost:3000
2. Parcourez les produits sur la page d'accueil
3. Utilisez la barre de recherche pour filtrer
4. Cliquez sur "Voir les détails" pour plus d'informations

### Interface d'Administration
1. Cliquez sur "Administration" dans le header
2. Ajoutez de nouveaux produits avec le formulaire
3. Modifiez les produits existants
4. Supprimez les produits indésirables

## 🔧 API Endpoints

Le backend JSON Server expose les endpoints suivants :

- `GET /products` - Récupérer tous les produits
- `GET /products/:id` - Récupérer un produit par ID
- `POST /products` - Créer un nouveau produit
- `PUT /products/:id` - Mettre à jour un produit
- `DELETE /products/:id` - Supprimer un produit

## 📝 Structure des Données

```json
{
  "id": 1,
  "name": "Nom du produit",
  "price": 99.99,
  "image": "URL de l'image",
  "description": "Description du produit",
  "category": "Catégorie"
}
```

## 🎨 Personnalisation

### Ajouter de nouvelles catégories
Modifiez le composant `ProductForm.jsx` pour ajouter de nouvelles options dans le select des catégories.

### Modifier le design
Le projet utilise Tailwind CSS. Vous pouvez personnaliser les styles dans les fichiers des composants ou modifier `tailwind.config.js`.

## 🚀 Déploiement

### Frontend (Netlify, Vercel)
```bash
cd frontend
npm run build
# Déployez le dossier build/
```

### Backend (Heroku, Railway)
Remplacez JSON Server par une vraie API (Express.js + MongoDB) pour la production.

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

---

**Bon développement ! 🎉**
