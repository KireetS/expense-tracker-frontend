import React,{useContext}from "react";
import { Link } from "react-router-dom";
import "./../Home.css"
import loginContext from "../contexts/login/loginContext";
const Home = () => {
  const {login} = useContext(loginContext)  
  return (
    <div className="overflow-y-hidden">
      <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white flex flex-col justify-center items-center " >
      <h1 className="text-4xl font-semibold mb-6">
        <span className="typing-animation">Expense Tracker</span>
      </h1>
      <div className="mx-4 flex items-center">
      {!login && <div className="space-x-4">
        <Link to="/login">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg">
            Sign Up
          </button>
        </Link>
      </div>}
      </div>
    </div>
    </div>
  );
};

export default Home;
