import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userslice";
const Header = () => {
    const baseURL = import.meta.env.VITE_API_BASE_URL; // ✅ dynamic from .env
    const navigate = useNavigate();
    const [IsOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch();
    const User = useSelector((state) => state.user);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const [isMobile, setIsMobile] = useState(false);
    const dropdownRef = useRef(null);
    const [deviceType, setDeviceType] = useState("");

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleLogout = () => {
        dispatch(logout());
        navigate('/Login');
    }

    const handleMouseEnter = () => {
        if (!isMobile) setIsOpen(true);
    };

    const handleMouseLeave = (e) => {
        if (!isMobile && dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
            setIsOpen(false);
        }
    };

    const handleToggleDropdown = () => {
        if (isMobile) setIsOpen(prev => !prev);
    };

    useEffect(() => {
        const checkDeviceType = () => {
            const width = window.innerWidth;

            if (width <= 767) setDeviceType("Mobile");
            else if (width <= 1024) setDeviceType("Tablet");
            else setDeviceType("Desktop/Laptop");
        };

        checkDeviceType(); // initial check
        window.addEventListener("resize", checkDeviceType);

        return () => window.removeEventListener("resize", checkDeviceType);
    }, []);

    return (
        <>
            <div className="navbar flex justify-evenly items-center shadow-md bg-white pr-[15px] h-[7vh] md:h-[9vh] w-[98%] lg:h-[10vh] z-1000 lg:mt-[20px] mt-[25px] m-[2px] rounded-full">
                <div className="logo flex justify-center items-center mr-[5px] lg:mr-[2vw]">
                    <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg" alt="Flipkart" className='cursor-pointer w-[10vw]' onClick={() => navigate("/")} />
                </div>
                <div className="search  flex  justify-center items-center bg-[#f0f5ff] w-[35vw] h-[2vh] lg:w-[45vw] shadow-md lg:h-[6vh] rounded-[10px]  lg:pl-[10px] mr-[5px] ">
                    <div className='lg:w-[2vw] w-[1vw] cursor-pointer '>
                        <img src={`${baseURL}/static/search.png`} alt="search" className='w-[1.5vw] lg:w-[2vw] mr-[50px] lg:mr-[5px]' />
                    </div>
                    <input type='text' className=' text-black w-[30vw] lg:w-[45vw] border-none focus:outline-none lg:h-[6vh] h-[2vh] text-left pl-[10px] text-[5px] lg:text-lg font-normal  cursor-pointer items-center bg-[#f0f5ff] ' placeholder='Search For Products, Brands and More' />
                </div>
                <div className="sections flex justify-center items-center ">
                    <ul className=" flex justify-center items-center lg:gap-10 gap-2 text-[8px] lg:text-xl font-semibold">
                        <div className="home flex justify-center items-center lg:hover:scale-110 cursor-pointer" onClick={() => navigate("/")}>
                            <video src={`${baseURL}/static/home.mp4`} autoPlay loop muted playsInline className='lg:w-[5vw] w-[15px] h-[15px] lg:h-[5vh] flex items-center' />
                            <li className='cursor-pointer rounded-[10px] text-black lg:text-[20px] text-[12px]' onClick={() => navigate("/")}>Home</li>
                        </div>
                        {(isAuthenticated) ? (
                            <>
                                <div
                                    className="relative inline-block"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    ref={dropdownRef}
                                >
                                    <li className='cursor-pointer hover:scale-110 rounded-[10px] p-[5px]  text-black  '
                                        onClick={handleToggleDropdown}
                                    >Hi,&nbsp;{User.user.Username}</li>
                                    {IsOpen && (<>
                                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[5rem] lg:w-[15rem] bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] rounded-md border z-50  "
                                        // Close when leaving dropdown
                                        >
                                            <ul className="py-1 hover:bg-[#fafafa] flex flex-row items-center cursor-pointer" onClick={() => navigate("/MyProfile")}>
                                                <video src={`${baseURL}/static/user.mp4`} autoPlay loop muted playsInline className='lg:w-[5vw] lg:h-[5vh] w-[15px] h-[15px] flex items-center mb-[5px] mt-[5px]' />
                                                <div className="signup-container flex justify-between items-center cursor-pointer mb-[5px] mt-[5px]" >
                                                    <li className='cursor-pointer lg:text-sm text-[10px] ' onClick={() => navigate("/MyProfile")}>My Profile</li>
                                                </div>
                                            </ul>
                                            <div className="lg:w-[15rem] w-[5rem] h-[1px] bg-gray-500"></div>
                                            <ul className=" py-1 hover:bg-[#fafafa] flex flex-row items-center cursor-pointer" onClick={() => navigate("/Order")}>
                                                <video src={`${baseURL}/static/order_header.mp4`} autoPlay loop muted playsInline className='lg:w-[5vw] lg:h-[5vh] w-[15px] h-[15px] flex items-center mb-[5px] mt-[5px]' />
                                                <div className="signup-container flex items-center cursor-pointer mb-[5px] mt-[5px]" >
                                                    <li className='cursor-pointer lg:text-sm text-[10px]  flex items-center  ' onClick={() => navigate("/Order")}>Orders</li>
                                                </div>
                                            </ul>
                                            <div className="lg:w-[15rem] w-[5rem] h-[1px] bg-gray-500"></div>
                                            <ul className="py-1 hover:bg-[#fafafa] flex flex-row items-center cursor-pointer" onClick={() => handleLogout()}>
                                                <video src={`${baseURL}/static/logout.mp4`} autoPlay loop muted playsInline className='lg:w-[5vw] lg:h-[5vh] w-[15px] h-[15px] flex items-center mb-[5px] mt-[5px]' />
                                                <div className="signup-container flex justify-between items-center cursor-pointer mb-[5px] mt-[5px]" >
                                                    <li className='cursor-pointer lg:text-sm text-[10px]   ' onClick={() => handleLogout()}>Logout</li>
                                                </div>
                                            </ul>
                                            <div className="lg:w-[15rem] w-[5rem] h-[1px] bg-gray-500"></div>
                                        </div>
                                    </>)}
                                </div>
                            </>
                        ) : (
                            <>
                                <div
                                    className="relative inline-block"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    ref={dropdownRef}
                                >
                                    <div className={`container flex flex-row items-center `} >
                                        <img src={`${baseURL}/static/login_header.gif`} className='lg:w-[3vw] ml-[5px] lg:h-[6vh] w-[3vw] h-[2vh]' autoPlay loop muted playsInline />
                                        <li className={`cursor-pointer hover:scale-110 rounded-[10px] p-[5px] text-black lg:text-[20px] text-[12px]`}
                                            onClick={() => navigate("/Login")}
                                        >Login
                                        </li>
                                        {IsOpen ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5" onClick={handleToggleDropdown}>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5" onClick={handleToggleDropdown}>
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        )}
                                    </div>
                                    {IsOpen && (<>
                                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[6rem] lg:w-[15rem] bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] rounded-md border z-50  "
                                        // Close when leaving dropdown
                                        >
                                            <ul className="py-2 lg:p-[5px] p-[2px] hover:bg-[#fafafa]">
                                                <div className="signup-container flex justify-between items-center cursor-pointer lg:mb-[15px] lg:mt-[5px] mb-[8px] mt-[2px]">
                                                    <span>
                                                        <li className='cursor-pointer lg:text-sm text-[6px]  ' onClick={() => navigate("/SignUp")}>New Customer?</li>
                                                    </span>
                                                    <li className='cursor-pointer lg:text-sm text-[6px]  ' onClick={() => navigate("/SignUp")}>Sign Up</li>
                                                </div>
                                            </ul>

                                            <div className="lg:w-[15rem] w-[6rem] h-[1px] bg-gray-300"></div>
                                            <ul className="py-1 hover:bg-[#fafafa] flex flex-row items-center cursor-pointer" onClick={() => navigate("/MyProfile")}>
                                                <video src={`${baseURL}/static/user.mp4`} autoPlay loop muted playsInline className='lg:w-[5vw] lg:h-[5vh] w-[15px] h-[15px] flex items-center mb-[5px] mt-[5px]' />
                                                <div className="signup-container flex justify-between items-center cursor-pointer mb-[5px] mt-[5px]" onClick={() => navigate("/MyProfile")}>
                                                    <li className='cursor-pointer lg:text-sm text-[10px]   '>My Profile</li>
                                                </div>
                                            </ul>
                                            <div className="lg:w-[15rem] w-[6rem] h-[1px] bg-gray-500"></div>
                                            <ul className="py-1 hover:bg-[#fafafa] flex flex-row items-center cursor-pointer" onClick={() => navigate("/Order")}>
                                                <video src={`${baseURL}/static/order_header.mp4`} autoPlay loop muted playsInline className='lg:w-[5vw] lg:h-[5vh] w-[15px] h-[15px] flex items-center mb-[5px] mt-[5px]' />
                                                <div className="signup-container flex justify-between items-center cursor-pointer mb-[5px] mt-[5px]" onClick={() => navigate("/Order")}>
                                                    <li className='cursor-pointer lg:text-sm text-[10px]   '>Orders</li>
                                                </div>
                                            </ul>
                                            <div className="lg:w-[15rem] w-[6rem] h-[1px] bg-gray-500"></div>
                                            <ul className="py-1 hover:bg-[#fafafa] flex flex-row items-center cursor-pointer" onClick={() => handleLogout()}>
                                                <video src={`${baseURL}/static/logout.mp4`} autoPlay loop muted playsInline className='lg:w-[5vw] lg:h-[5vh] w-[15px] h-[15px] flex items-center mb-[5px] mt-[5px]' />
                                                <div className="signup-container flex justify-between items-center cursor-pointer mb-[5px] mt-[5px]" onClick={() => handleLogout()}>
                                                    <li className='cursor-pointer lg:text-sm text-[10px]   ' onClick={() => handleLogout()}>Logout</li>
                                                </div>
                                            </ul>
                                            <div className="lg:w-[15rem] w-[6rem] h-[1px] bg-gray-500"></div>

                                        </div>
                                    </>)}
                                </div>
                            </>
                        )}
                        <div className=" flex flex-row items-center lg:hover:scale-110 cursor-pointer mr-[5px]" onClick={() => navigate("/CartPage")}>
                            <video src={`${baseURL}/static/shopping-cart.mp4`} autoPlay loop muted playsInline className='lg:w-[5vw] w-[15px] h-[15px] lg:h-[5vh] flex items-center' />
                            <li className='cursor-pointer lg:hover:scale-110 rounded-[10px] text-[10px]  lg:text-[22px] text-black' onClick={() => navigate("/CartPage")}>Cart</li>
                        </div>

                    </ul>
                </div>
            </div>
        </>
    )
}
export default Header
