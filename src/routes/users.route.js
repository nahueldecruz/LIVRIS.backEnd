import express from 'express'
import UsersController from "../controllers/users.controllers.js";

const usersRouter = express.Router()

usersRouter.get("/:user_id", UsersController.getById)

export default usersRouter