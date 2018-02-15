let assert = require('chai').assert;
let chai =require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = require('chai').expect;
const monk = require('monk');
let db = monk('mongodb://localhost/dbCities');
chai.use(chaiHttp);

describe('cities', function() {
    after(function () {
        db.close();
    });
    it('return of route cities',function() {
        chai.request('http://localhost:8000/#')
            .get('/cities')
            .then(function (res) {
                assert.equal(res.statusCode,200);
                assert.typeOf(res,'object');
                assert.typeOf(res.body,'object');
            })
    });
    it('route city/:id return one element', function () {
        (db.get('cities').findOne({},function (e, docs) {
            chai.request('http://localhost:8000')
                .get('/api/city/'+docs._id)
                .then(function (res) {
                    assert.equal(res.statusCode, 200);
                    assert.typeOf(res, 'object');
                    assert.typeOf(res.body, 'object');
                    assert.property(res.body, 'name');
                    assert.propertyVal(res.body,'name','Aix en Provence');

                })
        }));
    });

    it('should add a SINGLE city on /city/add POST', function() {
        chai.request('http://localhost:8000')
            .post('/city/add')
            .send({name: 'New York', long: '-73.935242', lat: '-73.935242' })
            .end((err, res) => {
                assert.equal(res.statusCode, 200);
                assert.typeOf(res, 'object');
                assert.typeOf(res.body, 'object');
                assert.property(res.body, 'name');
                assert.property(res.body, 'long');
                assert.property(res.body, 'lat');
                assert.propertyVal(res.body,'name','New York');
                assert.propertyVal(res.body,'long','-73.935242');
                assert.propertyVal(res.body,'lat','-73.935242');
            });
    });

});

describe('activity', function() {
    after(function () {
        db.close();
    });
    it('route activity/:id return one element', function () {
        (db.get('activities').findOne({}, function (e, docs) {
            chai.request('http://localhost:8000')
                .get('/api/activity/'+docs._id)
                .then(function (res) {
                    assert.equal(res.statusCode, 200);
                    assert.typeOf(res, 'object');
                    assert.typeOf(res.body, 'object');
                    assert.property(res.body, 'name');
                    assert.propertyVal(res.body,'name','musee Granet');
                })
        }));
    });

    it('route activity/add/:id POST', function (done) {
        (db.get('cities').findOne({}, function (e, docs) {
        chai.request('http://localhost:8000')
            .post('/activity/add/'+docs._id)
            .send({name: 'Test', nature: 'place', description: 'test', url:'test'})
            .end((err, res) => {
                assert.equal(res.statusCode, 200);
                assert.typeOf(res, 'object');
                assert.typeOf(res.body, 'object');
                assert.property(res.body.SUCCESS, 'name');
                assert.property(res.body.SUCCESS, 'nature');
                assert.property(res.body.SUCCESS, 'description');
                assert.propertyVal(res.body.SUCCESS, 'name', 'Test');
                assert.propertyVal(res.body.SUCCESS, 'nature', 'place');
                assert.propertyVal(res.body.SUCCESS, 'description', 'test');
                done();
            });
        }))
    });


});

describe('comments', function() {
    after(function () {
        db.close();
    });

    it('route comment/add/:id POST', function (done) {
        (db.get('activities').findOne({}, function (e, docs) {
            chai.request('http://localhost:8000')
                .post('/comment/add/'+docs._id)
                .send({user: {_id:'Test', email: 'place'}, date: new Date(), text:'test'})
                .end((err, res) => {
                    assert.equal(res.statusCode, 200);
                    assert.typeOf(res, 'object');
                    assert.typeOf(res.body, 'object');
                    assert.property(res.body.SUCCESS, 'user');
                    assert.property(res.body.SUCCESS, 'date');
                    assert.property(res.body.SUCCESS, 'text');
                    assert.propertyVal(res.body.SUCCESS, 'text', 'test');
                    done();
                });
        }))
    });


});