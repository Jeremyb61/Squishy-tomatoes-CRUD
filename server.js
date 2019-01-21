var express = require('express')
var app = express();
// const router = express.Router();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mean-exam');

var path = require('path');
app.use(express.static(__dirname + '/public/dist/public'));

var RateSchema = new mongoose.Schema({
    star: { type: String, required: [true, "Please enter your rating"]},
    comments: { type: String, required: [true, "Please enter your comment"], minlength:[8, "Review must be 8 or more characters"] },
    name: { type: String, required: [true, "Please enter your name"], minlength:[2, "Name must be 2 or more characters"] }
});

mongoose.model('Ratings', RateSchema);
var Ratings = mongoose.model('Ratings');

var MovieSchema = new mongoose.Schema({
    title: { type: String, required: [true, "Please enter the movie title"], minlength:[3, "Title must be 3 or more characters"] },
    ratings: [RateSchema]
},
    { timestamp: true }

);

mongoose.model('Movie', MovieSchema);
var Movie = mongoose.model('Movie');

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post('/movie', function (req, res) {
    Movie.create(req.body, function (err, data) {
        if (err) {
            res.json({
                status: false,
                err: err
            });
        }
        else {
            Movie.findOneAndUpdate({ _id: req.params.id }, { $push: { ratings: req.body } }, function (err, data) {
                if (err) { }
                else {
                    res.json({
                        data: data,
                        status: true
                    });
                }
            });
        }
    });
});
app.get('/movie', function (req, res) {
    Movie.find({}).sort({ createdAt: 'desc' }).exec(function (err, data) {
        if (err) {
            console.log("Server Error, at get all movies route");
        } else {
            console.log("Success at get all movies route");
            res.json(data);
        }
    })
});
app.get('/movie/:id', function (req, res) {
    Movie.findOne({ _id: req.params.id }, function (err, data) {
        if (err) {
            console.log("ERROR, findOne route")
        } else {
            console.log("SUCCESS at findOne route");
            console.log("====Data:", data)
            res.json(
                data
            );
        }
    });
});
app.put('/movie/:id', function (req, res) {
    Ratings.create(req.body, function (err, data) {
        if (err) {
            console.log("SERVER ERROR, Submitting a new rating", req.body)
            res.json({
                err,
                status: false
            })
        } else {
            Movie.findOneAndUpdate({ _id: req.params.id }, { $push: { ratings: data } }, function (err, data) {
                if (err) {
                    console.log("SERVER ERROR, pushing into ratings")
                } else {
                    res.json({
                        status: true,
                        data
                    })
                }
            })
        }
    })
})
app.delete('/movie/:id', function(req,res) {
    Movie.remove({_id: req.params.id}, function(err) {
        if(err) {
            console.log("SERVER ERROR could not delete")
            res.json({
                status: false,
                err
            });    
        } else {
            console.log("DELETE success")
            res.json(true)
        }
    })
})



// app.use('/', router);

// this route will be triggered if any of the routes above did not match
app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

app.listen(8000, function () {
    console.log('Listening on 8000');
});