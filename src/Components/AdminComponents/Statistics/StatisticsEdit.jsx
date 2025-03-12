import { useEffect, useState } from "react";
import Input from "../../UI/Inputs/Input";
import Swal from 'sweetalert2';
import axios from "axios";
import NormalModal from "../../UI/Modals/NormalModal";

export default function StatisticsEdit({ isOpen, onClose, refresh, data }) {

    const [loading, setLoading] = useState(false)
    const [PendingRequest, setPendingRequest] = useState('')
    const [requestsCount, setRequestsCount] = useState('')
    const [viewedRequestsCount, setViewedRequestsCount] = useState('')

    useEffect(() => {
        if (data) {
            setPendingRequest(data?.pendingRequestsCount || 0)
            setRequestsCount(data?.requestsCount || 0)
            setViewedRequestsCount(data?.viewedRequestsCount || 0)
        }
    }, [data])


    const handleEdit = async () => {
        setLoading(true)
        try {
            const EditData = {
                pendingRequestsCount: PendingRequest,
                requestsCount: requestsCount,
                viewedRequestsCount: viewedRequestsCount
            }
            await axios.put(`/statistic/update/${data?.id}`, EditData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            });

            Swal.fire({
                title: 'Muvaffaqiyatli!',
                icon: 'success',
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
            refresh()
            onClose()
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Error.',
                icon: 'error',
                position: 'top-end',
                timer: 3000,
                timerProgressBar: true,
                showCloseButton: true,
                toast: true,
                showConfirmButton: false,
            });
        } finally {
            setLoading(false)
        }
    }

    return (
        <NormalModal isOpen={isOpen} onClose={onClose}>
            <div className="p-[20px]">
                <div className="flex items-center justify-between">
                    <h1 className="text-[25px] font-bold">Statistika yangilash</h1>
                    <button onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14">
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7L.293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div className="mt-[10px]">
                    <div className="flex items-center justify-between gap-[10px] w-full">
                    </div>
                    <div className="flex items-center justify-between gap-[10px] mt-[10px] w-full">
                        <Input
                            type={'number'}
                            value={PendingRequest}
                            onChange={(e) => setPendingRequest(e.target.value)}
                            inputText={"Kutilayotgan so'rovlar soni"} placeholder={"...."} />
                    </div>
                    <div className="flex items-center justify-between gap-[10px] mt-[10px] w-full">
                        <Input
                            type={'number'}
                            value={requestsCount}
                            onChange={(e) => setRequestsCount(e.target.value)}
                            inputText={"Sorovlar soni"} placeholder={"...."} />
                    </div>
                    <div className="flex items-center justify-between gap-[10px] mt-[10px] w-full">
                        <Input
                            type={'number'}
                            value={viewedRequestsCount}
                            onChange={(e) => setViewedRequestsCount(e.target.value)}
                            inputText={"Koʻrilgan soʻrovlar soni"} placeholder={"...."} />
                    </div>
                    <button
                        disabled={loading}
                        onClick={handleEdit}
                        className={`w-full px-4 py-2 rounded-lg shadow-lg border-2 mt-[20px] duration-500 ${loading ? 'bg-gray-400 border-gray-400 text-white cursor-not-allowed' : 'bg-MainColor border-MainColor text-white hover:text-MainColor hover:bg-transparent'}`}>
                        {loading ? 'Yamgilanmoqda...' : 'Yangilash'}
                    </button>
                </div>
            </div>
        </NormalModal>
    );
}
