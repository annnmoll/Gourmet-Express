import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function Otp() {
    const {userData , setUserData} = useContext(AppContext) ; 
     const navigate = useNavigate() ;
    const changeHandler = (e) => {
        setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        
    }
    const submitHandler = async (e) => {
        try {

      


            e.preventDefault('');
            await axios({
                method: "post",
                url: "http://localhost:4000/createUser",
                data: userData,
                headers: { "Content-Type": "application/json" },
            })
                .then((response) => {
                    setUserData({ ...userData, name: '', email: '', password: '', confirmPassword: '', location: '' });
                    toast.success('Successfully signed up', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        }); 
                        navigate('/login')
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
                  
                });

           
        } catch (error) {
            alert(error)
        }

    }


  return (
    <div>
     <div className="w-[100vw] h-[100vh] mx-auto flex flex-col justify-center items-center mt-[-20px]">
      <h2 className="text-xl mb-4 text-[#00BC8D] text-[2rem]">Enter 6-Digit OTP</h2>
      <div className="flex flex-col space-x-2 gap-10">
        <input  name ="otp" className='border-0 outline-none px-3 py-2 text-center' maxLength='6' onChange={(e)=>changeHandler(e)}></input>
        <button  type='Submit' onClick={submitHandler}className='bg-[#00BC8D] text-white px-3 py-2  rounded-md hover:scale-110 duration-500'>Submit</button>
      </div>
    </div></div>
  )
}

export default Otp
