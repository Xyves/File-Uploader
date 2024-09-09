const { Router } = require("express");
const passport = require("passport");
const appRouter = Router();
const controllers = require("../controllers/controller");
const { timeStamp } = require("console");
appRouter.get("/", controllers.getIndex);
appRouter.get("/folder:id", controllers.getFolder);
appRouter.get("/file:id", controllers.getFile);
appRouter.get("/login", controllers.getLogin);
appRouter.get("/signup", controllers.getSignup);
appRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);
appRouter.post("/signup", controllers.postSignup);
appRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
appRouter.get("/folders/create")
appRouter.get("/folders/:id",controllers.getFolder)
appRouter.all("*", async (req, res) => {
  try {
    res.status(404).json({
      timestamp: Date.now(),
      msg: "No root matches your request",
      code: 404,
    });
  } catch (e) {
    throw new Error(e);
  }
});
module.exports = appRouter;
