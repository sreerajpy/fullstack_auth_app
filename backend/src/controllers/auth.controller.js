
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );
    if (rows.length == 0) {
        await db.query(
            "INSERT INTO users (name, email, password) VALUES(?,?,?)",
            [name, email, hashed]
        );
        res.status(201).json({
            message: "Signup success"
        })
    } else {
        res.status(400).json({ message: "Already Exist" });
    }

}

const login = async (req, res) => {
    const { email, password } = req.body;


    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );


    if (!rows.length) return res.status(401).json({ error: "Invalid login" });


    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ error: "Invalid login" });

    const token = jwt.sign({ id: user.id }, `super_secret_key`, {
        expiresIn: "1h",
    });


    res.json({ token });
};

module.exports = { signUp, login }