import React from 'react'

const Button = ({ loading }) => {
    return (
        <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded w-full"
        >
            {loading ? "Adding..." : "Add"}
        </button>
    )
}

export default Button
