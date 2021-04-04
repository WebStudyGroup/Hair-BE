import { registerService, loginService } from '@services/auth';

export const register = (req, res)=> {
    const { firstname, lastname, email, password } = req.body;
    try {
        registerService({ firstname, lastname, email, password })
        .then((response)=> {
            res.json({
                data: response.data,
                message: response.message
            })
        })
        .catch((response)=> {
            res.json({
                data: null,
                message: response.message
            })
        });
    } 
    catch(err) {
        res.json({
            data: null,
            message: "register controller is not working"
        })
    }
}

export const login = (req, res)=> {
    const { email, password } = req.body;
    try {
        loginService({email, password})
        .then((response)=>{
            res.cookie("x_auth", response.token)
            .json({
                data: response.data,
                message: response.message
            })
        })
    } catch (err) {
        res.json({
            data: null,
            message: `login controller is not working ${err}`
        })
    }
}