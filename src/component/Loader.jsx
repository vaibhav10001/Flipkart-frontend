import React from 'react';

const Loader = ({ fullPage = false, message = "Loading..." }) => {
  return (
    <div className="w-full flex items-center justify-center py-12">
      <div className="flex flex-col items-center justify-center bg-white px-8 py-10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-gray-100">
        {/* Spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-[4px] border-blue-600 border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 rounded-full bg-blue-100 opacity-25 animate-ping" />
        </div>

        {/* Text */}
        <p className="mt-4 text-sm text-gray-700 font-medium tracking-wide text-center">
          {message}
        </p>
        <p className="text-xs text-gray-400 mt-1 text-center">Fetching fresh content 🛒</p>
      </div>
    </div>
  );
};

export default Loader;
