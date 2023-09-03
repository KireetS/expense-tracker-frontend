import "./App.css";
import Login from "./Components/Login";
import NavbarGuest from "./Components/NavbarGuest";
import SignUp from "./Components/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import loginContext from "./contexts/login/loginContext";
import NavbarUser from "./Components/NavbarUser";
import Dashboard from "./Components/Dashboard";
import ExpState from "./contexts/expensesbtn/ExpState";

function App() {
  const {login} = useContext(loginContext)  
  console.log(login)
  return (
    <>
      <div className="overflow-hidden">
      <BrowserRouter>
        <ExpState>
           {login ? <NavbarUser/> : <NavbarGuest/>}
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          {login && <Dashboard/>}
          </ExpState> 
      </BrowserRouter>
      </div>
    </>
  );
}

export default App;
