const db = require("../config/db");

const getUsers = async (req, res) => {

    const [users] = await db.query("SELECT id, name, email FROM users");
    return res.status(200).json({
        message: "Users Listed Successfully",
        data: users
    });

};

const getUserById = async (req, res) => {
    console.log("req.params.id", req.params.id);

    const [rows] = await db.query(
        "SELECT id, name, email FROM users WHERE id = ?",
        [req.params.id]
    );

    return res.status(200).json({
        message: "User Listed Successfully",
        data: rows[0]
    });
};

const updateUser = async (req, res) => {
    const { name } = req.body;
    await db.query(
        "UPDATE users SET name = ? WHERE id = ?",
        [name, req.params.id]
    );
    res.json({ message: "User updated" });
};

const deleteUser = async (req, res) => {
    await db.query("DELETE FROM users WHERE id = ?",
        [req.params.id]);
    res.json({ message: "User deleted" });
};
module.exports = { getUsers, getUserById, updateUser, deleteUser }
