import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import formRoutes from "./routes/formRoutes.js";
// import swaggerFile from "./docs/swagger_output.json" assert { type: "json" };

dotenv.config();

connectDB();

const app = express();
const payPalClientId =
  "AbA_GIL_9JHw3ZjZa3LD7KFgXuaWN9bAzFOhvpHimHcp0BEomjiozAbW5c7frbMuQqfCf9FwsCUzy1zL";

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(cors({ origin: "*" }));
app.use(express.json());
app.get("/", (req, res) => {
  // #swagger.tags = ['HealthCheck']
  res.json({ message: "API is running...." });
});
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/form", formRoutes);
app.get("/api/config/paypal", (req, res) => {
  // #swagger.tags = ['Paypal']
  res.send(payPalClientId);
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server running on port 8000`.yellow.bold));
