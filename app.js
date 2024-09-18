const express = require("express");
const ejs = require("express");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bodyParser = require("body-parser");
require("./controllers/passport");
const app = express();
const path = require("path");
var passport = require("passport");
const session = require("express-session");
const usersRouter = require("./routes/router");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.secret,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  // console.log(req.session);
  // console.log(req.user);
  next();
});
app.use("/", usersRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
