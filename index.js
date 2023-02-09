const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5050;

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
  })
);

app.use("/", require("./routes/apiRoute.js"));

app.use("/participants", require("./routes/participantsRoute"));
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port} 🛸`));
