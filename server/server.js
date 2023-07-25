const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require('dotenv').config();
const connect = require("../server/config/db");
const authRoutes = require("../server/routers/authRoutes")
const profileRoutes = require("../server/routers/profileRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

const port = process.env.PORT;

app.get("/", (req, res) => {
    res.status(200).json({ message: "hello world" });
});


app.use("/api", authRoutes)
app.use("/api", profileRoutes)

connect().then(() => {
    try {
        app.listen(port, () => {
            console.log(`server connected to http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error.message);
    }
})

