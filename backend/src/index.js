require("dotenv").config();

const app = require('./app')

app.listen(5000, () => {
    console.log("server running port 5000");
});