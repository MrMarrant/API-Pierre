# CountDeath

# Première étape :

Créer une base de données pour le projet CountDeath ou tout autres nom que vous voulez.

## Deuxième étape :

Lancer la commande `npm i` pour installer les dépendances du projet via le package.json, vérifier les versions.

## Troisième étape :

Mettre à jour le fichier de configuration `config.js`
Exemple du contenu d'un fichier config.js :

```
module.exports ={
    "development": {
        "username": "postgres",
        "password": "password",
        "database": "count_death_lol",
        "host": "host",
        "dialect": "postgres"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "production": {
        "username": "postgres",
        "password": "password",
        "database": "automatisation_test",
        "host": "host",
        "dialect": "postgres"
    }
}
```

Ici, postgres est utilisé, mais mysql ou mariadb fonctionne très bien aussi.<br>
Il est conseillé d'indiquer de préférence les variables d'environnement dans un fichier ```.env```.

## Quatrième étape :
Récupérer la clé api sur https://developer.riotgames.com/ et la définir dans un fichier ```.env``` avec comme nom de variable : ```API_KEY_LOL```.

## Cinquième étape :
 Lancer le Serveur 

`node server.js` ou `nodemon server.js` s'il est installé.


### Ce qu'il ne faut pas ajouter en serveur de pré-prod :

Ne pas modifier le fichier config.js dans le dossier config.
Les dossiers en rapport avec l'ide que vous utilisez (.vscode, .intt ect).
Ne jamais push le dossier node_modules!


# Git

On utilise la métode Git Flow pour gérer l'historique Git : 
Une branche main
Une branche develop
et des sous branche features qui seront merge-request sur develop
