import multer from 'multer'

//upload middleware
const upload= multer({storage :multer.diskStorage({})})

export default upload