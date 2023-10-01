import React from 'react'

function Otp() {
  return (
    <div>
     <div className="w-[100vw] h-[100vh] mx-auto flex flex-col justify-center items-center mt-[-20px]">
      <h2 className="text-xl mb-4 text-[#00BC8D] text-[2rem]">Enter 6-Digit OTP</h2>
      <div className="flex flex-col space-x-2 gap-10">
        <input className='border-0 outline-none px-3 py-2 text-center' maxLength='6'></input>
        <button className='bg-[#00BC8D] text-white px-3 py-2  rounded-md hover:scale-110 duration-500'>Submit</button>
      </div>
    </div></div>
  )
}

export default Otp