// The address/url of this server connected to the network is: http://localhost:5003

import express from 'express'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'

const app = express()
const PORT = process.env.PORT || 5003

// Get the file path from the url of the current module.
const __filename = fileURLToPath(import.meta.url)

//Get the directory name from the file path.
const __dirname = dirname(__filename)

// Servers the HTML file from the /public directory.
//Tells express to serve all files from the public folder as static assets/file. Any requests for the css files will be resolved to the public directory.
app.use(express.static(path.join(__dirname, '../public'))) // express.static line tells our code where to find the public directory.

//serving up the HTML file from the /public directory.
// Below is the endpoint that sends back the file.
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'public/index.html'))   
})

app.listen(PORT, () => console.log(`Server has started on: ${PORT}`))