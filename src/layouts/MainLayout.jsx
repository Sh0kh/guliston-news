import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import SocialNetwork from "../Components/Other/SocialNetwork";
import TopBtn from "../Components/Other/TopBtn";

export default function MainLayout() {


    return (
        <>
            <Header isActiveModal={() => setActiveHeaderModal(true)} />
            <Outlet />
            <Footer />
            <SocialNetwork />
            <TopBtn />
        </>
    )
}