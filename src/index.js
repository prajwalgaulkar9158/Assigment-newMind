const express = require('express')
const app = express()
const route = require('./routes/route.js');
 const dotenv=require('dotenv')
 dotenv.config()
app.use(express.json());
app.use('/', route);

const {PORT}=process.env
const startServer = async()=>{
    try {
        app.listen(PORT,()=>{
            console.log(`Server Started At Port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
startServer()