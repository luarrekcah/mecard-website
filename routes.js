const indexRouter = require("./routes/index"),
cardViewRouter = require("./routes/cardView"),
cardEditRouter = require("./routes/cardEdit"),
loginRouter = require("./routes/login"),
userRouter = require("./routes/user");

const authenticationMiddleware = (req, res, next) => {
    if (req.isAuthenticated())  
        return next();
    res.redirect("/login");
  };
  
module.exports = app => {
    app.use("/login", loginRouter);
    app.use("/user", authenticationMiddleware, userRouter)
    app.use("/edit", authenticationMiddleware, cardEditRouter)
    app.use("/@", cardViewRouter)
    app.use("/", indexRouter)
};