import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import userRoures from "./routes/userRoute.js"
import dotenv from "dotenv"

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()
app.use(express.static('profileImages'))


app.get('/', (req, res) => {
    return res.status(234).send('Admin')
})
// Routes
app.use('/', userRoures)

mongoose.connect(process.env.dbURL).then(() => {
    console.log("connected to DB")
    app.listen(process.env.PORT, () => {
        console.log(`Listining port: ${process.env.PORT}`)
    })
}).catch((error) => {
    console.log(error)
})