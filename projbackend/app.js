require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require("./routes/auth");


// DB Connections
mongoose
.connect(process.env.DATABASE, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => {
    console.log("DB CONNECTED");
})
.catch(() => {
    console.log("DB GOT OOOPS");
});


// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


// My Routes
app.use("/api", authRoutes);


// Port
const port = process.env.PORT || 8000;


// Starting a Server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
});