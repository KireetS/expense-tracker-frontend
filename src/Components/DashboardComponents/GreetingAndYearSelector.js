import React from 'react';
import { useNavigate } from 'react-router-dom';

const GreetingAndYearSelector = (props) => {
  // const [selectedYear, setSelectedYear] = useState(2023); // Default year

  const {selectedYear, setSelectedYear} = props
  const navigate = useNavigate();
  // Function to handle year selection
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Welcome, User!</h1>
      <p className="text-lg mb-8">Please select a year:</p>

      <select
        className="w-32 px-4 py-2 bg-gray-800 text-white rounded-lg outline-none focus:ring focus:border-blue-300"
        value={selectedYear}
        onChange={handleYearChange}
      >
        {Array.from({ length: 86 }, (_, i) => (
          <option key={i} value={2015 + i}>
            {2015 + i}
          </option>
        ))}
      </select>

      <p className="text-lg mt-8">You selected: {selectedYear}</p>
      <button className="mt-5 text-xl px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        onClick={()=>{
         navigate("/expenses")
        }}
        >Enter</button>
    </div>
  );
};

export default GreetingAndYearSelector;
