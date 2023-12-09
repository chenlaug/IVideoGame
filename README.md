# IVideoGame

IVideoGame est une application web conçue pour servir de bibliothèque de jeux. Elle offre une plateforme où les utilisateurs peuvent explorer et gérer une vaste collection de jeux, en savoir plus sur les développeurs et les éditeurs, et interagir avec la communauté via des commentaires.

## Description

IVideoGame permet aux utilisateurs de consulter et de gérer une variété de jeux, ainsi que de découvrir des informations sur les développeurs et les éditeurs de ces jeux. Elle offre deux niveaux d'accès : Administrateur et Utilisateur, chacun avec ses propres fonctionnalités et permissions.

## Fonctionnalités

### Admin

- Gérer les jeux (ajouter, modifier, supprimer).
- Gérer les utilisateurs (ajouter, modifier, supprimer).
- Gérer les commentaires (modérer, supprimer).
- Gérer les éditeurs de jeux.
- Gérer les développeurs de jeux.

### User

- Consulter les jeux.
- Consulter les informations sur les développeurs.
- Consulter les informations sur les éditeurs.
- Gérer ses commentaires.
- Gérer sa liste de jeux favoris.

## Commencer

Suivez ces instructions pour obtenir une copie du projet en cours d'exécution sur votre machine locale à des fins de développement et de test.

### Prérequis

Avant de commencer, assurez-vous d'avoir Node.js et npm installés sur votre PC. Vous pouvez les télécharger et les installer à partir de [Node.js website](https://nodejs.org/).

### Installation

Étapes pour installer et configurer le projet :

1. git clone git@github.com:chenlaug/IVideoGame.git

2. cd IVideoGame

3. cd front-end

4. npm install

5. cd ../back-end

6. npm install

Modifier le fichier `.env` dans le dossier back-end avec vos informations personnelles. Voici une explication de chaque variable d'environnement :

- `MONGO_URI`: Votre URI de connexion à MongoDB Atlas. Cela permettra à votre application de se connecter à votre base de données MongoDB. Vous pouvez obtenir cet URI en créant un cluster sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

- `EMAIL_USER`: Votre adresse email. Elle sera utilisée par l'application pour envoyer des emails, par exemple pour la réinitialisation des mots de passe ou l'envoi de confirmations.

- `EMAIL_PASSWORD`: Le mot de passe de votre adresse email. Ce mot de passe permet à l'application d'accéder à votre compte de messagerie pour envoyer des emails.

- `PRIVATE_KEY`: Votre clé privée pour la création de JWT (JSON Web Tokens). Cette clé est utilisée pour signer et vérifier les JWT utilisés pour l'authentification dans l'application.

MONGO_URI=votre_mongo_uri
EMAIL_USER=votre_email
EMAIL_PASSWORD=votre_mot_de_passe_email
PRIVATE_KEY=votre_private_key

## Utilisation

Pour lancer l'application en mode développement, exécutez les commandes suivantes dans les dossiers front-end et back-end :

Dans le dossier front-end :

1. npm run dev

Dans le dossier back-end :

1. npm run dev

## Utilisation avec docker :

1. Aller dans le dossier IVIDEOGAME
   `cd ./IVIDEOGAME`

2. Exécute le docker-compose :

- `docker-compose up --build`

- pour exécuter en arrière-plan `docker-compose up -d --build`

* Pour arrêter et retirer les conteneurs `docker-compose down`

## Construit avec

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Vite + React](https://vitejs.dev/guide/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com)
- [JSDoc](https://jsdoc.app)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Auth Kit](https://github.com/react-auth-kit/react-auth-kit)

## Auteur(s)

- Laughan Chenevot - [Profil GitHub](https://github.com/chenlaug)
