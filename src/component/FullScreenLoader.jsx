import React from 'react';

const FullScreenLoader = ({ message = "Loading your experience..." }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f1f3f6]">
            <div className="relative flex flex-col items-center justify-center p-10 bg-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-gray-200 lg:w-[320px] lg:h-[320px] w-[250px] h-[200px]">
                {/* Spinner */}
                <div className="relative">
                    <div className="w-16 h-16 border-[5px] border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 rounded-full bg-blue-100 opacity-30 animate-ping"></div>
                </div>

                {/* Main Text */}
                <div className="mt-6 lg:text-lg text-[15px] text-gray-800 font-semibold tracking-wide text-center">
                    {message}
                </div>

                {/* Optional subtext */}
                <p className="lg:text-xs text-[10px] text-gray-400 mt-1">
                    Hang tight, it won't take long 🚀
                </p>
            </div>
        </div>
    );
};

export default FullScreenLoader;
