import express from 'express'
import db from '../db.js'

const router = express.Router()


//to get all todos for loged in users
router.get('/', (req, res) => {
    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?')
    const todos = getTodos.all(req.userId)
    res.json(todos)
})

//create new todos
router.get('/', (req, res) => {

})

// update a todo
router.put('/:id', (req, res) => {

})
// delete a todo
router.delete('/:id', (req, res) => {

})

export default router