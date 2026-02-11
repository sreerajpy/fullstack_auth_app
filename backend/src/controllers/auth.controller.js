const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_ACCESS_SECRET = "super_secret_key";
const JWT_REFRESH_SECRET = "refresh_secret_456";

// Signup
const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if (rows.length === 0) {
    await db.query(
      "INSERT INTO users (name, email, password) VALUES (?,?,?)",
      [name, email, hashed]
    );
    return res.status(201).json({ message: "Signup success" });
  }
  return res.status(400).json({ message: "User already exists" });
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if (!rows.length) return res.status(401).json({ error: "Invalid login" });

  const user = rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Invalid login" });

  const accessToken = jwt.sign(
    { id: user.id },
    JWT_ACCESS_SECRET,
    { expiresIn: "10s" }
  );

  const refreshTokenValue = jwt.sign(
    { id: user.id },
    JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("refreshToken", refreshTokenValue, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ token: accessToken });
};

// Refresh
const refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  try {
    const user = jwt.verify(token, JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { id: user.id },
      JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );
    res.json({ token: newAccessToken });
  } catch {
    res.sendStatus(403);
  }
};

const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "lax",
    secure: false, // true in prod (HTTPS)
  });

  return res.json({ message: "Logged out successfully" });
};

module.exports = { signUp, login, logout, refreshToken };
