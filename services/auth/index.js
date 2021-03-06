import User from '@db/models/Users';
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { authSchema } from '../../helpers/validation'


export const registerService = ({ firstname, lastname, email, password })=> {
    return new Promise ((resolve, reject)=> {
        let response = null;
        User.findUser({email})
        .then((isExist)=>{
            if(isExist){
                reject(
                    response = {
                        data: null,
                        message: "email is already exist"
                    }
                )  
            } else {
                let isValid = true;
                const {error, value} = authSchema.validate({ email: email, password: password, firstname:firstname, lastname,lastname })
                if(error){ isValid = false};
                if(!isValid) {
                    reject(
                        response = {
                            data: null,
                            message: "register data is not valid"
                        }
                    )   
                }
                else {
                    let token = null
                    User.register({ firstname, lastname, email, password, token })
                    .then((User)=> {
                        resolve(
                            response = {
                                data: User,
                                message: 'register success'
                            }
                        )
                        
                    })
                    .catch((err)=> {
                        reject(err)
                    });
                }
            }
        })
    }
)}

export const loginService = ({ email, password })=> {
    return new Promise ((resolve, reject)=> {
        let response = null;
        User.findUser({email})
        .then((userInfo)=>{
            if(!userInfo){
                resolve(
                    response = {
                        data:null,
                        message: "?????? ???????????? ??????"
                    }
                )
            } else {
                bcrypt.compare(password, userInfo.password, function(err, isMatch){
                    if(isMatch){
                        let token = jsonwebtoken.sign(userInfo._id.toHexString(), process.env.TOKEN)
                        let useremail = userInfo.email
                        User.tokenSave({useremail, token})
                        .then((tokenInfo)=>{
                            resolve(
                                response = {
                                    data: null,
                                    token: tokenInfo.token,
                                    message: "????????? ??????"
                                }
                            )
                        })
                        .catch((err)=>{
                            reject(err)
                        })
                        
                    } else {
                        resolve(
                            response = {
                                data: null,
                                message: "???????????? ??????"
                            }
                        )                        
                    } 
                })     
            }
        }).catch((err)=>{
            reject(err)
        })
    })
}