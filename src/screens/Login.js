import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ email: '', password: '' })

  const changeHandler = (e) => {

    setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }));



  }
  const submitHandler = async (e) => {
    try {
      e.preventDefault('');
       await axios({
        method: "post",
        url: "http://localhost:4000/getuser",
        data: userData,
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          setUserData({ ...userData, email: '', password: '' });
          console.log('email'  )
          localStorage.setItem('userEmail' , userData.email)
          localStorage.setItem('authToken' , response?.data?.token);
          console.log(localStorage.getItem("authToken")) ; 
          navigate('/')
        })
        .catch((error) => {
          toast.warn(error.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          console.log(error);
        });

      
    } catch (error) {
      alert(error) ;
    }

  }
  return (
    <div className=' '>

      <section className="bg-[var(--bgBackground)]" >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
               Login
              </h1>
              <form className="space-y-4 md:space-y-6" action="#" onChange={(e) => changeHandler(e)} >

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" value={userData.email} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" value={userData.password} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>


                <button type="submit" onClick={(e) => { submitHandler(e) }} className="w-full text-white bg-[var(--bgBackground)] hover:scale-[1.025] font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Login</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account? 
                  <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500"> Create account</Link>
                </p>

              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
