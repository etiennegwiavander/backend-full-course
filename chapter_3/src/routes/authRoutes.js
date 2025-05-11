import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

// register a new user endpoint /auth/register
router.post('/register', (req, res) => {

    const {username, password} = req.body
    // This code block saves the username and an irreversibly encrypted password.
    // To something like this; test@gmail.com | akd;fa adffkaffdjfa...sdfdsf

    // encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 8)
    
    // To save the newuser and hashed passward to the db
    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`) //the prepare method allows us to inject some values into the SQL querry
        const result = insertUser.run(username, hashedPassword)

        //Default todos
        const defaultTodo = `Hello 👋 Add your first todo!`
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)

        insertTodo.run(result.lastInsertRowid, defaultTodo)

        // create a token
        const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, { expiresIn: '24h'})

    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
        
    }

    // db.push(newUser)
})

router.post('/login', (req, res) => {
    const {username, password} = req.body
    console.log(username, password)
    res.sendStatus(201)

})

export default router