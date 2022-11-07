const express = require("express");
const app = express();
const dbConnect = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 8082;
dbConnect();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.REACT_FRONT_URL }));

const authRoutes = require("./routes/admin/auth");
const profileRoutes = require("./routes/admin/profile");
const portfolioRoutes = require("./routes/admin/portfolio");

// Admin Routes
app.use("/api", authRoutes);
app.use("/api", profileRoutes);
app.use("/api", portfolioRoutes);

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});
