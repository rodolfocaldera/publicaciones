const { request, response } = require("express");
const boom = require("@hapi/boom");
const connection = require("../database/connection");

validateRole = async (req = request, res = response, next) => {
    try {
        let action = "";
        if (req.method == "GET" && req.uidRol != 1) {
            action = "read"
        } else if (req.method == "PUT") {
            action = "update"
        } else if (req.method == "POST") {
            action = "create";
        } else if (req.method == "DELETE") {
            action = "delete";
        }
        const access = await userHasAccess(req.uidRol,action);
        if(access){
            next();
        }else{
            throw new Error("You don't have access to the section");
        }
    } catch (error) {
        next(error);
    }
}

userHasAccess = async (idRol, action) => {
    const connectClass = new connection("mysql");
    const db = connectClass.getConnection();
    const SQL = `SELECT * from rols where id=${idRol} and find_in_set('${action}',actions)`;
    return new Promise((resolve, reject) => {
        db.query(SQL, (err, result) => {
            if (err) return reject(err);
            const access = result.length > 0;
            return resolve(access);
        })
    })
}

module.exports = validateRole;