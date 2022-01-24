var express = require("express");
var usersController = require("./routes/usersController");

exports.router = (function(){
    var apiRouter = express.Router();

    // Route User
    apiRouter.route("/users/show/").get(usersController.getdeath);
    apiRouter.route("/users/rank/").get(usersController.getranking);

    return apiRouter;
}) ();