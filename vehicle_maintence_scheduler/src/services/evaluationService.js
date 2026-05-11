import axios from "axios";

import dotenv from "dotenv";

import Log from "../../../logging_middleware/logger.js";

dotenv.config();

const BASE_URL =
    process.env.BASE_URL;

const headers = {
    Authorization:
        `Bearer ${process.env.ACCESS_TOKEN.trim()}`
};

export const fetchDepots = async () => {

    try {

        const response =
            await axios.get(
                `${BASE_URL}/depots`,
                {
                    headers
                }
            );

        await Log(
            "backend",
            "info",
            "service",
            "Fetched depots successfully"
        );

        return response.data;

    } catch (error) {

        await Log(
            "backend",
            "error",
            "service",
            "Failed to fetch depots"
        );

        console.log(
            error.response?.data ||
            error.message
        );

        throw error;

    }

};

export const fetchVehicles = async () => {

    try {

        const response =
            await axios.get(
                `${BASE_URL}/vehicles`,
                {
                    headers
                }
            );

        await Log(
            "backend",
            "info",
            "service",
            "Fetched vehicles successfully"
        );

        return response.data;

    } catch (error) {

        await Log(
            "backend",
            "error",
            "service",
            "Failed to fetch vehicles"
        );

        console.log(
            error.response?.data ||
            error.message
        );

        throw error;

    }

};