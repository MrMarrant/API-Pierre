module.exports ={
    "development": {
        "username": process.env.USERNAME,
        "password": process.env.PASSWORD,
        "database": process.env.DATABASE,
        "host": process.env.HOST,
        "dialect": "mysql",
    },
    "test": {
        "username": process.env.ROOT,
        "password": process.env.ROOT,
        "database": "count_death_lol",
        "host": "localhost",
        "dialect": "mysql",
        "port": 8889
    },
    "production": {
        "use_env_variable": "JAWSDB_URL",
        "dialect": "mysql"
    }
}