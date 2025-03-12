import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importing JSON files
import oz from './locales/oz.json';
import ru from './locales/ru.json';
import uz from './locales/uz.json';

const resources = {
    en: { translation: oz },
    ru: { translation: ru },
    uz: { translation: uz },
};

i18n
    .use(LanguageDetector) // Detects the user's language
    .use(initReactI18next) // React integration
    .init({
        resources, // Local translations
        fallbackLng: 'en', // Default language
        interpolation: {
            escapeValue: false, // No escaping required for React
        },
        detection: {
            order: ['localStorage', 'cookie', 'navigator', 'htmlTag'], // Order of language detection
            caches: ['localStorage'], // Store language in localStorage
        },
    });

export default i18n;
