const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../Config/connectDb");

const login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("Error retrieving user:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "credentials" });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    const token = jwt.sign({ userId: user.id,name:user.name,email:user.email }, user.remember_token, {
      expiresIn: "1m",
    });
    // Return success message with token and user data
    return res.status(200).json({ message: "success",user, token });
  });

  // Assuming you receive the JWT token from the client-side
 
};

module.exports = { login };
