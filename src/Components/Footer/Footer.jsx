import logo from '../../img/logo.png'
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { NavLink } from 'react-router-dom';


export default function Footer() {
    const [open, setOpen] = useState(0);


    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };



    const { t, i18n } = useTranslation();

    const renderAccordionItems = () => {
        const sections = [
            { title: 'Rahbariyat', links: 'rahbariyat' },
            { title: 'Apparat xodimlari', links: 'apparat-xodimlari' },
            { title: 'Yangiliklar', links: 'yangiliklar' },
            { title: 'Korrupsiyaga qarshi kurashish', links: 'koruption' },
            { title: 'Bog`lanish', links: 'boglanish' },
        ];

        return sections.map((section, index) => (
            <NavLink
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                to={section?.links}>
                {section?.title}
            </NavLink>
        ));
    };

    return (
        <footer className="text-[white] pt-[50px] pb-[20px] mt-[30px]">
            <div className="Container">
                <div className="Footer__wrapper flex items-start justify-between gap-[50px]">
                    <div className="bg-[#076AC8] w-[100%] p-[30px]">
                        <div className='logo flex items-center gap-[10px] '>
                            <img src={logo} alt="Logo" />
                            <h1 class="w-[200px] font-bold text-[18px] tracking-[0.27px] uppercase text-[rgba(247,247,247,1)] ml-[15px]">
                                {t('Logo')}
                            </h1>
                        </div>
                        <h2 className='text-[18px] font-bold mt-[30px]'>
                            {t('Adress-logo')}
                        </h2>
                        <div className='flex items-center gap-[5px] mt-[30px]'>
                            <svg className='text-[30px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m21 15.46l-5.27-.61l-2.52 2.52a15.05 15.05 0 0 1-6.59-6.59l2.53-2.53L8.54 3H3.03C2.45 13.18 10.82 21.55 21 20.97z"></path></svg>
                            <span>
                                {t('Phone-number')}:
                            </span>
                            <a href="tel:+998672254090">(67) 225-40-90</a>
                        </div>
                        <div className='flex items-center gap-[5px] mt-[30px]'>
                            <svg className='text-[30px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m21 15.46l-5.27-.61l-2.52 2.52a15.05 15.05 0 0 1-6.59-6.59l2.53-2.53L8.54 3H3.03C2.45 13.18 10.82 21.55 21 20.97z"></path></svg>
                            <span>
                                {t('Phone-number')}:
                            </span>
                            <a href="tel:+998672252982">(67) 225-29-82</a>
                        </div>
                        <div className='flex items-center gap-[5px] mt-[30px]'>
                            <svg className='text-[30px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 4a1 1 0 0 0-1 1v5a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V7a1 1 0 0 0-1-1"></path></g></svg>
                            <span>
                                {t('Time-work')} : {t('Time-orgin')}
                            </span>
                        </div>
                        <div className='flex items-center gap-[5px] mt-[30px]'>
                            <svg className='text-[30px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"></path></svg>
                            <span>
                                {t('New-adress')}
                            </span>
                        </div>
                        <div className='flex items-center gap-[5px] mt-[30px]'>
                            <svg className='text-[80px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M18 11H6V6h12m-1.5 11a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m-9 0A1.5 1.5 0 0 1 6 15.5A1.5 1.5 0 0 1 7.5 14A1.5 1.5 0 0 1 9 15.5A1.5 1.5 0 0 1 7.5 17M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4z"></path></svg>
                            <span className='italic'>
                                {t('Bus-adress')}
                            </span>
                        </div>
                    </div>
                    <div className='w-[100%]'>
                        <h2 className='text-[18px] uppercase font-bold mt-[20px]'>
                            {t('web-map')}
                        </h2>
                        <div className="w-[70%] mt-[10px] flex items-start flex-col gap-[10px]">
                            {renderAccordionItems()}
                        </div>
                    </div>
                    <div className='w-[100%]'>
                        <h2 className="text-[18px] uppercase font-bold mt-[20px]">{t('Map')}</h2>
                        <NavLink to={'/'} className={'mt-[20px] block'}>
                            <div className="FooterFotoMap relative w-full h-[200px] overflow-hidden rounded-[10px]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2931.542367733867!2d68.77849627589138!3d40.4915254714277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38b2073345bb68b5%3A0xa4fb6a9dd9056c19!2sGuliston%20shahar!5e1!3m2!1sru!2s!4v1741610228473!5m2!1sru!2s"
                                    width="100%"
                                    height="100%"
                                    style={{ border: "0" }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </footer >
    )
}