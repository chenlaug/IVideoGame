# Définissez l'image de base Node.js
FROM node:latest

# Définissez le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez le fichier package.json et package-lock.json (si disponible)
COPY package*.json ./

# Installez les dépendances de l'application
RUN npm install

# Copiez les fichiers et dossiers du projet dans le répertoire de travail
COPY . .

# Exposez le port sur lequel l'application s'exécutera
EXPOSE 5000

# Définissez la commande pour démarrer l'application
CMD [ "npm", "run", "start" ]

