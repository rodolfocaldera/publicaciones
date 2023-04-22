const connection = require("./../database/connection");
const Globals = require("./globals");
const boom = require("@hapi/boom");
const UsersService = require("./users.service");

class LoginService {
    #db
    #UserService
    constructor() {
        const connectClass = new connection("mysql");
        this.#db = connectClass.getConnection();
        this.#UserService = new UsersService();
    }

    login = async (body) => {
        if (typeof body.username === "undefined" || typeof body.password === "undefined") {
            throw boom.notFound("Not received the needed data");
        }

        Globals.verifyText("alphanum", body.username);
        Globals.verifyText("password", body.password);

        let usersInfo = await this.#UserService.getUserInfoByUserName(body.username);
        if(usersInfo.length > 0){
            let passwordDB = Globals.decrypt(usersInfo[0].password)
            if(passwordDB === body.password){
                const token = await Globals.generateJWT(usersInfo[0].id,usersInfo[0].idRol)
                return token;
            }else{
                throw boom.badRequest("username or password don't match");
            }
        }else{
            throw boom.notFound("username or password don't match");
        }
    }
}

module.exports = LoginService;