import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/BlogRoutes.js';

const app = express();
//middleware

app.use(cors())
app.use(express.json())
//Routes
//home
app.get('/', (req,res)=> res.send("Api is working"))
app.use('/api/admin',adminRouter)
app.use('/api/blog',blogRouter)

const PORT = process.env.PORT ||3000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log('server is running on port ' + PORT);
        });
    } catch (error) {
        console.error("Failed to connect to the database", error);
        process.exit(1);
    }
};

startServer();

export default app;