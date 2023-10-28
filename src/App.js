import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Addproject from "./components/addproject/addproject";
import Register from "./components/register/register";
import Projects from "./components/projects/projects";
import Login from "./components/login/login";
import Editproject from "./components/editproject/editproject";
import Favorites from "./components/favorites/favorites";
import Aboutus from "./components/aboutus/aboutus";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Details from "./components/details/details";
import Footer from "./components/footer/footer";
import { Amount } from "./components/paycontext/paycontext";
import Paying from "./components/paying/paying";
import Funds from "./components/funds/funds";
function App() {
  const [amount, setAmountcon] = useState(0);
  const [projectid, setProjectid] = useState("");
  const initialOptions = {
    clientId:
      "AaeUjT1E3Kn9K9S55Jv7Qs_oY_5dIAH-0HwPEH8jf0zfR2y5kKsX3ojtTPcXWJ1zXgMC0Ps5PO_d7uuO",
    currency: "USD",
    intent: "capture",
  };
  const [onlyuserprojects, setOnlyuserprojects] = useState(false);
  return (
    <PayPalScriptProvider options={initialOptions}>
      <BrowserRouter>
        <div className="App">
          <Navbar
            setOnlyuserprojects={setOnlyuserprojects}
            onlyuserprojects={onlyuserprojects}
          />
          <Amount.Provider
            value={{ amount, setAmountcon, projectid, setProjectid }}
          >
            <Routes>
              <Route
                path="/"
                element={<Projects onlyuserprojects={onlyuserprojects} />}
              />
              <Route
                path="/projects"
                element={<Projects onlyuserprojects={onlyuserprojects} />}
              />
              <Route path="/addproject" element={<Addproject />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/project/:id" element={<Editproject />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/aboutus" element={<Aboutus />} />

              <Route path="/details/:id" element={<Details />} />
              <Route path="/paying" element={<Paying />} />
              <Route path="/funds" element={<Funds />} />
            </Routes>
          </Amount.Provider>
          <Footer />
        </div>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}

export default App;
