import Hero from '../Components/Home/Hero';
import Owl from '../Components/Home/Owl';
import Percent from '../Components/Home/Percent';
import AnimateSwiper from '../Components/Home/AnimateSwiper';
import StatisticAppeals from '../Components/Home/StatisticAppeals';
import LinksMap from '../Components/Home/LinksMap';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { useEffect, useState } from 'react';

export default function Home() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState([])

    const getHome = async () => {
        try {
            const response = await axios.get(`/home`, {
                params: {
                    page: 0,
                    size: 8,
                    pageShow: 0,
                    sizeShow: 4
                }
            })
            setData(response?.data?.object)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getHome()
    }, [])

    if (loading) {
        return (
            <div className='LoadingModal fixed w-full top-0 h-screen z-[999999] flex items-center justify-center'>
                <ReactLoading type="spinningBubbles" color='#ffffff' height={100} width={100} />
            </div>
        )
    }

    return (
        <main>
            <Hero showNewsData={data[3]} NewsData={data[2]} />
            <Owl />
            <Percent NewsData={data[2]} />
            <AnimateSwiper data={data[0]}/>
            <StatisticAppeals Stdata={data[1]} />
            <LinksMap />
        </main>
    );
}
