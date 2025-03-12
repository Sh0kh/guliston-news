import { NavLink } from "react-router-dom";
import foto from '../../img/logo.jpg'
export default function Sidebar() {


    return (
        <div className="h-[97%] w-[300px] shadow-2xl bg-white fixed mt-[10px] ml-[10px] p-[10px] rounded-[10px]">
            <div>
                <img className="rounded-[10px]" src={foto} alt="" />
            </div>
            <div className="mt-[30px]">
                <NavLink to={'/admin/dashboard'}>
                    <button className="group w-full shadow-md duration-500 hover:shadow-xl scale-95 hover:scale-100 flex items-center gap-[10px] border-[2px] rounded-[10px] border-[#E5EFF9] p-[5px] hover:border-[#E6F0F9] hover:bg-[#F0F8FF]">
                        <svg

                            className="text-[40px] text-MainColor group-hover:text-[#0077b6] duration-300"
                            xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1"></path></svg>
                        <span className="text-[#70757b] group-hover:text-[#0077b6] duration-300">
                            Bosh sahifa
                        </span>
                    </button>
                </NavLink>
                <NavLink to={'/admin/menu'}>
                    <button className="group w-full shadow-md mt-[10px] duration-500 hover:shadow-xl scale-95 hover:scale-100 flex items-center gap-[10px] border-[2px] rounded-[10px] border-[#E5EFF9] p-[5px] hover:border-[#E6F0F9] hover:bg-[#F0F8FF]">
                        <svg
                            className="text-[40px] text-MainColor group-hover:text-[#0077b6] duration-300"
                            xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M4 11h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1m10 0h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1M4 21h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1m13 0c2.206 0 4-1.794 4-4s-1.794-4-4-4s-4 1.794-4 4s1.794 4 4 4"></path></svg>
                        <span className="text-[#70757b] group-hover:text-[#0077b6] duration-300">
                            Menyu
                        </span>
                    </button>
                </NavLink>
                <NavLink to={'/admin/News'}>
                    <button className="group w-full shadow-md mt-[10px] duration-500 hover:shadow-xl scale-95 hover:scale-100 flex items-center gap-[10px] border-[2px] rounded-[10px] border-[#E5EFF9] p-[5px] hover:border-[#E6F0F9] hover:bg-[#F0F8FF]">
                        <svg
                            className="text-[40px] text-MainColor group-hover:text-[#0077b6] duration-300"
                            xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} color="currentColor">
                                <path d="M18 15V9c0-2.828 0-4.243-.879-5.121C16.243 3 14.828 3 12 3H8c-2.828 0-4.243 0-5.121.879C2 4.757 2 6.172 2 9v6c0 2.828 0 4.243.879 5.121C3.757 21 5.172 21 8 21h12M6 8h8m-8 4h8m-8 4h4"></path>
                                <path d="M18 8h1c1.414 0 2.121 0 2.56.44c.44.439.44 1.146.44 2.56v8a2 2 0 1 1-4 0z"></path>
                            </g>
                        </svg>
                        <span className="text-[#70757b] group-hover:text-[#0077b6] duration-300">
                            Yangiliklar
                        </span>
                    </button>
                </NavLink>
                <NavLink to={'/admin/statistics'}>
                    <button className="group w-full mt-[10px] shadow-md duration-500 hover:shadow-xl scale-95 hover:scale-100 flex items-center gap-[10px] border-[2px] rounded-[10px] border-[#E5EFF9] p-[5px] hover:border-[#E6F0F9] hover:bg-[#F0F8FF]">
                        <svg
                            className="text-[40px] text-MainColor group-hover:text-[#0077b6] duration-300"

                            xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 26 26"><path fill="currentColor" d="M12.906-.031a1 1 0 0 0-.125.031A1 1 0 0 0 12 1v1H3a3 3 0 0 0-3 3v13c0 1.656 1.344 3 3 3h9v.375l-5.438 2.719a1.006 1.006 0 0 0 .875 1.812L12 23.625V24a1 1 0 1 0 2 0v-.375l4.563 2.281a1.006 1.006 0 0 0 .875-1.812L14 21.375V21h9c1.656 0 3-1.344 3-3V5a3 3 0 0 0-3-3h-9V1a1 1 0 0 0-1.094-1.031M2 5h22v13H2zm18.875 1a1 1 0 0 0-.594.281L17 9.563L14.719 7.28a1 1 0 0 0-1.594.219l-2.969 5.188l-1.219-3.063a1 1 0 0 0-1.656-.344l-3 3a1.016 1.016 0 1 0 1.439 1.44l1.906-1.906l1.438 3.562a1 1 0 0 0 1.812.125l3.344-5.844l2.062 2.063a1 1 0 0 0 1.438 0l4-4A1 1 0 0 0 20.875 6"></path></svg>
                        <span className="text-[#70757b] group-hover:text-[#0077b6] duration-300">
                            Statictika
                        </span>
                    </button>
                </NavLink>
                <NavLink to={'/admin/media'}>
                    <button className="group w-full mt-[10px] shadow-md duration-500 hover:shadow-xl scale-95 hover:scale-100 flex items-center gap-[10px] border-[2px] rounded-[10px] border-[#E5EFF9] p-[5px] hover:border-[#E6F0F9] hover:bg-[#F0F8FF]">
                        <svg
                            className="text-[40px] text-MainColor group-hover:text-[#0077b6] duration-300"
                            xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M13 2.5H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5M3 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm9 9.857L9.5 8l-2.476 2.83L5.5 9L4 10.8V12h8zM6.5 8a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3" clipRule="evenodd"></path></svg>
                        <span className="text-[#70757b] group-hover:text-[#0077b6] duration-300">
                            Ijtimoiy tarmoq
                        </span>
                    </button>
                </NavLink>
                <NavLink to={'/admin/person'}>
                    <button className="group w-full mt-[10px] shadow-md duration-500 hover:shadow-xl scale-95 hover:scale-100 flex items-center gap-[10px] border-[2px] rounded-[10px] border-[#E5EFF9] p-[5px] hover:border-[#E6F0F9] hover:bg-[#F0F8FF]">
                        <svg
                            className="text-[40px] text-MainColor group-hover:text-[#0077b6] duration-300"
                            xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M336 256c-20.56 0-40.44-9.18-56-25.84c-15.13-16.25-24.37-37.92-26-61c-1.74-24.62 5.77-47.26 21.14-63.76S312 80 336 80c23.83 0 45.38 9.06 60.7 25.52c15.47 16.62 23 39.22 21.26 63.63c-1.67 23.11-10.9 44.77-26 61C376.44 246.82 356.57 256 336 256m131.83 176H204.18a27.71 27.71 0 0 1-22-10.67a30.22 30.22 0 0 1-5.26-25.79c8.42-33.81 29.28-61.85 60.32-81.08C264.79 297.4 299.86 288 336 288c36.85 0 71 9 98.71 26.05c31.11 19.13 52 47.33 60.38 81.55a30.27 30.27 0 0 1-5.32 25.78A27.68 27.68 0 0 1 467.83 432M147 260c-35.19 0-66.13-32.72-69-72.93c-1.42-20.6 5-39.65 18-53.62c12.86-13.83 31-21.45 51-21.45s38 7.66 50.93 21.57c13.1 14.08 19.5 33.09 18 53.52c-2.87 40.2-33.8 72.91-68.93 72.91m65.66 31.45c-17.59-8.6-40.42-12.9-65.65-12.9c-29.46 0-58.07 7.68-80.57 21.62c-25.51 15.83-42.67 38.88-49.6 66.71a27.39 27.39 0 0 0 4.79 23.36A25.32 25.32 0 0 0 41.72 400h111a8 8 0 0 0 7.87-6.57c.11-.63.25-1.26.41-1.88c8.48-34.06 28.35-62.84 57.71-83.82a8 8 0 0 0-.63-13.39c-1.57-.92-3.37-1.89-5.42-2.89"></path></svg>

                        <span className="text-[#70757b] group-hover:text-[#0077b6] duration-300">
                            Rahbariyat
                        </span>
                    </button>
                </NavLink>
                <NavLink to={'/admin/open-data'}>
                    <button className="group w-full mt-[10px] shadow-md duration-500 hover:shadow-xl scale-95 hover:scale-100 flex items-center gap-[10px] border-[2px] rounded-[10px] border-[#E5EFF9] p-[5px] hover:border-[#E6F0F9] hover:bg-[#F0F8FF]">
                        <svg
                            className="text-[40px] text-MainColor group-hover:text-[#0077b6] duration-300"
                            xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M255.993 8.045c-32.183-1.174-57.105 21.062-84.092 35.034c-36.705 21.758-74.502 41.83-110.476 64.716c-23.53 19.125-34.341 49.9-31.87 79.619c.137 52.692-.273 105.396.207 158.08c3.047 31.9 25.167 58.973 53.631 72.318c45.694 26.225 91.12 52.938 136.981 78.857c29.154 13.294 63.667 7.703 89.457-10.283c45.56-26.464 91.402-52.46 136.783-79.219c26.105-18.586 38.497-51.277 35.818-82.6c-.137-52.693.274-105.396-.207-158.08c-3.05-31.898-25.166-58.977-53.633-72.316c-45.695-26.22-91.129-52.915-136.988-78.837c-11.1-5.156-23.43-7.255-35.61-7.29m-28.695 132.69h57.4v230.52h-57.4zm72.231 50.174h57.372v180.346H299.53zm-144.452 94.08h57.39v86.266h-57.39z"></path></svg>
                        <span className="text-[#70757b] group-hover:text-[#0077b6] duration-300">
                            Ochiq malumotlar
                        </span>
                    </button>
                </NavLink>
                <NavLink to={'/admin/koruption'}>
                    <button className="group w-full mt-[10px] shadow-md duration-500 hover:shadow-xl scale-95 hover:scale-100 flex items-center gap-[10px] border-[2px] rounded-[10px] border-[#E5EFF9] p-[5px] hover:border-[#E6F0F9] hover:bg-[#F0F8FF]">
                        <svg
                            className="text-[40px] text-MainColor group-hover:text-[#0077b6] duration-300"
                            xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M4 6.8V8H2.8A1.8 1.8 0 0 0 1 9.8v8.4A1.8 1.8 0 0 0 2.8 20h16.4a1.8 1.8 0 0 0 1.8-1.8V17h1.2c.992 0 1.8-.808 1.8-1.8V6.8c0-.992-.808-1.8-1.8-1.8H5.8C4.808 5 4 5.808 4 6.8M6 7v1h13.2A1.8 1.8 0 0 1 21 9.8V15h1V7zm3 7a2 2 0 1 1 4 0a2 2 0 0 1-4 0" clipRule="evenodd"></path></svg>
                        <span className="text-[#70757b] group-hover:text-[#0077b6] duration-300">
                            Korrupsiyaga qarshi kurashish
                        </span>
                    </button>
                </NavLink>
            </div>
        </div>
    );
}
