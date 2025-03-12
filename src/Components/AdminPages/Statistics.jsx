import { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from 'react-loading';
import CreateMedia from "../AdminComponents/Media/CreateMedia";
import MediaDelete from "../AdminComponents/Media/MediaDelete";
import StatisticsEdit from "../AdminComponents/Statistics/StatisticsEdit";

export default function Statistics() {
    const [EditModal, setEditModal] = useState(false);
    const [Id, setId] = useState([])
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false)
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/statistic', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setData(response?.data?.object);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen w-full'>
                <ReactLoading type="spinningBubbles" color='#1466B3' height={100} width={100} />
            </div>
        );
    }

    return (
        <>
            <div className="pt-[75px] pb-[50px]">
                <div className="Admin__header__wrapper flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Statistika
                    </h1>
                    <button
                        onClick={() => setEditModal(true)}
                        className="bg-MainColor text-white px-4 py-2 rounded-lg shadow-lg border-2 border-MainColor duration-500 hover:text-MainColor hover:bg-transparent">
                        Yangilash
                    </button>
                </div>
                <div className="bg-white w-full rounded-lg shadow-lg overflow-hidden py-[30px] flex items-center flex-wrap gap-x-[5px] gap-y-[30px] justify-around">
                    <div className="p-[15px] flex items-center  border-[1px] rounded-[10px] shadow-lg hover:shadow-2xl cursor-pointer duration-500">
                        <h2 className="text-[20px]">
                            Sorovlar soni:
                        </h2>
                        <h2 className="text-[25px] font-bold">
                            {data?.requestsCount || 0}
                        </h2>
                    </div>
                    <div className="p-[15px] flex items-center  border-[1px] rounded-[10px] shadow-lg hover:shadow-2xl cursor-pointer duration-500">
                        <h2 className="text-[20px]">
                            Ko'rilgan so'rovlar soni:
                        </h2>
                        <h2 className="text-[25px] font-bold">
                            {data?.viewedRequestsCount || 0}
                        </h2>
                    </div>
                    <div className="p-[15px] flex items-center  border-[1px] rounded-[10px] shadow-lg hover:shadow-2xl cursor-pointer duration-500">
                        <h2 className="text-[20px]">
                            Koʻrilgan soʻrovlar foizda:
                        </h2>
                        <h2 className="text-[25px] font-bold">
                            {data?.percentViewedRequestsCount || 0} %
                        </h2>
                    </div>
                    <div className="p-[15px] flex items-center gap-[5px] border-[1px] rounded-[10px] shadow-lg hover:shadow-2xl cursor-pointer duration-500">
                        <h2 className="text-[20px]">
                            Kutilayotgan so'rovlar soni:
                        </h2>
                        <h2 className="text-[25px] font-bold">
                            {data?.pendingRequestsCount || 0}
                        </h2>
                    </div>
                </div>
            </div>
            <StatisticsEdit refresh={fetchData} isOpen={EditModal} onClose={() => setEditModal(false)} data={data}/>
        </>
    );
}