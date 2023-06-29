import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Outlet } from 'react-router-dom'
import Login from "../pages/Login"


const AuthRoute = () => {


  const [ok,setOk] = useState(false)  
//   eslint-disable-next-line 
  const [user,setUser] = useAuth()

  


  useEffect(()=>{
    
    if(user?.name) {
        setOk(true)
    }
    else{
        setOk(false)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user?.name])


  return ok ? <Outlet/> : <Login/>
}

export default AuthRoute