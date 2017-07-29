var express = require('express');
var server = express();
var port = process.env.PORT || 5000;
var bodyParser = require('body-parser');
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://oren_25:oren2510@ds125053.mlab.com:25053/heroku_355lb7k4";
//<oren_25>:<oren2510>
//var url = "mongodb://localhost:27017/ordersDB";

server.use( express.static('public/'));

 // Middleware
function mylogger(req, res, next){
    console.log(req.method + ' ' + new Date().toString());
    next();
}

server.use(mylogger);
server.use(bodyParser.json());

server.get('/orders', function(req, res){
	mongodb.connect(url, function(err, db){
        var collection = db.collection('orders');
		if(!err) {
            collection.find({}).toArray(function(err, result){
                    if(!err)
                        res.send(result);
                });
            }
		db.close();
    });
});

server.post('/post', function(req, res){
    var orders = req.body;
	mongodb.connect(url, function(err, db){
        var collection = db.collection('orders');
        if(!err)
            collection.insert(orders, function(err, result){
            if(!err)
                console.log(result + ' inserted in ' + new Date().toString());
        db.close();
        })
    })
});

server.delete('/delete/:id', function(req, res) {
    var id = req.params.id;
    mongodb.connect(url, function(err, db){
        var collection = db.collection('orders');
        if (!err)
            collection.remove({_id: new ObjectId(id)}, function(err, result){
                if(!err)
                    console.log(id + ' Has Been Removed');
            })
        db.close();
        })
    })

server.get('/editOrder/:id', function(req, res){
    var id = req.params.id;
    mongodb.connect(url, function(err, db){
        var collection = db.collection('orders');
        if(!err)
            collection.findOne({_id: new ObjectId(id)}, function(err, result){
                if(!err)
                    res.send(result)
            })
        db.close();
    })
})

server.put('/updateOrder/:id', function(req, res){
    var id = req.params.id;
    var order = req.body;
    mongodb.connect(url, function(err, db){
        var collection = db.collection('orders');
        if(!err)
            collection.update({_id: new ObjectId(id)}, order, function(err, result){
                if(!err)
                    res.send(result);
            })
        db.close();
    })
})
    
server.listen(port, function(){
    console.log('server on port ' + port);
});