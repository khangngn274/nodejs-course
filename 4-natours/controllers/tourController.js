const fs = require('fs');
const express = require('express');
const app = express();

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkBody = (req, res, next) => {
    const body = req.body;
    if(!body.name | !body.price){
        return res.status(400).json({
            'status': 'fail',
            'message': 'Missing params'
        })
    }
    next();
}

exports.checkId = (req, res, next ,val) => {
    if(val == -1){
        return res.status(404).json({
            'status': 'fail',
            'message': 'Invalid ID'
        })
    }
    next();
}

// 2) ROUTE HANDLE
exports.getAllTours = (req, res) => {
    res.status(200).json({
        'status': 200,
        'results': tours.length,
        'requestTime': req.requestTime,
        'data': {
            tours
        }
    });
}

exports.getTour = (req, res) => {
    const params = req.params;
    const id = params.id * 1;

    const tour = tours.find(el => el.id === id);

    res.status(200).json({
        'status': 200,
        'data': {
            tour
        }
    });
}

exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);

    console.log('12312312');
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours) , tours, err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            },
        })
    });
}

exports.updateTour = (req, res) => {
    const params = req.params;
    const id = params.id * 1;

    const tour = tours.find(el => el.id === id);

    const newTour = Object.assign(tour, req.body);
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours) , tours, err => {
        res.status(202).json({
            status: 'success',
            data: {
                newTour
            },
        })
    });
}

exports.deleteTour = (req, res) => {
    const params = req.params;
    const id = params.id * 1;
    const body = req.body;

    const tour = tours.find(el => el.id === id);

    res.status(204).json({
        status: 'success',
        data: null
    })
}

