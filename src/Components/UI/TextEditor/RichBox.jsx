import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";

// Используем React.lazy для динамического импорта Froala
const FroalaEditorComponent = lazy(() => import('react-froala-wysiwyg'));

// Создаем ErrorBoundary компонент
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('Rich Editor Error:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return <div style={{
                padding: '20px',
                border: '1px solid #ff0000',
                borderRadius: '4px',
                color: '#ff0000',
                backgroundColor: '#fff1f1',
                textAlign: 'center'
            }}>
                Произошла ошибка в редакторе. Пожалуйста, перезагрузите страницу.
            </div>;
        }

        return this.props.children;
    }
}

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
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

// Основной компонент RichBox
export default function RichBox({ value, onChange, FileArr }) {
    const [isLoading, setIsLoading] = useState(false);
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [editorConfig, setEditorConfig] = useState(null);

    // Инициализируем плагины Froala только на клиентской стороне
    useEffect(() => {
        const loadFroalaPlugins = async () => {
            try {
                // Подключаем только самые необходимые плагины
                await import("froala-editor/js/plugins/align.min.js");
                await import("froala-editor/js/plugins/colors.min.js");
                await import("froala-editor/js/plugins/font_family.min.js");
                await import("froala-editor/js/plugins/font_size.min.js");
                await import("froala-editor/js/plugins/image.min.js");
                await import("froala-editor/js/plugins/link.min.js");
                await import("froala-editor/js/plugins/lists.min.js");
                await import("froala-editor/js/plugins/paragraph_format.min.js");
                await import("froala-editor/js/plugins/table.min.js");
                await import("froala-editor/js/plugins/video.min.js");
                await import("froala-editor/js/plugins/fullscreen.min.js");
                await import("froala-editor/js/plugins/code_view.min.js");
                await import("froala-editor/js/plugins/file.min.js");
                await import("froala-editor/js/plugins/emoticons.min.js");

                // Подключаем стили
                await import("froala-editor/css/froala_style.min.css");
                await import("froala-editor/css/froala_editor.pkgd.min.css");
                await import("froala-editor/css/plugins/image.min.css");
                await import("froala-editor/css/plugins/table.min.css");
                await import("froala-editor/css/plugins/colors.min.css");
                await import("froala-editor/css/plugins/code_view.min.css");
                await import("froala-editor/css/plugins/video.min.css");

                // Создаем конфигурацию редактора
                setEditorConfig({
                    placeholderText: "Начни писать...",
                    height: 400,
                    theme: "gray",
                    toolbarSticky: true,
                    toolbarButtons: [
                        "undo", "redo", "|",
                        "bold", "italic", "underline", "|",
                        "fontFamily", "fontSize", "color", "|",
                        "formatOL", "formatUL", "align", "|",
                        "insertTable", "insertImage", "insertLink", "|",
                        "quote", "insertFile", "emoticons", "|",
                        "codeView", "fullscreen"
                    ],
                    pluginsEnabled: [
                        "align", "colors", "fontFamily", "fontSize", "fullscreen",
                        "image", "link", "lists", "paragraphFormat", "quote",
                        "table", "video", "codeView", "file", "emoticons"
                    ],
                    imageUpload: true,
                    imageUploadURL: null,
                    imageAllowedTypes: ["jpeg", "jpg", "png", "gif", "webp"],
                    imageMaxSize: 5 * 1024 * 1024,
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
                        "Tahoma,Geneva,sans-serif": "Tahoma",
                        "'Times New Roman',Times,serif": "Times New Roman",
                        "Verdana,Geneva,sans-serif": "Verdana"
                    },
                    fontSize: ["8", "10", "12", "14", "16", "18", "20", "24"],
                    colorsBackground: [
                        "#000000", "#333333", "#666666", "#999999", "#BBBBBB", "#FFFFFF",
                        "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF"
                    ],
                    colorsText: [
                        "#000000", "#333333", "#666666", "#999999", "#BBBBBB", "#FFFFFF",
                        "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#00FFFF"
                    ],
                    saveInterval: 10000,
                    events: {
                        'initialized': function () {
                            setEditorLoaded(true);
                        },
                        'image.beforeUpload': function (images) {
                            // Останавливаем стандартную загрузку
                            const editor = this;

                            // Проверка размера изображения
                            if (images[0] && images[0].size > 5 * 1024 * 1024) {
                                editor.popups.get('image.insert').find('.fr-error-message')
                                    .text('Изображение слишком большое (максимум 5MB)');
                                editor.popups.get('image.insert').find('.fr-error-message').show();
                                return false;
                            }

                            handleImageUpload(images)
                                .then(imagePath => {
                                    // Вставляем изображение по полученному пути
                                    editor.image.insert(imagePath, null, null, editor.image.get());
                                })
                                .catch(error => {
                                    console.error('Failed to upload image:', error);
                                    editor.popups.get('image.insert').find('.fr-error-message')
                                        .text('Ошибка загрузки изображения');
                                    editor.popups.get('image.insert').find('.fr-error-message').show();
                                });

                            return false;
                        },
                        'image.error': function (error, response) {
                            console.error('Froala Editor image error:', error, response);
                        },
                        'contentChanged': function () {
                            // Проверка размера контента
                            const contentLength = this.html.get().length;
                            if (contentLength > 500000) { // ~500KB
                                console.warn('Content size is getting large, consider splitting into multiple sections');
                            }
                        }
                    }
                });

                setEditorLoaded(true);
            } catch (error) {
                console.error("Error loading Froala plugins:", error);
            }
        };

        loadFroalaPlugins();
    }, []);

    // Функция для загрузки изображений
    const handleImageUpload = (files) => {
        return new Promise((resolve, reject) => {
            if (!files.length) {
                reject('No files selected');
                return;
            }

            // Проверка размера файла
            if (files[0].size > 5 * 1024 * 1024) { // 5MB
                reject('Image is too large (max 5MB)');
                return;
            }

            // Показываем модальное окно загрузки
            setIsLoading(true);
            const formData = new FormData();
            formData.append('file', files[0]);

            // Сжатие изображения перед загрузкой для больших изображений
            if (files[0].type.includes('image') && files[0].size > 1024 * 1024) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        // Уменьшаем размер изображения, если оно слишком большое
                        let width = img.width;
                        let height = img.height;
                        const maxDimension = 1200;

                        if (width > maxDimension || height > maxDimension) {
                            if (width > height) {
                                height = Math.round(height * (maxDimension / width));
                                width = maxDimension;
                            } else {
                                width = Math.round(width * (maxDimension / height));
                                height = maxDimension;
                            }
                        }

                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);

                        // Конвертируем в файл с меньшим качеством
                        canvas.toBlob((blob) => {
                            const optimizedFile = new File([blob], files[0].name, {
                                type: 'image/jpeg',
                                lastModified: new Date().getTime()
                            });

                            const optimizedFormData = new FormData();
                            optimizedFormData.append('file', optimizedFile);

                            // Отправляем оптимизированное изображение
                            uploadToServer(optimizedFormData);
                        }, 'image/jpeg', 0.8); // Качество 80%
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(files[0]);
            } else {
                // Для других типов файлов или маленьких изображений
                uploadToServer(formData);
            }

            function uploadToServer(formData) {
                axios.post('/data/media/upload', formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data'
                    },
                    timeout: 30000
                })
                    .then(response => {
                        setIsLoading(false);

                        if (response.data && response.data.object && response.data.object.mediaUrl) {
                            const newFileId = response.data.object.id;
                            resolve(response.data.object.mediaUrl);

                            if (typeof FileArr === 'function') {
                                FileArr(prev => [...prev, newFileId]);
                            }
                        } else {
                            reject('Invalid response from server');
                        }
                    })
                    .catch(error => {
                        setIsLoading(false);
                        console.error('Error uploading image:', error);
                        reject(error);
                    });
            }
        });
    };

    // Показываем загрузку, пока редактор не инициализирован
    if (!editorLoaded || !editorConfig) {
        return <div>Загрузка редактора...</div>;
    }

    return (
        <div className="rich-editor-container">
            {/* Модальное окно загрузки */}
            <LoadingModal isOpen={isLoading} />

            {/* ErrorBoundary для предотвращения краха всего приложения */}
            <ErrorBoundary>
                <Suspense fallback={<div>Загрузка редактора...</div>}>
                    <FroalaEditorComponent
                        tag="textarea"
                        model={value}
                        onModelChange={onChange}
                        config={editorConfig}
                    />
                </Suspense>
            </ErrorBoundary>

            {/* Глобальные стили для редактора */}
            <style>{`
                .rich-editor-container .fr-box {
                    max-height: 80vh;
                    overflow: auto;
                }
                .rich-editor-container .fr-wrapper {
                    min-height: 200px;
                }
                .rich-editor-container .fr-view img {
                    max-width: 100%;
                    height: auto !important;
                }
                .rich-editor-container .fr-toolbar {
                    z-index: 10 !important;
                }
                .rich-editor-container .fr-popup {
                    z-index: 20 !important;
                }
            `}</style>
        </div>
    );
}