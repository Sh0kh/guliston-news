import React from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Percent({ NewsData }) {
    const { t } = useTranslation();

    const [data, setData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (NewsData) {
            setData(NewsData?.object?.content);
        }
    }, [NewsData]);

    return (
        <section className="Percent mt-[30px]">
            <div className="Container">
                <h1 className="border-l-MainColor border-l-[3px] pl-[10px] text-[28px] font-bold text-[#1F1F1F]">
                    {t("Sirdaryo-news")}
                </h1>
                <div className="swiper-container mx-auto w-[100%] relative overflow-visible">
                    <Swiper
                        loop={true}
                        spaceBetween={6}
                        navigation={false}
                        modules={[Navigation]}
                        breakpoints={{
                            // Extra small screens (mobile)
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            // Small screens (mobile)
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 15,
                            },
                            // Medium screens (tablet)
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            // Large screens (desktop)
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 25,
                            },
                            // Extra large screens
                            1280: {
                                slidesPerView: 5,
                                spaceBetween: 30,
                            },
                        }}

                    >
                        {data?.map((i, index) => (
                            <SwiperSlide
                                onClick={() => { navigate(`/yangiliklar/${i?.id}`) }}
                                key={index} className="py-[30px]">
                                <div className='bg-[white] cursor-pointer border-b-MainColor border-b-[5px] p-[15px] rounded-[10px] '>
                                    <h3 className='font-bold'>
                                        {i?.title?.split(' ').length > 10
                                            ? i?.title?.split(' ').slice(0, 10).join(' ') + '...'
                                            : i?.title}
                                    </h3>
                                    <div className='flex items-center justify-between mt-[20px]'>
                                        <div className='flex items-center gap-[10px]'>
                                            <svg className='text-[25px] opacity-[0.5]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M2 9c0-1.886 0-2.828.586-3.414S4.114 5 6 5h12c1.886 0 2.828 0 3.414.586S22 7.114 22 9c0 .471 0 .707-.146.854C21.707 10 21.47 10 21 10H3c-.471 0-.707 0-.854-.146C2 9.707 2 9.47 2 9m0 9c0 1.886 0 2.828.586 3.414S4.114 22 6 22h12c1.886 0 2.828 0 3.414-.586S22 19.886 22 18v-5c0-.471 0-.707-.146-.854C21.707 12 21.47 12 21 12H3c-.471 0-.707 0-.854.146C2 12.293 2 12.53 2 13z"></path><path stroke="currentColor" strokeLinecap="round" strokeWidth={2.3} d="M7 3v3m10-3v3"></path></g></svg>
                                            <span className='opacity-[0.5]'>
                                                {i?.createdAt ? new Date(i.createdAt).toLocaleDateString('ru-RU') : ''}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}