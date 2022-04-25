var express = require("express");
var usersController = require("./routes/usersController");
var gamePresidentController = require("./routes/gamePresidentController");

exports.router = (function(){
    var apiRouter = express.Router();

    // Route CountDeath
    apiRouter.route("/users/show/").get(usersController.getdeath);
    apiRouter.route("/users/rank/").get(usersController.getranking);
    
    // Route GamePresident
    apiRouter.route("/president/scores/").get(gamePresidentController.getScore);
    apiRouter.route("/president/setscore/").post(gamePresidentController.setScore);
    return apiRouter;
}) ();