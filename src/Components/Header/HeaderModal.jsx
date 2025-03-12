import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from '../../img/logo.png';
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { useState } from "react";

export default function HeaderModal({ isActive, onClose }) {
    const { t } = useTranslation();
    const location = useLocation();
    const [open, setOpen] = useState(0); // State to control the accordion

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

        return sections.map((section, index) => (
            <Accordion key={index} open={open === index + 1} className="rounded-[8px] border-none">
                <AccordionHeader onClick={() => handleOpen(index + 1)} className="text-white">
                    <h2 className="text-[white]">
                        {t(section.title)}
                    </h2>
                </AccordionHeader>
                <AccordionBody className="bg-[#076AC8]  border-none text-white p-[2px] rounded-b-[8px]">
                    <ul className="p-[5px]">
                        {section.links.map((link, idx) => (
                            <li key={idx} className="mb-[10px]">
                                <NavLink
                                    to={link}
                                    className={`block ${isActivePath(link) ? "text-blue-500" : "text-white"}`}
                                >
                                    {t(`Link ${idx + 1}`)}
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
                    </div>
                </div>
            </div>
        </>
    );
}
