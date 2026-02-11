const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const { getUsers, getUserById, updateUser, deleteUser } = require("../controllers/user.controller");

router.get("/me", auth, (req, res) => {
    res.json({ message: "Protected route accessed!", user: req.user });
});

router.get(`/`, auth, getUsers)
router.get(`/:id`, getUserById)
router.post(`/:id`, updateUser)
router.delete(`/:id`, deleteUser)

module.exports = router;
