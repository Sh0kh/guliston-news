import { useState, useEffect, forwardRef } from "react";

const HeaderVison = forwardRef(({ isOpen, }, ref) => {
    const [fontSize, setFontSize] = useState(100);
    const [zoom, setZoom] = useState(100);

    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}%`;
    }, [fontSize]);

    useEffect(() => {
        document.body.style.zoom = `${zoom}%`;
    }, [zoom]);

    const Default = () => {
        document.documentElement.classList.remove("theme-dark", "theme-gray");
    };

    const ThemeDark = () => {
        document.documentElement.classList.add("theme-dark");
        document.documentElement.classList.remove( "theme-gray");

    };

    const ThemeGray = () => {
        document.documentElement.classList.add("theme-gray");
    };

    return (
        <div
        ref={ref}
        className={`visonModal absolute top-[65px] right-[350px] rounded-[8px] border border-[#E9EAEB] w-[300px] bg-white p-[20px] shadow-md ${
            isOpen ? "!block" : "hidden"
        }`}
    >
    
            <h2 className="text-[16px] text-black font-bold">Tashqi ko‘rinish</h2>
            <div className="flex items-center gap-3 mt-3">
                <button onClick={Default} className="w-12 h-12 rounded bg-[#1F235B] text-white font-bold">A</button>
                <button onClick={ThemeDark} className="w-12 h-12 rounded bg-[#717680] text-white font-bold">A</button>
                <button onClick={ThemeGray} className="w-12 h-12 rounded bg-[#252B37] text-white font-bold">A</button>
            </div>
            <div className="mt-3">
                <label className="w-full">
                    <div className="flex items-center justify-between w-full">
                        <span className="text-[16px] text-black font-bold">Shrift hajmi</span>
                        <span className="text-[16px] text-black font-bold">{fontSize}%</span>
                    </div>
                    <input
                        type="range"
                        min="50"
                        max="200"
                        value={fontSize}
                        onChange={(e) => setFontSize(e.target.value)}
                        className="block mt-1 w-full h-[20px] outline-none rounded-lg"
                    />
                </label>
                <label className="w-full block mt-3">
                    <div className="flex items-center justify-between w-full">
                        <span className="text-[16px] text-black font-bold">Katta-kichiklik</span>
                        <span className="text-[16px] text-black font-bold">{zoom}%</span>
                    </div>
                    <input
                        type="range"
                        min="50"
                        max="150"
                        value={zoom}
                        onChange={(e) => setZoom(e.target.value)}
                        className="block mt-1 w-full h-[20px] outline-none rounded-lg"
                    />
                </label>
            </div>
        </div>
    );
});

export default HeaderVison;
