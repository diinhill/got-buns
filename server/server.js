import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import fooditemRoutes from './routes/fooditemRoute.js'
import restaurantRoutes from './routes/restaurantRoute.js'
import foodalertRoutes from './routes/foodalertRoute.js'
import userRoutes from './routes/userRoute.js'

dotenv.config()

const app = express()


app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


//using the routes for a specific api
app.use('/api/fooditems', fooditemRoutes)
// app.use('/fooditemRoute', require('./routes/fooditemRoute'));
app.use('/api/restaurants', restaurantRoutes)
app.use('/api/foodalerts', foodalertRoutes)
app.use('/api/users', userRoutes)


//connect to mongodb / .env file
mongoose
    .connect(process.env.DB)
    .then(() => console.log('mongoDB connected...server running on port: ' + port))
    .catch(err => console.log(err.message))

const port = process.env.PORT || 5000


app.get('/test', (req, res) => {
    res.send({ msg: 'Test route.' })
})

app.listen(port, () => console.log(`Server started on port ${port}`))


