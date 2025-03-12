import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminHeader() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng).then(() => {
            axios.defaults.headers.common['Accept-Language'] = lng; // Обновляем язык в axios
            window.location.reload(); // Перезагружаем страницу
        });
    };

    const Exit = () => {
        navigate('/login');
        localStorage.clear();
    };

    return (
        <div className="w-[78%] p-[10px] fixed rounded-[10px] bg-[white] shadow-lg">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-[10px]">
                    <button
                        onClick={() => changeLanguage('uz')}
                        className={`py-[10px] px-[15px] duration-500 border-[2px] border-MainColor shadow-xl rounded-[10px]  
                        ${i18n?.language === 'uz' ? "bg-transparent text-MainColor" : 'bg-MainColor text-[white]'}`}>
                        Uzb
                    </button>
                    <button
                        onClick={() => changeLanguage('ru')}
                        className={`py-[10px] px-[15px] border-[2px] duration-500 border-MainColor shadow-xl rounded-[10px]  
                        ${i18n?.language === 'ru' ? "bg-transparent text-MainColor" : 'bg-MainColor text-[white]'}`}>
                        Рус
                    </button>
                    <button
                        onClick={() => changeLanguage('oz')}
                        className={`py-[10px] px-[15px] border-[2px] duration-500 border-MainColor shadow-xl rounded-[10px]  
                        ${i18n?.language === 'oz' ? "bg-transparent text-MainColor" : 'bg-MainColor text-[white]'}`}>
                        Узб
                    </button>
                </div>
                <div>
                    <button
                        onClick={Exit}
                        className="bg-MainColor flex items-center gap-[5px] text-[white] px-[20px] py-[8px] rounded-[10px] shadow-xl border-[2px] border-MainColor duration-500 hover:text-MainColor hover:bg-transparent">
                        Chiqish
                        <svg className="text-[20px]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M5.002 21h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2h-14c-1.103 0-2 .897-2 2v6.001H10V7l6 5l-6 5v-3.999H3.002V19c0 1.103.897 2 2 2"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
