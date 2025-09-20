import express from 'express'
import { addBlog, deleteBlogById, getAllBlogs, getBlogById, togglePublish } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router();

// add in req.file
blogRouter.post('/add',upload.single('image') ,auth, addBlog)
blogRouter.get('/all' ,getAllBlogs)
blogRouter.get('/:blogId',getBlogById);
// only admin can delet
blogRouter.post('/delete',auth,deleteBlogById)
blogRouter.post('/toggle-publish',auth,togglePublish);
//need mw to parse image whivh upload from frontend use multer pacakge

export default blogRouter;