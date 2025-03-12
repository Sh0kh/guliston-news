import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import SocialNetwork from "../Components/Other/SocialNetwork";
import HeaderModal from "../Components/Header/HeaderModal";
import { useState } from "react";
import TopBtn from "../Components/Other/TopBtn";

export default function MainLayout() {

    const [activeHeaderModal, setActiveHeaderModal] = useState(false)

    return (
        <>
            <Header isActiveModal={() => setActiveHeaderModal(true)} />
            <HeaderModal isActive={activeHeaderModal} onClose={() => setActiveHeaderModal(false)} />
            <Outlet />
            <Footer />
            <SocialNetwork />
            <TopBtn />
        </>
    )
}