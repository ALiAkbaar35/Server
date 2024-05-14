const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../Config/connectDb");

const signup = (req, res) => {
  const {
    name,
    email,
    password,
    company_id,
    department_id,
    role_id,
    site_id,
    user_id,
  } = req.body;

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");

    // Generate and hash the remember token
    const rememberToken = await generateAndHashRememberToken();

    const sql =
      "INSERT INTO users (name, email, password, company_id, department_id, role_id, site_id,user_id, remember_token, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [
        name,
        email,
        hashedPassword,
        company_id,
        department_id,
        role_id,
        site_id,
        user_id,
        rememberToken,
        currentDate,
        currentDate,
      ],
      (err, result) => {
        if (err) {
          console.error("Error adding user:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        } else {
          const userId = result.insertId; // Assuming the ID of the inserted user
          const user = {
            id: userId,
            name,
            email,
            company_id,
            department_id,
            role_id,
            site_id,
            remember_token: rememberToken,
          }; // Create user data object

          // Generate JWT token for the user
          const token = jwt.sign(
            { userId, name, email },
            process.env.JWT_SECRET, // Use your own secret key
            { expiresIn: "1m" } // Set token expiration time
          );

          return res.status(201).json({ message: "success", user });
        }
      }
    );
  });
};

// Function to generate a random string for the token
const generateRandomToken = () => {
  const tokenLength = 32;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < tokenLength; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
};

// Function to hash the remember token
const hashRememberToken = async (token) => {
  try {
    const hashedToken = await bcrypt.hash(token, 10);
    return hashedToken;
  } catch (error) {
    console.error("Error hashing remember token:", error);
    throw new Error("Error hashing remember token");
  }
};

// Function to generate and hash the remember token
const generateAndHashRememberToken = async () => {
  const token = generateRandomToken();
  const hashedToken = await hashRememberToken(token);
  return hashedToken;
};

module.exports = { signup };
