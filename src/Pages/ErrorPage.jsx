import { NavLink } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div className="w-full h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="text-[100px] sm:text-[120px] md:text-[150px] font-bold h-[150px] sm:h-[180px] md:h-[200px]">
                    404
                </h1>
                <p className="text-[16px] sm:text-[18px] md:text-[20px] font-bold">
                    Xatolik yuz berdi !!
                </p>
                <NavLink
                    to="/"
                    className="px-4 sm:px-6 md:px-[20px] py-2 sm:py-3 md:py-[10px] border-2 border-MainColor mt-4 shadow-lg bg-MainColor text-white rounded-lg block mx-auto duration-500 hover:bg-transparent hover:text-MainColor text-sm sm:text-base md:text-lg"
                >
                    Bosh sahifaga qaytish
                </NavLink>
            </div>
        </div>
    );
}
