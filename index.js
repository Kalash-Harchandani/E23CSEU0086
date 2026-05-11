import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Backend Running");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});