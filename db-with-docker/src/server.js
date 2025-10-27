// const express = require('express')
//https://github.com/jamezmca/backend-full-course/tree/main/chapter_4
import express from 'express'
import path, {dirname} from 'path'
import {fileURLToPath} from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'

// npm init -y
// npx init prisma
//npx prisma generate //every changes in prisma


//docker compose build
//docker compose run app npx prisma migrate dev --name init (version history,create table)
//docker compose up

// docker exec -it postgres-db psql -U postgres -d todoapp
// \dt = show table
// SELECT * FROM "Todo";
// quit = exit to terminal


const app = express()
const PORT = process.env.PORT || 5003

//Get file path from URL
const __filename = fileURLToPath(import.meta.url)
//get dir name from path
const __dirname = dirname(__filename)

//Middleware
//allow server to receive json input
app.use(express.json())
//Serves the html file from /public, tell express to serve all file as static  assets
app.use(express.static(path.join(__dirname,'../public')))

//Routes
app.use('/auth',authRoutes)
app.use('/todos',authMiddleware, todoRoutes)

//serving html file
app.get('/',((req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'))
}))


app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`)
})