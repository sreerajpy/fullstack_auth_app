const express = require("express");
const cors = require("cors");
const db = require('./config/db');


const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const auth = require("./middlewares/auth");


const app = express();
app.use(cors());
app.use(express.json());


db.query('SELECT 1')
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection failed:', err));


app.use("/auth", authRoutes);
app.use("/users", userRoutes);

module.exports = app
