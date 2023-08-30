import React, { useState} from "react";
import LoginContext from "./loginContext";
export const LoginState = (props) => {
  const [login , setLogin] = useState(!!localStorage.getItem("token"))
  const [token , setToken] = useState("")
  const [pressed , setPressed] = useState(false)
  const checkIfLogin = ()=>{
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
      setLogin(true)
      return true
    }else{
      setLogin(false)
      setToken("")
      return false
    }
  }
  return (
    <LoginContext.Provider value = {{login , token , checkIfLogin , pressed , setPressed}}>
      {props.children}
    </LoginContext.Provider>
  )
}

