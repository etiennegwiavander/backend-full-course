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
    
    // To save the newuser and hashed password to the db
    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`) //the prepare method allows us to inject some values into the SQL querry
        const result = insertUser.run(username, hashedPassword)

        //Default todos
        const defaultTodo = `Hello 👋 Add your first todo!`
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)

        insertTodo.run(result.lastInsertRowid, defaultTodo)

        // create a token
        const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, { expiresIn: '24h'})
        res.json({ token })

    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
        
    }

    // db.push(newUser)
})

router.post('/login', (req, res) => {
    // we get their email, and we look up the password associated with that email in the database.
    // but we get it back and see it's encrypted, which means that we cannot compare it ot the one the user just used when trying to login
    // so what we can do, is again, one way encrypt the password the user just entered

    const {username, password} = req.body // we destructure the username and password because we want to check the database for existing user that matches the username and we need retrive the hashed password and compare it with hashed password the user used when signing in.

    try {
        const getUser = db.prepare('SELECT * FROM users WHERE username = ?')
        const user = getUser.get(username)
        //if we cannot find a user associated with that username, return out of the function
        if(!user){return res.status(404).send({message: "User not found"})}

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        // if the password does not match, return out of the function
        if (!passwordIsValid){return res.status(401).send({message:"Invalid password!"}) }

        //Then we have a successful authentication
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({ token })
        console.log(user)
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }

})

export default router