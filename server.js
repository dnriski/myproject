const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");

const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");

const db = require("./config/key").MongoURI;

const { result } = require("lodash");
const app = express();

app.use(methodOverride("_method"));

require("./config/passport")(passport);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(expressLayouts);
app.use("/assets", express.static("./assets"));
app.set("view engine", "ejs");

//konfigurasi flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 3006;

app.listen(PORT, console.log(`Server running on PORT ${PORT}`));
