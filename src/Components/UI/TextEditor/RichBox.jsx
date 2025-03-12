import React, { useState } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";

import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/char_counter.min.js";
import "froala-editor/js/plugins/code_beautifier.min.js";
import "froala-editor/js/plugins/code_view.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/draggable.min.js";
import "froala-editor/js/plugins/emoticons.min.js";
import "froala-editor/js/plugins/entities.min.js";
import "froala-editor/js/plugins/file.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/fullscreen.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/image_manager.min.js";
import "froala-editor/js/plugins/inline_class.min.js";
import "froala-editor/js/plugins/inline_style.min.js";
import "froala-editor/js/plugins/line_breaker.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/paragraph_style.min.js";
import "froala-editor/js/plugins/quick_insert.min.js";
import "froala-editor/js/plugins/quote.min.js";
import "froala-editor/js/plugins/save.min.js";
import "froala-editor/js/plugins/special_characters.min.js";
import "froala-editor/js/plugins/table.min.js";
import "froala-editor/js/plugins/url.min.js";
import "froala-editor/js/plugins/video.min.js";
import "froala-editor/js/plugins/word_paste.min.js";

// Подключаем стили
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/plugins/image.min.css";
import "froala-editor/css/plugins/table.min.css";
import "froala-editor/css/plugins/colors.min.css";
import "froala-editor/css/plugins/code_view.min.css";
import "froala-editor/css/plugins/video.min.css";
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


    const handleImageUpload = (files) => {
        return new Promise((resolve, reject) => {
            if (!files.length) {
                reject('No files selected');
                return;
            }

            // Показываем модальное окно загрузки
            setIsLoading(true);
            const formData = new FormData();
            formData.append('file', files[0]);

            axios.post('/data/media/upload', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    // Скрываем модальное окно загрузки

                    setIsLoading(false);

                    if (response.data) {
                        const newFileId = response?.data?.object?.id;
                        resolve(response?.data?.object?.mediaUrl);
                        console?.log(response?.data?.object?.mediaUrl)
                        FileArr(prev => [...prev, newFileId])
                    } else {
                        reject('Invalid response from server');
                    }
                })
                .catch(error => {
                    // Скрываем модальное окно загрузки в случае ошибки
                    setIsLoading(false);
                    console.error('Error uploading image:', error);
                    reject(error);
                });
        });
    };

    return (
        <div>
            {/* Модальное окно загрузки */}
            <LoadingModal isOpen={isLoading} />

            <FroalaEditorComponent
                tag="textarea"
                model={value}
                onModelChange={onChange}
                config={{
                    placeholderText: "Начни писать...",
                    height: 400,
                    theme: "gray",
                    toolbarSticky: true,
                    toolbarButtons: [
                        "undo", "redo", "|",
                        "bold", "italic", "underline", "strikeThrough", "|",
                        "fontFamily", "fontSize", "color", "|",
                        "formatOL", "formatUL", "align", "|",
                        "insertTable", "insertImage", "insertVideo", "insertLink", "|",
                        "quote", "insertFile", "emoticons", "|",
                        "codeView", "fullscreen"
                    ],
                    pluginsEnabled: [
                        "align", "charCounter", "codeBeautifier", "codeView", "colors",
                        "draggable", "emoticons", "entities", "file", "fontFamily", "fontSize",
                        "fullscreen", "image", "imageManager", "inlineClass", "inlineStyle",
                        "lineBreaker", "link", "lists", "paragraphFormat", "paragraphStyle",
                        "quickInsert", "quote", "save", "specialCharacters", "table",
                        "url", "video", "wordPaste"
                    ],
                    // Изменяем настройки загрузки изображений
                    imageUpload: true,
                    imageUploadMethod: 'POST',
                    imageUploadParam: 'image',
                    imageUploadURL: null, // Отключаем встроенную отправку Froala
                    imageUploadParams: {}, // Дополнительные параметры для запроса
                    imageAllowedTypes: ["jpeg", "jpg", "png", "gif", "webp"],

                    // Используем события для перехвата загрузки
                    events: {
                        'image.beforeUpload': function (images) {
                            // Останавливаем стандартную загрузку
                            const editor = this;

                            handleImageUpload(images)
                                .then(imagePath => {
                                    // Вставляем изображение по полученному пути
                                    editor.image.insert(imagePath, null, null, editor.image.get());
                                })
                                .catch(error => {
                                    console.error('Failed to upload image:', error);
                                    // Показываем сообщение об ошибке
                                    editor.popups.get('image.insert').find('.fr-error-message').text('Image upload failed');
                                    editor.popups.get('image.insert').find('.fr-error-message').show();
                                });

                            // Возвращаем false, чтобы отменить стандартную загрузку
                            return false;
                        },
                        'image.error': function (error, response) {
                            console.error('Froala Editor image error:', error, response);
                        }
                    },

                    imageDefaultWidth: 300,
                    imagePaste: true,
                    videoUpload: true,
                    videoAllowedTypes: ["mp4", "webm", "ogg"],
                    tableResizer: true,
                    tableStyles: {
                        "fr-dashed-borders": "Dashed Borders",
                        "fr-alternate-rows": "Alternate Rows"
                    },
                    paragraphFormat: {
                        N: "Normal",
                        H1: "Heading 1",
                        H2: "Heading 2",
                        H3: "Heading 3",
                        H4: "Heading 4",
                        BLOCKQUOTE: "Quote"
                    },
                    fontFamily: {
                        "Arial,Helvetica,sans-serif": "Arial",
                        "Georgia,serif": "Georgia",
                        "Impact,Charcoal,sans-serif": "Impact",
                        "Tahoma,Geneva,sans-serif": "Tahoma",
                        "'Times New Roman',Times,serif": "Times New Roman",
                        "Verdana,Geneva,sans-serif": "Verdana"
                    },
                    fontSize: ["8", "10", "12", "14", "16", "18", "20", "24", "30", "36"],
                    colorsBackground: [
                        "#000000", "#333333", "#666666", "#999999", "#BBBBBB", "#DDDDDD", "#FFFFFF",
                        "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF"
                    ],
                    colorsText: [
                        "#000000", "#333333", "#666666", "#999999", "#BBBBBB", "#DDDDDD", "#FFFFFF",
                        "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF"
                    ],
                    shortcutsEnabled: ["bold", "italic", "underline", "strikeThrough", "insertTable", "insertLink"],
                    saveInterval: 5000, // Автосохранение каждые 5 секунд
                    codeBeautifierOptions: {
                        end_with_newline: true,
                        indent_inner_html: true,
                        indent_size: 2,
                        indent_char: " ",
                        wrap_line_length: 0,
                        extra_liners: []
                    }
                }}
            />
        </div>
    );
}