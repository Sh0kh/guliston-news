import { useRef, useState, useCallback, useEffect } from "react";
import Input from "../../UI/Inputs/Input";
import Swal from 'sweetalert2';
import axios from "axios";
import BigModal from "../../UI/Modals/BigModal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function UserRecEdit({ isOpen, onClose, refresh, data }) {
    const [title, setTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState();
    const quillRef = useRef(null);



    useEffect(() => {
        if (data) {
            setTitle(data?.title)
            setContent(data?.context)
        }
    }, [data])

    const handleEdit = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("title", title);
            formData.append("category", ' FUQAROLAR_QABULI');
            formData.append("context", content);
            await axios.put(`/organization/update/${data?.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
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
            setTitle('')
            setContent('')
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

    const handleQuillChange = useCallback((newContent) => {
        setContent(newContent);
    }, []);

    const handleImageUpload = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = () => {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const quill = quillRef.current.getEditor();
                    const range = quill.getSelection(true); // Получаем текущее выделение или создаем его
                    if (range) {
                        const base64Image = e.target.result;
                        quill.insertEmbed(range.index, "image", base64Image);
                        quill.setSelection(range.index + 1); // Перемещаем курсор после изображения
                    }
                };
                reader.readAsDataURL(file);
            }
        };
    }, []);

    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["image", "link"],
            ],
            handlers: {
                image: handleImageUpload,
            },
        },
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "list",
        "bullet",
        "image",
        "link",
    ];

    return (
        <BigModal isOpen={isOpen} onClose={onClose}>
            <div className="p-[20px]">
                <div className="flex items-center justify-between">
                    <h1 className="text-[25px] font-bold">Malumotni o'zgartirish</h1>
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
                    <div className="flex items-center justify-between gap-[10px] mt-[10px] w-[50%]">
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            inputText={"Title"} placeholder={"...."} />
                    </div>
                    <div className="mt-[20px]">
                        <ReactQuill
                            ref={quillRef}
                            value={content}
                            onChange={handleQuillChange}
                            modules={modules}
                            formats={formats}
                            placeholder="..."
                            style={{ height: "300px", marginBottom: '50px' }}
                        />
                    </div>
                    <style jsx>{`
        .editor-container :global(.ql-editor) {
          min-height: 300px;
          font-size: 16px;
        }
        .editor-container :global(.ql-container) {
          border-radius: 0 0 4px 4px;
        }
        .editor-container :global(.ql-toolbar) {
          border-radius: 4px 4px 0 0;
        }
        .editor-container :global(.ql-editor img) {
          max-width: 100%;
          height: auto;
        }
      `}</style>
                    <button
                        disabled={loading}
                        onClick={handleEdit}
                        className={`w-full px-4 py-2 rounded-lg mt-[20px] shadow-lg border-2 duration-500 ${loading ? 'bg-gray-400 border-gray-400 text-white cursor-not-allowed' : 'bg-MainColor border-MainColor text-white hover:text-MainColor hover:bg-transparent'}`}>
                        {loading ? 'Yangilanmoqda...' : 'o`zgartirish'}
                    </button>
                </div>
            </div>
        </BigModal>
    );
}
