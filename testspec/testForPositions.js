/**
 * Created by Dhvani on 11/18/2016.
 */

//Author: Dhvani
//Test cases for positions

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');

var should = chai.should();

var expect = require('chai').expect;

var position = require('../project/model/user/position.schema.server');

var express = require('express');

var app = express();
exports.app = app;
chai.use(chaiHttp);

var pid = "";
var courseForPosition = "";
var semesterForPosition = "";

describe('Tests For Positions', function() {

    // it('should create course', function (done) {
    //     chai.request(server)
    //         .post('/api/course')
    //         .send({'coursename': 'newCourse_test'})
    //         .end(function (err, res) {
    //             res.should.have.status(200);
    //             done();
    //         });
    // });
    //
    // it('should create semester', function (done) {
    //     chai.request(server)
    //         .post('/api/semester')
    //         .send({'semestername': 'testsem1'})
    //         .end(function (err, res) {
    //             res.should.have.status(200);
    //             done();
    //         });
    // });

    it('should find all positions', function (done) {
        chai.request(server)
            .get('/api/findallpositions')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })
    });


    it('should find all positions error', function (done) {
        chai.request(server)
            .get('/api/findallpositions/789')
            .end(function (err, res) {
                res.should.have.status(404);
                done();
            })
    });


    it('should find all courses', function (done) {
        chai.request(server)
            .get('/api/findallcourses')
            .end(function (err, res) {
                courseForPosition = res.body._id;
                res.should.have.status(200);
                done();
            })
    });

    it('should find all semesters', function (done) {
        chai.request(server)
            .get('/api/findallsemesters')
            .end(function (err, res) {
                semesterForPosition = res.body._id;
                res.should.have.status(200);
                done();
            })
    });

    // it('should create position', function (done) {
    //     chai.request(server)
    //         .post('/api/position')
    //         .send({'course' : '(CS 5010) PDP', 'semester': 'summer 2017', 'number' : '10',
    //             'professor' : 'test prof', 'deadline' : '2/1/2016'})
    //         .end(function (err, res) {
    //             res.should.have.status(200);
    //             done();
    //         });
    // });


    // it('should update a position', function (done) {
    //     chai.request(server)
    //         .get("/api/findPositionByCourseName/(CS 5010) PDP")
    //         .end(function(err, res){
    //             pid = res.body._id;
    //             chai.request(server)
    //                 .put('/api/position/' + res.body._id)
    //                 .send({'number' : '20',
    //                     'professor' : 'test prof updated', 'deadline' : '2/21/2016'})
    //                 .end(function (error, response) {
    //                     response.should.have.status(200);
    //                     done();
    //                 });
    //             // done();
    //         });
    //
    // });

    it('should find position by positionid', function (done) {
        chai.request(server)
            .get('/api/findallpositions')
            .end(function (err, res) {
                chai.request(server)
                    .get('/api/position/' + res.body[0]._id)
                    .end(function (error, response) {
                        response.should.have.status(200);
                        done();
                    });
            });
    });


    // it('should delete a position', function (done) {
    //     chai.request(server)
    //         .get("/api/findPositionByCourseName/newCourse_test")
    //         .end(function(err, res){
    //             chai.request(server)
    //                 console.log("id for delete")
    //                     console.log(res.body._id)
    //                 .delete('/api/position/' + res.body._id)
    //                 .end(function (error, response) {
    //                     response.should.have.status(200);
    //                     done();
    //                 });
    //         });
    // });

    //Author: Dhvani
    //Commenting the below code
    /*
    it('should delete a position', function (done) {

                chai.request(server)
                console.log("id for delete")
                console.log(pid)
                    .delete('/api/position/' + pid)
                    .end(function (error, response) {
                        response.should.have.status(200);
                        done();
            });
    });*/


    // it('should delete a course', function (done) {
    //     chai.request(server)
    //         .get('/api/courseName/newCourse_test')
    //         .end(function(err, res){
    //             chai.request(server)
    //                 .delete('/api/course/' + res.body._id)
    //                 .end(function (error, response) {
    //                     response.should.have.status(200);
    //                     done();
    //                 });
    //         });
    // });
    //
    // it('should delete a semester', function (done) {
    //     chai.request(server)
    //         .get('/api/semesterName/testsem1')
    //         .end(function(err, res){
    //             chai.request(server)
    //                 .delete('/api/semester/' + res.body._id)
    //                 .end(function (error, response) {
    //                     response.should.have.status(200);
    //                     // done();
    //                 });
    //             done();
    //         });
    // });



});



