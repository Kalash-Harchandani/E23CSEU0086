import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const register = async () => {
    try {

        const response = await axios.post(
            `${process.env.BASE_URL}/register`,
            {
                email: "E23CSEU0086@bennett.edu.in",
                name: "Kalash Harchandani",
                mobileNo: "7976725317",
                githubUsername: "Kalash-Harchandani",
                rollNo: "E23CSEU0086",
                accessCode: "TfDxgr"
            }
        );

        console.log(response.data);

    } catch (error) {

        console.log(
            error.response?.data || error.message
        );

    }
};

register();