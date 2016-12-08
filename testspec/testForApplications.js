/**
 * Created by Dhvani on 11/30/2016.
 */

//Author: Dhvani
//Test cases for applications

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');

var should = chai.should();

var expect = require('chai').expect;

var application = require('../project/model/user/application.schema.server');

var express = require('express');

var app = express();
exports.app = app;
chai.use(chaiHttp);
var positionIdForTest = "";


describe('Tests For Applications', function() {


    it('should add a single user on /api/user POST', function(done) {
        chai.request(server)
            .post('/api/user')
            .send({'username': 'application_test', 'password': 'application_test'})
            .end(function(err, res){
                res.should.have.status(200);
                done();
            })
    });

    it('should find position by positionid', function (done) {
        chai.request(server)
            .get('/api/findallpositions')
            .end(function (err, res) {
                positionIdForTest = res.body[0]._id
                chai.request(server)
                    .get('/api/position/' + res.body[0]._id)
                    .end(function (error, response) {
                        response.should.have.status(200);
                        done();
                    });
            });
    });


    it('should create application', function (done) {
        chai.request(server)
            .get('/api/user/'+"?username=application_test")
            .end(function(err, res){
                chai.request(server)
                    .post('/api/user/'+res.body._id+'/application')
                    .send({
                        _position: positionIdForTest,
                        _user: res.body._id,
                        priority: 1,
                        previouslyTaken : "Yes",
                        gradeObtained : "A",
                        beenTASemester : "2015",
                        availability : "Fully Available",
                        status : "In Progress"})
                    .end(function (error, response) {
                        response.should.have.status(200);
                        done();
                    });
            });
    });

    it('should find application for user', function (done) {
        chai.request(server)
            .get('/api/user/application_test/application')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            })
    });

    it('should find application for user1', function (done) {
        chai.request(server)
            .get('/api/user/' + "?username=application_test")
            .end(function (err, res) {
                chai.request(server)
                    .get('/api/user/' + res.body_id + '/application')
                    .end(function (error, response) {
                        response.should.have.status(200);
                        done();
                    });

            })
    })

    // it('should find application by id', function (done) {
    //     chai.request(server)
    //         .get('/api/application')
    //         .end(function(err, res){
    //             chai.request(server)
    //             .get('/api/application/'+res.body._id)
    //             .end(function (error, response) {
    //                 response.should.have.status(200);
    //                 done();
    //             });
    //
    //         })
    // });


    it('should find application by id', function (done) {
        chai.request(server)
            .get('/api/user/application_test/application')
            .end(function(err, res){
                chai.request(server)
                    .get('/api/application/'+res.body._id)
                    .end(function (error, response) {
                        response.should.have.status(200);
                    });
                done();
            });
    });



    it('should update application', function (done) {
        chai.request(server)
            .get('/api/user/application_test/application')
            .end(function(err, res){
                chai.request(server)
                    .put('/api/application/'+res.body._id)
                    .send({
                        _position: positionIdForTest,
                        _user: res.body._id,
                        priority: 2,
                        previouslyTaken : "Yes",
                        gradeObtained : "A-",
                        beenTASemester : "2015",
                        availability : "Fully Available",
                        status : "In Progress"})
                    .end(function (error, response) {
                        response.should.have.status(200);
                    });
                done();
            });
    });

    //Author: Dhvani
    //Find Applications for Position
    it('should find applications for position', function (done) {
        chai.request(server)
            .get('/api/user/application_test/application')
            .end(function(err, res){
                chai.request(server)
                    .get('/api/ApplicationForPosition/'+res.body._id)
                    .end(function (error, response) {
                        response.should.have.status(200);
                        done();
                    });
                done();
            })
    });


    //Author: Dhvani
    //Find Applications for Position
    it('should find positionid by title', function (done) {
        chai.request(server)
            .get('/api/application/'+'(CS 5012)MSD')
            .end(function(err, res){
                        res.should.have.status(200);
                        done();
                    });
    });


    it('should delete application', function (done) {
        chai.request(server)
            .get('/api/user/application_test/application')
            .end(function(err, res){
                chai.request(server)
                    .delete('/api/application/' + res.body._id)
                    .end(function (error, response) {
                        response.should.have.status(200);
                    });
                done();
            });
    });


    it('should delete user', function (done) {
        chai.request(server)
            .get('/api/user/'+"?username=application_test")
            .end(function(err, res){
                chai.request(server)
                    .delete('/api/user/' + res.body._id)
                    .end(function (error, response) {
                        response.should.have.status(200);
                    });
                done();
            });
    });


});



