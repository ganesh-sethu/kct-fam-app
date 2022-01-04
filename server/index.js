const express = require("express");
const app = express();
const db = require("./db/db");
const cors = require("cors");
const sendMail = require("./common/mail");
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
app.use("/api/users", require("./routes/userRoute"));

app.get("/", async (req, res) => {
  sendMail(
    ["chsubash333@gmail.com", "subash.18cs@kct.ac.in"],
    "test real",
    "hi hello"
  )
    .then(() => {
      res.send({
        msg: "welcome",
      });
    })
    .catch((err) => res.send({ err }));
});

//server listen port
app.listen(PORT, () => {
  console.log(`app running on port ${PORT} successfully`);
});
