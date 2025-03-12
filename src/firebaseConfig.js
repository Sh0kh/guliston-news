// Импортируем необходимые функции из Firebase SDK
import { initializeApp } from "firebase/app";
// Убираем analytics, если он не нужен, так как он работает только в браузере
// import { getAnalytics } from "firebase/analytics";

// Конфигурация Firebase (убедись, что API-ключ в `.env` файле для безопасности)
const firebaseConfig = {
    apiKey: "AIzaSyClohYk2mMhGsV2FuDQxZZrgQZFStH2jzk",
    authDomain: "gulistonshahar-uz.firebaseapp.com",
    projectId: "gulistonshahar-uz",
    storageBucket: "gulistonshahar-uz.appspot.com", // Исправил на верный формат
    messagingSenderId: "858243814335",
    appId: "1:858243814335:web:3e7457d6b51c1e227cc70a",
    measurementId: "G-R07EQJH278"
};

// Инициализируем Firebase
const app = initializeApp(firebaseConfig);

// Если тебе не нужен Analytics, удали этот импорт
// const analytics = getAnalytics(app);

export default app;
