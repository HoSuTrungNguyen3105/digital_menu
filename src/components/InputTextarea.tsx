import React from 'react'

const InputTextarea = (name, value) => {
    return (
        <textarea
            name={name}
            value={value}
            placeholder="Description"
            required
            className="w-full border p-2 rounded"
            onChange={handleChange}
        />
    )
}

export default InputTextarea
