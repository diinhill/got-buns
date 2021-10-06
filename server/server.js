import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import fooditemRoutes from './routes/fooditemRoute.js'
import restaurantRoutes from './routes/restaurantRoute.js'
import foodalertRoutes from './routes/foodalertRoute.js'
import userRoutes from './routes/userRoute.js'
import { jwtStrategy } from './passport.js'

// loading .env file
dotenv.config()

const app = express()

// url parser is deprecated in express 4
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


//using the routes for a specific api
app.use('/api/fooditems', fooditemRoutes)
// app.use('/fooditemRoute', require('./routes/fooditemRoute'))
app.use('/api/restaurants', restaurantRoutes)
app.use('/api/foodalerts', foodalertRoutes)
app.use('/api/users', userRoutes)

console.log(`proce.,en.DB`, process.env.DB)
//connect to mongodb / .env file
mongoose
    .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('mongoDB connected...server running on port: ' + port))
    .catch(err => console.log(err))

const port = process.env.PORT || 5000


app.get('/test', (req, res) => {
    res.send({ msg: 'Test route.' })
})

app.listen(port, () => console.log(`Server started on port ${port}`))


//passport middleware
passport.use('jwt', jwtStrategy)
app.use(passport.initialize())


