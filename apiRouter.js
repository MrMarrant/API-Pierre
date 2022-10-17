var express = require("express");
var usersController = require("./routes/usersController");
var playersPresidentController = require("./routes/playersPresidentController");

exports.router = (function(){
    var apiRouter = express.Router();

    // Route CountDeath
    apiRouter.route("/users/show/").get(usersController.getdeath);
    apiRouter.route("/users/rank/").get(usersController.getranking);
    
    // Route GamePresident
    apiRouter.route("/president/scores/").get(playersPresidentController.getScore);
    apiRouter.route("/president/setscore/").post(playersPresidentController.setScore);
    return apiRouter;
}) ();