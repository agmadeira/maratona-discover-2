const sqlite3 = require('sqlite3');
//Open é um recurso que está dentro do sqlite:
const { open } = require('sqlite');


module.exports = () => open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    })


