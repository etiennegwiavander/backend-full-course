// The address/url of this server connected to the network is: http://localhost:5003

import express from 'express'

const app = express()
const PORT = process.env.PORT || 5003

console.log("hello world")

app.listen(PORT, () => console.log(`Server has started on: ${PORT}`))