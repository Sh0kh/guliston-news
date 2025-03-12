import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';

gsap.registerPlugin(ScrollTrigger);

export default function Koruption() {
    useGSAP(() => {
        gsap.fromTo('.Koruption',
            { opacity: 0, y: 100, zIndex: 1 },
            { opacity: 1, y: 0, zIndex: 1, duration: 1.3, ease: "power1.inOut" }
        );
    });
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const getKorup = async () => {
        try {
            const response = await axios.get(`/file/data/getAll/KORRUPSIYAGA_QARSHI_KURASHISH`);
            setData(response.data?.object || []);
        } catch (error) {
            console.error("Ma'lumotlarni yuklashda xatolik:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getKorup();
    }, []);

    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen w-full'>
                <ReactLoading type="spinningBubbles" color='#1466B3' height={100} width={100} />
            </div>
        );
    }

    return (
        <div className="Koruption mt-[30px] pb-[30px]">
            <div className="Container">
                <h1 className="News__Hero__title border-l-MainColor mb-[30px] border-l-[3px] pl-[10px] text-[28px] font-bold text-[#1F1F1F]">
                    Korrupsiyaga qarshi kurashish
                </h1>
                {data?.length > 0 ? (
                    <div className="bg-white p-4 shadow-md rounded-lg mb-4">
                        <ul className="ml-4">
                            {data.map((item, index) => (
                                <li key={index} className="text-gray-700 flex justify-between items-center">
                                    <span>{item?.title}</span>
                                    <a className="text-[30px] hover:text-MainColor duration-300" href={item?.mediaUrl} download target="_blank" rel="noopener noreferrer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M12 15.575q-.2 0-.375-.062T11.3 15.3l-3.6-3.6q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L11 12.15V5q0-.425.288-.712T12 4t.713.288T13 5v7.15l1.875-1.875q.3-.3.713-.288t.712.313q.275.3.288.7t-.288.7l-3.6 3.6q-.15.15-.325.213t-.375.062M6 20q-.825 0-1.412-.587T4 18v-2q0-.425.288-.712T5 15t.713.288T6 16v2h12v-2q0-.425.288-.712T19 15t.713.288T20 16v2q0 .825-.587 1.413T18 20z"></path>
                                        </svg>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-center py-10">
                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75h.007v.007H9.75V9.75zm4.5 0h.007v.007h-.007V9.75zm-4.5 4.5h.007v.007H9.75v-.007zm4.5 0h.007v.007h-.007v-.007z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25a6.75 6.75 0 0113.5 0M3 8.25v7.5a2.25 2.25 0 002.25 2.25h13.5a2.25 2.25 0 002.25-2.25v-7.5" />
                        </svg>
                        <p className="mt-4 text-gray-600 text-lg">Hozircha ma'lumot mavjud emas</p>
                    </div>
                )}
            </div>
        </div>
    );
}
