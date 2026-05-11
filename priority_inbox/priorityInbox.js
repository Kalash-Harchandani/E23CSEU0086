import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const PRIORITY = {
    Placement: 3,
    Result: 2,
    Event: 1
};

async function getPriorityNotifications() {

    try {

        const response = await axios.get(
            `${process.env.BASE_URL}/notifications`,
            {
                headers: {
                    Authorization:
                        `Bearer ${process.env.ACCESS_TOKEN}`
                }
            }
        );

        const notifications =
            response.data.notifications;

        const sortedNotifications =
            notifications.sort((a, b) => {

                const priorityDifference =
                    PRIORITY[b.Type] -
                    PRIORITY[a.Type];

                if (priorityDifference !== 0) {
                    return priorityDifference;
                }

                return new Date(b.Timestamp) -
                    new Date(a.Timestamp);

            });

        const topNotifications =
            sortedNotifications.slice(0, 10);

        console.log(
            "\nTop Priority Notifications:\n"
        );

        console.log(topNotifications);

    } catch (error) {

        console.log(
            error.response?.data ||
            error.message
        );

    }

}

getPriorityNotifications();