import express from 'express'
import { User } from '../model/userSchema.js'
import jwt from "jsonwebtoken";

const router = express.Router()
const SECRET_KEY = 'key'


// get login POST method 
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(401).json({ error: 'Invalid user name' })
        }
        const isPassword = await User.findOne({ password })
        if (!isPassword) {
            return res.status(401).json({ error: 'Invalid user password' })
        }
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '20s' })
        return res.status(201).send(token)
    } catch (error) {
        res.status(500).json({ error: 'Error login' })
    }
})

// create user POST method
router.post('/register', async (req, res) => {
    try {
        if (!req.body.email || !req.body.username || !req.body.password) {
            return res.status(400).send({ message: 'sent all fields' })
        }
        const { email, username, password } = req.body
        const newUser = {
            email,
            username,
            password: password
        }
        const user = await User.create(newUser)
        return res.status(201).send(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

// get user GET method
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        return res.status(200).json({
            const: users.length,
            auth: users
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
})


// get user by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        return res.status(200).json(user)
    }
    catch (error) {
        console.log(error)
    }
})
export default router