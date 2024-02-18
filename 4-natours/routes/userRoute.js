const express = require('express');
const app = express();

const userController = require('./../controllers/userController');
const { getAllUsers, createUser, getUser, updateUser, deleteUser} = userController;

const userRouter = express.Router();

//route user
userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUser);

userRouter
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);
app.use('/api/v1/users', userRouter);    

module.exports = userRouter;