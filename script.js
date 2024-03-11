import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import userRoures from "./routes/userRoute.js"
import { dbURL, PORT } from "./config.js";

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('profileImages'))


app.get('/', (req, res) => {
    return res.status(234).send('Admin')
})
// Routes
app.use('/', userRoures)

mongoose.connect(dbURL).then(() => {
    console.log("connected to DB")
    app.listen(PORT, () => {
        console.log(`Listining port: ${PORT}`)
    })
}).catch((error) => {
    console.log(error)
})