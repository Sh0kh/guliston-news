import axios from "axios"
import ReactLoading from 'react-loading';

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export default function Page() {
    const { ID } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/data/getAllMenuId/${ID}`);
            setData(response?.data?.object || []);
        } catch (error) {
            console?.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [ID]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen w-full">
                <ReactLoading type="spinningBubbles" color="#1466B3" height={100} width={100} />
            </div>
        );
    }

    return (
        <section className="Page mt-[30px] pb-[30px] flex justify-center">
            <div className="Container w-full max-w-[800px] mx-auto text-center">
                {data?.length > 0 ? (
                    data?.map((i, index) => (
                        <div key={index} className="mb-[30px]">
                            <h1 className="News__Hero__title border-l-MainColor mb-[30px] border-l-[3px] pl-[10px] text-[28px] font-bold text-[#1F1F1F] text-left">
                                {i?.title}
                            </h1>
                            <div
                                className="cursor-pointer bg-white mb-[10px] rounded-[10px] p-[20px] w-full shadow-xl text-left"
                                dangerouslySetInnerHTML={{
                                    __html: i?.context,
                                }}
                            />
                        </div>
                    ))
                ) : (
                    <div className="w-full h-[400px] flex items-center justify-center">
                        <h1>Ma'lumot yo'q</h1>
                    </div>
                )}
            </div>
            <style>
                {`
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin:0 auto !important;
                    }
                    table, th, td {
                        border: 1px solid black;
                    }
                    th, td {
                        padding: 8px;
                        text-align: center;
                    }
                `}
            </style>
        </section>
    );
}
