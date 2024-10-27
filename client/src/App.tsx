import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import Login from "./components/ThePleaseUseAnyOtherMethodAuth/Login";
import AboutUs from "./components/AboutUs/AboutUs";
import Register from "./components/ThePleaseUseAnyOtherMethodAuth/Register";
// @ts-ignore
import Home from "./components/Home"; //must be jsx file
import "./App.css";

import { LoginProvider } from "./context/LoginContext";

function App() {
  return (
    <LoginProvider>
      <Router>
        <Routes>
          <Route path="/hackunt/" element={<Landing />} />
          <Route path="/hackunt/test" element={<Home />} />
          <Route path="/hackunt/login" element={<Login />} />
          <Route path="/hackunt/register" element={<Register />} />
          <Route path="/hackunt/home" element={<Home />} />
          <Route path="/hackunt/about-us" element={<AboutUs />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Router>
    </LoginProvider>
  );
}

export default App;
