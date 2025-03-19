import { NavLink } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import { useTranslation } from 'react-i18next';

import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

export default function Hero() {
  useGSAP(() => {
    gsap.fromTo(
      ".News__hero__card",
      { opacity: 0, y: 100, zIndex: 1 },
      { opacity: 1, y: 0, zIndex: 1, duration: 1.3, ease: "power1.inOut" }
    );
  });
    const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const getNews = async (currentPage) => {
    try {
      const response = await axios.get(`/article/admin/findAll`, {
        params: { page: currentPage, size: 10 },
      });

      const newData = response.data?.object?.content || [];

      // Проверка на дублирование
      setData((prevData) => {
        const uniqueData = newData.filter((item) => !prevData.some((prev) => prev.id === item.id));
        return [...prevData, ...uniqueData];
      });

      setIsLastPage(response.data?.object?.last || false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews(page);
  }, []);

  const loadMore = () => {
    getNews(page + 1);
    setPage((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <ReactLoading type="spinningBubbles" color="#1466B3" height={100} width={100} />
      </div>
    );
  }

  return (
    <section className="News__Hero py-[30px]">
      <div className="Container">
        <h1 className="News__Hero__title border-l-MainColor mb-[30px] border-l-[3px] pl-[10px] text-[28px] font-bold text-[#1F1F1F]">
        {t("news")}
        </h1>
        <div className="flex items-center flex-col">
          {data.length === 0 ? (
            <div className="flex flex-col items-center text-center py-10">
              <p className="mt-4 text-gray-600 text-lg">Hozircha yangiliklar mavjud emas</p>
            </div>
          ) : (
            data.map((news) => (
              <NavLink
                key={news.id}
                className="w-[100%]"
                to={`/yangiliklar/${news.id}`}
              >
                <div className="News__hero__card cursor-pointer bg-white mb-[10px] rounded-[10px] p-[20px] w-[100%] shadow-xl flex items-start gap-[30px]">
                  <img
                    className="block rounded-[10px] w-[300px] h-[200px] object-cover"
                    src={news?.contentUrl || "https://via.placeholder.com/300x200"}
                    alt="Foto"
                  />
                  <div>
                    <h2 className="text-MainColor text-[25px] font-bold">{news?.title}</h2>
                    <p>{news?.description}</p>
                  </div>
                </div>
              </NavLink>
            ))
          )}
        </div>

        {/* Кнопка "Смотреть еще", если не достигнута последняя страница */}
        {!isLastPage && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMore}
              className="bg-MainColor text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
            >
              Смотреть еще
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
