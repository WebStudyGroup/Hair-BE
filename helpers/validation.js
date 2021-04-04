import Joi from 'joi'

const authSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: ['com', 'net', 'org'] } })
        .lowercase()
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    firstname: Joi.string().min(1).max(20),
    lastname: Joi.string().min(1).max(20),

    // repeat_password: Joi.ref('password')
})
    // .with('password', 'repeat_password')


export { authSchema }
