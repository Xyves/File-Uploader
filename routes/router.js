const { Router } = require("express");
const passport = require("passport");
const appRouter = Router();
const controllers = require("../controllers/controller");
const auth = require("../controllers/auth")
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

appRouter.get("/", controllers.getIndex);
appRouter.get("/folder:id", controllers.getFolder);
appRouter.post("/folders/create",controllers.getCreateFile)
appRouter.post("/files/create",upload.single('file'),controllers.postCreateFile)
appRouter.get("/files/create",controllers.getCreateFile)
appRouter.get("/folder/:id",controllers.getFolder)
appRouter.get("/file/:id",controllers.getFile)
appRouter.get("/login", controllers.getLogin);
appRouter.get("/signup", controllers.getSignup);
appRouter.post("/signup",auth.createUserValidation(),auth.validateMiddleware, controllers.postSignup);

appRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);
appRouter.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
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
