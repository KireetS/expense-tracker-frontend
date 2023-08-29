import React, { useState } from "react";

const SignUp = () => {
  const [namevalue, setNamevalue] = useState("");
  const [mailvalue, setMailvalue] = useState("");
  const [passvalue, setPassvalue] = useState("");
  const [agevalue, setAgevalue] = useState(0);

  const onSubmithandle = async (e) => {
    // e.preventDefault()
    const response = await fetch("http://localhost:5000/api/auth/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: namevalue,
        age: agevalue,
        email: mailvalue,
        password: passvalue,
      }),
    });
    const data = await response.json();
    if (data.error) {
      console.log("failure");
    } else {
      console.log("success");
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="rounded-lg bg-gray-800 shadow-lg p-8 w-96">
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="text-gray-300 text-lg">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="block w-full bg-gray-700 rounded-md py-2 px-3 text-gray-200"
                value={namevalue}
                autoComplete="current-username" 
                onChange={(e) => setNamevalue(e.target.value)}
              />
            </div>
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
                autoComplete="current-password" 
                className="block w-full bg-gray-700 rounded-md py-2 px-3 text-gray-200"
                value={passvalue}
                onChange={(e) => setPassvalue(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="age" className="text-gray-300 text-lg">
                Age
              </label>
              <input
                type="number"
                id="age"
                className="block w-full bg-gray-700 rounded-md py-2 px-3 text-gray-200"
                value={agevalue}
                onChange={(e) => setAgevalue(e.target.value)}
              />
            </div>
            <button
              className="block w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
              onClick={onSubmithandle}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
