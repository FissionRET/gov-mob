import { createRequire } from "node:module";
import { Logger } from "./services/Logger";
// import { Logger } from "./services";
const require = createRequire(import.meta.url);

let config = require("./config/config.json");

Logger.info("Starting bot...");
