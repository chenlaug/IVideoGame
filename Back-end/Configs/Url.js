/**
 * Module de configuration pour définir l'URL de base de l'application.
 * 
 * Ce module exporte un objet contenant la propriété `baseURL`. Cette propriété est utilisée pour
 * définir l'URL de base de l'application. Elle est principalement utilisée pour configurer des
 * services ou des clients HTTP qui nécessitent de connaître l'URL de base de l'API ou du serveur
 * auquel ils doivent se connecter.
 * 
 * @module baseURLConfig
 * 
 * @example
 * // Importer la configuration de l'URL de base et l'utiliser pour configurer un client HTTP.
 * const axios = require('axios');
 * const config = require('./path/to/this/file');
 * 
 * const client = axios.create({
 *     baseURL: config.baseURL
 * });
 * 
 * // Utiliser `client` pour faire des requêtes HTTP.
 * 
 * @property {string} baseURL - L'URL de base de l'application. Par défaut, elle est définie sur
 * 'http://localhost:5173'. Cette valeur peut être modifiée pour correspondre à l'environnement
 * de production ou de développement de l'application.
 */

module.exports = {
    baseURL: 'http://localhost:5173',
};
