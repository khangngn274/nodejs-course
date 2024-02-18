const fs = require('fs');
const express = require('express');
const app = express();

const tourController = require('./../controllers/tourController');
const { getAllTours, createTour, getTour, updateTour, deleteTour, checkId, checkBody} = tourController;

//ROUTES
const route = express.Router();

//MIDDLEWARE
route.param('id', checkId);

// Create a check body middleware
// Name and Price
// If not -> 400 bad request
// Add it to the post handler stack

//route tours
route
    .route('/')
    .get(getAllTours)
    //checkbody is middleware, check middleware first then create tour
    .post(checkBody, createTour)

route
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

app.use('/api/v1/tours', route);

module.exports = route;