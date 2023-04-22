const connection = require("./../database/connection");
const Globals = require("./globals");
const boom = require("@hapi/boom");

class UsersService {
    #db
    constructor() {
        const connectClass = new connection("mysql");
        this.#db = connectClass.getConnection();
    }

    /**
     * 
     * @param {JSON} body 
     */
    create = async (body) => {
        let second_last_name = "";
        let field_second_last_name = "";
        if (typeof body.name === "undefined" || typeof body.last_name === "undefined"
            || typeof body.username === "undefined" || typeof body.password === "undefined" || typeof body.idRol === "undefined") {
            throw boom.notFound("Not received the needed data");
        }


        for (const key in body) {
            if (Object.hasOwnProperty.call(body, key)) {
                const field = body[key];
                if (key == "username") {
                    Globals.verifyText("alphanum", field);
                } else if (key == "password") {
                    Globals.verifyText("password", field);
                } else {
                    Globals.verifyText("alpha", field);
                }
            }
        }

        if (typeof body.second_last_name != "undefined") {
            Globals.verifyText("alpha", body.second_last_name);
            field_second_last_name = ",second_last_name";
            second_last_name = body.second_last_name;
        }

        const existsUsername = await this.verifyUserName(body.username);
        if (existsUsername) throw boom.conflict("Username exits, please enter one different");

        const encrypetdPass = Globals.encrypt(body.password);
        console.log(encrypetdPass);

        const SQL = `INSERT INTO users (idRol,name,last_name,username,password${field_second_last_name}) 
            VALUES (${body.idRol},"${body.name}","${body.last_name}","${body.username}","${encrypetdPass}"
            ${second_last_name != "" ? "," + `"${second_last_name}"` : ""})`;
        const id = await new Promise((resolve, reject) => { 
            this.#db.query(SQL,(err,result)=>{
                if (err) return reject(err);
                return resolve(result.insertId);
            }); 
        });

        return id;
    }

    /**
     * 
     * @param {string} username 
     */
    verifyUserName = async (username) => {
        const SQL = `SELECT id FROM users WHERE username = "${username}"`;
        return new Promise((resolve, reject) => {
            this.#db.query(SQL, (err, result) => {
                if (err) return reject(err);
                const exists = result.length > 0;
                return resolve(exists);
            })
        })
    }

    /**
     * 
     * @param {JSON} username 
     * @returns 
     */
    getUserInfoByUserName = (username) => {
        const SQL = `SELECT * FROM users WHERE username = "${username}"`;
        return new Promise((resolve, reject) => {
            this.#db.query(SQL, (err, result) => {
                if (err) return reject(err);
                let userInfo = [];
                if(result.length > 0) userInfo = result[0];
                return resolve(result);
            })
        });
    }

}

module.exports = UsersService;