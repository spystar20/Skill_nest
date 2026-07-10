import React, { useState } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const FilterComponent = ({
  title,
  optionArray,
  setFilter,
  filterKey,
  filters,
}) => {
  const [open, setOpen] = useState(true)

  const handleToggle = () => {
    setOpen(!open)
  }

  return (
    <div className="w-full border-b border-gray-200 pb-4 mb-4 font-[Outfit]">
      {/* Heading */}
      <button
        onClick={handleToggle}
        className="w-full flex justify-between items-center cursor-pointer group"
      >
        <h2 className="text-lg font-medium text-gray-800 group-hover:text-[#728ccd] transition-colors">
          {title}
        </h2>

        <MdOutlineKeyboardArrowDown
          className={`text-2xl text-gray-500 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Options */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2">
          {optionArray?.map((option, index) => (
            <label
              key={index}
              className={`flex items-center gap-3 rounded-lg px-2 py-2 cursor-pointer transition-all
              ${
                filters[filterKey] === option
                  ? "bg-blue-50 text-[#4f6cb8]"
                  : "hover:bg-gray-100"
              }`}
            >
              <input
                type="radio"
                name={filterKey}
                value={option}
                checked={filters[filterKey] === option}
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    [filterKey]: e.target.value,
                  }))
                }
                className="w-4 h-4 accent-[#728ccd]"
              />

              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterComponent