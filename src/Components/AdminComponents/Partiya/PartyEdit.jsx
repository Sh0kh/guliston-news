import { useEffect, useState } from "react";
import Input from "../../UI/Inputs/Input";
import NormalModal from "../../UI/Modals/NormalModal";
import Swal from 'sweetalert2';
import axios from "axios";

export default function PartyEdit({ isOpen, onClose, refresh, data }) {

    const [category, setCategory] = useState("");
    const [countyName, setCountyName] = useState("");
    const [fullName, setFullName] = useState("");
    const [memberPosition, setMemberPosition] = useState("");
    const [order, setOrder] = useState("");
    const [partyName, setPartyName] = useState("");
    const [province, setProvince] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(()=>{
        if(data){
            setCategory(data.category || '');
            setCountyName(data.countyName || '');
            setFullName(data.fullName || '');
            setMemberPosition(data.memberPosition || '');
            setOrder(data.order || '');
            setPartyName(data.partyName || '');
            setProvince(data.province || '');
        }
    },[data])

    const handleEdit = async () => {
        setLoading(true);
        try {
            const body = {
                category,
                countyName,
                fullName,
                memberPosition,
                order: Number(order),
                partyName,
                province
            };

            await axios.put(`/party/update/${data?.id}`, body, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
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
            refresh();
            setCategory("");
            setCountyName("");
            setFullName("");
            setMemberPosition("");
            setOrder("");
            setPartyName("");
            setProvince("");
            onClose();
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
            setLoading(false);
        }
    };

    return (
        <NormalModal isOpen={isOpen} onClose={onClose}>
            <div className="p-[20px]">
                <div className="flex items-center justify-between">
                    <h1 className="text-[25px] font-bold">Partiya yangilash</h1>
                    <button onClick={onClose}>✖</button>
                </div>
                <div className="mt-[10px] flex items-center flex-col gap-[10px]">
                    <Input value={countyName} onChange={(e) => setCountyName(e.target.value)} inputText={"Tuman nomi"} placeholder={"...."} />
                    <Input value={fullName} onChange={(e) => setFullName(e.target.value)} inputText={"F.I.O"} placeholder={"...."} />
                    <Input value={memberPosition} onChange={(e) => setMemberPosition(e.target.value)} inputText={"A'zo pozitsiyasi"} placeholder={"...."} />
                    <Input type={'number'} value={order} onChange={(e) => setOrder(e.target.value)} inputText={"Buyurtma"} placeholder={"...."} />
                    <Input value={partyName} onChange={(e) => setPartyName(e.target.value)} inputText={"Partiya nomi"} placeholder={"...."} />
                    <Input value={province} onChange={(e) => setProvince(e.target.value)} inputText={"Viloyat"} placeholder={"...."} />
                    <label className="w-full">
                        <span className="text-[black] block text-[13px] cursor-pointer">Kategoriya</span>
                        <select
                            value={category || ""}
                            onChange={(e) => setCategory(e.target.value)}
                            className="py-[5px] w-full px-[10px] rounded-[5px] outline-MainColor border-[2px] border-black text-[black] bg-[white]"
                        >
                            <option value="" disabled>...</option>
                            <option value="DEPUTATLAR_TARKIBI">Deputatlar tarkibi</option>
                            <option value="DOIMIY_KOMISSIYA_AZOLARI">Doimiy komissiya azolari</option>
                            <option value="KOMMISIYA_KOMAKLASHUVI">Kommissiya yordam berishi</option>
                            <option value="KOTIBIYAT_MUDIRLARI">Kotibiyat mudirlari</option>
                            <option value="SENAT_AZOLARI">Senat a'zolari</option>
                        </select>
                    </label>
                    <button
                        disabled={loading}
                        onClick={handleEdit}
                        className={`w-full px-4 py-2 rounded-lg shadow-lg border-2 duration-500 ${loading ? 'bg-gray-400 border-gray-400 text-white cursor-not-allowed' : 'bg-MainColor border-MainColor text-white hover:text-MainColor hover:bg-transparent'}`}
                    >
                        {loading ? 'Yaratilmoqda...' : 'Yangilash'}
                    </button>
                </div>
            </div>
        </NormalModal>
    );
}