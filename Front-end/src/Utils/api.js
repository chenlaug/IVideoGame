/**
 * Configuration de base pour les requêtes API utilisant axios.
 *
 * Ce module configure une instance axios avec une URL de base prédéfinie. 
 * L'URL de base est définie pour pointer vers l'API locale, ce qui est typique 
 * lors du développement en local. L'utilisation de `axios.create` permet de définir 
 * des configurations par défaut pour les requêtes HTTP, assurant la cohérence 
 * dans toutes les requêtes API de l'application.
 *
 * @module api
 * @returns {axios.AxiosInstance} Une instance axios configurée avec une URL de base.
 */

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default api;
