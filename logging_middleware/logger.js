import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const Log = async (
    stack,
    level,
    pkg,
    message
) => {

    try {

        const response = await axios.post(
            `${process.env.BASE_URL}/logs`,
            {
                stack,
                level,
                package: pkg,
                message
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${process.env.ACCESS_TOKEN.trim()}`
                }
            }
        );

        console.log("LOG CREATED");

        return response.data;

    } catch (error) {

        console.log(
            "LOGGER ERROR:",
            error.response?.data || error.message
        );

    }

};

export default Log;