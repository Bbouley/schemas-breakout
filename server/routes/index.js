var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));
var User = require('../models/users.js');
var Event = require('../models/events.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

//save a new user
router.post('/users', function(req, res, next) {
    var newUser = new User(req.body);
    newUser.saveQ()
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        res.send(err);
    })
    .done();
});

//save a new event
router.post('/events', function(req, res, next) {
    var newEvent = new Event(req.body);
    newEvent.saveQ()
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        res.send(err);
    });
});

//save an event to a user
router.put('/user/:userid/events', function(req, res, next) {
    var newEvent = new Event(req.body);
    newEvent.saveQ();

    // var event = req.body.event;

    var update = { $push : {events : newEvent}};
    var options = {new:true};
    var id = req.params.userid;

    User.findByIdAndUpdateQ(id, update, options)
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        res.send(err);
    });
});


//list a users events
router.get('/user/:userid/events', function(req, res, next) {
    User.findByIdQ(req.params.id)
    .populate('events')
    .populate('comments')
    .exec(function(err, user) {
        if(err) {
            res.send(err);
        } else {
            res.json(user.events);
        }
    });
});
