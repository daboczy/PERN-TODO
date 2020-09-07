const express = require('express')
const app = express()
const cors = require('cors')

const db = require('./db')

//middleware
app.use(cors())     //allow to reach different domains resource (express run on 5000, front end run on 3000)
app.use(express.json())



//ROUTERS//

//create a todo
app.post('/todos', async (req, res) => {
    try {
        //console.log(req.body)
        const { description } = req.body
        const newTodo = await db.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description])
        res.json(newTodo.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})


//get all todos
app.get('/todos', async (req, res) => {
    try {
        const allTodos = await db.query('SELECT * FROM todo order by todo_id asc')
        res.json(allTodos.rows)
    } catch (error) {
        console.log(error.message)
    }
})


//get A todo
app.get('/todos/:id', async (req, res) => {
    try {
        //console.log(req.params)
        const { id } = req.params
        const aTodo = await db.query('SELECT * FROM todo WHERE todo_id = $1', [id]) 
        res.json(aTodo.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})


//update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body
        const updTodo = await db.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id])
        //res.json(updTodo.rows)
        res.json("Update completed")
    } catch (error) {
        console.log(error.message)
    }
})


//delete a todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params
        const delTodo = await db.query("DELETE FROM todo WHERE todo_id = $1", [id])
        res.json("Delete completed")
    } catch (error) {
        console.log(error.message)
    }
})






app.listen(5000, () => {
    console.log("Server started on port 5000")
})