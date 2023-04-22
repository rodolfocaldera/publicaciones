const connection = require("../database/connection");
const Globals = require("./globals");
const boom = require("@hapi/boom");

class PostsService {
    #db
    constructor() {
        const connectClass = new connection("mysql");
        this.#db = connectClass.getConnection();
    }


    /**
     * 
     * @param {JSON} body 
     */
    create = async (uid,body) => {
        if (typeof body.title === "undefined" || typeof body.description === "undefined") {
            throw boom.notFound("Not received the needed data");
        }

        Globals.verifyText("alphanum", body.title);
        Globals.verifyText("alphanum", body.description);

        let ts = Date.now();

        let date_time = new Date(ts);
        let date = date_time.getDate();
        let month = date_time.getMonth() + 1;
        let year = date_time.getFullYear();

        let dateComplet = year+"-"+month+"-"+date;

        const SQL = `INSERT INTO posts (title,description,idUser,createdAt) values ('${body.title}','${body.description}',${uid},'${dateComplet}')`;

        await new Promise((resolve, reject) => {
            this.#db.query(SQL, (err, result) => {
                if (err) return reject(err);
                return resolve();
            })
        })
    }

    update = async (idPost,body) =>{
        if (isNaN(idPost) || typeof body.title === "undefined" || typeof body.description === "undefined") {
            throw boom.notFound("Not received the needed data");
        }

        Globals.verifyText("alphanum", body.title);
        Globals.verifyText("alphanum", body.description);

        const SQL = `Update posts set title = '${body.title}', description = '${body.description}' where id = ${idPost}`;

        await new Promise((resolve, reject) => {
            this.#db.query(SQL, (err, result) => {
                if (err) return reject(err);
                return resolve();
            })
        })
    }

    delete = async(idPost) => {
        if (isNaN(idPost)) {
            throw boom.notFound("Not received the needed data");
        }

        const SQL = `Update posts set state = 'inactive' where id = ${idPost}`;

        await new Promise((resolve, reject) => {
            this.#db.query(SQL, (err, result) => {
                if (err) return reject(err);
                return resolve();
            })
        })
    }

    list = async() => {
        const SQL = "SELECT title,description,users.name,last_name,second_last_name,rols.name as role  FROM posts JOIN users ON posts.idUser = users.id JOIN rols ON users.idRol = rols.id  WHERE posts.state = 'active' ";
        const result = await new Promise((resolve, reject) => {
            this.#db.query(SQL, (err, result) => {
                if (err) return reject(err);
                return resolve(result);
            })
        });
        return result;
    }
}

module.exports = PostsService;