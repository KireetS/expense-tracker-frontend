
import React, { useContext, useEffect, useState } from "react";
import AddExpenseInline from "./AddExpenseInline";
import expContext from "../../contexts/expensesbtn/expContext";
import Update from "./Updating/Update";
import UpdateDate from "./Updating/UpdateDate";
// import AddExpense from './AddExpense';

const Expenses = (props) => {
  const [editingIndex, setEditingIndex] = useState(-1);
  const {selectedYear} = props
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const { press } = useContext(expContext);
  const [selectedMonth, setSelectedMonth] = useState("August"); // Default month
  const [ename, setEname] = useState("");
  const [ecost, setEcost] = useState(0);
  const [expensesData, setExpensesData] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [edate , setEdate] = useState(1)
  const [emonth , setEmonth] = useState("") 
  const [eyear , setEyear] = useState(0)   
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/expenses/getnotes?month=${selectedMonth}&year=${selectedYear}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        setExpensesData(data);
        console.log(data);
      } catch (err) {
        console.error("error fetching ", err);
        setExpensesData([]);
      }
    }
    fetchData();
  }, [press, deleted , updated , selectedMonth , selectedYear]);

  const delExpense = async (expId) => {
    const response = await fetch(
      `http://localhost:5000/api/expenses/delete/${expId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setDeleted(true);
    setTimeout(() => {
      setDeleted(false);
    }, 50);
  };


  const updateExp = async(expId)=>{
    const response = await fetch(
      `http://localhost:5000/api/expenses/update/${expId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: ename,
          money: ecost,
          date:edate,
          month : emonth,
          year : eyear
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    setUpdated(true);
    setTimeout(() => {
      setUpdated(false);
    }, 50);
  }
  useEffect(() => {
    if (editingIndex !== -1) {
      setEname(expensesData[editingIndex].name);
      setEcost(expensesData[editingIndex].money);
    }
  }, [editingIndex, expensesData]);

  return (
    <>
      {/* <AddExpense/> */}
      <div className="flex">
        <AddExpenseInline month = {selectedMonth} year={selectedYear} />  
      </div>
      <div className="min-h-screen  right-0 bg-gray-900 text-white">
        <div className="bg-gray-800 py-4 px-6">
          <h2 className="text-xl font-semibold">{selectedMonth} {selectedYear}</h2>
          <div className="mt-2 flex overflow-visible overflow-x-auto md:overflow-x-hidden space-x-2 md:space-x-4 lg:space-x-6  flex-wrap ">
            {months.map((month) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(month)}
                className={`py-1 px-2 m-3 md:m-4 lg:m-6 rounded-md ${
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
          <table className="lg:min-w-[70%] overflow-y-auto bg-gray-800 rounded-lg">
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
                <tr
                  key={index}
                  id={`${expense._id}`}
                  className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}
                >
                  <td className="py-2 px-4">
                    
                    {editingIndex ===index ? (<>
                      <UpdateDate
                        setDate={setEdate}
                        setMonth={setEmonth}
                        setYear={setEyear}
                        />
                    </>) : (<>
                      {expense.date + " " + expense.month  + " "+ expense.year} 
                    </>)}
                  
                  
                  </td>
                  <td className="py-2 px-4">
                    {/* {expense.name} */}
                    {editingIndex === index ? (
                      <>
                        <Update val={ename} setVal={setEname} />
                      </>
                    ) : (
                      <>{expense.name}</>
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {/* ${expense.money} */}

                    {editingIndex === index ? (
                      <>
                        <Update val={ecost} setVal={setEcost} />
                      </>
                    ) : (
                      <>${expense.money}</>
                    )}
                  </td>
                  {editingIndex === -1 && (
                    <td className="py-2 px-4">
                      <button
                        className="text-white p-2 bg-red-600 rounded-lg"
                        onClick={(e) => {
                          delExpense(e.target.parentElement.parentElement.id);
                          console.log(e.target.parentElement.parentElement.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                  {editingIndex === -1 && (
                    <td className="py-2 px-4">
                      <button
                        className="text-white p-2 bg-blue-500 rounded-lg"
                        onClick={() => {
                          setEditingIndex(index);
                          // setTimeout(() => {
                          //   setEditingIndex(-1);
                          // }, 10000);
                        }}
                      >
                        Update
                      </button>
                    </td>
                  )}

                  {editingIndex === index && (
                    <td className="py-2 px-4">
                      <button
                        className="text-white p-2 bg-red-600 rounded-lg"
                        onClick={(e) => {
                          updateExp(e.target.parentElement.parentElement.id);
                          console.log(e.target.parentElement.parentElement.id);
                          setEditingIndex(-1);
                        }}
                      >
                        Enter
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Expenses;