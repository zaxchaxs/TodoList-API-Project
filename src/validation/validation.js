import Joi from 'joi';

const createTodoListValidation = Joi.object({
    title: Joi.string().max(100).min(2).required(),
    description: Joi.string().max(300).min(3),
    priority: Joi.number().min(1).max(5)
});

const updateTodoListValidation = Joi.object({
    title: Joi.string().max(100).min(2).required(),
    description: Joi.string().max(300).min(3).allow(""),
    priority: Joi.number().min(1).max(5)
})

export {
    createTodoListValidation,
    updateTodoListValidation,
}