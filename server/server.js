const express = require('express')
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 4000

const workoutLogRoutes = require('./routes/workoutLogRoutes')

const app = express()

app.use(cors())
app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})

app.use('/api/workoutLog', workoutLogRoutes)

app.listen(PORT, () => {
    console.log(`Connected To Port ${PORT}`)
})