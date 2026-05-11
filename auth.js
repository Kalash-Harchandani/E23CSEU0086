import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const auth = async () => {
    try {

        const response = await axios.post(
            `${process.env.BASE_URL}/auth`,
            {
                email: "e23cseu0086@bennett.edu.in",
                name: "kalash harchandani",
                rollNo: "e23cseu0086",
                accessCode: "TfDxgr",
                clientID: "ba0eecea-dc88-42df-ab64-c055690ee1f6",
                clientSecret: "duwBnFWNgPPAZqhc"
            }
        );

        console.log(response.data);

    } catch (error) {

        console.log(
            error.response?.data || error.message
        );

    }
};

auth();