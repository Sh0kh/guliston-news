import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import AdminHeader from "../Components/Header/AdminHeader";

export default function AdminLayout() {
    return (
        <div className="flex w-[100%] overflow-hidden pr-[20px]">
            <Sidebar />
            <div className="ml-[320px] mt-[10px] w-full">
                <AdminHeader />
                <Outlet />
            </div>
        </div>
    )
}