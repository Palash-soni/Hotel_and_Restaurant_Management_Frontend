import React from "react";

const AuthCard = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-[#e6e6e6] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-[#dcdcdc] p-10 md:p-14 shadow-sm">
        
        <h1 className="text-center text-3xl md:text-4xl font-bold text-[#5a0f0f]">
          {title}
        </h1>

        <hr className="my-6 border-t border-gray-500" />
        
        {children}

      </div>
    </div>
  );
};

export default AuthCard;