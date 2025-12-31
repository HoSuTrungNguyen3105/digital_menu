import React from "react";

const Button = ({ loading, title }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="bg-black text-white px-4 py-2 rounded w-full"
    >
      {loading ? "...loading" : title}
    </button>
  );
};

export default Button;
