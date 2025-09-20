//varify the admin
import jwt from 'jsonwebtoken'


const auth = (req,res,next)=>{
    const token = req.headers.authorization;
    try{
        //varifyy
        jwt.verify(token,process.env.JWT_SECRET)
        next();

    }catch(error){
        res.json({success:false,message:error.message})
    }
}
export default auth