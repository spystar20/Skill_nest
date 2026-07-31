import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const CourseAccordian = ({ title, open, onClick, children }) => {
  return (
    <div className="flex flex-col px-6">
      <button
        onClick={onClick}
        className="flex justify-between items-center text-lg font-medium bg-button text-white rounded-xl px-4 py-3"
      >
        <span>{title}</span>

        {open ? (
          <FaMinus className="text-sm" />
        ) : (
          <FaPlus className="text-sm" />
        )}
      </button>

      {open && (
        <div className="bg-gray-50 rounded-xl p-4 mt-2">
          {children}
        </div>
      )}
    </div>
  );
};

export default CourseAccordian;