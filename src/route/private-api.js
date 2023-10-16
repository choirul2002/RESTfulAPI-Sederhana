import express from "express";
import addressController from "../controller/address-controller.js";
import contactController from "../controller/contact-controller.js";
import userController from "../controller/user-controller.js"
import { authMiddleware } from "../middleware/auth-middleware.js";

const privateRouter = new express.Router();

//user api
privateRouter.use(authMiddleware)
privateRouter.get('/api/users/current', userController.validationUser)
privateRouter.patch('/api/users/current', userController.updateUserValidation)
privateRouter.delete('/api/users/logout', userController.logout)

//contact api
privateRouter.post('/api/contacts', contactController.create)
privateRouter.get('/api/contacts/:contactsId', contactController.get)
privateRouter.put('/api/contacts/:contactsId', contactController.update)
privateRouter.delete('/api/contacts/:contactsId', contactController.remove)
privateRouter.get('/api/contacts', contactController.search)

//address api
privateRouter.post('/api/contacts/:contactsId/addresses', addressController.create)
privateRouter.get('/api/contacts/:contactsId/addresses/:addressId', addressController.get)
privateRouter.put('/api/contacts/:contactsId/addresses/:addressId', addressController.update)
privateRouter.delete('/api/contacts/:contactsId/addresses/:addressId', addressController.remove)
privateRouter.get('/api/contacts/:contactsId/addresses', addressController.list)

export {
    privateRouter
}