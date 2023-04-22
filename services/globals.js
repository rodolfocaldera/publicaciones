const crypto = require('crypto');
const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const key = crypto
.createHash('sha512')
.update(process.env.SECRET_KEY)
.digest('hex')
.substring(0, 32)

const encryptionIV = crypto
.createHash('sha512')
.update(process.env.secret_iv)
.digest('hex')
.substring(0, 16)

class Globals {
    /**
     * 
     * @param {string} type 
     * @param {string} text 
     */
    static verifyText = (type, text) => {
        let pattern = null;
        switch (type) {
            case "alpha":
                pattern = /^[A-Za-z]+$/;
                break;
            case "alphanum":
                pattern = /^[ A-Za-z0-9]*$/;
                break;
            case "password":
                pattern = /^[ A-Za-z0-9_@./#&+-]*$/;
                break;
            default:
                pattern = /^[A-Za-z]+$/;
                break;
        }

        if (!pattern.test(text)) boom.badData("Data sended not supported");
    }

    // Encrypt data
    static encrypt = (data) => {
        const cipher = crypto.createCipheriv("aes-256-cbc", key, encryptionIV)
        return Buffer.from(
            cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
        ).toString('base64') // Encrypts data and converts to hex and base64
    }

    // Decrypt data
    static decrypt = (encryptedData) => {
        const buff = Buffer.from(encryptedData, 'base64')
        const decipher = crypto.createDecipheriv("aes-256-cbc", key, encryptionIV)
        return (
            decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
            decipher.final('utf8')
        ) // Decrypts data and converts to utf8
    }

    /**
     * 
     * @param {string} uid 
     * @returns 
     */
    static generateJWT = (uid = "",uidRol="") =>{
        return new Promise((resolve,reject)=>{
            const payload = {uid,uidRol};
            jwt.sign(payload,process.env.SECRET_KEY,{
                expiresIn:'4h'
            },(err,token)=>{
                if(err) reject("Has been a error to login, please contact your administrator")
                resolve(token);
            })
        });
    }
}

module.exports = Globals;