const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promotions = require('../modals/promotions');
var authenticate = require('../authenticate');
const cors = require('./cors');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

//promotions
promoRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
 .get(cors.cors, (req, res, next) => {
    Promotions.find({})
        .then((promotions) =>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotions);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotions.create(req.body)
        .then((promotions)=> {
            console.log('Promotion Created', promotions);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotions);   
        }, (err)=> next(err))
        .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotions.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json' );
            res.json(resp);
        },  (err) => next(err))
        .catch((err) => next(err));
})

//promotions id

promoRouter.route('/:promotionId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
    Promotions.findById(req.params.promotionId)
        .then((promotion) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotion);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    },  { new: true })
        .then((promotion) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(promotion);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promotionId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        },  (err) => next(err))
        .catch((err) => next(err));
})

.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/'+ req.params.promotionId);
});

module.exports = promoRouter;

/*
promoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the Promotions to you!');
})
.post((req, res, next) => {
    res.end('Will add the Promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    res.end('Deleting all promotions');
});

     //PROMO ID

     promoRouter.route('/:promoId')
     .all((req,res,next) => {
         res.statusCode = 200;
         res.setHeader('Content-Type', 'text/plain');
         next();
     })
     .get('', (req,res,next) => {
         res.end('Will send details of the Promotions: ' + req.params.promoId +' to you!');
     })
     .post('', (req, res, next) => {
       res.statusCode = 403;
       res.end('POST operation not supported on /promotions/'+ req.params.promoId);
     })
     .put('', (req, res, next) => {
       res.write('Updating the promotion: ' + req.params.promoId + '\n');
       res.end('Will update the promotion: ' + req.body.name + 
             ' with details: ' + req.body.description);
     })
     .delete('', (req, res, next) => {
         res.end('Deleting promotions: ' + req.params.promoId);
     });
     */