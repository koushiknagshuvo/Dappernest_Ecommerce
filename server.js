const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoute.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const productRoutes = require("./routes/productRoutes.js");

// import { fileURLToPath } from "url";
// import path from "path";
// Config env

dotenv.config();
//Database config
connectDB();

//esmodule fix
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.__dirname(__filename);
// rest object

const app = express();
// middlewaress
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
// app.use(express.static(path.join(__dirname, "./client/build")));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
// rest api

// app.use("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to ecommerce-app",
  });
});
// PORT
const PORT = process.env.PORT;
// run listion
app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`
  );
});
