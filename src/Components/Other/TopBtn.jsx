import { useState, useEffect } from "react";

export default function TopBtn() {
    const [isVisible, setIsVisible] = useState(false);

    // Следим за скроллом страницы
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div
            className={`fixed bottom-[2%] z-40 right-[1%] flex items-center justify-center text-white text-[40px] cursor-pointer w-[60px] h-[60px] rounded-[20%] bg-[#144A96] transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
            onClick={scrollToTop}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path fill="currentColor" d="M15 20H9v-8H4.16L12 4.16L19.84 12H15z"></path>
            </svg>
        </div>
    );
}
