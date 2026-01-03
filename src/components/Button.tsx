import React from "react";

interface ButtonProps {
  loading: boolean;
  title: string;
}

const Button: React.FC<ButtonProps> = ({ loading, title }) => {
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
