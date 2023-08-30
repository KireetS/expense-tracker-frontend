import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const navigate = useNavigate()
  const [expensename, setExpenseName] = useState("")
  const [cost , setCost] = useState(0)
  const onClickSubmit = async()=>{
    try{
      const response = await fetch("http://localhost:5000/api/expenses/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      body: JSON.stringify({
        name: expensename,
        money: cost,
      })
    
    });
    const data = await response.json()
    console.log(data)
    navigate("/dashboard")

    }catch(err){
      console.error("error fetching " , err)
      console.log("yeh dekh")
    }
  }
  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
          <h2 className="text-xl font-semibold mb-6">Enter Expense</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Day"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
              />
              <input
                type="text"
                placeholder="Month"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
              />
              <input
                type="text"
                placeholder="Year"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <input
              type="text"
              placeholder="Expense Name"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e)=>{setExpenseName(e.target.value)}}
            />
            <input
              type="text"
              placeholder="Expense Cost"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e)=>{setCost(e.target.value)}}
            />
            <button className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300" onClick={onClickSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddExpense;
