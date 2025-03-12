import { NavLink } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactLoading from 'react-loading';


export default function Hero() {
  useGSAP(() => {
    gsap.fromTo(
      ".News__hero__card",
      { opacity: 0, y: 100, zIndex: 1 },
      { opacity: 1, y: 0, zIndex: 1, duration: 1.3, ease: "power1.inOut" }
    );
    gsap.fromTo(
      ".hero_loading",
      { opacity: 0, y: 100, zIndex: 1 },
      { opacity: 1, y: 0, zIndex: 1, duration: 1.3, ease: "power1.inOut" }
    );
    gsap.fromTo(
      ".News__Hero__title",
      { opacity: 0, x: -100, zIndex: 1 },
      { opacity: 1, x: 0, zIndex: 1, duration: 1.3, ease: "power1.inOut" }
    );
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getNews = async () => {
    try {
      const response = await axios.get(`/article/findAll`);
      setData(response.data?.object?.content || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getNews();
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen w-full'>
        <ReactLoading type="spinningBubbles" color='#1466B3' height={100} width={100} />
      </div>
    );
  }


  return (
    <section className="News__Hero py-[30px]">
      <div className="Container">
        <h1 className="News__Hero__title border-l-MainColor mb-[30px] border-l-[3px] pl-[10px] text-[28px] font-bold text-[#1F1F1F]">
          Yangiliklar
        </h1>
        <div className="flex items-center flex-col">
          {loading ? (
            < div className="hero_loading flex items-center justify-center w-full h-[400px]" >
              <ReactLoading type="spinningBubbles" color='#fffff' height={100} width={100} />
            </div >
          ) : data.length === 0 ? (
            <div className="flex flex-col items-center text-center py-10">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75h.007v.007H9.75V9.75zm4.5 0h.007v.007h-.007V9.75zm-4.5 4.5h.007v.007H9.75v-.007zm4.5 0h.007v.007h-.007v-.007z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25a6.75 6.75 0 0113.5 0M3 8.25v7.5a2.25 2.25 0 002.25 2.25h13.5a2.25 2.25 0 002.25-2.25v-7.5" />
              </svg>
              <p className="mt-4 text-gray-600 text-lg">Hozircha yangiliklar mavjud emas</p>
            </div>
          ) : (
            data.map((news) => (
              <NavLink key={news.id} className="w-[100%]" onClick={() => localStorage.setItem("newsId", news.id)} to={`/yangiliklar/${news.id}`}>
                <div className="News__hero__card cursor-pointer bg-[white] mb-[10px] rounded-[10px] p-[20px] w-[100%] shadow-xl flex items-start gap-[30px]">
                  <img
                    className="block rounded-[10px] w-[300px] h-[200px] object-cover"
                    src={news?.contentUrl || "https://via.placeholder.com/300x200"}
                    alt="Foto"
                  />
                  <div>
                    <h2 className="text-MainColor text-[25px] font-bold">{news?.title}</h2>
                    <div className="w-[70%] my-[10px] h-[3px] bg-MainColor"></div>
                    <p>{news?.description}</p>
                  </div>
                </div>
              </NavLink>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

