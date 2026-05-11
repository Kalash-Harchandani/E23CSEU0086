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

        try {

            await Log(
                "backend",
                "info",
                "controller",
                "Depots API called successfully"
            );

        } catch {}

        res.status(200).json(depots);

    } catch (error) {

        console.log(
            error.response?.data ||
            error.message
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

        try {

            await Log(
                "backend",
                "info",
                "controller",
                "Vehicles API called successfully"
            );

        } catch {}

        res.status(200).json(vehicles);

    } catch (error) {

        console.log(
            error.response?.data ||
            error.message
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

        const { depotId } =
            req.params;

        const depotsResponse =
            await fetchDepots();

        const vehiclesResponse =
            await fetchVehicles();

        const depots =
            depotsResponse.depots;

        const vehicles =
            vehiclesResponse.vehicles;

        const depot =
            depots.find(
                depot =>
                    depot.ID ===
                    Number(depotId)
            );

        if (!depot) {

            return res
                .status(404)
                .json({
                    success: false,
                    message:
                        "Depot not found"
                });

        }

        try {

            await Log(
                "backend",
                "info",
                "controller",
                `Schedule fetched for depot ${depotId}`
            );

        } catch {}

        res.status(200).json({

            success: true,

            depotId:
                Number(depotId),

            mechanicHours:
                depot.MechanicHours,

            totalVehicles:
                vehicles.length,

            vehicles

        });

    } catch (error) {

        console.log(
            error.response?.data ||
            error.message
        );

        res.status(500).json({
            success: false,
            message:
                "Schedule generation failed"
        });

    }

};