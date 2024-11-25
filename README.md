# Ecommerce App

Un projet complet d'analyse de paniers d'achat pour un site e-commerce, comprenant un frontend et un backend. Le frontend est développé en **Vue.js**, et le backend en **Node.js** avec **TypeScript**.

## Structure du projet

Le projet est divisé en deux parties principales :

- **`ecommerce-frontend`** : Le frontend de l'application, construit avec Vue 3.
- **`ecommerce-backend`** : L'API backend pour gérer les opérations liées aux produits et aux ventes, construite avec Node.js et TypeScript.

## Prérequis

### Frontend (`ecommerce-frontend`)

- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure)

### Backend (`ecommerce-backend`)

- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure)
- TypeScript
- Base de données : PostgreSQL (ou toute autre base de données de votre choix)

## Installation

### 1. Clonez le dépôt

```bash
git clone https://github.com/votre-utilisateur/ecommerce-app.git
cd ecommerce-app
```  

### 2. Installer les dépendances du frontend

```bash
cd ecommerce-frontend
npm install
```
### 3. Installer les dépendances du backend

```bash
cd ../ecommerce-backend
npm install
```
## Configuration

### Backend

Avant de démarrer le backend, vous devez configurer les variables d'environnement pour la connexion à la base de données et d'autres services :

  1. Copiez le fichier **`.env.example`** en **`.env`**.
  2. Modifiez les valeurs dans **`.env`** pour correspondre à vos paramètres locaux.
   
Exemple de contenu pour **`.env`** :
```bash
DATABASE_URL=postgres://username:password@localhost:5432/dbname
PORT=3000
```
### Frontend

Le frontend nécessite également des configurations pour se connecter à l'API backend.

  1. Modifiez le fichier **`.env`** dans le répertoire **`ecommerce-frontend'** pour définir l'URL de l'API backend.

Exemple de contenu pour **`.env`** :
```bash
VUE_APP_API_URL=http://localhost:3000
```

## Démarrer le projet en local

### 1. Démarrer le backend
```bash
cd ecommerce-backend
npm run dev
```
Cela démarrera le serveur backend sur le port **'3000'**.

### 2. Démarrer le frontend
```bash
cd ecommerce-frontend
npm run serve
```
Cela démarrera le serveur de développement frontend sur le port **'8080'**.


## 3. Accéder à l'application

Une fois les deux serveurs démarrés, accédez à l'application dans votre navigateur à l'adresse suivante :

- **Frontend** : [http://localhost:8080](http://localhost:8080)
- **Backend** : [http://localhost:3000](http://localhost:3000) (API)

## Déploiement

### Backend

- **Render** : Vous pouvez héberger le backend sur Render en suivant les instructions sur leur site.
- **Heroku** : Vous pouvez également déployer le backend sur Heroku avec les commandes suivantes :

```bash
cd ecommerce-backend
git push heroku main
```

### Frontend

- **Netlify** : Déployez le frontend sur Netlify en vous connectant à votre dépôt GitHub.
- **Vercel** : Déployez le frontend sur Vercel avec la commande suivante :
  
```bash
cd ecommerce-frontend
vercel
```

## Technologies utilisées

- **Frontend** : Vue.js 3, Vuex, Vue Router, Axios
- **Backend** : Node.js, Express, TypeScript, PostgreSQL
- **Outils de développement** : npm, Webpack, Babel

## Fonctionnalités

- Gestion des produits (ajout, modification, suppression)
- Gestion des ventes (suivi des produits vendus, analyse des paniers d'achat)
- API RESTful pour interagir avec le frontend
- Dashboard d'analyse des paniers d'achat et des performances des produits

## Aide

Si vous avez des questions ou des problèmes, n'hésitez pas à ouvrir une issue sur GitHub.



