import { createContext, useContext,useEffect,useState } from "react";
const AuthContext =  createContext()

const AuthContextProvider = (props) =>{

    const [user,setUser] = useState({

        
    })


    useEffect(()=>{
        if(localStorage.getItem('User')){
            console.log(localStorage.getItem('User'));
            setUser(JSON.parse(localStorage.getItem('User')))
        }
        // eslint-disable-next-line 
    },[])

    return (
        <AuthContext.Provider value={[user,setUser]}>{props.children}</AuthContext.Provider>
    )

}

const useAuth = () => useContext(AuthContext)


export {
    useAuth,
    AuthContextProvider
}