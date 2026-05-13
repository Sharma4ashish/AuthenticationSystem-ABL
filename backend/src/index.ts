import { env } from "./config/env.config.js";
import app from "./app.js";
import logger from "./config/logger.config.js";


const startServer = ()=>{
    try {
        app.listen(env.PORT, ()=>{
            logger.info(`Server is runing on PORT No: ${env.PORT}`)
        })
    } catch (error:any) {
        logger.error(error?.message || "Error Starting Server");
        process.exit(1);
    }
}

startServer()
