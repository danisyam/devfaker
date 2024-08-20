const express = require('express')
const fetch = require('node-fetch')
const { dbUsers } = require('./utils/db/users.js')

const app = express()

app.get('/api/v1/users', async (req, res) => {
    const { limited } = req.query
    const getUsers = await fetch(dbUsers)
    const users = await getUsers.json()
    if (limited) {
        res.json({ data: users.data.slice(0, limited) })
    } else {
        res.json({ data: users.data })
    }
})

app.get('/api/v1/users/:id', async (req, res) => {
    const { id } = req.params
    const getUsers = await fetch(process.env.DB_JSON_USERS)
    const users = await getUsers.json()
    const user = users.data.find(user => user.id === parseInt(id))
    if (user) {
        res.json({ data: user })
    } else {
        res.json({ data: null })
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})


module.exports = app