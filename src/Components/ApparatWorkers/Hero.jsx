import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

gsap.registerPlugin(ScrollTrigger);


export default function Hero() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useGSAP(() => {
        gsap.fromTo('.Sup__hero__card',
            {
                opacity: 0,
                y: 100,
                zIndex: 1,
            },
            {
                opacity: 1,
                y: 0,
                zIndex: 1,
                duration: 1.3,
                ease: "power1.inOut"
            }
        )
    });

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/person/getAll', {
                params: {
                    category: 'APPARAT_XODIMLARI'
                }
            })
            setData(response?.data?.object?.content)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen w-full'>
                <ReactLoading type="spinningBubbles" color='#1466B3' height={100} width={100} />
            </div>
        );
    }


    return (
        <section className="SuperiorsHero  py-[30px]">
            <div className="Container">
                <h1 className="border-l-MainColor mb-[30px] border-l-[3px] pl-[10px] text-[28px] font-bold text-[#1F1F1F]">
                    Apparat xodimlari
                </h1>
                {data?.length > 0 ? (
                    <div className="flex items-center flex-col gap-[30px]">
                        {data?.map((i, index) => (
                            <div key={index} className="Sup__hero__card bg-[white] rounded-[10px] p-[20px] w-[100%] shadow-xl flex items-start gap-[30px]">
                                <img className="cursor-pointer w-[350px] h-[300px] object-cover border-[1px] shadow-lg rounded-[10px]" src={i?.photoUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxXyMg0TtEsQUx8m31FNyPru_8KOUtnDtzbA&s'} alt="Foto" />
                                <div className="w-[100%]">
                                    <h2 className="text-[20px] text-[#1F1F1F]">
                                        {i?.position}
                                    </h2>
                                    <h1 className="text-MainColor text-[30px] font-bold mt-[5px]">
                                        {i?.fullName}
                                    </h1>
                                    <div className="Sup__hero__card__wrapper flex items-center gap-[10px] w-[400px] mt-[10px]">
                                        <div className="rounded-[10px] w-[100%] border-[1px] cursor-pointer p-[5px] shadow-xl flex items-start gap-[10px]">
                                            <svg className="text-[50px] text-MainColor" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1c-9.39 0-17-7.61-17-17c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.25.2 2.45.57 3.57c.11.35.03.74-.25 1.02z"></path></svg>
                                            <div>
                                                <h3 className="font-bold">
                                                    Telefon:
                                                </h3>
                                                <h3>
                                                    {i?.phoneNumber}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="rounded-[10px] w-[100%] border-[1px] cursor-pointer p-[5px] shadow-xl flex items-start gap-[10px]">
                                            <svg className="text-[50px] text-MainColor" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeMiterlimit={10} strokeWidth={32} d="M256 64C150 64 64 150 64 256s86 192 192 192s192-86 192-192S362 64 256 64Z"></path><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} d="M256 128v144h96"></path></svg>
                                            <div>
                                                <h3 className="font-bold">
                                                    Qabul vaqti:
                                                </h3>
                                                <h3>
                                                    {i?.receptionDateTimes}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-[20px]">
                                        {i?.biography}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='flex items-center justify-center h-[400px] w-full'>
                        <h1>
                            Ma'lumot y'oq
                        </h1>
                    </div>
                )}
            </div>
        </section>
    )
}