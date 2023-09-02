import React  , {useContext, useState}from "react";
import expContext from "../../contexts/expensesbtn/expContext";
const AddExpenseInline = (props) => {
  const [expensename, setExpenseName] = useState("")
  const [cost , setCost] = useState(0)
  const [day , setDay] = useState(1)
  // const [month , setMonth] = useState(props.month) 
  // const [year , setYear] = useState(2001)   
  const {setPress} = useContext(expContext)

  
  const onClickSubmit = async()=>{
    try{
      await fetch("http://localhost:5000/api/expenses/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      body: JSON.stringify({
        name: expensename,
        money: cost,
        date:day,
        month : props.month,
        year : props.year
      })
    
    });
    // const data = await response.json()
    // console.log(data)
    }catch(err){
      console.error("error fetching " , err)
      console.log("yeh dekh")
    }
  }
  return (
    <div className="bg-gray-800 p-4 w-screen  shadow-md">
      <div className="flex flex-wrap overflow-visible  items-center space-x-2">
        <input
          type="text"
          placeholder="Day"
          className="w-16 px-2 py-1 m-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300 flex-1"
          onChange={(e)=>{
            setDay(e.target.value)
          }}
        />
        <input
          type="text"
          placeholder="Month"
          className="w-24 px-2 py-1 m-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300 flex-1"
          value = {props.month}
          onChange={()=>{}}
        />
        <input
          type="text"
          placeholder="Year"
          value={props.year}
          className="w-20 px-2 py-1 m-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300 flex-1"
          onChange={()=>{}}
        />
        <input
          type="text"
          placeholder="Expense Name"
          className="flex-grow px-2 py-1 m-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300 flex-1"
          onChange={(e)=>{
            setExpenseName(e.target.value)
          }}
        />
        <input
          type="text"
          placeholder="Expense Cost"
          className="w-28 px-2 py-1 m-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300 flex-1"
          onChange={(e)=>{
            setCost(e.target.value)
          }}
        />
        <button className="px-4 py-1 m-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300 flex-1"
        onClick={()=>{
         
          onClickSubmit()
          setPress(true)
          setTimeout(()=>{
            setPress(false)
          },50)
        }}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseInline;
