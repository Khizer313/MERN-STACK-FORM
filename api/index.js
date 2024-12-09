const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Mongoose Connection
async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/form");
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit process with failure
  }
}

// Call the function to connect to the database
connectDB();

// Define User Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Routes
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (user) {
      // Check if the password matches
      if (user.password === password) {
        res.status(200).send({ message: "Login successful", user });
      } else {
        res.status(401).send({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).send({ message: "User not registered" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already registered" });
    }

    // Create and save new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res
      .status(201)
      .send({
        message:
          "User created successfully, kindly login before redirecting to home",
      });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
