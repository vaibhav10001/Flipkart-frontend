import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../redux/userslice";
const Login = () => {
    const baseURL = import.meta.env.VITE_API_BASE_URL; // ✅ dynamic from .env
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    console.log(baseURL)
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { setislogin } = useAuth()
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        // Input validation
        if (!email.trim() || !password.trim()) {
            setErrorMessage("Email and Password cannot be empty.");
            return;
        }


        let response;
        try {
            response = await fetch(`${baseURL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
        } catch (err) {
            console.error("Fetch error:", err);
            setErrorMessage("Server unreachable.");
            return;
        }
        console.log("Response fetching ke baad", response)

        console.log("Response status:", response.status);
        const contentType = response.headers.get("content-type");
        console.log("Content-Type:", contentType);

        const text = await response.text();
        console.log("Raw response text:", text);

        // Try parsing only if it's JSON
        if (contentType && contentType.includes("application/json")) {
            try {
                const data = JSON.parse(text);
                console.log("Parsed JSON:", data);

                if (data.success && data.user) {
                    console.log("Logged In")
                    const profileRes = await fetch(`${baseURL}/api/user/profile/${data.user.Username}`);
                    console.log("profileRes", profileRes)
                    const fullUser = await profileRes.json();
                    console.log("fullUser", fullUser)
                    dispatch(loginSuccess(fullUser));
                    setislogin(true);
                    navigate("/");
                } else {
                    setErrorMessage(data.message || "Login failed. Please try again.");
                    alert("Login failed!");
                }

            } catch (err) {
                console.error("JSON parse error:", err);
                setErrorMessage("Invalid response from server.");
            }

        } else {
            console.error("Not JSON response. Got HTML or something else.");
            setErrorMessage("Server error. Please try again later.");
        }
        // const data = await response.json()


    };



    return (
        <>
            <div className="containe items-center flex justify-center mt-[40px] w-full ">
                <div className="login-containe border-red-500 border-2 lg:w-[60vw] m-[20px] md:w-[70vw] sm:w-[100vh] shadow-[0_20px_15px_5px_rgb(0_0_0_/_0.15),_0_10px_20px_-4px_rgb(0_0_0_/_0.15)] max-h-[110vh] flex p-0  ">

                    <div className="left-block lg:w-[25vw] md:w-[40vw] sm:w-[30vw] w-[35vw] lg:h-[70vh] md:h-[50vh]  h-[70vh] border-2 border-black bg-[#2874f0] text-white">
                        <span >
                            <p className='lg:ml-[50px] ml-[20px] mt-[40px]'>
                                <span className='lg:text-4xl md:text-4xl text-3xl font-bold'>Login</span>
                            </p>
                        </span>
                        <p className='lg:ml-[50px] ml-[20px] lg:mr-[7px] mr-[10px] mt-[20px]'>
                            <span className=' lg:text-xl md:text-xl text-[11px]'>Get access to your Orders, Wishlist and Recommendations</span>
                        </p>
                        <div className="img bg-cover bg-center relative lg:top-[110px] top-[170px] ">
                            <img src={`${baseURL}/static/login.png`} alt="Login" className='relative' />
                        </div>
                    </div>

                    <div className="right-block lg:w-[35vw] md:w-[40vw] sm:w-[45vw] w-[56vw]">
                        <div className="container flex justify-center items-center flex-col lg:ml-[50px] ml-[20px] mt-[50px] gap-[25px] ">

                            <div className="relative w-full email-username  ">
                                <input
                                    type="text"
                                    id="inputField"
                                    className="peer w-[80%] border-b-2 border-gray-400 bg-transparent outline-none focus:border-blue-500 focus:ring-0 text-base pt-6 pb-2 cursor-pointer"
                                    placeholder=" "
                                    onChange={(e) => setemail(e.target.value)}
                                />
                                <label htmlFor="inputField"
                                    className="absolute left-0 text-gray-500 lg:text-base text-sm transition-all duration-300 ease-in-out peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500 whitespace-nowrap cursor-pointer font-bold">
                                    Enter Email
                                </label>
                            </div>


                            <div className="relative flex flex-row items-center j w-full ">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="peer w-[80%] border-b-2 border-gray-400 bg-transparent outline-none focus:border-blue-500 focus:ring-0 text-base pt-10 pb-1 cursor-pointer"
                                    placeholder=" "
                                    onChange={(e) => setpassword(e.target.value)}
                                />
                                <label htmlFor="password"
                                    className="absolute left-0 text-gray-500 lg:text-base text-sm transition-all duration-300 ease-in-out peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500 whitespace-nowrap cursor-pointer font-bold">
                                    Enter Password
                                </label>
                                {showPassword ? (
                                    <>
                                        <img src={`${baseURL}/static/hide.png`} alt="show" onClick={() => { setShowPassword(false) }} className="w-6 h-6 sm:w-6 sm:h-6 mr-[30px] lg:mr-[60px]" />
                                    </>
                                ) : (
                                    <>
                                        <img src={`${baseURL}/static/show.png`} alt="show" onClick={() => { setShowPassword(true) }} className="w-6 h-6 sm:w-6 sm:h-6 mr-[30px]" />
                                    </>
                                )}



                            </div>
                        </div>
                        <div className="login-btn flex justify-center items-center mt-[40px]">
                            <button className='border-black border-2 w-[28vw] lg:text-xl md:text-lg  text-sm font-bold h-[6vh] bg-orange-500 text-white hover:scale-90' onClick={(e) => {

                                handleLogin(e)
                            }}>Login</button>

                        </div>
                        <div className="relative lg:p-4 p-0 lg:bottom-[-170px] bottom-[-140px] pb-[80px]">
                            <div className="create-account left-0 flex justify-center items-center lg:flex-row flex-col  lg:gap-[5px] lg:text-md text-sm gap-0">
                                <div onClick={() => { navigate("/SignUp") }} className="text-blue-500 cursor-pointer ">New to Flipkart? </div>
                                <div onClick={() => { navigate("/SignUp") }} className="text-blue-500 cursor-pointer">Create Account</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
