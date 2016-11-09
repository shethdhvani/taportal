/**
 * Created by Dhvani on 11/9/2016.
 */

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
// var server = require('../project/app');
var should = chai.should();
// var expect = require('chai').expect;
var expect = chai.expect();

var user = require('../project/model/user/user.schema.server');

var express = require('express');

var app = express();
exports.app = app;
chai.use(chaiHttp);


describe('users service', function() {
    it('should get all users', function (done) {
        chai.request(server)
            .get('/api/findallusers')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            })
    });

    // it('get current user with both username and password', function (done) {
    //     chai.request(server)
    //         .get('/api/user')
    //         .end(function (err, res) {
    //             // console.log("")
    //             // expect(req.query.username).to.not.be.null;
    //             // expect(req.query.password).to.not.be.null;
    //             //res.header['location'].should.include('/api/findallusers')
    //                 expect('Location', '/api/findallusers');
    //             done();
    //         })
    // });


    it('user should be able to login', function (done) {
        chai.request(server)
            .get('/api/loggedIn')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            })
    });




    it('should be able to find user by id', function (done) {

        var newUser = new user({
            // username: 'dsheth',
            // password: 'dsheth'
            _id: '581e9bb02a3e503ec4537046'
        });
        newUser.save(function(err, data) {
            chai.request(server)
                .get('/api/user/'+data)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body._id.should.equal(newUser._id);
                    done();
                })
        });

    });

    it('should be able to get user', function (done) {

        var newUser = new user({
            username: 'dsheth',
            password: 'dsheth'
        });
        newUser.save(function (err, data) {
            chai.request(server)
                .get('/api/user/'+data.id)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('username');
                    res.body.should.have.property('password');
                    res.body.username.should.equal('dsheth');
                    res.body.password.should.equal('dsheth');
                    res.body._id.should.equal(data.id);
                    done();
                })
        });

    });


});


