import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../img/logo.png'
import HeaderModal from './HeaderModal';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';
import { NavLink } from 'react-router-dom';

import axios from 'axios';

import HeaderVison from './HeaderVison';


gsap.registerPlugin(ScrollTrigger);

export default function Header({ isActiveModal }) {
    const { t, i18n } = useTranslation();
    const [currentTime, setCurrentTime] = useState('');
    const [openMenu, setOpenMenu] = useState(null);
    const [data, setData] = useState([])
    const menuRef = useRef(null);
    const [visionModal, setVisionModal] = useState(false);
    const modalRef1 = useRef(null);

    useGSAP(() => {
        gsap.fromTo('.Header',
            {
                opacity: 0,
                y: -100,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.3,
                ease: "power1.inOut"
            }
        )
    });

    const updateTime = () => {
        const now = new Date();

        const days = {
            uz: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshanba'],
            ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
            oz: ['Душанба', 'Сешанба', 'Чоршанба', 'Пайшанба', 'Жума', 'Шанба', 'Якшанба'],
        };

        const months = {
            uz: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'],
            ru: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            oz: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        };

        const dayName = days[i18n.language][now.getDay() - 1];
        const monthName = months[i18n.language][now.getMonth()];

        const formattedTime = `${dayName}, ${now.getDate()} ${monthName} ${now.getFullYear()}, ${now.toLocaleTimeString('ru-RU')}`;

        setCurrentTime(formattedTime);
    };


    const toggleMenu = (index) => {
        setOpenMenu(openMenu === index ? null : index);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const fetchData = async () => {
        try {
            const response = await axios.get(`/menu/getAll`)
            setData(response?.data?.object)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [i18n.language]);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng).then(() => {
            axios.defaults.headers.common['Accept-Language'] = lng; // Обновляем язык в axios
            window.location.reload(); // Перезагружаем страницу
        });
    };
    useEffect(() => {
        const handleClickOutside2 = (e) => {
            if (modalRef1.current && !modalRef1.current.contains(e.target)) {
                setVisionModal(false);
            }
        };
        document.addEventListener('click', handleClickOutside2);
        return () => {
            document.removeEventListener('click', handleClickOutside2);
        };
    }, []);
    return (
        <header className='Header text-[white] relative z-50'>
            <div className="Container">
                <div className='header__t p-[20px] flex items-center justify-between'>
                    <h2 className='header__t__date text-[13px] ml-[25%]'>
                        {currentTime}
                    </h2>
                    <div onClick={(e) => { e.stopPropagation(); setVisionModal(prev => !prev); }} className='flex items-center gap-[10px] cursor-pointer'>
                        <svg className='text-[25px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"></path></svg>
                        <h2 className='hover:underline text-[13px]'>
                            {t('eye-none')}
                        </h2>
                    </div>  
                    <div className="header__t__lan flex items-center gap-[15px]">
                        <button
                            className={`text-[12px] hover:underline ${i18n.language === 'oz' ? 'font-bold  underline' : ''}`}
                            onClick={() => changeLanguage('oz')}
                        >
                            Узбекча
                        </button>
                        <button
                            className={`text-[12px] hover:underline ${i18n.language === 'ru' ? 'font-bold  underline' : ''}`}
                            onClick={() => changeLanguage('ru')}
                        >
                            Русский
                        </button>
                        <button
                            className={`text-[12px] hover:underline ${i18n.language === 'uz' ? 'font-bold underline' : ''}`}
                            onClick={() => changeLanguage('uz')}
                        >
                            O‘zbekcha
                        </button>
                    </div>

                </div>
                <div className='header__m flex items-center justify-between pb-[30px]'>
                    <div className="header__m__lan hidden">
                        <button
                            className={`text-[12px] hover:underline ${i18n.language === 'oz' ? 'font-bold  underline' : ''}`}
                            onClick={() => changeLanguage('oz')}
                        >
                            Узбекча
                        </button>
                        <button
                            className={`text-[12px] hover:underline ${i18n.language === 'ru' ? 'font-bold  underline' : ''}`}
                            onClick={() => changeLanguage('ru')}
                        >
                            Русский
                        </button>
                        <button
                            className={`text-[12px] hover:underline ${i18n.language === 'uz' ? 'font-bold underline' : ''}`}
                            onClick={() => changeLanguage('uz')}
                        >
                            O‘zbekcha
                        </button>
                    </div>
                    <NavLink to={'/'}>
                        <div className='logo flex items-center gap-[10px] '>
                            <img src={logo} alt="Logo" />
                            <h1 class="w-[200px] font-bold text-[18px] tracking-[0.27px] uppercase text-[rgba(247,247,247,1)] ml-[15px]">
                                {t('Logo')}
                            </h1>
                        </div>
                    </NavLink>
                    <div className='flex items-center gap-[20px]'>
                        <a className='text-[32px]' href="https://www.facebook.com/Sirdaryohokimligi" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396z"></path></svg>
                        </a>
                        <a className='text-[32px]' href="https://www.instagram.com/sirdaryohokimligi/" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"></path></svg>
                        </a>
                        <a className='text-[32px]' href="https://www.youtube.com/channel/UCrjORuJqc-pPPjl3zvRxZMw" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 4.15c-1.191 0-2.58.028-3.934.066l-.055.002c-1.378.039-2.49.07-3.366.215c-.913.151-1.671.44-2.277 1.063c-.608.625-.873 1.398-.998 2.323c-.12.89-.12 2.018-.12 3.42v1.524c0 1.4 0 2.528.12 3.419c.124.925.39 1.698.998 2.323c.606.624 1.364.912 2.277 1.063c.876.145 1.988.176 3.366.215l.055.002c1.355.038 2.743.066 3.934.066s2.58-.028 3.934-.066l.055-.002c1.378-.039 2.49-.07 3.366-.215c.913-.151 1.671-.44 2.277-1.063c.608-.625.874-1.398.998-2.323c.12-.89.12-2.018.12-3.42v-1.524c0-1.401 0-2.529-.12-3.419c-.124-.925-.39-1.698-.998-2.323c-.606-.624-1.364-.912-2.277-1.063c-.876-.145-1.988-.176-3.367-.215l-.054-.002A145 145 0 0 0 12 4.15m-1.128 10.501A.75.75 0 0 1 9.75 14v-4a.75.75 0 0 1 1.122-.651l3.5 2a.75.75 0 0 1 0 1.302z" clipRule="evenodd"></path></svg>
                        </a>
                        <a className='text-[32px]' href="https://t.me/SirdaryoUz" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M18.483 19.79v-.002l.018-.043L21.5 4.625v-.048c0-.377-.14-.706-.442-.903c-.265-.173-.57-.185-.784-.169a2.7 2.7 0 0 0-.586.12a3 3 0 0 0-.24.088l-.013.005l-16.72 6.559l-.005.002a1 1 0 0 0-.149.061a2.3 2.3 0 0 0-.341.19c-.215.148-.624.496-.555 1.048c.057.458.372.748.585.899a2 2 0 0 0 .403.22l.032.014l.01.003l.007.003l2.926.985q-.016.276.057.555l1.465 5.559a1.5 1.5 0 0 0 2.834.196l2.288-2.446l3.929 3.012l.056.024c.357.156.69.205.995.164c.305-.042.547-.17.729-.315a1.74 1.74 0 0 0 .49-.635l.008-.017l.003-.006zM7.135 13.875a.3.3 0 0 1 .13-.33l9.921-6.3s.584-.355.563 0c0 0 .104.062-.209.353c-.296.277-7.071 6.818-7.757 7.48a.3.3 0 0 0-.077.136L8.6 19.434z" clipRule="evenodd"></path></svg>
                        </a>
                    </div>
                </div>
                <div ref={menuRef} className='header__b w-[100%] flex items-center justify- pb-[20px] pt-[20px] border-t border-[rgba(247,247,247,0.4)'>
                    <div onClick={isActiveModal} className='header__b__burger hidden px-[10px] py-[5px] opacity-[0.8] bg-[white] text-[30px] text-[#000000a4] rounded-[5px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.3} d="M3 6h18M3 12h18M3 18h18"></path></svg>
                    </div>

                    {data?.map((item, index) => (
                        <div key={index} className="relative">
                            <NavLink to={item?.url}>
                                <button
                                    className="px-4 py-2 text-white hover:text-black duration-500 font-semibold hover:bg-gray-200 rounded transition-all"
                                    onClick={() => toggleMenu(index)}
                                >
                                    {item?.menu?.name}
                                </button>
                            </NavLink>
                            {openMenu === index && (
                                <div className="absolute left-0 top-[60px]  p-[5px] mt-2 w-[200px] bg-white shadow-lg rounded-lg border border-gray-200 z-[1000]">
                                    {item?.subMenus.map((subItem, subIndex) => (
                                        <NavLink
                                            key={subIndex}
                                            to={`/sahifa/${subItem?.id}`}
                                            className="block px-4 text-[black] rounded-[5px] py-2 hover:bg-MainColor hover:text-[white] transition-all"
                                        >
                                            {subItem?.name}
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <NavLink to={'/rahbariyat'}>
                        <button
                            className="px-4 py-2 text-white hover:text-black duration-500 font-semibold hover:bg-gray-200 rounded transition-all"
                        >
                            Rahbariyat
                        </button>
                    </NavLink>
                    <NavLink to={'/apparat-xodimlari'}>
                        <button
                            className="px-4 py-2 text-white hover:text-black duration-500 font-semibold hover:bg-gray-200 rounded transition-all"
                        >
                            Apparat xodimlari
                        </button>
                    </NavLink>
                    <NavLink to={'/yangiliklar'}>
                        <button
                            className="px-4 py-2 text-white hover:text-black duration-500 font-semibold hover:bg-gray-200 rounded transition-all"
                        >
                            Yangiliklar
                        </button>
                    </NavLink>
                    <NavLink to={'/koruption'}>
                        <button
                            className="px-4 py-2 text-white hover:text-black duration-500 font-semibold hover:bg-gray-200 rounded transition-all"
                        >
                            Korrupsiyaga qarshi kurashish
                        </button>
                    </NavLink>
                    <NavLink to={'/ochiq-malumot'}>
                        <button
                            className="px-4 py-2 text-white hover:text-black duration-500 font-semibold hover:bg-gray-200 rounded transition-all"
                        >
                            Ochiq ma'lumot
                        </button>
                    </NavLink>
                    <NavLink to={'/boglanish'}>
                        <button
                            className="px-4 py-2 text-white hover:text-black duration-500 font-semibold hover:bg-gray-200 rounded transition-all"
                        >
                            Bog'lanish
                        </button>
                    </NavLink>
                </div>
            </div>
            <HeaderVison isOpen={visionModal} ref={modalRef1} />
        </header>
    );
}
