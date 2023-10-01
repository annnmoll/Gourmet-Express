import React, { useContext } from "react";
import { Link , useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";


function Navbar() {
  const navigate = useNavigate() ; 
  const{cart} = useContext(AppContext) ;
  const handleLogout = () =>{
    navigate("/login") ; 
    localStorage.removeItem('authToken') ; 
    
    

  }
  return (
    <nav className="bg-[#00BC8D] border-gray-200  bg-[#00BC8D] ">
      <div className="max-w-screen-xl flex flex-wrap items-center gap-10 mx-auto p-4 justify-between md:justify-start">
        <Link to="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap  text-white">
            GourmetExpress
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className=" block text-center flex justify-between  items-center   w-[80%]"
          id="navbar-default"
        >
          <div>
            <ul className="font-medium flex  border  border-0">
              <li>
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-3 text-gray-900 bg-transparent rounded text-[1.1rem] md:hover:text-blue-700"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>

              {localStorage.getItem("authToken") ? (
                <li>
                  <Link
                    to="/"
                    className="block py-2 pl-3 pr-3 text-gray-900 bg-transparent rounded text-[1.1rem] md:hover:text-blue-700"
                    aria-current="page"
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
                className="btn  bg-white text-[#00BC8D]  block py-1  px-2 rounded-sm  relative"
              >
                My Cart
                <p className="absolute top-[-13px] right-[-10px] bg-red-700 text-white px-2 rounded-full">{cart?.length}</p>
              </Link>
              <Link
                to="/"
                className="btn  bg-white text-red-500  block py-1  px-2 rounded-sm  "
                onClick = {handleLogout}
              >
                Logout
              </Link>
            </div>
          ) : (
            <div className="flex flex-row gap-8 font-medium  ">
              <Link
                to="/login"
                className="btn  bg-white text-[#00BC8D]  block py-1  px-2 rounded-sm  "
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="btn bg-white text-[#00BC8D] block py-1 px-2 rounded-sm"
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
