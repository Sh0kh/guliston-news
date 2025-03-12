import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import ExampleFoto from '../../img/HomeHero.jpg'
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';
import { useEffect, useState } from 'react';


gsap.registerPlugin(ScrollTrigger);

export default function Hero({ NewsData, showNewsData }) {
    const [data, setData] = useState([])
    const [ShowData, setShowData] = useState([])
    useGSAP(() => {
        gsap.fromTo('.Home__Hero__Swiper',
            {
                opacity: 0,
                x: -100,
                zIndex: 1,
            },
            {
                opacity: 1,
                x: 0,
                zIndex: 1,
                duration: 1.3,
                ease: "power1.inOut"
            }
        ),
            gsap.fromTo('.Home__Hero__card',
                {
                    opacity: 0,
                    x: 100,
                    zIndex: 1,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.3,
                    ease: "power1.inOut",
                    zIndex: 1,
                }
            )
    });
    useEffect(() => {
        if (NewsData || showNewsData) {
            setShowData(showNewsData?.object?.content)
            setData(NewsData?.object?.content);
        }
    }, [NewsData, showNewsData]);



    return (
        <section className="Home__Hero mt-[20px] pb-[50px]">
            <div className="Container">
                <div className="Home__Hero__Wrapper flex items-start justify-between gap-[30px]">
                    <div className="Home__Hero__Swiper z-0 bg-[white] shadow-lg rounded-[5px] p-[10px] w-[45%]">
                        <Swiper
                            spaceBetween={50}
                            pagination={{ clickable: true }}
                            slidesPerView={1}
                        >
                            {ShowData?.map((i, index) => {
                                const truncatedTitle = i?.title.split(" ").slice(0, 10).join(" ") + (i?.title.split(" ").length > 10 ? " ..." : "");
                                return (
                                    <SwiperSlide key={index}>
                                        <div className='p-[10px]'>
                                            <h2 className='text-MainColor border-l-MainColor border-l-[3px] pl-[5px] text-[20px] font-bold'>
                                                {truncatedTitle}
                                            </h2>
                                            <img src={i?.contentUrl || ExampleFoto} alt="Foto" className='mt-[10px] w-full h-[350px] rounded-[10px] object-cover' />
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
                                )
                            }
                            )}
                        </Swiper>
                    </div>

                    {/* Right column (show: false) */}
                    <div className='Home__Hero__card w-[55%] z-0'>
                        <div className="bg-[white] shadow-xl p-[10px] rounded-[5px]">
                            <h2 className='text-MainColor border-l-MainColor border-l-[3px] pl-[5px] text-[20px] font-bold'>
                                So‘nggi yangiliklar
                            </h2>
                        </div>
                        <div className="Home__Hero__Grid grid grid-cols-2 gap-5 mt-[10px]">
                            {data?.map((i, index) => {
                                const truncatedTitle = i?.title.split(" ").slice(0, 10).join(" ") + (i?.title.split(" ").length > 10 ? " ..." : "");

                                return (
                                    <NavLink key={index} to={`/yangiliklar/${i?.id}`}>
                                        <div className="bg-[white] p-[10px] shadow-lg hover:shadow-2xl duration-500 cursor-pointer rounded-[5px]">
                                            <h3 className='hover:text-MainColor duration-300 font-bold border-b-[2px] pb-[10px] border-b-[#c7c7c7e0]'>
                                                {truncatedTitle}
                                            </h3>
                                            <div className='flex items-center justify-between mt-[10px]'>
                                                <div className='flex items-center gap-[10px]'>
                                                    <svg className='text-[25px] opacity-[0.5]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                                        <g fill="none">
                                                            <path fill="currentColor" d="M2 9c0-1.886 0-2.828.586-3.414S4.114 5 6 5h12c1.886 0 2.828 0 3.414.586S22 7.114 22 9c0 .471 0 .707-.146.854C21.707 10 21.47 10 21 10H3c-.471 0-.707 0-.854-.146C2 9.707 2 9.47 2 9m0 9c0 1.886 0 2.828.586 3.414S4.114 22 6 22h12c1.886 0 2.828 0 3.414-.586S22 19.886 22 18v-5c0-.471 0-.707-.146-.854C21.707 12 21.47 12 21 12H3c-.471 0-.707 0-.854.146C2 12.293 2 12.53 2 13z"></path>
                                                            <path stroke="currentColor" strokeLinecap="round" strokeWidth={2.3} d="M7 3v3m10-3v3"></path>
                                                        </g>
                                                    </svg>
                                                    <span className='opacity-[0.5]'>
                                                        {i?.createdAt ? new Date(i.createdAt).toLocaleDateString('ru-RU') : ''}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </NavLink>
                                );
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

