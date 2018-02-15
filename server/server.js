import express from 'express';
import corsPrefetch from 'cors-prefetch-middleware';
import imagesUpload from 'images-upload-middleware';
import {MongoClient, ObjectID} from 'mongodb';
import bodyParser from 'body-parser';

import {SERVER, PORT, HTTP_SERVER_PORT, HTTP_SERVER_PORT_IMAGES, IMAGES} from './constants';

const app = express();
app.use(express.static(__dirname + '/../static'));
app.use(bodyParser.json());
app.use(corsPrefetch);

let db; // global variable for getting an access to the database
MongoClient.connect('mongodb://' + SERVER)
    .then(connection => {
        db = connection.db('dbCities');
        app.listen(PORT, () => console.log('Server Listening on Port 9090'));
    })
    .catch(error => console.log('ERROR:', error));

app
    .use('/cities',(req,res)=>{
        let cities = db.collection('cities');
        cities.find({}).toArray(function(err,result){
            res.json(result);
        })
    })
    .get("/api/city/:id", (req, res) => {
        let cities = db.collection('cities');
        cities.findOne({_id : ObjectID(req.params.id)},function(err,result){
            res.json(result);
        })
    })

    .get("/api/activity/:id", (req, res) => {
        let cities = db.collection('activities');
        cities.findOne({_id : ObjectID(req.params.id)},function(err,result){
            res.json(result);
        })
    })

    .post("/city/add", (req, res) => {
        console.log(req.body);
        let cities = db.collection('cities');
        let city={
            name:req.body.name,
            coordinates:{
                long:req.body.long,
                lat:req.body.lat
            },
            picture:req.body.picture,
            description:req.body.description,
            activities: req.body.activities

        };
        cities.insertOne(city,function(err, result) {
            if(err) {
                res.json({'ERROR': err});
            } else {
                res.json({'SUCCESS': city});
                console.log('insert done');
            }
        });
    })

    .post("/comment/add/:id", (req, res) => {
        let activity = db.collection('activities');
        let comment={
            user: {
                _id: 'toto',
                email: 'toto@gmail.com'
            },
            date: new Date(),
            text: req.body.text
        };
        activity.update( {_id : ObjectID(req.params.id)} , { $push: { comments : comment } } );
    })

    .post("/activity/add/:id", (req, res) => {
        let activity = db.collection('activities');
        let cit = db.collection('cities');
        let activ={
            name:req.body.name,
            nature:req.body.nature,
            editor:{
                _id: 'toto',
                email:'toto@gmail.com'
            },
            comments: [],
            likers: [],
            pictures: req.body.pictures,
            description:req.body.description,
            url:req.body.url
        };

        activity.insertOne(activ,function(err, result) {
            if(err) {
                res.json({'ERROR': err});
            } else {
                res.json({'SUCCESS': activ});
                console.log('insert done');

            }
        });

        activity.findOne({name : req.body.name,nature:req.body.nature,description:req.body.description})
            .then(x => {
                let activc ={
                    _id:ObjectID(x._id),
                    name:x.name,
                    nature:x.nature,
                    picture: x.pictures[0],
                };
                console.log('lrejhrp');
                cit.update( {_id : ObjectID(req.params.id)} , { $push: { activities : activc } } )
            });


    })
    .post("/like/add/:id",(req,res)=>{
        let acti=db.collection('activities');
        console.log('toto');
        let like =req.body.liker;
        acti.update({_id:ObjectID(req.params.id)},{$push:{ likers : like }});
    })
    .post('/images', imagesUpload(
    './static/' + IMAGES,
    HTTP_SERVER_PORT_IMAGES
));


