const  DBFactory = require("./DBFactory");

class Connection{
    #factory
    constructor(dbType){
        this.#factory = new DBFactory(dbType);
    }
    
    getConnection = () => {
        const adapter = this.#factory.getDbAdapter();
        return adapter.getConnection();
    }

}

module.exports = Connection;