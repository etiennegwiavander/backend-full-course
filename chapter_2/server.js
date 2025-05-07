// The address/url of this server connected to the network is: http://localhost:8484

const express = require('express') // imports express into our codebase
const app = express() // create/define the backend app
const PORT = 8484 // create a port which is sub-directory in the server

// Middleware
app.use(express.json())

// without the middleware configuration, we wont be able to the json data back after sending a request otherwise, we'll only get 'undefine'

const data = [
    user1 = {
    name: 'Etienne',
    age: 30,
    status: 'Married',
},

]


// HTTP VERBS AND Routes (paths)
// the method informs the nature of request and the route is a further subdirectory (basically we direct the request to the body of the code to respond appropriately and these locations or routes are called endpoints)

// Types of endpoints:

// Type 1: Website endpoints (These endpoints are for sending back html and they typically come when a user enters a url in a browser)

app.get('/', (req, res) => {
    console.log('I just hit my first endpoint', req.method)
    res.send("<h1>Welcome to the Homepage</h1>")
    
})
app.get('/dashboard', (req, res) => {
    console.log('I just hit my second endpoint /dashboard', req.method)
    res.send("<h1>Welcome to the Dashboard</h1>")
})

// Type 2: API endponts (non visual - that works behind the scense)


// At the end of the day, we want to create a CRUD that stands for:
// CRUD-method: create-post, read-get, update-put, and delete-delete

app.get('/api/data', (req, res) => {
    console.log('this call is for non-visual data')
    res.send(data)
})


// POST method:

app.post('/api/data', (req, res) => {
    // someone wants to create a user (for example, when they click a signup button)
    // When the user clicks the sign up button after entering their credentials, and their browser is wired up to send a network request to the server to handle that action.

    const newUser = req.body   
    res.sendStatus(201)
    data.push(newUser)
    console.log(newUser)
})

// Delete method

app.delete('/api/data', (req, res) => {

    data.pop()
    res.sendStatus(204)
    console.log("The most recent user has been deleted from out array")
})

app.listen(PORT, () => console.log(`Server has started on: ${PORT}`))
