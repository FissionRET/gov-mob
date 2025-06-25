import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

let config = require("./config/config.json");

// import config from "./config/config.json" assert { type: "json" };

console.log(config);
