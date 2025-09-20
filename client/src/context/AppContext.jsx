import { Children, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createContext, useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const AppContext = createContext();

export const AppProvider = ({Children})=>{
    const navigate = useNavigate();
    const [token,setToken] = useState(null)
    const [blog,setBlogs] = useState([]);
    const [input ,setInput]  = useState('') //filter blogs
    const fetchBlogs = async()=>{
        try{
            //already added baseurl
            const {data} = await axios.get('/api/blog/all');
            data.success ? setBlogs(data.blogs) : toast.error(data.message)
        }
        catch(error){
            toast.error(error.message)
        }
    }
    useEffect(()=>{
        fetchBlogs()
        //user auth
        //when load web page chek the abailable token at browser local storage if available add in axios headers
        const token = localStorage.getItem('token')
        if(token){
            setToken(token);
            axios.defaults.headers.common['Authorization'] =`${token}`
            //add when token available in all api cals
        }

    },[])
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