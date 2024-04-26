const express = require("express");
const router = express.Router();
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const connect = require("./config/db.config.js");
connect();

app.use(cors());
app.use(bodyParser.json());
router.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/user", require("./routes/user.routes"));

app.use("/api/periodes", require("./routes/vacances.routes"));
app.use("/api/festius", require("./routes/festius.routes"));
app.use("/api/calendari", require("./routes/calendari.routes"));
app.use("/api/guardia", require("./routes/guardia.routes"));
app.use("/api/fitxar", require("./routes/fitxar.routes"));
app.use("/api/disponible", require("./routes/disponible.routes"));

app.use("/.netlify/functions/api/", router);
module.exports.handler = serverless(app);
