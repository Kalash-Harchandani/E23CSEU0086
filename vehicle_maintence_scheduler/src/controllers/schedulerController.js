import {
    fetchDepots,
    fetchVehicles
} from "../services/evaluationService.js";

import Log from "../../../logging_middleware/logger.js";

import knapsack
from "../algorithms/knapsack.js";


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

        const mechanicHours =
            depot.MechanicHours;

        const result =
            knapsack(
                vehicles,
                mechanicHours
            );

        try {

            await Log(
                "backend",
                "info",
                "controller",
                `Optimized schedule generated for depot ${depotId}`
            );

        } catch {}

        res.status(200).json({

            success: true,

            depotId:
                Number(depotId),

            mechanicHours,

            totalVehicles:
                vehicles.length,

            optimizedTaskCount:
                result.selectedTasks.length,

            maxImpact:
                result.maxImpact,

            scheduledTasks:
                result.selectedTasks

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