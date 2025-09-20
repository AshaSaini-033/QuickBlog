import { Children, useContext, useState } from "react";
import { createContext, useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const AppContext = createContext();

export const AppProvider = ({Children})=>{
    const navigate = useNavigate();
    const [token,setToken] = useState(null)
    const [blog,setBlogs] = useState([]);
    const [input ,setInput]  = useState('') //filter blogs
    const value={
        axios,navigate,token,setToken,blog,setBlogs,input,setInput
    }
    return (
        <AppContext.Provider value ={value}>
            {Children}
        </AppContext.Provider>
    )
}
export const useAppContext = ()=>{
    return useContext(AppContext)
}