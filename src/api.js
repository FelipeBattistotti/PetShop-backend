const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const ProductController = require('./controllers/ProductController');

const routes = express.Router();

/**
 * GET user
 */
routes.get('/user', UserController.index);

/**
 * POST user
 */
routes.post('/user', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        pwd: Joi.string().required(),
    })
}), UserController.create);

/**
 * DELETE user
 */
routes.delete('/user/:id', UserController.delete);

/**
 * POST login
 */
routes.post('/login', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        pwd: Joi.string().required(),
    })
}), LoginController.create);

/**
 * GET product
 */
routes.get('/product', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        category: Joi.string(),
    })
}), ProductController.index);

/**
 * GET product by ID
 */
routes.get('/product/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), ProductController.indexByID);

/**
 * POST product
 */
routes.post('/product', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
        price: Joi.string().required(),
        stock_quantity: Joi.string().required(),
    })
}), ProductController.create);

/**
 * PUT product
 */
routes.put('/product', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
        price: Joi.number().required(),
        stock_quantity: Joi.number().required(),
    })
}), ProductController.update);

/**
 * DELETE product
 */
routes.delete('/product/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), ProductController.delete);

module.exports = routes;
