const express = require("express");
const app = express();
const db = require("./db/db");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.SERVER_PORT;
const corsOption = {
  origin: process.env.FRONT_END_DOMAIN,
};

db.connect();

//midlewares
app.use(express.json());
app.use(cors(corsOption));

//routes
app.use("/api/admin", require("./routes/adminRoute"));
app.use("/api", require("./routes/authenticateRoute"));
app.use("/api/request", require("./routes/requestsRoute"));
app.get("/", (req, res) => {
  res.send("welcome to kct fam app");
});

//server listen port
app.listen(PORT, () => {
  console.log(`app running on port ${PORT} successfully`);
});
