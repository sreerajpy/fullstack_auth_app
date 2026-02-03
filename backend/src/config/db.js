require('dotenv').config(); // MUST BE FIRST LINE
const mysql = require('mysql2')

const pool = mysql.createPool({
    // host: process.env.DB_HOST || 'localhost',
    // user: process.env.DB_USER || 'root',
    // password: process.env.DB_PASSWORD || '',
    // database: process.env.DB_NAME,
    host: 'localhost',
    user: 'sreeraj',
    password: '12345', // Temporary test
    database: 'fullstack_auth_dev'
})

module.exports = pool.promise()