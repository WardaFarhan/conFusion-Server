const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Leaders = require('../modals/leaders');
var authenticate = require('../authenticate');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

//Leaders
leaderRouter.route('/')
.get((req, res, next)=> {
    Leaders.find({})
        .then((leaders) =>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leaders);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next)=>{
    Leaders.create(req.body)
        .then((leaders)=> {
            console.log('Leader Created', leaders);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leaders);   
        }, (err)=> next(err))
        .catch((err) => next(err));
})
.put(authenticate.verifyUser, (req, res, next) =>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Leaders.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json' );
            res.json(resp);
        },  (err) => next(err))
        .catch((err) => next(err));
})
//leaders id

leaderRouter.route('/:leaderId')
.put(authenticate.verifyUser, (req, res, next)=>{
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    },  { new: true })
        .then((leader) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(leader);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        },  (err) => next(err))
        .catch((err) => next(err));
})
.get((req, res, next) => {
    Leaders.findById(req.params.leaderId)
        .then((leader) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
});

module.exports = leaderRouter;

/*
leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the Leaders to you!');
})
.post((req, res, next) => {
    res.end('Will add the Leaders: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
    res.end('Deleting all leaders');
});

     //LEADERS ID

leaderRouter.route('/:leaderId')
     .all((req,res,next) => {
         res.statusCode = 200;
         res.setHeader('Content-Type', 'text/plain');
         next();
     })
     .get('', (req,res,next) => {
         res.end('Will send details of the Leaders: ' + req.params.leaderId +' to you!');
     })
     .post('', (req, res, next) => {
       res.statusCode = 403;
       res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
     })
     .put('', (req, res, next) => {
       res.write('Updating the leader: ' + req.params.leaderId + '\n');
       res.end('Will update the leader: ' + req.body.name + 
             ' with details: ' + req.body.description);
     })
     .delete('', (req, res, next) => {
         res.end('Deleting leaders: ' + req.params.leaderId);
     });
     */