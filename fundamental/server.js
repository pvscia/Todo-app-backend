//import express
const express = require('express')

// Define backend app
const app = express()

//Define port
//URL -> http://localhost:8383
//IP -> 127.0.0.1:8383
const PORT = 8383

let data = {
    // name: "james"
    users : ['james']
}

//Middleware, tell our app to use express.json
app.use(express.json())

//Website endpoint (send html)
//req = request, res = response
app.get('/', (req, res) => {
    // console.log('yay hit end point',req.method)
    // res.sendStatus(201)
    // res.send('<h1>Homepage</h1>')
    res.send(`
        <body
        style = 'background:pink;color:blue;'>
        <h1>DATA</h1>
            <p>${JSON.stringify(data)}</p>
            <a href="/dashboard">Dashboard</a>
        </body>
        <script>console.log(this is my script)</script>
        `)
})

app.get('/dashboard', (req, res) => {
    // console.log('yay hit /dashboard',req.method)
    // res.send('hi')
    res.send(`
        <body
        style = 'background:pink;color:blue;'>
        <h1>dashboard</h1>
            <p>${JSON.stringify(data)}</p>
            <a href="/">Home</a>
        </body>
        `)
})

//create - post
//read - get
//update - put
//delete - delete

//API endpoint (non visual)
app.get('/api/data', (req, res) => {
    console.log('send api')
    res.status(599).send(data)
})

app.post('/api/data', (req, res) => {
    const newEntry = req.body
    console.log(newEntry)
    data.users.push(newEntry.name)
    res.sendStatus(201)
})

app.delete('/api/data', (req, res) => {
    data.users.pop()
    console.log('we deleted')
    res.sendStatus(203)
})

//Listen to incoming request at the post listen(port,callback function)
//routes have to be defined first then call the listen at the very bottom of the code/after routees have been defined
app.listen(PORT, () => {
    console.log(`server started on ${PORT}`)
})
