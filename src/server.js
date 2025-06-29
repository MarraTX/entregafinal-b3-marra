import app from "./app.js";
import { initializeMongo } from "./app.js";
import config from "./config/config.js";
import { logger } from "./config/logger.js";

const PORT = config.PORT;

initializeMongo();

app.listen(PORT, () => {
  logger.info(`Server running on port http://localhost:${PORT}`);
});
