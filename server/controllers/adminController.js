import jwt from 'jsonwebtoken'
import Blog from '../models/Blog'

export const adminLogin = async(req,res)=>{
    try{
        //get data from body
        const {email,password} = req.body
        if(email !=process.env.ADMIN_EMAIL || password !==process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:'invalid credientials'})
        }
        const token = jwt.sign({email},process.env.JWT_SECRET)
        res.json ({success:true,token})
    }catch(error){
        res.json({success:false,message:error.message})
    }
}
export const getAllBlogsAdmin=async(req,res)=>{
    try{
        const blogs = (await Blog.find({})).sort({createdAt:-1})
 res.json ({success:true,blogs})
    }catch(error){
        res.json({success:false,message:error.message})
    }
}
export const getAllComments =async(req,res)=>{
    try{
      const comments = await Comment.find({}).populate('blog').sor({createdAt:-1})
       res.json ({success:true,comments})
    }catch(error){
        res.json({success:false,message:error.message})
    }
}
export const getDashboard =async(req,res)=>{
    try{
        const recentBlogs = await Blog.find({}).sort({createdAt:-1}).limit(5);
        const blogs = Blog.countDocuments();
        const comments = Comment.countDocuments();
        const drafts = await Blog.countDocuments({isPublished:false})
        const dashboardData = {
            blogs,comments,recentBlogs,drafts
        }
         res.json ({success:true,dashboardData})
    }catch(error){
        res.json({success:false,message:error.message})
    }
}
//delet commnt
export const deleteCommentById =async(req,res)=>{
    try{
        const {id} = req.body
        await Comment.findByIdAndDelete(id)

        //delete all cmmt associated with  the blog deleted
        await Comment.deleteMany({blog:id});
        res.json({success:true,message:"Comment deleted successfully"})
    }catch(error){
        res.json({success:false,message:error.message})
    }
}
export const approveCommentById =async(req,res)=>{
    try{
        const {id} = req.body
        //using this we can approve comments newly are unapproved 
        await Comment.findByIdAndUpdate(id,{isApproved:true})
        res.json({success:true,message:"Comment approved successfully"})
    }catch(error){
        res.json({success:false,message:error.message})
    }
}