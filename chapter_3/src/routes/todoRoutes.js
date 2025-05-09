import express from 'express'
import db from '../db.js'

const router = express.Router()


//to get all todos for loged in users
router.get('/', (req, res) => {
    
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