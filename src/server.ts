import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import swaggerUi from "swagger-ui-express";
import specs from "./config/swagger";

import contactRoutes from "./routes/contact.routes";
import subscribeRoutes from "./routes/subscribe.routes";
import adminRoutes from "./routes/admin.routes";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/subscribe", subscribeRoutes);

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 9000;

const startServer = async () => {
  console.log("MONGO_URI =", process.env.MONGO_URI);
  console.log("EMAIL_USER =", process.env.EMAIL_USER);

  await connectDB(); // connects to MongoDB
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();