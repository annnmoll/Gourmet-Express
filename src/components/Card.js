import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { ToastContainer, toast } from 'react-toastify';

function Card({name , img , options}) {
  delete options[0]._id ; 
  const prices = Object.keys(options[0]) ; 
  const [quantity , setQuantity] = useState(1) ;
  const [size , setSize] = useState(prices[0]) ; 
 const{ cart ,  setCart} = useContext(AppContext) ; 

 useEffect(()=>{
localStorage.setItem('cart' , JSON.stringify(cart)) ;
 } , [cart])
 
  const handleAddToCart = ()=>{
       
         if( localStorage.getItem('authToken')){
         setCart(cart=>[...cart , {name : name , img : img ,  size:size , quantity : quantity , price : quantity * parseInt(options[0][size] )}])
        
         toast.success('Added to cart', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        }
         else{
          toast.warn( 'Login first', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
      
         }
  }

  return (
    <div className='m-5 mb-10  bg-black rounded-lg '>
    <div
      className="block mt-3 max-w-[20rem] max-h-[450px] rounded-sm bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 rounded-lg ">
      <div className="relative overflow-hidden bg-cover bg-no-repeat ">
        <img
          className="rounded-t-sm h-[175px] w-[100%] object-cover"
          src={img}
          alt="" />
      </div>
      <div className="p-6">
      <p>{name }</p>
        <p className="text-base text-neutral-600 dark:text-neutral-200">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <div className='container w-100'>
          <select className='m-2  w-100 bg-[var(--bgBackground)] text-white rounded-t-md p-2' onChange= {(e)=> setQuantity(e.target.value)}>
            {Array.from(Array(6) , (e,i)=> { return (<option key={i+1} value={i+1} >{i+1}</option>)} )}
          </select>
          <select className='m-2 w-100 bg-[var(--bgBackground)] text-white rounded-t-md p-2' onChange={(e)=>setSize(e.target.value)}>
          {prices.map((price , i ) =><option key={i} value={price} >{price}</option>)}
          </select>
          <div className='inline text-lg ml-5 font-bold' >Rs  {options[0][size]}/-</div>
        </div>
        <hr></hr>
        <button className="btn bg-[var(--bgBackground)] text-white py-2 px-3 rounded-sm m-2" onClick={handleAddToCart}>Add to cart</button>
      </div>
    </div>
  </div>
  )
}

export default Card