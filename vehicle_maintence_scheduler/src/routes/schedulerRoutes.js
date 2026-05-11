import express from "express";

import {
    getDepots,
    getVehicles,
    generateSchedule
} from "../controllers/schedulerController.js";

const router = express.Router();

router.get(
    "/depots",
    getDepots
);

router.get(
    "/vehicles",
    getVehicles
);

router.get(
    "/schedule/:depotId",
    generateSchedule
);

export default router;