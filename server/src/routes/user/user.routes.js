import { Router } from "express";
import userController from "../../controllers//user.controllers.js";
import tokenMiddleware from '../../middlewares/token.middleware.js'
import { body } from 'express-validator'
import requestHandler from '../../handlers/request.handler.js'
import favoriteController from '../../controllers/favorite.controller.js'

const user = Router();

user.put(
    '/update-password',
    tokenMiddleware.auth,
    body('password')
        .exists().withMessage('password is required')
        .isLength({min:0}).withMessage('username minimum 8 charaters'),

    body('newPassword')
        .exists().withMessage('newPassword is required')
        .isLength({min:0}).withMessage('newPassword minimum 8 charaters'),

    body('confirmNewPassword')
        .exists().withMessage('confirmNewPassword is required')
        .isLength({min:0}).withMessage('confirmNewPassword minimum 8 charaters')
        .custom((value, { req }) => {
            if (value !== req.body.password)
            throw new Error("confirmNewPassword not match");
            return;
        }),

    requestHandler.validate,
    userController.updatePassword
)

user.get(
    '/info',
    tokenMiddleware.auth,
    userController.getInfo
)

user.get(
    '/favorites',
    tokenMiddleware.auth,
    favoriteController.getFavoritesOfusers
)

user.post(
    '/favorites',
    tokenMiddleware.auth,
    body('mediatype')
        .exists().withMessage('mediaType is required')
        .custom(type => ['movie', 'tv'].includes(type)).withMessage('mediatype Invalid'),

    body('mediaId')
        .exists().withMessage('mediaId is required')
        .isLength({min:1}).withMessage('mediaId can`t be empty'),

    body("mediaTitle")
        .exists().withMessage('mediaTitle is required'),
    
    body('mediaPoster')
        .exists().withMessage('mediaPoster is required'),

    body('mediaRate')
        .exists().withMessage('mediaRate is required'),
    requestHandler.validate,
    favoriteController.addFavorite
    )

user.delete(
    '/favorites/:favoriteId',
    tokenMiddleware.auth,
    favoriteController.removeFavorite
)

export default user;
