const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/query");
const bcrypt = require("bcryptjs");
const customFields = {
  usernameField: "uname",
  passwordField: "pw",
};
const verifyCallback = async (username, password, done) => {
  try {
    const user = await db.getUser(null, username);
    console.log(user);

    if (!user) {
      console.log("User not found");
      return done(null, false, { message: "Incorrect username" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log("Incorrect password");
      return done(null, false, { message: "Incorrect password" });
    }

    console.log("username and password worked");
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};
const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((userId, done) => {
  db.findById(userId, null)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
