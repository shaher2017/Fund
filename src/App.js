import React, { useState, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Amount } from "./components/paycontext/paycontext";
import Loader from "./components/loader/loader";

const Navbar = React.lazy(() => import("./components/navbar/navbar"));
const Addproject = React.lazy(() =>
  import("./components/addproject/addproject")
);
const Register = React.lazy(() => import("./components/register/register"));
const Projects = React.lazy(() => import("./components/projects/projects"));
const Notfound = React.lazy(() => import("./components/notfound/notfound"));
const Login = React.lazy(() => import("./components/login/login"));
const Editproject = React.lazy(() =>
  import("./components/editproject/editproject")
);
const Aboutus = React.lazy(() => import("./components/aboutus/aboutus"));
const Details = React.lazy(() => import("./components/details/details"));
const Footer = React.lazy(() => import("./components/footer/footer"));
const Paying = React.lazy(() => import("./components/paying/paying"));
const Favorites = React.lazy(() => import("./components/favorites/favorites"));
const Funds = React.lazy(() => import("./components/funds/funds"));
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
          <Suspense fallback={<Loader />}>
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
                <Route path="/*" element={<Notfound />} />
              </Routes>
            </Amount.Provider>
            <Footer />
          </Suspense>
        </div>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
}

export default App;
