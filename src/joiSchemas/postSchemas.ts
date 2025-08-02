import joi from 'joi'

// export const PostDtoSchema = joi.object({
//     id: joi.number().min(1).max(1000),
//     userId: joi.number().min(1).max(200),
//     title: joi.string(),
//     text: joi.string()
// })

export const PostBodySchema = {
    body: joi.object({
        id: joi.number().integer().min(1).max(1000),
        userId: joi.number().integer().min(1).max(200).required().messages({
            'any.required': 'userId is required',
            'number.base': 'userId must be a number',
            'number.min': 'userId must be at least 1',
            'number.max': 'userId must not exceed 200'
        }),
        title: joi.string().min(1).max(255).required().messages({
            'any.required': 'title is required',
            'string.min': 'title must be at least 1 characters',
            'string.max': 'title must not exceed 255 characters'
        }),
        text: joi.string().min(1).max(5000).required().messages({
            'any.required': 'text is required',
            'string.min': 'text must be at least 1 characters',
            'string.max': 'text must not exceed 5000 characters'
        })
    })
};

export const PostUpdateSchema = {
    body: joi.object({
        id: joi.number().integer().min(1).max(1000).required().messages({
            'any.required': 'id is required',
            'number.base': 'id must be a number',
            'number.min': 'id must be at least 1',
            'number.max': 'id must not exceed 1000'
        }),
        userId: joi.number().integer().min(1).max(200).required(),
        title: joi.string().min(1).max(255).required().messages({
            'any.required': 'title is required',
            'string.min': 'title must be at least 1 characters',
            'string.max': 'title must not exceed 255 characters'
        }),
        text: joi.string().min(1).max(5000).required().messages({
            'any.required': 'text is required',
            'string.min': 'text must be at least 1 characters',
            'string.max': 'text must not exceed 5000 characters'
        })
    })
};

export const PostParamsSchema = {
    params: joi.object({
        id: joi.number().integer().min(1).max(1000).required().messages({
            'any.required': 'id is required',
            'number.base': 'id must be a number',
            'number.min': 'id must be at least 1',
            'number.max': 'id must not exceed 1000'
        })
    })
};

export const PostQuerySchema = {
    query: joi.object({
        userName: joi.string().min(1).max(50).required().messages({
            'any.required': 'userName is required',
            'string.min': 'userName must be at least 2 characters',
            'string.max': 'userName must not exceed 100 characters'
        })
    })
};

export const GetAllPostsSchema = {
    query: joi.object({
        id: joi.number().integer().min(1).max(1000).optional(),
        userId: joi.number().integer().min(1).max(200).optional()
    })
};


