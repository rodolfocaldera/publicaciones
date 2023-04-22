const  IDBAdapter  = require("./IDBAdapter");
const properties  = require("./MySQL.properties.json");
const mysql = require('mysql');

class MySQLDBAdapter extends IDBAdapter{

    #createConnection = () => {
        const connection = mysql.createConnection({
            host: properties.host,
            user: properties.user,
            password: properties.password,
            database: properties.database
        });

        connection.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");
        });

        return connection;
    }

    /** @override getConnection() method */
    getConnection = () =>{
        const connection = this.#createConnection();
        return connection;
    }
}

module.exports = MySQLDBAdapter;