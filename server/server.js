const express = require('express')
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 4000

const workoutSplitRoutes = require('./routes/workoutSplitRoutes')
const eventRoutes = require('./routes/eventRoutes')

const app = express()

app.use(cors())
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})

app.use('/api/workoutSplits', workoutSplitRoutes)
app.use('/api/events', eventRoutes)

app.listen(PORT, () => {
    console.log(`Connected To Port ${PORT}`)
})