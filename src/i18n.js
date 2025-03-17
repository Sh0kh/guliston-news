import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importing JSON files
import oz from './locales/oz.json';
import ru from './locales/ru.json';
import uz from './locales/uz.json';

// Устанавливаем язык по умолчанию, если он не сохранён
const defaultLang = 'uz';
const savedLang = localStorage.getItem('i18nextLng');

if (!savedLang) {
    localStorage.setItem('i18nextLng', defaultLang);
}

const resources = {
    en: { translation: oz },
    ru: { translation: ru },
    uz: { translation: uz },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: savedLang || defaultLang, // Устанавливаем язык при старте
        fallbackLng: defaultLang,
        interpolation: { escapeValue: false },
        detection: {
            order: ['localStorage', 'cookie', 'navigator', 'htmlTag'],
            caches: ['localStorage'],
        },
    });

export default i18n;
