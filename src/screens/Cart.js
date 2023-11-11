import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from 'react-toastify';

function Cart() {
  const { cart, setCart } = useContext(AppContext);
  const [finalPrice , setFinalPrice] = useState(0);
  
  useEffect(()=>{
    
 localStorage.setItem('cart' , JSON.stringify(cart)) ; 
  } , [cart])
  const deleteHandler = (i) => {
    setCart((cart) => {
        setFinalPrice(p=> p-parseInt(cart[i].price))
      return cart.filter((_, index) => i !== index);
    });
   
  };
  
  const handleCheckout = async() =>{
    let userEmail = localStorage.getItem('userEmail') ; 
    
    console.log(userEmail) ;
    let body = {
      email : userEmail ,
      order_data : cart ,
   
    }

    await axios({
      method: "post",
      url: "http://localhost:4000/insertOrder",
      data: body ,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        toast.success('Successfully ordered', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
           ; setCart([]) ; 
           setFinalPrice(0) ;
           
      })
      .catch((error) => {
        alert(error.message) ;    
        console.log(error);
      });

    
  }



useEffect(()=>{
    cart.map(item => {setFinalPrice(p=> p+ item.price) ; return<></>}) 
} ,[] ) 

  return (
    <div className=" relative min-h-[100vh] flex justify-center align-center ">
      <div className=" w-[90%] ">
        <table className="w-[100%] text-center mt-[50px] mx-auto ">
          <tr className="  text-white bg-[#00BC8D] ">
            <th>#</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th> </th>
          </tr>
          {cart.map((item, i) => {
            
              
               
            return (
              <tr key={i} className="">
                {" "}
                <td>{i}</td> <td>{cart[i].name}</td> <td>{cart[i].quantity}</td>{" "}
                <td>{cart[i].price}</td>{" "}
                <td
                  className="text-red-500 cursor-pointer"
                  onClick={() => deleteHandler(i)}
                >
                  Delete
                </td>{" "}
              </tr>
            );
          })}
        </table>
        <div className="mt-[100px] mx-8  text-white text-[2rem]">
          Total Price  :  {finalPrice}/-
        </div>
      </div>

      <button className="absolute bg-[#00BC8D] text-white bottom-[100px] right-[100px] px-5 py-3 hover:rounded-lg " onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
}

export default Cart;
