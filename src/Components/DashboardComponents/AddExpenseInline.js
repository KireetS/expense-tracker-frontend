import React  , {useState}from "react";

const AddExpenseInline = () => {
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
    }catch(err){
      console.error("error fetching " , err)
      console.log("yeh dekh")
    }
  }
  return (
    <div className="bg-gray-800 p-4 w-[82.5%] shadow-md">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Day"
          className="w-16 px-2 py-1 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          type="text"
          placeholder="Month"
          className="w-24 px-2 py-1 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          type="text"
          placeholder="Year"
          className="w-20 px-2 py-1 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          type="text"
          placeholder="Expense Name"
          className="flex-grow px-2 py-1 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          onChange={(e)=>{
            setExpenseName(e.target.value)
          }}
        />
        <input
          type="text"
          placeholder="Expense Cost"
          className="w-28 px-2 py-1 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          onChange={(e)=>{
            setCost(e.target.value)
          }}
        />
        <button className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        onClick={onClickSubmit}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseInline;
