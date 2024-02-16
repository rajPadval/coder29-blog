const express = require("express");
const cors = require("cors");
const { connectDb } = require("./connection");
const routes = require("./routes");

require("dotenv").config();

const app = express();
const port = 5000;

connectDb();

app.use(cors());
app.use(express.json());
app.use("/api", routes);

app.listen(port, () => console.log(`Server is running on port ${port}`));
