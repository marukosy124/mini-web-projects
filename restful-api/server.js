//Yeung Man Wai 1155126854

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

var mongoose = require('mongoose');
mongoose.connect('');
//var Schema = mongoose.Schema;

var EventSchema = mongoose.Schema({
    eventId: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    loc: {type: mongoose.Schema.Types.ObjectId, ref: 'Location'},
    //loc: {type: String},
    quota: {type: Number}
});

var LocationSchema = mongoose.Schema({
    locId: {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    quota: {type: Number}
});

var Event = mongoose.model('Event', EventSchema);
var Location = mongoose.model('Location', LocationSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function(){
    console.log("Connection is open");
});

//get an event
app.get('/event/:eventId', function(req, res) {
    Event.findOne({eventId: req.params['eventId']}).populate('loc').exec(
    function(err, e) {
        if (err || e == null){
            res.send("Cannot find the event!");
            return;
        }

        res.send("This is event "+e.eventId+":<br>\n" +
                "Event name: " + e.name + "<br>\n" +
                "Location id: " + e.loc.locId + "<br>\n" +
                "Location name: " + e.loc.name + "<br>\n" +
                "Event quota: " + e.quota);
    });
});

//post event
app.post('/event', function(req, res) {
    Event.find().sort({eventId:-1}).limit(1).exec(
        function (err, result) {
            if (err){
                res.send(err);
                return;
            }

            var event_id;
            if(result == null || result == 0) event_id = 1;
            else event_id = result[0].eventId+1;

            Location.findOne({locId: req.body['loc']},
                function(err, e) {
                    if (err){
                        res.send(err);
                        return;
                    }
                    if(e.quota < req.body['quota']){	
                        res.send("Location quota is too large");
                        return;
                    }
                    else{
                        var newEvent = new Event({
                            eventId: event_id,
                            name: req.body['name'],
                            loc: e._id,
                            quota: req.body['quota']
                        });
                        newEvent.save(function(err) {
                            if (err){
                                res.send(err);
                                return;
                            }
                            res.status(201).send("New event!<br>\n Event id: " + newEvent.eventId + "<br>\n" +
                                        "Event name: " + newEvent.name + "<br>\n" +
                                        "Location id: " + e.locId + "<br>\n" +
                                        "Location name: " + e.name + "<br>\n" +
                                        "Event quota: " + newEvent.quota);
                        });
                    }
        });
    });
});


//post loc
app.post('/loc', function(req, res){
    Location.findOne().sort({locId: -1}).limit(1).exec(
        function(err, result){
                var loc_id;
                if(result == null) loc_id = 1;
                else loc_id = result.locId+1;

                var e = new Location({
                    locId: loc_id,
                    name: req.body['name'],
                    quota: req.body['quota']
                });

                e.save(function(err) {
                    if (err){
                        res.send(err);
                        return;
                    }
                    //res.send("Ref: "+ e);
                    res.status(201).send("New location!<br>\n Location id: " + e.locId + "<br>\n" +
                                        "Location name: " + e.name);
                });
        });
});

//get events
app.get('/event', function(req, res) {
    Event.find().populate('loc').exec(
        function(err, result) {
            if (err || result == null || result == 0){
                res.send("No event!");
                return;
            }
            var str = "";
            for(const i of result){
                str += "Event id: "+i.eventId+"<br>\n" +
                        "Event name: " + i.name + "<br>\n" +
                        "Location id: " + i.loc.locId + "<br>\n" +
                        "Location name: " + i.loc.name + "<br>\n" +
                        "Event quota: " + i.quota + "<br><br>\n";
            }
            res.send(str);
    });
});

//get locs & get loc w/ quota no.
app.get('/loc', function(req, res) {
    if (req.query['quota']){
        Location.find({ quota: { $gte: req.query['quota']} }, 
            function(err, result) {
                if (err || result == null || result == 0){
                    res.send("Cannot find location!");
                    return;
                }
                let str = "";
                for(const i of result){
                    str += "Location id: " + i.locId + "<br>\n" +
                            "Location name: " + i.name + "<br>\n" +
                            "Location quota: " + i.quota + "<br><br>\n" 
                }  
                res.send(str);
		});
	}
    else{
        Location.find({}, function(err, result) {
            if (err || result == null || result == 0){
                res.send("No location!");
                return;
            }
            let str = "";
            for(const i of result){
                str += "Location id: " + i.locId + "<br>\n" +
                        "Location name: " + i.name + "<br>\n" +
                        "Location quota: " + i.quota + "<br><br>\n"
            }  
            res.send(str);
        });
    }
});

//get loc w/ locId
app.get('/loc/:locId', function(req, res) {
    Location.findOne({locId: req.params['locId']}, 
        function(err, result){
            if (err || result == null){
                res.send("Cannot find the location!");
                return;
            }
            res.send("Location id: " + result.locId + "<br>\n" +
                    "Location name: " + result.name + "<br>\n" +
                    "Location quota: " + result.quota);
    });
});

//get events w/ eventid or w/ locid
app.get('/event/:eventId/loc/:locId', function(req, res) {
    Location.findOne({locId: req.params['locId']}, function(err, result) {
            if (err){
                res.send(err);
            }
            if(result){
                Event.find({$or: [ { eventId: req.params['eventId'] }, { loc: result._id } ]}).populate('loc').exec(
                    function(err, e) {
                        if (err || e == null || e == 0){
                            res.send("Cannot find event!");
                            return;
                        }
                        var str = "";
                        for(const i of e){
                            str += "Event id: "+i.eventId+"<br>\n" +
                                    "Event name: " + i.name + "<br>\n" +
                                    "Location id: " + i.loc.locId + "<br>\n" +
                                    "Location name: " + i.loc.name + "<br>\n" +
                                    "Event quota: " + i.quota + "<br><br>\n";
                        }
                        res.send(str);
                });
            }
            else{	
                Event.find({ eventId: req.params['eventId'] }).populate('loc').exec(
                    function(err, e) {
                        if (err || e == null || e == 0){
                            res.send("Cannot find event!");
                            return;
                        }
                        var str = "";
                        for(const i of e){
                            str += "Event id: "+i.eventId+"<br>\n" +
                                    "Event name: " + i.name + "<br>\n" +
                                    "Event location id: " + i.loc.locId + "<br>\n" +
                                    "Event location name: " + i.loc.name + "<br>\n" +
                                    "Event quota: " + i.quota + "<br><br>\n";
                        }
                        res.send(str);
            });
        }
    });    
});

//del event 
app.delete('/event/:eventId', function(req, res) {
    Event.findOne({eventId: req.params['eventId']}).populate('loc').exec(
        function (err, result) {
            if (err || !result || result == null){
                res.send("Cannot find event!");
                return;
            }
            Event.remove({ eventId: req.params['eventId'] },  function(err, e) {
                if (err){
                    res.send(err);
                }
                res.send( "Deleted event!<br>\n Event id: " + result.eventId + "<br>\n" +
                            "Event name: " + result.name + "<br>\n" +
                            "Location id: " + result.loc.locId + "<br>\n" +
                            "Location name: " + result.loc.name + "<br>\n" +
                            "Event quota: " + result.quota);
            });
    });
});

const server = app.listen(3000);