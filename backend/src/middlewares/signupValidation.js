module.exports = (req, res, next) => {
    const { name, email, password } = req.body;

    // 1️⃣ Check required fields
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Name, email, and password are required"
        });
    }

    // 2️⃣ Trim & basic checks
    if (!name.trim()) {
        return res.status(400).json({ message: "Name cannot be empty" });
    }

    // 3️⃣ Email format check (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // 4️⃣ Password strength
    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters"
        });
    }

    // ✅ All validations passed
    next();
};
