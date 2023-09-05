import React, { useContext, useState } from "react";
import loginContext from "../contexts/login/loginContext";
import {useNavigate} from "react-router-dom"
const Login = () => {
  const {checkIfLogin} = useContext(loginContext)
  const [mailvalue, setMailvalue] = useState("");
  const [passvalue, setPassvalue] = useState("");
  const history = useNavigate()

  const onSubmithandle = async (e) => {
    
    e.preventDefault()
    const response = await fetch("https://expensetrackerbackend-tcjg.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: mailvalue,
        password: passvalue,
      }),
    });
    const data = await response.json();
    if (data.error) {
      console.log("failure");
    } else {
      console.log("success");
      localStorage.setItem("token", data.token);
      checkIfLogin()
      history("/")
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="rounded-lg bg-gray-800 shadow-lg p-8 w-96">
          <form className="space-y-4 my-4">
            <div>
              <label htmlFor="email" className="text-gray-300 text-lg">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="block w-full bg-gray-700 rounded-md py-2 px-3 text-gray-200"
                value={mailvalue}
                autoComplete="current-email" 
                onChange={(e) => setMailvalue(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-300 text-lg">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="block w-full bg-gray-700 rounded-md py-2 px-3 text-gray-200"
                value={passvalue}
                autoComplete="current-password" 
                onChange={(e) => setPassvalue(e.target.value)}
              />
            </div>
            
          </form>
          <button
              className="block w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              onClick={(e)=>{
                onSubmithandle(e)
              }}
            >
              Login
            </button>
        </div>
      </div>
    </>
  );
};

export default Login;
