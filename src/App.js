import "./App.css";
import Login from "./Components/Login";
import NavbarGuest from "./Components/NavbarGuest";
import SignUp from "./Components/SignUp";
import { BrowserRouter , Routes , Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarGuest />


        <Routes>
          <Route path="/signup" element = {<SignUp/>}/>
          <Route path="/login" element = {<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
