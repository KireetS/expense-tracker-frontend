import React , {useState} from 'react'

const Expenses = () => {
  

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const [selectedMonth, setSelectedMonth] = useState("August"); // Default month

  const expensesData = [
    { date: "2023-08-01", name: "Groceries", cost: 50 },
    { date: "2023-08-05", name: "Dinner", cost: 30 },
    { date: "2023-08-10", name: "Gas", cost: 40 },
    // Add more expense data as needed
  ];





  return (
    <>
      <div className="min-h-screen w-screen right-0 bg-gray-900 text-white">
      <div className="bg-gray-800 py-4 px-6">
        <h2 className="text-xl font-semibold">{selectedMonth} 2023</h2>
        <div className="mt-2 flex space-x-4">
          {months.map((month) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={`py-1 px-2 rounded-md ${
                selectedMonth === month
                  ? "bg-gray-700 text-white"
                  : "bg-gray-600 text-gray-400"
              }`}
            >
              {month}
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        <table className="min-w-full bg-gray-800 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Expense Name</th>
              <th className="py-2 px-4 text-left">Expense Cost</th>
            </tr>
          </thead>
          <tbody>
            {expensesData.map((expense, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}>
                <td className="py-2 px-4">{expense.date}</td>
                <td className="py-2 px-4">{expense.name}</td>
                <td className="py-2 px-4">${expense.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default Expenses