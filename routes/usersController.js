var models = require("../models");
const fetch = require("node-fetch");
// Clé API de lol
const apiRiot = process.env.API_KEY_LOL;

module.exports = {
  // Récupère les données du nombre de mort d'un joueur en fonction de son pseudo
  getdeath: async function (req, res) {
    // Pseudo du joueur
    var pseudo = req.query.pseudo;
    done();

    function done() {
      // On vérifie si le pseudo entré existe déjà sur la bdd (s'il existe alors ça veut dire qu'il est déjà vérifié)
      models.User.findOne({
        where: { pseudo: pseudo },
      })
        .then(async function (userFound) {
          if (!userFound) {
            // On vérifie si le pseudo existe
            //! TODO | Mettre à jour le pseudo d'un joueur quand il a changé, our l'instant ce n'est pas prévu.
            data = await getSummonerByName(pseudo);
            if (data.id) {
              var newUser = models.User.create({
                pseudo: pseudo,
                countDeath: 0,
                maxDeath: 0,
              }).then(async function (newUser, puuid = data.puuid) {
                if (newUser) {
                  maxDeath = newUser.maxDeath;
                  // Récupère les données des 10 derniers matchs
                  deathArray = await getMatchBySummonerName(puuid, maxDeath);
                  //console.log(deathArray)
                  // Si le joueur n'a pas assez de partie, revoie un message d'erreur et le supprime de la bdd
                  if (deathArray == false) {
                    models.User.destroy({
                      where: { pseudo: pseudo },
                    }).then(function (deleteUser) {
                      if (deleteUser) {
                        return res.status(201).json(deleteUser);
                      } else {
                        return res.status(500).json({
                          error: "Impossible de supprimer l'utilisateur",
                        });
                      }
                    });
                    return res
                      .status(500)
                      .json({ error: "Pas assez de parties jouées" });
                  }

                  newUser.update({
                    countDeath: deathArray[1],
                    maxDeath: deathArray[0],
                  });
                  return res.status(201).json({
                    countDeath: newUser.countDeath,
                    maxDeath: newUser.maxDeath,
                  });
                } else {
                  return res
                    .status(500)
                    .json({ error: "Impossible de créer l'utilisateur" });
                }
              });
            } else {
              return res
                .status(500)
                .json({ error: "Joueur de lol inexistant" });
            }
          } else {
            maxDeath = userFound.maxDeath;
            data = await getSummonerByName(pseudo);
            deathArray = await getMatchBySummonerName(data.puuid, maxDeath);
            if (deathArray == false) {
              models.User.destroy({
                where: { pseudo: pseudo },
              }).then(function (deleteUser) {
                if (deleteUser) {
                  return res.status(201).json(deleteUser);
                } else {
                  return res.status(500).json({
                    error: "Impossible de supprimer l'utilisateur",
                  });
                }
              });
              return res
                .status(500)
                .json({ error: "Pas assez de parties jouées" });
            }
            userFound.update({
              countDeath: deathArray[1],
              maxDeath: deathArray[0],
            });

            return res.status(201).json({
              countDeath: userFound.countDeath,
              maxDeath: userFound.maxDeath,
            });
          }
        })
        .catch(function (err, userFound) {
          return res.status(500).json({
            error:
              "Impossible de vérifier l'utilisateur : " +
              err +
              " and function userFound : " +
              userFound,
          });
        });
    }
  },
  // Affiche tous les utilisateurs dans l'ordre décroissant de leur nombre de mort max
  getranking: function (req, res) {
    done();
    function done() {
      models.User.findAll({
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ["maxDeath", "DESC"],
        ],
        attributes: ["pseudo", "maxDeath"],
      })
        .then(function (usersFound) {
          if (usersFound) {
            res.status(200).json(usersFound);
          } else {
            res.status(404).json({ error: "Utilisateurs non trouvés" });
          }
        })
        .catch(function (err, usersFound) {
          return res.status(500).json({
            error:
              "Impossible de récupérer les utilisateurs " +
              err +
              " and function userFound : " +
              usersFound,
          });
        });
    }
  },
};

// Récupère toutes les données d'un joueur en fonction de son pseudo
async function getSummonerByName(pseudo) {
  let link = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${pseudo}?api_key=${apiRiot}`;
  const response = await fetch(encodeURI(link));
  let data = await response.json();
  //console.log(data)
  return data;
}

// Renvoie toutes les morts d'un joueur en fonction de son puuid récupéré avec la fonction précédente
// sur les 10 derniers matchs.
async function getMatchBySummonerName(puuid, maxDeath) {
  let link = `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${apiRiot}`;
  const response = await fetch(link);
  let data = await response.json();
  var deathCount = 0;
  //console.log(data);
  if (data) {
    for (var i = 0; i < 10; i++) {
      let gameLink = `https://europe.api.riotgames.com/lol/match/v5/matches/${data[i]}?api_key=${apiRiot}`;
      const gameResponse = await fetch(gameLink);
      let gameData = await gameResponse.json();
      let participants = gameData.info.participants;
      //console.log(gameData.info.participants);
      deathCount = deathCount + participants[0].deaths;
      if (maxDeath < participants[0].deaths) {
        maxDeath = participants[0].deaths;
      }
    }
  } else {
    return false;
  }

  var deathArray = [];
  deathArray.push(maxDeath);
  deathArray.push(deathCount);

  return deathArray;
}
