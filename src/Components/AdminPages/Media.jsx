import { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from 'react-loading';
import CreateMedia from "../AdminComponents/Media/CreateMedia";
import MediaDelete from "../AdminComponents/Media/MediaDelete";

export default function Media() {
    const [createModal, setCreateModal] = useState(false);
    const [Id, setId] = useState([])
    const [data, setData] = useState([]);
    const [deleteModal, setDeleteModal] = useState(false)
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/media/findAll', {
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
                    <h1 className="text-2xl font-bold">Ijtimoiy tarmoq
                    </h1>
                    <button
                        onClick={() => setCreateModal(true)}
                        className="bg-MainColor text-white px-4 py-2 rounded-lg shadow-lg border-2 border-MainColor duration-500 hover:text-MainColor hover:bg-transparent">
                        Yaratish
                    </button>
                </div>
                <div className="bg-white w-full rounded-lg shadow-lg overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left text-sm md:text-base">
                                <th className="p-3">№</th>
                                <th className="p-3">Foto</th>
                                {/* <th className="p-3">Url</th> */}
                                <th className="p-3">Yaratilgan vaqti</th>
                                <th className="p-3">Tarmoq turi</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((i, index) => (
                                <tr key={i.id} className="border-t hover:bg-gray-100 text-sm md:text-base">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">
                                        <img src={i?.mediaUrl} alt={i?.mediaUrl} className="w-[80px] h-[80px] object-cover rounded-md" />
                                    </td>
                                    <td className="p-3">{i.createdAt.split('T')[0]}</td>
                                    {/* <td className="p-3">
                                        <a href={i.url} className="text-MainColor hover:underline">Link</a>
                                    </td> */}
                                    <td className="p-3">{i.mediaType === "MEDIA" ? 'Ijtimoiy tarmoq' : i?.mediaType === 'YOUTUBE_URL' ? "Youtube" : i?.mediaType === 'TEXT' ? "Matnli" : 'Boshqa'}</td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-[5px]">
                                            <button
                                                onClick={() => { setId(i?.id); setDeleteModal(true) }}

                                                className="bg-red-500 text-white px-2 py-2 rounded-md text-xs hover:bg-red-700">
                                                <svg className="text-[20px]" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <MediaDelete refresh={fetchData} isOpen={deleteModal} onClose={() => setDeleteModal(false)} data={Id} />
            <CreateMedia refresh={fetchData} isOpen={createModal} onClose={() => setCreateModal(false)} />
        </>
    );
}