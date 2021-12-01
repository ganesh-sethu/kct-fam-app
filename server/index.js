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

app.use(cors(corsOption));
app.use(express.json());
app.use("/api/admin", require("./routes/adminRoute"));
app.use("/api", require("./routes/authenticateRoute"));
app.get("/", (req, res) => {
  res.send("welcome to kct fam app");
});

app.listen(PORT, () => {
  console.log(`app running on port ${PORT} successfully`);
});
