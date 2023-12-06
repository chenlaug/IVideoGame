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
        debug: true, // Activez le mode débogage ici
        interpolation: {
            escapeValue: false, // Ne pas échapper les valeurs
        },
    });

export default i18n;
