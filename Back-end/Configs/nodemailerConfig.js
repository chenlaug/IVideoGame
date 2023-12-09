/**
 * Module pour la configuration du transporteur de messagerie avec Nodemailer.
 * 
 * Ce module utilise Nodemailer pour créer une instance de transporteur de messagerie. Le transporteur
 * est configuré pour utiliser le service Gmail avec les informations d'authentification définies dans
 * les variables d'environnement `EMAIL_USER` et `EMAIL_PASSWORD`.
 * 
 * Le module exporte l'instance de transporteur configurée pour être utilisée ailleurs dans l'application
 * pour l'envoi d'emails.
 * 
 * @module mailTransporter
 * 
 * @requires nodemailer - Package Nodemailer pour l'envoi d'emails.
 * 
 * @example
 * // Importer le transporteur et l'utiliser pour envoyer un email.
 * const transporter = require('./path/to/this/file');
 * 
 * transporter.sendMail({
 *     from: 'sender@example.com',
 *     to: 'recipient@example.com',
 *     subject: 'Hello!',
 *     text: 'Hello world!',
 * }, (err, info) => {
 *     if (err) {
 *         console.error(err);
 *     } else {
 *         console.log('Email sent: ' + info.response);
 *     }
 * });
 * 
 * @environment {string} EMAIL_USER - Adresse email utilisée pour l'authentification au service Gmail.
 * @environment {string} EMAIL_PASSWORD - Mot de passe associé à l'adresse email pour l'authentification.
 */

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

module.exports = transporter;
