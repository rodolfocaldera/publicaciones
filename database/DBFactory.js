const MySQLDBAdapter = require("./MySQLDBAdapter");

class DBFactory{
    #dbType

    constructor(dbType){
        this.#dbType = dbType;
    }

    getDbAdapter = () =>{
        let adapter = null;
        switch (this.#dbType) {
            case "mysql":
                adapter = new MySQLDBAdapter();
                break;
        
            default:
                console.log("Not supported")
                break;
        }

        return adapter;
    }
}

module.exports = DBFactory;