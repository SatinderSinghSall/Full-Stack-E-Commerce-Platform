import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="flex flex-col items-center gap-3 mb-4">
      <h2
        className="
          text-gray-500
          text-2xl sm:text-3xl md:text-4xl lg:text-5xl
          font-normal
          tracking-wide
          text-center
        "
      >
        {text1} <span className="text-gray-700 font-medium">{text2}</span>
      </h2>

      {/* underline */}
      <span className="w-10 sm:w-14 h-[1px] sm:h-[2px] bg-gray-700" />
    </div>
  );
};

export default Title;
