/**
 * Initialisation et configuration de i18next pour l'internationalisation.
 * 
 * Ce module configure i18next avec le plugin `initReactI18next` pour l'utilisation avec React.
 * Il définit les ressources de traduction pour chaque langue supportée et spécifie la langue par défaut et la langue de secours.
 * 
 * @module i18n
 * 
 * @requires initReactI18next - Plugin pour utiliser i18next avec React.
 * @requires translationFr - Fichier de traduction pour la langue française.
 * @requires translationEn - Fichier de traduction pour la langue anglaise.
 * 
 * @example
 * // Utiliser la traduction dans un composant React
 * import { useTranslation } from 'react-i18next';
 * 
 * function MyComponent() {
 *   const { t } = useTranslation();
 *   return <p>{t('key')}</p>;
 * }
 * 
 * // Changer la langue
 * i18n.changeLanguage('en');
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationFr from "./Locales/fr.json"
import translationEn from "./Locales/en.json"

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: translationEn
            },
            fr: {
                translation: translationFr
            },
            // Ajoutez d'autres langues et traductions selon vos besoins
        },
        lng: 'fr', // Langue par défaut
        fallbackLng: 'en', // Langue de secours en cas de traduction manquante
        // debug: true, // Activez le mode débogage ici
        interpolation: {
            escapeValue: false, // Ne pas échapper les valeurs
        },
    });

export default i18n;
