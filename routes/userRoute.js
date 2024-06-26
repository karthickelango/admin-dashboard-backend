import express from 'express'
import { User } from '../model/userSchema.js'
import jwt from "jsonwebtoken";
import multer from 'multer';
import bcrypt from 'bcrypt'

const router = express.Router()
const SECRET_KEY = 'key'

// image uploader folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './profileImages')
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage })

// create user POST method
router.post('/register', async (req, res) => {
    try {
        if (!req.body.email || !req.body.username || !req.body.password || !req.body.userType) {
            return res.status(400).send({ message: 'sent all fields' })
        }
        const { email, username, password, userType } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = {
            email,
            username,
            password: hashedPassword,
            avatar: null,
            about: null,
            role: null,
            contact: null,
            userType
        }
        const user = await User.create(newUser)
        return res.status(201).send(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})



// get login POST method 
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ error: 'Invalid user name' })
        }
        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) {
            return res.status(401).json({ error: 'Invalid user password' })
        }
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '15m' })
        return res.status(201).send(token)
    } catch (error) {
        res.status(500).json({ error: 'Error login' })
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

// upload user image
router.put('/upload/:id', upload.single('file'), async (req, res) => {
    try {
        const { id } = req.params
        const avatar = await User.findByIdAndUpdate(id, { avatar: req.file.filename })
        return res.status(201).send({ message: "Updated" })
    }
    catch (error) {
        console.log(error)
    }
})

// upload info
router.put('/info/:id', async (req, res) => {
    try {
        const { id } = req.params
        const Info = await User.findByIdAndUpdate(id, req.body)
        return res.status(201).send({ message: "Updated" })
    }
    catch (error) {
        console.log(error) 
    }
})


// delete user

router.delete('/user/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await User.findByIdAndDelete(id)
        if (!result) {
            return res.status(404).send({ message: "Not found" })
        }
        return res.status(201).send({ message: "Deleted" })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})
export default router