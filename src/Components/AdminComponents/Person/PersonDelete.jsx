import axios from "axios";
import SmallModal from "../../UI/Modals/SmallModal";
import Swal from 'sweetalert2';


export default function PersonDelete({ isOpen, onClose, data, refresh }) {

    const deleteNews = async () => {
        try {
            await axios.delete(`/api/person/delete/${data}`, {
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
        }
    }

    return (
        <SmallModal isOpen={isOpen} onClose={onClose}>
            <div className="">
                <div className='p-[10px] pb-[30px]'>
                    <div className='flex items-center justify-end p-[10px] pb-[15px]'>
                        <button onClick={onClose}>
                            <svg className='opacity-[0.8] text-[10px]' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 14 14">
                                <path fill="currentColor" fillRule="evenodd" d="M1.707.293A1 1 0 0 0 .293 1.707L5.586 7L.293 12.293a1 1 0 1 0 1.414 1.414L7 8.414l5.293 5.293a1 1 0 0 0 1.414-1.414L8.414 7l5.293-5.293A1 1 0 0 0 12.293.293L7 5.586z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <h2 className='opacity-[0.8] text-center'>
                            Haqiqatan ham o'chirishni xohlaysizmi?
                        </h2>
                        <div className='flex items-center justify-center mt-[15px] gap-[20px]'>
                            <button
                                onClick={onClose} className='border-[1px] hover:bg-[#6062665b] duration-500 rounded-[5px] text-center py-[9px] px-[15px] text-[12px]'>
                                Bekor qilish
                            </button>
                            <button
                                onClick={deleteNews}
                                className='rounded-[5px] bg-[red] text-center hover:opacity-[0.5] duration-500 py-[9px] px-[15px] text-[white] text-[12px]'
                            >
                                Qabul qilish
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </SmallModal>
    )
}