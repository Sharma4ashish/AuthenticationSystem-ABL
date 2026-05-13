import express from "express"
import helmet from "helmet";
import cors from "cors"
import cookieParser from "cookie-parser"
import { env } from "./config/env.config.js";
import logger from "./config/logger.config.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import { AppError } from "./utils/AppError.js";

const app = express();

app.use(helmet())
app.use(cors({
    origin: env.FRONTEND_URL,
    credentials:true
}))
app.use(express.json({limit:"1mb"}))
app.use(express.urlencoded({
    extended:true,
    limit:"1mb"
}))
app.use(cookieParser())

app.get("/health-check",(_, res) =>{
    return res.status(200).json({
        success:true,
        message:"Server is Healthy "
    });    
})

app.use((req, res, next) => {
    next(new AppError(`Cannot ${req.method} ${req.originalUrl}`,404))
})

app.use(globalErrorHandler)

export default app