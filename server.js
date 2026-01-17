require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;



// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST","PUT","DELETE","PATCH","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// Model
const CustomerDetail = require("./models/CustomerDetail");

// Route
app.post("/users", async (req, res) => {
  try {
    console.log("Received body:", req.body);

    const order = new CustomerDetail(req.body);
    const savedOrder = await order.save();
    console.log("DB",savedOrder);

    res.status(201).json({
      message: "Order saved to MongoDB",
      data: savedOrder
    });

  } catch (error) {
    console.error("Insert error:", error);
    res.status(500).json({ message: "Database insert failed" });
  }
});

app.get("/", (req, res) => {
  // handle the route
  res.send("Hello, world!"); // example response
});



// ✅ START SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
