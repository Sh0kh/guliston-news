import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ReactLoading from 'react-loading';

export default function NewsItems() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsById = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`/article/findById/${id}`);
        setNews(response.data.object || null);
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsById();
  }, [id]);

  useGSAP(() => {
    gsap.fromTo(
      ".News__hero__card",
      { opacity: 0, y: 100, zIndex: 1 },
      { opacity: 1, y: 0, zIndex: 1, duration: 1.3, ease: "power1.inOut" }
    );
    gsap.fromTo(
      ".News__Hero__title",
      { opacity: 0, x: -100, zIndex: 1 },
      { opacity: 1, x: 0, zIndex: 1, duration: 1.3, ease: "power1.inOut" }
    );
  }, []);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen w-full'>
        <ReactLoading type="spinningBubbles" color='#1466B3' height={100} width={100} />
      </div>
    );
  }

  if (!news) {
    return <p className="text-center text-lg py-10 text-red-500">Yangilik topilmadi!</p>;
  }

  return (
    <main>
      <section className="NewsItem py-[30px]">
        <div className="Container">
          <h1 className="News__Hero__title border-l-MainColor mb-[30px] border-l-[3px] pl-[10px] text-[28px] font-bold text-[#1F1F1F]">
            {news?.title}
          </h1>
          <div
            className="News__hero__card cursor-pointer bg-[white] rounded-[10px] p-[20px] w-[100%] shadow-xl"
            dangerouslySetInnerHTML={{ __html: news?.context }}
          />

        </div>
      </section>
    </main>
  );
}
