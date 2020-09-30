// import express from "express"
const express = require("express"); // commonJS pattern
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const sql = require("mssql");
const cookieParser = require("cookie-parser");
// const csrf = require("csurf");
const session = require("express-session");


const app = express();
const port = process.env.PORT || 5000;

// const csrfMiddleware = csurf({
//   cookie: true
// });

const config = {
  user: "heysarahshere",
  password: "Oommoo369!",
  server: "heysarah.database.windows.net",
  database: "heysarah",
  options: {
    enableArithAbort: false,
  }
};

sql.connect(config).catch((err) => debug(err));


const americanAirlinesRouter = require("./src/routes/americanAirlinesRoutes")();
const alaskaAirlinesRouter = require("./src/routes/alaskaAirlinesRoutes")();
const jetsuiteRouter = require("./src/routes/jetsuiteRoutes")();
const upsRouter = require("./src/routes/upsRoutes")();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/css", express.static(path.join(__dirname, "node_modules", "bootstrap", "dist", "css")));
app.use("/js", express.static(path.join(__dirname, "node_modules", "bootstrap", "dist", "js")));
app.use("/js", express.static(path.join(__dirname, "node_modules", "popper.js", "dist", "umd")));
app.use("/js", express.static(path.join(__dirname, "node_modules", "jquery", "dist")));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cookieParser());
app.use(session({ secret: "secretsession", resave: false, saveUninitialized: false }));


app.use("/american-airlines", americanAirlinesRouter);
app.use("/alaska-airlines", alaskaAirlinesRouter);
app.use("/jetsuite", jetsuiteRouter);
app.use("/ups", upsRouter);

app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.get("/", (request, response) => {
  response.render("index", {
    name: "Bill Smith",
    numOfTimes: 25
  });
});

app.listen(port, () => {
  debug(`Listening on port ${chalk.blueBright(port)}`);
});
