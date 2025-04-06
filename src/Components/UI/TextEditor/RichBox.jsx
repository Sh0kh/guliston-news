import React, { useState, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';
import axios from "axios";

// Компонент модального окна загрузки
const LoadingModal = ({ isOpen }) => {
    if (!isOpen) return null;
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '20px 40px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                textAlign: 'center'
            }}>
                <div style={{ marginBottom: '15px' }}>
                    <div style={{
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #3498db',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        animation: 'spin 2s linear infinite',
                        margin: '0 auto'
                    }}></div>
                </div>
                <p style={{ fontSize: '16px', margin: 0 }}>Загрузка...</p>
            </div>
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default function RichBox({ value, onChange, FileArr }) {
    const [isLoading, setIsLoading] = useState(false);
    const editorRef = useRef(null);

    // Обработчик загрузки изображений
    const handleImageUpload = (blobInfo, progress) => {
        return new Promise((resolve, reject) => {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());

            axios.post('/data/media/upload', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (e) => {
                    progress(e.loaded / e.total * 100);
                }
            })
                .then(response => {
                    setIsLoading(false);
                    if (response.data) {
                        const newFileId = response?.data?.object?.id;
                        FileArr(prev => [...prev, newFileId]);
                        resolve(response?.data?.object?.mediaUrl);
                    } else {
                        reject('Invalid response from server');
                    }
                })
                .catch(error => {
                    setIsLoading(false);
                    console.error('Error uploading image:', error);
                    reject({ message: 'Error uploading image', remove: true });
                });
        });
    };

    // Обработчик загрузки файлов через TinyMCE
    const handleFileUpload = (callback, value, meta) => {
        // Создаем скрытый input элемент для выбора файла
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', '*/*');

        input.onchange = function () {
            const file = this.files[0];
            if (!file) {
                callback('', { title: '' });
                return;
            }

            setIsLoading(true);
            const formData = new FormData();
            formData.append('file', file);

            axios.post('/data/media/upload', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    setIsLoading(false);
                    if (response.data) {
                        const newFileId = response?.data?.object?.id;
                        const filePath = response?.data?.object?.mediaUrl;
                        FileArr(prev => [...prev, newFileId]);
                        callback(filePath, { title: file.name });
                    } else {
                        callback('', { title: 'Error: Invalid response from server' });
                    }
                })
                .catch(error => {
                    setIsLoading(false);
                    console.error('Error uploading file:', error);
                    callback('', { title: 'Error: File upload failed' });
                });
        };

        input.click();
    };

    return (
        <div>
            {/* Модальное окно загрузки */}
            <LoadingModal isOpen={isLoading} />

            {/* Стили для выравнивания текста */}
            <style jsx global>{`
                .text-left {
                    text-align: left !important;
                }
                .text-center {
                    text-align: center !important;
                }
                .text-right {
                    text-align: right !important;
                }
                .text-justify {
                    text-align: justify !important;
                }
            `}</style>

            {/* TinyMCE Editor */}
            <Editor
                apiKey="swbxllpubas9mkbcofu5g23turhtv6yx2bq0ajg10w5d1gol"
                onInit={(evt, editor) => editorRef.current = editor}
                value={value}
                onEditorChange={onChange}
                init={{
                    height: 400,
                    placeholder: "Начни писать...",
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
                        'emoticons', 'save', 'autosave'
                    ],
                    toolbar: 'undo redo | ' +
                        'bold italic underline strikethrough | ' +
                        'fontfamily fontsize forecolor backcolor | ' +
                        'alignleft aligncenter alignright alignjustify | ' +
                        'numlist bullist | ' +
                        'table image media link file | ' +
                        'emoticons blockquote | ' +
                        'code fullscreen',

                    // Настройки изображений
                    image_advtab: true,
                    automatic_uploads: true,
                    images_upload_handler: handleImageUpload,
                    images_reuse_filename: true,

                    // Настройки для файлов
                    file_picker_types: 'file',
                    file_picker_callback: handleFileUpload,

                    // Настройки таблиц
                    table_default_attributes: {
                        border: 1
                    },
                    table_default_styles: {
                        'border-collapse': 'collapse',
                        'width': '100%'
                    },
                    table_responsive_width: true,

                    // Настройки форматирования с исправленными классами выравнивания
                    formats: {
                        alignleft: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'text-left' },
                        aligncenter: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'text-center' },
                        alignright: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'text-right' },
                        alignjustify: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table', classes: 'text-justify' }
                    },

                    // Добавляем стили для предпросмотра в редакторе
                    content_style: `
                        body { font-family: Arial, Helvetica, sans-serif; font-size: 14px; }
                        .text-left { text-align: left !important; }
                        .text-center { text-align: center !important; }
                        .text-right { text-align: right !important; }
                        .text-justify { text-align: justify !important; }
                    `,

                    // Настройки шрифтов
                    fontsize_formats: '8pt 10pt 12pt 14pt 16pt 18pt 20pt 24pt 30pt 36pt',
                    font_family_formats: 'Arial=arial,helvetica,sans-serif; Georgia=georgia,serif; Impact=impact,charcoal,sans-serif; Tahoma=tahoma,geneva,sans-serif; "Times New Roman"=times new roman,times,serif; Verdana=verdana,geneva,sans-serif',

                    // Настройки поведения
                    paste_data_images: true,
                    browser_spellcheck: true,
                    contextmenu: 'link image table',

                    // Автосохранение
                    autosave_interval: '5s',
                    autosave_retention: '20m',

                    // Другие настройки
                    promotion: false,
                    setup: function (editor) {
                        editor.on('change', function () {
                            editor.save();
                        });
                    }
                }}
            />
        </div>
    );
}