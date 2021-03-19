var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var movieRouter = require("./routes/movie");
var usersRouter = require("./routes/users");

const authJWT = require("./middlewares/authentication"); // chk token JWT
var cors = require("cors");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api/movie", authJWT, movieRouter);
app.use("/api/users", usersRouter);

app.get("/*", function (req, res) {
  res.status(404).json({ message: "404 Not Found" });
});
module.exports = app;
