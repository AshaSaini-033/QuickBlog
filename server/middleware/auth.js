//varify the admin
import jwt from 'jsonwebtoken'


const auth = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Authentication token is missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    try{
        //varifyy
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        // Optional: You can attach decoded payload to request if needed in next routes
        // req.user = decoded;
        next();
    }catch(error){
        res.status(401).json({success:false,message: "Invalid or expired token. " + error.message})
    }
}
export default auth