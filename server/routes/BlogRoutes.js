import express from 'express'
import { addBlog } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router();

// add in req.file
blogRouter.post('/add',upload.single('image') ,auth, addBlog)
//need mw to parse image whivh upload from frontend use multer pacakge

export default blogRouter;