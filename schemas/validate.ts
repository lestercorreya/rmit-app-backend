import * as Joi from "joi"

const schema = Joi.object({
    certificateId: Joi.string().required(),
});

export default schema