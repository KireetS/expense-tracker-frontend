import React , {useContext, useEffect, useState} from 'react'
import AddExpenseInline from './AddExpenseInline';
import expContext from '../../contexts/expensesbtn/expContext';
// import AddExpense from './AddExpense';

const Expenses = () => {
  
  const [editingIndex, setEditingIndex] = useState(-1);
  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  const {press} = useContext(expContext)
  const [selectedMonth, setSelectedMonth] = useState("August"); // Default month

  const [expensesData,setExpensesData] = useState([]);
  const [deleted , setDeleted] = useState(false)
  useEffect(()=>{
    async function fetchData(){
      try{
        const response = await fetch("http://localhost:5000/api/expenses/getnotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("token")
        }
      });
      const data = await response.json()
      setExpensesData(data)
      console.log(data)
      }catch(err){
        console.error("error fetching " , err)
        setExpensesData([])
      }
    }
    fetchData()
  },[press , deleted])
  
  const delExpense = async (expId) =>{
    const response  = await fetch(`http://localhost:5000/api/expenses/delete/${expId}` , {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      }
    })
    const data = await response.json()
    console.log(data)
    setDeleted(true)
    setTimeout(()=>{
      setDeleted(false)
    },50)
  }

  return (
    <>

      {/* <AddExpense/> */}
      <AddExpenseInline />
      <div className="min-h-screen  right-0 bg-gray-900 text-white">
      <div className="bg-gray-800 py-4 px-6">
        <h2 className="text-xl font-semibold">{selectedMonth} 2023</h2>
        <div className="mt-2 flex  space-x-2 md:space-x-4 lg:space-x-6  flex-wrap ">
          {months.map((month) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={`py-1 px-2 m-3 md:m-2 lg:m-0 rounded-md ${
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
        <table className="lg:min-w-[70%] bg-gray-800 rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Expense Name</th>
              <th className="py-2 px-4 text-left">Expense Cost</th>
              <th className="py-2 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {expensesData.map((expense, index) => (
              <tr key={index} id = {`${expense._id}`} className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}>
                <td className="py-2 px-4">{`${expense.date} ${months[expense.month - 1]} ${expense.year}`}</td>
                <td className="py-2 px-4">
                  
                  {expense.name}
                  
                  
                  </td>
                <td className="py-2 px-4">${expense.money}</td>
                <td className="py-2 px-4">
                    <button 
                    className="text-white p-2 bg-red-600 rounded-lg"
                    onClick={(e)=>{
                      delExpense(e.target.parentElement.parentElement.id)
                      console.log(e.target.parentElement.parentElement.id)
                    }}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    <button 
                    className="text-white p-2 bg-blue-500 rounded-lg"
                    >
                      Update
                    </button>
                  </td>
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