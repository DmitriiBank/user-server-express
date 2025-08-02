import Joi from 'joi'

export const CreateUserSchema = {
    body: Joi.object({
        id: Joi.number().min(1).max(1000).optional(),
        userName: Joi.string().min(2).max(100).required().messages({
            'any.required': 'userName is required',
            'string.min': 'userName must be at least 2 characters',
            'string.max': 'userName must not exceed 100 characters'
        })
    })
};

export const UserIdQuerySchema = {
    query: Joi.object({
        id: Joi.number().min(1).max(1000).required().messages({
            'any.required': 'id is required',
            'number.base': 'id must be a number',
            'number.min': 'id must be at least 1',
            'number.max': 'id must not exceed 1000'
        })
    })
};

export const GetAllUsersSchema = {
    query: Joi.object({
        id: Joi.number().min(1).max(1000).optional()
    })
};

export const UserUpdateSchema = {
    body: Joi.object({
        id: Joi.number().min(1).max(1000).required().messages({
            'any.required': 'id is required',
            'number.base': 'id must be a number',
            'number.min': 'id must be at least 1',
            'number.max': 'id must not exceed 1000'
        }),
        userName: Joi.string().min(2).max(50).required().messages({
            'any.required': 'userName is required',
            'string.min': 'userName must be at least 2 characters',
            'string.max': 'userName must not exceed 50 characters'
        }),
    })
};

export const DeleteUserSchema = {
    body: Joi.object({
        id: Joi.number().min(1).max(1000).required().messages({
            'any.required': 'id is required',
            'number.base': 'id must be a number'
        })
    })
};