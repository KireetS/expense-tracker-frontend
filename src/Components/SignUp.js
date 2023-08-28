import React, { useState } from "react";

const SignUp = () => {
  const [namevalue , setNamevalue] = useState("")
  const [mailvalue , setMailvalue] = useState("")
  const [passvalue , setPassvalue] = useState("")
  const [agevalue , setAgevalue] = useState(0)
  function handleOnChangename(e) {
    setNamevalue(e.target.value)
    
  }
  function handleOnChangemail(e) {
    setMailvalue(e.target.value)
    
  }
  function handleOnChangepass(e) {
    setPassvalue(e.target.value)
    
  }
  function handleOnChangeage(e) {
    setAgevalue(e.target.value)
    
  }

  const onSubmithandle = async (e)=>{
    // e.preventDefault()
    const response = await fetch("http://localhost:5000/api/auth/create",{
      method:"POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name: namevalue,
        age: agevalue,
        email: mailvalue,
        password: passvalue,
      })
    })
    const data = await response.json()
    if(data.error){
      console.log("failure")
    }else{
      console.log("success")
    }
  }
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="rounded-[50px] h-[50vh] w-[50vh] bg-slate-800 flex flex-col items-center justify-center">
          <form
            className="flex flex-col justify-center items-center my-1"
            action="POST"
          >
            <div>
              <div className="text-lg text-slate-50 ">name</div>
              <input
                className="text-lg bg-slate-300 rounded-[5px] inline-block my-2 "
                type="text"
                name="name"
                value = {namevalue}
                id="name"
                autoComplete='current-name'
                onChange={handleOnChangename}
              />
            </div>
            <div>
            <div className="text-lg text-slate-50 ">email</div>
              <input
                className="text-lg bg-slate-300 rounded-[5px] inline-block my-2 "
                value = {mailvalue}
                type="email"
                name="email"
                id="email"
                autoComplete='current-email'
                onChange={handleOnChangemail}
              />
            </div>
            <div>
            <div className="text-lg text-slate-50 ">password</div>
              <input
                className="text-lg bg-slate-300 rounded-[5px] inline-block my-2 "
                value = {passvalue}
                type="password"
                name="password"
                id="password"
                autoComplete='current-password'
                onChange={handleOnChangepass}
              />
            </div>
            <div>
            <div className="text-lg text-slate-50 ">age</div>
              <input
                className="text-lg bg-slate-300 rounded-[5px] inline-block my-2 "
                type="number"
                value = {agevalue}
                name="age"
                id="age"
                autoComplete='current-age'
                onChange={handleOnChangeage}
              />
            </div>
          </form>
          <button className="text-lg text-gray-50 rounded-[7px] py-2 px-3 mt-3 bg-blue-800" onClick={onSubmithandle}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
