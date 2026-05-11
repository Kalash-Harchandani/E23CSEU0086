import {
    fetchDepots,
    fetchVehicles
} from "../services/evaluationService.js";

import Log from "../../../logging_middleware/logger.js";

export const getDepots = async (
    req,
    res
) => {

    try {

        const depots =
            await fetchDepots();

        await Log(
            "backend",
            "info",
            "controller",
            "Depots API called successfully"
        );

        res.status(200).json(depots);

    } catch (error) {

        await Log(
            "backend",
            "error",
            "controller",
            "Failed to fetch depots"
        );

        console.log(
            error.response?.data || error.message
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to fetch depots"
        });

    }

};

export const getVehicles = async (
    req,
    res
) => {

    try {

        const vehicles =
            await fetchVehicles();

        await Log(
            "backend",
            "info",
            "controller",
            "Vehicles API called successfully"
        );

        res.status(200).json(vehicles);

    } catch (error) {

        await Log(
            "backend",
            "error",
            "controller",
            "Failed to fetch vehicles"
        );

        console.log(
            error.response?.data || error.message
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to fetch vehicles"
        });

    }

};

export const generateSchedule = async (
    req,
    res
) => {

    try {

        const { depotId } = req.params;

        await Log(
            "backend",
            "info",
            "controller",
            `Schedule API called for depot ${depotId}`
        );

        res.status(200).json({
            success: true,
            message:
                "Schedule generation pending",
            depotId
        });

    } catch (error) {

        await Log(
            "backend",
            "error",
            "controller",
            "Failed to generate schedule"
        );

        res.status(500).json({
            success: false,
            message:
                "Schedule generation failed"
        });

    }

};