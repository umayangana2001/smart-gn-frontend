
import React from "react";

const Loader = ({ size = 16, color = "#7c6ff7" }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="animate-spin rounded-full border-4 border-t-4 border-gray-200"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderTopColor: color,
        }}
      ></div>
    </div>
  );
};

export default Loader;
