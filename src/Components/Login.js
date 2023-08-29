import React, { useState } from "react";
const Login = () => {
  const [mailvalue, setMailvalue] = useState("");
  const [passvalue, setPassvalue] = useState("");
  const onSubmithandle = async (e) => {
    e.preventDefault()
    const response = await fetch("http://localhost:5000/api/auth/login", {
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
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="rounded-lg bg-gray-800 shadow-lg p-8 w-96">
          <form className="space-y-4">
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
            <button
              className="block w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              onClick={onSubmithandle}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
