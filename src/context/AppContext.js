import React, { createContext, useState } from 'react'


export const AppContext = createContext() ;

function AppContextProvider({children}) {
   const[state  , setState ] = useState('') ;
   const [cart  , setCart] = useState([]) ; 
   const [userData, setUserData] = useState({ name: '', email: '', password: '', confirmPassword: '', location: ''  , otp: ''})
   
   const value = {state , setState ,cart , setCart , userData , setUserData} 
   
  return (<AppContext.Provider  value={value}>
     {children}
  </AppContext.Provider>)

}


export default AppContextProvider 
