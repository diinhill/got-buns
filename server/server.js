import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import cors from 'cors'
import fooditemRoutes from './routes/fooditemRoute.js'
import restaurantRoutes from './routes/restaurantRoute.js'
// import foodalertRoutes from './routes/foodalertRoute.js'
import userRoutes from './routes/userRoute.js'
import { jwtStrategy } from './passport.js'

// loading .env file
dotenv.config()

const app = express()
app.use(cors())

// url parser is deprecated in express 4
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/images', express.static('images'))

//using the routes for a specific api
app.use('/api/users', userRoutes)
app.use('/api/restaurants', restaurantRoutes)
app.use('/api/restaurants', fooditemRoutes)
// app.use('/api/foodalerts', foodalertRoutes)

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


