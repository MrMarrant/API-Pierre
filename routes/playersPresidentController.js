var models = require("../models");

module.exports = {
    getScore: function (req, res) {
        models.Player.findAll({
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ["score", "DESC"],
            ],
            attributes: ["idDiscord", "score"],
        })
        .then(function (playersFound) {
            if (playersFound) {
                res.status(200).json(playersFound);
            } else {
                res.status(404).json({ error: "Joueurs non trouvés" });
            }
        })
        .catch(function (err, playersFound) {
            return res.status(500).json({
                error:
                "Impossible de récupérer les joueurs " +
                err +
                " and function playersFound : " +
                playersFound,
            });
        });
    },
    setScore: function (req, res) {
        var idDiscord = req.query.idDiscord;
        done();
        function done() {
            models.Player.findOne({
                where: { idDiscord: idDiscord },
            })
            .then(async function (playerFound) {
                if (!playerFound) {
                    var newPlayer = models.Player.create({
                        idDiscord: idDiscord,
                        score: 1,
                    })
                    .then(async function (newPlayer) {
                        if (newPlayer) {
                            return res.status(201).json({
                                response: 'Le Joueur à été crée et à un score de 1',
                            });
                        }
                        else {
                            return res
                            .status(500)
                            .json({ error: "Impossible de créer le Joueur" });
                        }
                    })
                }
                else {
                    newScore = playerFound.score +1;
                    playerFound.update({
                        score: newScore,
                    });
                    return res.status(201).json({
                        response: 'Le Joueur à gagné un point de score',
                    });
                }
            })
            .catch(function (err, playerFound) {
                return res.status(500).json({
                    error:
                    "Impossible de vérifier le joueur : " +
                    err +
                    " and function playerFound : " +
                    playerFound,
                });
            });
        }
    }
};