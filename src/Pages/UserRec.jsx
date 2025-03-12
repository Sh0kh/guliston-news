import axios from "axios"
import ReactLoading from 'react-loading';

import { useEffect, useState } from "react"

export default function UserRec() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const response = await axios.get(`/organization/getByCategory?category=FUQAROLAR_QABULI`)
            setData(response?.data?.object || [])
        } catch (error) {
            console?.log(error)
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
        <section className="Rek mt-[30px] pb-[30px]">
            <div className="Container">
                <h1 className="News__Hero__title border-l-MainColor mb-[30px] border-l-[3px] pl-[10px] text-[28px] font-bold text-[#1F1F1F]">
                    Fuqarolarni qabul qilish tartibi
                </h1>
                {data?.length > 0 ? (
                    data?.map((i, index) => (
                        <div key={index} className="cursor-pointer bg-[white] mb-[10px] rounded-[10px] p-[20px] w-[100%] shadow-xl">
                            <h1>
                                {i?.title}
                            </h1>
                            <div
                                className="mt-2"
                                dangerouslySetInnerHTML={{ __html: i?.context }}
                            />
                        </div>
                    ))
                ) : (
                    <div className="w-full h-[400px] flex items-center justify-center">
                        <h1>
                            Ma'lumot y'oq
                        </h1>
                    </div>
                )}
            </div>
        </section>
    )
}