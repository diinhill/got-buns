import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
// const bodyParser = require('body-parser');
// const cors = require('cors');
//importing the routes
import fooditemRoute from "./routes/fooditemRoute.js"

dotenv.config();

const app = express();


// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
// app.use(cors());
// urlparser is deprecated in express 4
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


//using the routes for a specific api
app.use('/api/fooditemRoute', fooditemRoute);
// app.use('/fooditemRoute', require('./routes/fooditemRoute'));


//connect to mongodb / .env file
mongoose
    .connect(process.env.DB)
    .then(() => console.log("MongoDB Connected...server running on port: " + port))
    .catch(err => console.log(err.message));

const port = process.env.PORT || 5000;


app.get('/test', (req, res) => {
    res.send({ msg: 'Test route.' });
});

app.listen(port, () => console.log(`Server started on port ${port}`));


