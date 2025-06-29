import app from "./app.js";
import mongoose from "mongoose";
import config from "./config/config.js";
import { logger } from "./config/logger.js";

const PORT = config.PORT;

const initializeMongo = async () => {
  try {
    await mongoose.connect(config.MONGO_URL);
    logger.info("Connected to MongoDB");
    app.listen(PORT, () => {
      logger.info(`Server running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

initializeMongo();
