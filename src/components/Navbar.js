import React, { useContext  , useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Navbar() {
  const navigate = useNavigate();
  const [selectedScreen , setSelectedScreen] = useState("Home")
  const { cart } = useContext(AppContext);
  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("authToken");
    localStorage.removeItem("cart");
  };
  return (
    <nav className="fixed bg-[var(--componentBackground)] border-gray-200  bg-[#00BC8D]  top-0 w-[100vw] z-10">
      <div className="max-w-screen-xl flex flex-wrap items-center gap-10 mx-auto p-4 justify-between md:justify-start">
        <Link to="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap  text-[#071952]">
            GourmetExpress
          </span>
        </Link>
       
        <div
          className=" block text-center flex justify-between  items-center   w-[80%]"
          id="navbar-default"
        > 
          <div>
            <ul className="font-medium flex  border  border-0">
              <li onClick={()=>{setSelectedScreen("Home")}}>
                <Link
                  to="/"
                  
                  className={`block py-2 pl-3 pr-3 text-gray-600 bg-transparent rounded text-[1.1rem] md:hover:text-blue-700 ${selectedScreen === "Home" ? "text-blue-800" : ""}`}
                  
                >
                  Home
                </Link>
              </li>

              {localStorage.getItem("authToken") ? (
                <li onClick={()=>{setSelectedScreen("Orders")}}>
                  <Link
                    to="/"
                    className={`block py-2 pl-3 pr-3 text-gray-600 bg-transparent rounded text-[1.1rem] md:hover:text-blue-700 ${selectedScreen ===  "Orders" ? "text-blue-800" : ""}` }
                  
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
          {localStorage.getItem("authToken") ? (
            <div className="flex flex-row gap-8 font-medium  ">
              <Link
                to="/cart"
                className="btn  bg-transparent text-[var(--bgBackground)]  block py-1  px-2 rounded-sm  relative hover:scale-105"
              >
                My Cart
                <p className="absolute top-[-13px] right-[-10px] bg-red-700 text-white px-2 rounded-full">
                  {cart?.length}
                </p>
              </Link>
              <Link
                to="/"
                className="btn  bg-transparent text-red-500  block py-1  px-2 rounded-sm  hover:scale-105 "
                onClick={handleLogout}
              >
                Logout
              </Link>
            </div>
          ) : (
            <div className="flex flex-row gap-8 font-black  ">
              <Link
                to="/login"
                className="btn  text-[var(--bgBackground)]  block py-1  px-2 rounded-sm  hover:scale-[1.06] "
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="btn text-[var(--bgBackground)] block py-1 px-2 rounded-sm hover:scale-[1.06]"
              >
                SignUp
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
