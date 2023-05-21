import * as Joi from "joi"

const schema = Joi.object({
    name: Joi.string().required(),
    studentNumber: Joi.number().required(),
    emailId: Joi.string().required(),
    password: Joi.string().required()
});

export default schema