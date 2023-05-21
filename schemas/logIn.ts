import * as Joi from "joi"

const schema = Joi.object({
    emailId: Joi.string().required(),
    password: Joi.string().required()
});

export default schema