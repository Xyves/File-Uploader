const { Router } = require("express");
const passport = require("passport");
const appRouter = Router();
const controllers = require("../controllers/controller");
appRouter.get("/", controllers.getIndex);
appRouter.get("/folder:id", controllers.getFolder);
appRouter.get("/file:id", controllers.getFile);
appRouter.get("/login", controllers.getLogin);
appRouter.get("/signup", controllers.getSignup);
appRouter.post(
  "/login",
  passport.authenticate("local"),
  (req, res, next) => {}
);
appRouter.get("/signup", controllers.getSignup);
module.exports = appRouter;
