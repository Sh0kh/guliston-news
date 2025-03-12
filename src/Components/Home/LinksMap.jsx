import FotoMap from '../../img/shaharMap.jpg'
import Icon1 from '../../img/icon-1.png'
import Icon2 from '../../img/icon-2.png'
import Icon3 from '../../img/icon-3.png'
import Icon4 from '../../img/icon-4.png'
import Icon5 from '../../img/icon-5.png'
import Icon6 from '../../img/icon-6.png'
import Icon7 from '../../img/icon-7.png'
import Icon8 from '../../img/icon-8.png'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);



export default function LinksMap() {
        const { t, i18n } = useTranslation();
    
    useGSAP(() => {
        gsap.fromTo('.HomeMap',
            {
                x: '-100%',
                opacity: 0,
            },
            {
                x: '0%',
                opacity: 1,
                scrollTrigger: {
                    // markers: true,   
                    trigger: '.HomeMap',
                    start: 'top 100%',
                    end:"top 10%",
                    scrub: 1
                }
            }
        )
        gsap.fromTo('.HomeLinks',
            {
                x: '100%',
                opacity: 0,
            },
            {
                x: '0%',
                opacity: 1,
                scrollTrigger: {
                    // markers: true,
                    trigger: '.HomeLinks',
                    start: 'top 100%',
                    end:"top 10%",
                    scrub: 1
                }
            }
        )
    });


    const links = [
        {
            foto: Icon2,
            text: t("president_official"),
            link: 'https://president.uz/ru'
        },
        {
            foto: Icon3,
            text:  t("parliament"),
            link: 'https://parliament.gov.uz/ru/'
        },
        {
            foto: Icon4,
            text:  t("interactive_services"),
            link: 'https://my.gov.uz/ru'
        },
        {
            foto: Icon5,
            text:   t("foreign_affairs"),
            link: 'https://mfa.uz/ru'
        },
        {
            foto: Icon6,
            text:  t("president_press"),
            link: 'https://president.uz/uz'
        },
        {
            foto: Icon7,
            text:  t("senate"),
            link: 'https://www.senat.uz/'
        },
        {
            foto: Icon1,
            text: t("public_petitions"),
            link: 'https://petition.gov.uz/uz'
        },
        {
            foto: Icon8,
            text: t("legal_portal"),
            link: 'https://huquqiyportal.uz/'
        },
        {
            foto: Icon6,
            text: t("government_portal"),
            link: 'https://gov.uz/oz'
        },
    ]

    return (
        <section className="LinksMap mt-[30px]">
            <div className="Container">
                <div className="LinksMap__Wrapper flex items-start gap-[50px]">
                    <div className='HomeMap'>
                        <h1 className="border-l-MainColor mb-[30px] border-l-[3px] pl-[10px] text-[28px] font-bold text-[#1F1F1F]">
                        {t("tuzilish")}

                        </h1>
                        <img className='w-[500px] rounded-[10px] cursor-pointer' src={FotoMap} alt="" />
                    </div>
                    <div className='w-[full] HomeLinks'>
                        <h1 className="border-l-MainColor mb-[30px] border-l-[3px] pl-[10px] text-[28px] font-bold text-[#1F1F1F]">
                        {t("Links")}
                           
                        </h1>
                        <div className="LinksMap__Wrapper__grid grid grid-cols-2 gap-7">
                            {links?.map((i, index) => (
                                <a key={index} href={i?.link} target="_blank" className='LinksMap__card' rel="noopener noreferrer">
                                    <div className='bg-[white] p-[10px] flex items-center gap-[10px] px-[30px]  rounded-[10px] shadow-xl cursor-pointer duration-500 hover:text-MainColor hover:shadow-2xl'>
                                        <div className='h-[50px] flex items-center justify-center'>
                                            <img className='w-[50px] ' src={i?.foto} alt="foto" />
                                        </div>
                                        <p className='text-[18px] font-normal'>
                                            {i?.text}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}