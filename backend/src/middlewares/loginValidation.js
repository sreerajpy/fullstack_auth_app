module.exports = (req, res, next) => {
    const { email, password } = req.body;

    // 1️⃣ Required fields check
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    // 2️⃣ Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Invalid email format"
        });
    }

    // 3️⃣ Password basic check
    if (!password.trim()) {
        return res.status(400).json({
            message: "Password cannot be empty"
        });
    }

    next();
};
