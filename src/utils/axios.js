import axios from 'axios';
import i18n from '../i18n'; // путь к твоему i18n файлу

axios.defaults.baseURL = 'https://sos.com.uz';

axios.defaults.headers.common['Accept-Language'] = i18n.language;

i18n.on('languageChanged', (lng) => {
    axios.defaults.headers.common['Accept-Language'] = lng;
});

export default axios;
