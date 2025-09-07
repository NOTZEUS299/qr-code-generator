import React from "react";

const Button = ({name, className}) => {
  return (
    <button className={`bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-emerald-900 transition-colors duration-300 cursor-pointer ${className}`}>
      {name}
    </button>
  );
};

export default Button;
