import Log from "./logging_middleware/logger.js";

await Log(
    "backend",
    "info",
    "handler",
    "Logger middleware working successfully"
);