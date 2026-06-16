const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    data: null,
    error: {
      message: "Route not found",
    },
  });
});

module.exports = app;