const express=require('express')
const tasks=require("./routes/tasks")
const connectDB= require('./db/connect')
require('dotenv').config()
const notFound=require('./middleware/notFound')


const app=express()
app.use(express.static('./public'))
app.use(express.json())

// app.get('/hello',(req,res)=>{
//     res.send("hello from Task manager")
// })

app.use('/api/v1/tasks',tasks);
app.use(notFound)

const port=3000

const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>{
            console.log(`server is running on PORT ${port}...`)
        })
        
    } catch (error) {
        console.log(error)
    }
}

start();


