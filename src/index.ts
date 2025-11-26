import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import urlRoutes from "./routes/urlRoutes";
import errorHandler from "./middleware/errorHandler";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("URL Shortener API is running!");
});

// URL Routes
app.use('/api', urlRoutes);

// Error Handler
app.use(errorHandler);

// Veritabanına bağlan ve sunucuyu başlat
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
