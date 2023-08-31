import { useState } from "react";
import ExpContext from "./expContext";

const ExpState = (props)=>{
  const [press , setPress] = useState(false)
  return(
    <ExpContext.Provider value={{press,setPress}}>
      {props.children}
    </ExpContext.Provider>
  )
}

export default ExpState