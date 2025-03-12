import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from '../../img/logo.png';
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { useState } from "react";

export default function HeaderModal({ isActive, onClose, data }) {
    const { t } = useTranslation();
    const location = useLocation();
    const [open, setOpen] = useState(0);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const isActivePath = (path) => location.pathname === path;

    // Toggle accordion visibility
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const renderAccordionItems = () => {
        const sections = [
            { title: 'Хокимият хакида', links: ['/link1', '/link2', '/link3'] },
            { title: 'Section 2', links: ['/link4', '/link5', '/link6'] },
            { title: 'Section 3', links: ['/link7', '/link8', '/link9'] },
            { title: 'Section 4', links: ['/link10', '/link11', '/link12'] },
            { title: 'Section 5', links: ['/link13', '/link14', '/link15'] },
            { title: 'Section 6', links: ['/link16', '/link17', '/link18'] },
            { title: 'Section 7', links: ['/link19', '/link20', '/link21'] },
            { title: 'Section 8', links: ['/link22', '/link23', '/link24'] },
        ];

        return data?.map((section, index) => (
            <Accordion key={index} open={open === index + 1} className="rounded-[8px] border-none">
                <AccordionHeader onClick={() => handleOpen(index + 1)} className="text-white">
                    <h2 className="text-[white]">
                        {section?.menu?.name}
                    </h2>
                </AccordionHeader>
                <AccordionBody className="bg-[#076AC8]  border-none text-white p-[2px] rounded-b-[8px]">
                    <ul className="p-[5px]">
                        {section?.subMenus.map((subItem, subIndex) => (
                            <li key={subIndex} className="mb-[10px] mt-[10px]">
                                <NavLink
                                    onClick={() => { onClose(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                                    to={`/sahifa/${subItem?.id}`}
                                >
                                    {subItem?.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </AccordionBody>
            </Accordion>
        ));
    };

    return (
        <>
            <div onClick={onClose} className={`headerModalShadow ${isActive ? "db_shadow" : ''}`}>
                <div onClick={(e) => { e.stopPropagation() }} className={`headerModal  ${isActive ? 'db' : ''}`}>
                    <div className="headerModalContent">
                        <div className='logo flex items-center gap-[10px] mb-[20px] cursor-pointer'>
                            <img src={logo} alt="Logo" />
                            <h1 className="w-[200px] font-bold text-[15px] tracking-[0.27px] uppercase text-[rgba(247,247,247,1)] ml-[15px]">
                                {t('Logo')}
                            </h1>
                        </div>
                        {renderAccordionItems()}
                        <div className="mt-[20px] flex items-start flex-col gap-[10px]">
                            <NavLink to={'/rahbariyat'}>
                                <button
                                    className="px-4 py-2 text-white hover:text-black duration-500 font-semibold hover:bg-gray-200 rounded transition-all"
                                >
                                    Rahbariyat
                                </button>
                            </NavLink>
                            <NavLink to={'/apparat-xodimlari'}>
                                <button
                                    className="px-4 py-2 text-white hover:text-black duration-500 font-semibold hover:bg-gray-200 rounded transition-all"
                                >
                                    Apparat xodimlari
                                </button>
                            </NavLink>
                            <NavLink to={'/yangiliklar'}>
                                <button
                                    className="px-4 py-2 text-white hover:text-black duration-500 font-semibold hover:bg-gray-200 rounded transition-all"
                                >
                                    Yangiliklar
                                </button>
                            </NavLink>
                            <NavLink to={'/koruption'}>
                                <button
                                    className="px-4 py-2 text-white hover:text-black duration-500 font-semibold hover:bg-gray-200 rounded transition-all"
                                >
                                    Korrupsiyaga qarshi kurashish
                                </button>
                            </NavLink>
                            <NavLink to={'/ochiq-malumot'}>
                                <button
                                    className="px-4 py-2 text-white hover:text-black duration-500 font-semibold hover:bg-gray-200 rounded transition-all"
                                >
                                    Ochiq ma'lumot
                                </button>
                            </NavLink>
                            <NavLink to={'/boglanish'}>
                                <button
                                    className="px-4 py-2 text-white hover:text-black duration-500 font-semibold hover:bg-gray-200 rounded transition-all"
                                >
                                    Bog'lanish
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
