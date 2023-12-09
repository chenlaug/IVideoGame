# Définissez l'image de base pour la phase de construction
FROM node:latest 

# Définissez le répertoire de travail pour la phase de construction
WORKDIR /usr/src/app

# Copiez les fichiers package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers de l'application
COPY . .

# Exposez le port sur lequel l'application s'exécutera
EXPOSE 5173

# Définissez la commande pour démarrer l'application
CMD [ "npm", "run", "dev" ]
