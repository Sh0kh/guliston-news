import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { NavLink } from 'react-router-dom';

export default function Owl() {
    return (
        <section className="Owl py-[10px] bg-[white] w-full mt-[30px] relative">
            <div className="Container relative">
                <div className="swiper-container mx-auto w-[100%] relative overflow-visible">
                    <Swiper
                        loop={true}
                        spaceBetween={10}
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
                        <SwiperSlide className="py-[30px]">
                            <NavLink
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                to={'/koruption'}>
                                <div className="bg-[#076AC8] shadow-lg rounded-[10px] cursor-pointer h-[82px]">
                                    <div className="flex items-center justify-between h-full">
                                        <div className="bg-[#EFF4FA] h-full p-[20px] rounded-[10px] ml-[7px] w-[70%]">
                                            <h3 className="text-[14px] font-normal">
                                                Korrupsiyaga qarshi kurashish
                                            </h3>
                                        </div>
                                        <div className="w-[30%] flex items-center justify-center hover:text-[40px] duration-500 text-[white] text-[30px]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M254.47 53.094s-4.808 37.12-49.5 49.5c-44.695 12.38-129.282 0-129.282 0L61.343 115.78l8.187 9.157l-1.093 2.876l-51.843 137.312L16 266.72v1.717c0 18.897 8.253 34.243 20.344 44c12.09 9.758 27.563 14.31 42.937 14.313c15.376.003 30.878-4.556 42.97-14.313c12.092-9.756 20.344-25.094 20.344-44v-1.843l-.688-1.688L86.97 130.28c23.946-3.003 80.866-8.54 115.5 1.532c23.064 6.71 36.151 20.345 43.436 31.97L210.78 354.468l21.407 30.31c-17.75 7.75-32.593 24.84-37.562 51.345c-56.076 6.195-95.47 20.74-95.47 37.688h311.876c0-16.947-39.392-31.493-95.467-37.688c-4.91-26.6-19.57-44.112-37.188-51.906l21-29.75L264 162.28c7.457-11.275 20.388-24.045 42.47-30.468c34.955-10.167 92.615-4.42 116.155-1.437l-50.875 134.75l-.625 1.594v1.717c0 18.897 8.253 34.243 20.344 44c12.09 9.758 27.593 14.31 42.967 14.313c15.375.003 30.877-4.556 42.97-14.313c12.09-9.756 20.343-25.094 20.343-44v-1.843l-.688-1.688L441 127.562l-.938-2.28l8.782-8.438l-15.594-14.25s-84.556 12.38-129.25 0s-49.53-49.5-49.53-49.5M77.53 156.656l44.22 108.375H36.594L77.53 156.657zm355.158 0l44.218 108.375H391.72l40.967-108.374z"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </SwiperSlide>
                        <SwiperSlide className="py-[30px]">
                            <NavLink
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                to={'/apparat-xodimlari'}>
                                <div className="bg-[#076AC8] shadow-lg rounded-[10px] cursor-pointer h-[82px]">
                                    <div className="flex items-center justify-between h-full">
                                        <div className="bg-[#EFF4FA] h-full p-[20px] rounded-[10px] ml-[7px] w-[70%]">
                                            <h3 className="text-[14px] font-normal">
                                                Apparat xodimlari
                                            </h3>
                                        </div>
                                        <div className="w-[30%] flex items-center justify-center hover:text-[40px] duration-500 text-[white] text-[30px]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.09em" height="1em" viewBox="0 0 26 24"><path fill="currentColor" d="M22.313 17.295a7.44 7.44 0 0 0-4.089-2.754l-.051-.011l-1.179 1.99a1.003 1.003 0 0 1-1 1c-.55 0-1-.45-1.525-1.774v-.032a1.25 1.25 0 1 0-2.5 0v.033v-.002c-.56 1.325-1.014 1.774-1.563 1.774a1.003 1.003 0 0 1-1-1l-1.142-1.994a7.47 7.47 0 0 0-4.126 2.746l-.014.019a4.5 4.5 0 0 0-.655 2.197v.007c.005.15 0 .325 0 .5v2a2 2 0 0 0 2 2h15.5a2 2 0 0 0 2-2v-2c0-.174-.005-.35 0-.5a4.5 4.5 0 0 0-.666-2.221l.011.02zM7.968 5.29c0 2.92 1.82 7.21 5.25 7.21c3.37 0 5.25-4.29 5.25-7.21v-.065a5.25 5.25 0 1 0-10.5 0v.068zm11.234 1.72c0 1.902 1.186 4.698 3.42 4.698c2.195 0 3.42-2.795 3.42-4.698v-.052a3.421 3.421 0 0 0-6.842 0v.055v-.003zm-19.2 1.6c0 1.902 1.186 4.698 3.42 4.698c2.195 0 3.42-2.795 3.42-4.698v-.052a3.421 3.421 0 0 0-6.842 0v.055v-.003z"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </SwiperSlide>
                        <SwiperSlide className="py-[30px]">
                            <NavLink
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                to={'/ochiq-malumot'}>
                                <div className="bg-[#076AC8] shadow-lg rounded-[10px] cursor-pointer h-[82px]">
                                    <div className="flex items-center justify-between h-full">
                                        <div className="bg-[#EFF4FA] h-full p-[20px] rounded-[10px] ml-[7px] w-[70%]">
                                            <h3 className="text-[14px] font-normal">
                                                Ochiq ma'lumotlar
                                            </h3>
                                        </div>
                                        <div className="w-[30%] flex items-center justify-center hover:text-[40px] duration-500 text-[white] text-[30px]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M255.993 8.045c-32.183-1.174-57.105 21.062-84.092 35.034c-36.705 21.758-74.502 41.83-110.476 64.716c-23.53 19.125-34.341 49.9-31.87 79.619c.137 52.692-.273 105.396.207 158.08c3.047 31.9 25.167 58.973 53.631 72.318c45.694 26.225 91.12 52.938 136.981 78.857c29.154 13.294 63.667 7.703 89.457-10.283c45.56-26.464 91.402-52.46 136.783-79.219c26.105-18.586 38.497-51.277 35.818-82.6c-.137-52.693.274-105.396-.207-158.08c-3.05-31.898-25.166-58.977-53.633-72.316c-45.695-26.22-91.129-52.915-136.988-78.837c-11.1-5.156-23.43-7.255-35.61-7.29m-28.695 132.69h57.4v230.52h-57.4zm72.231 50.174h57.372v180.346H299.53zm-144.452 94.08h57.39v86.266h-57.39z"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </SwiperSlide>
                        <SwiperSlide className="py-[30px]">
                            <NavLink
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                to={'/ochiq-malumot'}>
                                <div className="bg-[#076AC8] shadow-lg rounded-[10px] cursor-pointer h-[82px]">
                                    <div className="flex items-center justify-between h-full">
                                        <div className="bg-[#EFF4FA] h-full p-[20px] rounded-[10px] ml-[7px] w-[70%]">
                                            <h3 className="text-[14px] font-normal">
                                                Rahbariyat
                                            </h3>
                                        </div>
                                        <div className="w-[30%] flex items-center justify-center hover:text-[40px] duration-500 text-[white] text-[30px]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1.09em" height="1em" viewBox="0 0 26 24"><path fill="currentColor" d="M22.313 17.295a7.44 7.44 0 0 0-4.089-2.754l-.051-.011l-1.179 1.99a1.003 1.003 0 0 1-1 1c-.55 0-1-.45-1.525-1.774v-.032a1.25 1.25 0 1 0-2.5 0v.033v-.002c-.56 1.325-1.014 1.774-1.563 1.774a1.003 1.003 0 0 1-1-1l-1.142-1.994a7.47 7.47 0 0 0-4.126 2.746l-.014.019a4.5 4.5 0 0 0-.655 2.197v.007c.005.15 0 .325 0 .5v2a2 2 0 0 0 2 2h15.5a2 2 0 0 0 2-2v-2c0-.174-.005-.35 0-.5a4.5 4.5 0 0 0-.666-2.221l.011.02zM7.968 5.29c0 2.92 1.82 7.21 5.25 7.21c3.37 0 5.25-4.29 5.25-7.21v-.065a5.25 5.25 0 1 0-10.5 0v.068zm11.234 1.72c0 1.902 1.186 4.698 3.42 4.698c2.195 0 3.42-2.795 3.42-4.698v-.052a3.421 3.421 0 0 0-6.842 0v.055v-.003zm-19.2 1.6c0 1.902 1.186 4.698 3.42 4.698c2.195 0 3.42-2.795 3.42-4.698v-.052a3.421 3.421 0 0 0-6.842 0v.055v-.003z"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </SwiperSlide>
                        <SwiperSlide className="py-[30px]">
                            <NavLink
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                to={'/yangiliklar'}>
                                <div className="bg-[#076AC8] shadow-lg rounded-[10px] cursor-pointer h-[82px]">
                                    <div className="flex items-center justify-between h-full">
                                        <div className="bg-[#EFF4FA] h-full p-[20px] rounded-[10px] ml-[7px] w-[70%]">
                                            <h3 className="text-[14px] font-normal">
                                                Yangiliklar
                                            </h3>
                                        </div>
                                        <div className="w-[30%] flex items-center justify-center hover:text-[40px] duration-500 text-[white] text-[30px]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M16 3a2 2 0 0 1 1.995 1.85L18 5v5h1.5a1.5 1.5 0 0 1 1.493 1.356L21 11.5V19a3 3 0 0 1-2.824 2.995L18 22H5a2 2 0 0 1-1.995-1.85L3 20V5a2 2 0 0 1 1.85-1.995L5 3zm3 9h-1v8a1 1 0 0 0 1-1zm-8 1H8a1 1 0 0 0-.117 1.993L8 15h3a1 1 0 0 0 .117-1.993zm2-5H8a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2"></path></g></svg>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </SwiperSlide>
                        <SwiperSlide className="py-[30px]">
                            <NavLink
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                to={'/boglanish'}>
                                <div className="bg-[#076AC8] shadow-lg rounded-[10px] cursor-pointer h-[82px]">
                                    <div className="flex items-center justify-between h-full">
                                        <div className="bg-[#EFF4FA] h-full p-[20px] rounded-[10px] ml-[7px] w-[70%]">
                                            <h3 className="text-[14px] font-normal">
                                                Bog'lanish
                                            </h3>
                                        </div>
                                        <div className="w-[30%] flex items-center justify-center hover:text-[40px] duration-500 text-[white] text-[30px]">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m21 15.46l-5.27-.61l-2.52 2.52a15.05 15.05 0 0 1-6.59-6.59l2.53-2.53L8.54 3H3.03C2.45 13.18 10.82 21.55 21 20.97z"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
