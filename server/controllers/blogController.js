import fs from 'fs'
import imagekit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
// Add at the top of blogController.js
import mongoose from 'mongoose';
import main from '../configs/gemini.js';
export const addBlog = async(req,res)=>{
    try{
        const {title,subTitle,description,category,isPublished} = JSON.parse(req.body.blog)
        const imageFile = req.file;
        //parse it using miidleware that create using multer packgae

        //check fields
        if(!title || !description ||!category ||!imageFile){
            return res.json({success:false,message:"Missing required field"})
        }
        // for image store in cloud storage use image kit conevert into base64
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file:fileBuffer,
            fileName:imageFile,
            folder:'/blog'
        })
        //optimize thorugn imgae kit 
        const optimizedImageUrl = imagekit.url({
            path:response.filePath,
            transformation:[
                {quality:'auto'},  //auto compression
                {format :'webp'},   //convert to modern format
                {width: '1280'}     //width resizing
            ]  
        })
        //url
        const image= optimizedImageUrl;
        //save data in mongo
        await Blog.create({title,subTitle,description,category,image,isPublished})

        res.json({success:true,message:"Blog added successfully"})
    }catch(error){
        res.json({success:false,message:error.message})
    }
}
//get all bllog

export const getAllBlogs = async(req,res)=>{
    try{

        const blogs =await Blog.find({isPublished:true}).sort({createdAt:-1})
        res.json({success:true,blogs})
    }catch(error){
         res.json({success:false,message:error.message})
    }
}
//get individual 
export const getBlogById = async(req,res)=>{
    try{
        const {id} = req.params;
        const blog = await Blog.findById(id);
        if(!blog || !blog.isPublished){
      return res.json({success:false,message:"Blog not found"})
        }
        res.json({success:true,blog})
    }catch(error){
        return res.json({success:false,message:error.message})
    }
}
//delete bllog
export const deleteBlogById = async(req,res)=>{
    try{
        const {id} = req.body;
        const blog = await Blog.findByIdAndDelete(id);
      
        res.json({success:true,message:"Blog deleted successfully"})
    }catch(error){
        return res.json({success:false,message:error.message})
    }
}
//publish and unpublish
export const togglePublish = async(req,res)=>{
    try{
        const {id} = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished= !blog.isPublished;
        await blog.save();
        res.json({success:true,message:"blog status updated"})
    }catch(error){
        return res.json({success:false,message:error.message})
    }
}
//add commment 
export const addComment = async(req,res)=>{
    try{
        const {blogId,name,content} = req.body
        await Comment.create({blog:blogId,name,content})
     res.json({success:true,message:"Comment added successfully"})
    }catch(error){
        return res.json({success:false,message:error.message})
    }
}
//get commnt 
export const getBlogComment = async(req,res)=>{
    try{
        const {blogId} = req.body
       const comments = await Comment.find({blog:blogId,isApproved:true}).sort({createdAt:-1})
     res.json({success:true,comments})
    }catch(error){
        return res.json({success:false,message:error.message})
    }
}

export const generateContent =async(req,res) =>{
    try{
        const {prompt} = req.body;
        const content = await main(prompt+'Generate the blog content for this topic in simple text format')
       res.json({success:true,content})

    }catch(error){
        res.json({succes:false,message:error.message})
    }
}