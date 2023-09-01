import React from "react";

const UpdateDate = (props) => {
  const { setDate, setMonth, setYear } = props
  return (
    <div className="flex space-x-2">
      <input
        type="text"
        onChange={(e) => setDate(e.target.value)}
        placeholder="Date"
        className="px-2 py-1 bg-gray-600 text-white rounded-lg w-14"
      />
      <input
        type="text"
        onChange={(e) => setMonth(e.target.value)}
        placeholder="Month"
        className="px-2 py-1 bg-gray-600 text-white rounded-lg"
      />
      <input
        type="number"
        onChange={(e) => setYear(e.target.value)}
        placeholder="Year"
        className="px-2 py-1 bg-gray-600 text-white rounded-lg w-20"
      />
    </div>
  );
};

export default UpdateDate;
