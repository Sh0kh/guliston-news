import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { useTranslation } from "react-i18next";


export default function AnimateSwiper({ data }) {
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useState(false);
    const [swData, setSwData] = useState([])
    const [selectedImage, setSelectedImage] = useState(null);


    const openModal = (image) => {
        setSelectedImage(image);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedImage(null);
    };

    useEffect(() => {
        if (data) {
            setSwData(data?.object)
        }
    }, [data])

    return (
        <section className="AnimateSwiper bg-white py-6">
            <div className="container mx-auto px-4">
                <h1 className="border-l-4 border-mainColor pl-3 text-2xl font-bold text-gray-900 mb-4">
                    {t("sirdaryo-med")}
                </h1>
                <Swiper
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={3}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        slideShadows: true,
                    }}
                    modules={[EffectCoverflow, Autoplay]}
                    className="pb-6"
                >
                    {swData.map((slide, index) => (
                        <SwiperSlide onClick={() => openModal(slide.mediaUrl)} key={index} className="animate_swiper_card rounded-lg h-[200px] shadow-md overflow-hidden relative">
                            <img src={slide.mediaUrl} alt={slide.alt} className="w-full h-[350px] object-cover rounded-md" />
                            <div className="absolute inset-0 bg-blue-500 bg-opacity-40 flex items-center justify-center">
                                {slide.mediaType === "MEDIA" ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><g fill="none"><path fill="#fff" fill-rule="evenodd" d="M3.172 3.172C2 4.343 2 6.229 2 10v4c0 3.771 0 5.657 1.172 6.828S6.229 22 10 22h4c3.771 0 5.657 0 6.828-1.172S22 17.771 22
                              //  14v-4c0-2.84 0-4.61-.5-5.811V17a3.62 3.62 0 0 1-2.56-1.06l-.752-.752c-.722-.722-1.082-1.082-1.491-1.234a2 2 0 0 0-1.394 0c-.409.152-.77.512-1.49 1.234l-.114.113c-.585.585-.878.878-1.189.932a1 1 0 0 1-.699-.134c-.268-.166-.431-.547-.758-1.308L11 14.667c-.75-1.75-1.124-2.624-1.778-2.952a2 2 0 0 0-1.065-.205c-.729.062-1.401.735-2.747 2.08L3.5 15.5V2.887q-.174.129-.328.285" clip-rule="evenodd" /><path stroke="#fff" stroke-width="2" d="M3 10c0-1.914.002-3.249.138-4.256c.131-.978.372-1.496.74-1.865c.37-.37.888-.61 1.866-.741C6.751 3.002 8.086 3 10 3h4c1.914 0 3.249.002 4.256.138c.978.131 1.496.372 1.865.74c.37.37.61.888.742 1.866C20.998 6.751 21 8.086 21 10v4c0 1.914-.002 3.249-.137 4.256c-.132.978-.373 1.496-.742 1.865c-.369.37-.887.61-1.865.742c-1.007.135-2.342.137-4.256.137h-4c-1.914 0-3.249-.002-4.256-.137c-.978-.132-1.496-.373-1.865-.742c-.37-.369-.61-.887-.741-1.865C3.002 17.249 3 15.914 3 14z" /><circle cx="15" cy="9" r="2" fill="#fff" /></g></svg>
                                ) : slide.mediaType === 'TEXT' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 1 0V5c0-2 .5-3 3-3h1.5a.5.5 0 0 1 .5.5V13a1 1 0 0 1-1 1H4.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1H10a1 1 0 0 1-1-1V2.5a.5.5 0 0 1 .5-.5H11c2.5 0 3 1 3 3v.5a.5.5 0 0 0 1 0v-4a.5.5 0 0 0-.5-.5z" clipRule="evenodd"></path></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 4.15c-1.191 0-2.58.028-3.934.066l-.055.002c-1.378.039-2.49.07-3.366.215c-.913.151-1.671.44-2.277 1.063c-.608.625-.873 1.398-.998 2.323c-.12.89-.12 2.018-.12 3.42v1.524c0 1.4 0 2.528.12 3.419c.124.925.39 1.698.998 2.323c.606.624 1.364.912 2.277 1.063c.876.145 1.988.176 3.366.215l.055.002c1.355.038 2.743.066 3.934.066s2.58-.028 3.934-.066l.055-.002c1.378-.039 2.49-.07 3.366-.215c.913-.151 1.671-.44 2.277-1.063c.608-.625.874-1.398.998-2.323c.12-.89.12-2.018.12-3.42v-1.524c0-1.401 0-2.529-.12-3.419c-.124-.925-.39-1.698-.998-2.323c-.606-.624-1.364-.912-2.277-1.063c-.876-.145-1.988-.176-3.367-.215l-.054-.002A145 145 0 0 0 12 4.15m-1.128 10.501A.75.75 0 0 1 9.75 14v-4a.75.75 0 0 1 1.122-.651l3.5 2a.75.75 0 0 1 0 1.302z" clipRule="evenodd"></path></svg>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeModal}>
                    <div className="relative max-w-3xl w-full p-4">
                        <button className="absolute top-2 right-2 text-white text-3xl" onClick={closeModal}>&times;</button>
                        <img src={selectedImage} alt="Preview" className="w-full max-h-[80vh] object-contain" />
                    </div>
                </div>
            )}
        </section>
    );
}
