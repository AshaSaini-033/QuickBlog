import React,{createContext,  useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {  useNavigate } from "react-router-dom";
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const AppContext = createContext();

export const AppProvider = ({children})=>{
    const navigate = useNavigate();
    const [token,setToken] = useState(null)
    const [blogs,setBlogs] = useState([]);
    const [input ,setInput]  = useState('') //filter blogs
    const fetchBlogs = async()=>{
        try{
            //already added baseurl
            const {data} = await axios.get('/api/blog/all');
            console.log("data is :",data)
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
        axios,navigate,token,setToken,blogs,setBlogs,input,setInput
    }
    return (
        <AppContext.Provider value ={value}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = ()=>{
    return useContext(AppContext)
}