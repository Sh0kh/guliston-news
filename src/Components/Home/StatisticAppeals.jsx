import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function StatisticAppeals({Stdata}) {
       const { t, i18n } = useTranslation();
    
    

    const [counts, setCounts] = useState({
        requestsCount: 0,
        viewedRequestsCount: 0,
        pendingRequestsCount: 0,
        percentViewedRequestsCount: 0,
    });
    const [progress, setProgress] = useState(0);

 

    useEffect(() => {
        if (Stdata) {
            animateCount("requestsCount", Stdata?.object?.requestsCount);
            animateCount("viewedRequestsCount", Stdata?.object?.viewedRequestsCount);
            animateCount("pendingRequestsCount", Stdata?.object?.pendingRequestsCount);
            animateCount("percentViewedRequestsCount", Stdata?.object?.percentViewedRequestsCount);
        }
    }, [Stdata]);

    const animateCount = (key, targetValue) => {
        const duration = 2000; // Время анимации в миллисекундах
        const stepTime = 50;
        const steps = duration / stepTime;
        const increment = targetValue / steps;

        let current = 0;
        const interval = setInterval(() => {
            current += increment;
            setCounts(prev => ({
                ...prev,
                [key]: Math.ceil(current),
            }));
            if (current >= targetValue) {
                clearInterval(interval);
                setCounts(prev => ({ ...prev, [key]: targetValue }));
            }
        }, stepTime);
    };

    useEffect(() => {
        setTimeout(() => {
            setProgress(80);
        }, 100);
    }, []);

    return (
        <section className="StatisticAppeals bg-[white] py-[30px]">
            <div className="Container">
                <h1 className="border-l-MainColor border-l-[3px] pl-[10px] text-[28px] font-bold text-[#1F1F1F]">
                    {t("Sirdaryo-raqam")}
                </h1>
                <div className="StatisticAppeals__wrapper flex items-center justify-between gap-[40px]">
                    {Object.keys(counts).map((key, index) => (
                        <div key={index} className="w-full cursor-pointer">
                            <div className="flex items-end justify-between mt-[30px]">
                                <h2 className="text-[18px] font-bold text-[#262626]">
                                    {key === "requestsCount" && "Ko‘rib chiqilmoqda"}
                                    {key === "viewedRequestsCount" && "Ko'rilgan so'rovlar soni:"}
                                    {key === "pendingRequestsCount" && "Kutilayotgan so'rovlar soni:"}
                                    {key === "percentViewedRequestsCount" && "Koʻrilgan soʻrovlar foizda"}
                                </h2>
                                <span className="text-[40px] h-[50px] font-bold text-[#262626]">
                                    {counts[key] || 0}
                                </span>
                            </div>
                            <div className="w-[100%] h-[1rem] bg-[#A4C6EA] mt-[20px] rounded-[5px] overflow-hidden">
                                <div
                                    className="h-[100%] bg-[#0568C5] rounded-[5px]"
                                    style={{
                                        width: `${progress}%`,
                                        transition: "width 2s ease-in-out",
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
