/**
 * Created by Dhvani on 11/9/2016.
 */

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');

var should = chai.should();

var expect = require('chai').expect;

var user = require('../project/model/user/user.schema.server');

var express = require('express');

var app = express();
exports.app = app;
chai.use(chaiHttp);


describe('Test For User', function() {

    it('should get all users', function (done) {
        chai.request(server)
            .get('/api/findallusers')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            })
    });


    //dhvani start
    it('should get all users error', function (done) {
        chai.request(server)
            .get('/api/findallusers/789')
            .end(function(err, res){
                res.should.have.status(404);
                done();
            })
    });
    //dhvani end

    it('should add a single user on /api/user POST', function(done) {
        chai.request(server)
            .post('/api/user')
            .send({'username': 'zxc_test', 'password': 'zxc_test'})
            .end(function(err, res){
                res.should.have.status(200);
                done();
            })
    });

    it('user should be able to login', function (done) {
        chai.request(server)
            .get('/api/loggedIn')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            })
    });


    it('should not be able to get user', function (done) {
        chai.request(server)
            .get('/api/user='+"?dsheth_test"+"&&dsheth_test")
            .end(function (err, res) {
                res.should.have.status(404);
                done();
            })

    });

    it('should be able to get a user', function (done) {
        chai.request(server)
            .get('/api/user/'+"?username=zxc_test"+"&password=zxc_test")
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })

    });

    it('should be able to get a user with username', function (done) {
        chai.request(server)
            .get('/api/user/'+"?username=zxc_test")
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            })

    });


    it('should add a single user on /api/user POST', function(done) {
        chai.request(server)
            .post('/api/user')
            .send({'username': 'abc_test', 'password': 'abc_test'})
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
    });



    it('should not register present user on /api/register POST', function(done) {
        chai.request(server)
            .post('/api/register')
            .send({'username': 'zxc_test', 'password': 'zxc_test'})
            .end(function(err, res){
                res.should.have.status(400);
                done();
            });
    });

    // it('should register a user on /api/register POST', function(done) {
    //     chai.request(server)
    //         .post('/api/register')
    //         .send({'username': 'new', 'password': 'neww'})
    //         .end(function(err, res){
    //             newid = res.body._id;
    //             res.should.have.status(200);
    //             done();
    //         });
    // });


    it('should register a user on /api/register POST', function(done) {
        chai.request(server)
            .post('/api/register')
            .send({'username': 'new123_test', 'password': 'new123_test', 'usertype' : 'student', 'email' : 'new_test@gmail.com'})
            .end(function(err, res) {
                newid = res.body._id;
                chai.request(server)
                    .delete('/api/user/' + newid)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        done();
                        // res.should.have.status(200);
                        // done();
                    });
                // done();
            });
    });

    // it('should delete a user on /api/register delete', function(done) {
    //     chai.request(server)
    //         .delete('/api/user/' + newid)
    //         .end(function (err, res) {
    //             res.should.have.status(200);
    //             done();
    //         });
    // });

    it('should login a single user on /api/login POST', function(done) {
        chai.request(server)
            .post('/api/login')
            .send({'username': 'zxc_test', 'password': 'zxc_test'})
            .end(function(err, res){
                res.should.have.status(200);
                done();
            })
    });
//anvita
    it('should update a user negativepath', function (done) {
        chai.request(server)
            .get('/api/findallusers')
            .end(function(err, res){
                chai.request(server)
                    .put('/api/user/'+ res.body[0]._id)
                    .send({'firstName': 'updateFirstName'})
                    .end(function (error, response) {
                        response.should.have.status(500);
                        done();
                    });
            });
    });


    it('should update a user', function (done) {
        chai.request(server)
            .get('/api/findallusers')
            .end(function(err, res){
                chai.request(server)
                    .put('/api/user/'+ res.body[0]._id)
                    .send({  username: "un_test",
                        password : "pw_test",
                        firstName: "fn_test",
                        lastName: "ln_test",
                        email: "e@e_test.com",
                        usertype: "Student",
                        gpa: 1,
                        coursesTaken: ["a_test", "b_test"],
                        currentCourses: ["c_test", "d_test"]})
                    .end(function (error, response) {
                        response.should.have.status(200);
                        done();
                    });
            });
    });

    it('should update a user negative 2', function (done) {
        chai.request(server)
            .get('/api/findallusers')
            .end(function(err, res){
                chai.request(server)
                    .put('/api/user/jhn,jm_test')
                    .send({  username: "un_test",
                        password : "pw_test",
                        firstName: "fn_test",
                        lastName: "ln_test",
                        email: "e@e_test.com_test",
                        usertype: "Student",
                        gpa: 1,
                        coursesTaken: ["a_test", "b_test"],
                        currentCourses: ["c_test", "d_test"]})
                    .end(function (error, response) {
                        error.should.have.status(500);
                        done();
                    });
            });
    });

// /api/user/addcurrentcourse/:userId


    it('should add current course to a user', function (done) {
        chai.request(server)
            .get('/api/findallusers')
            .end(function(err, res){
                chai.request(server)
                    .put('/api/user/addcurrentcourse/'+ res.body[0]._id)
                    .send({  username: "un_test",
                        password : "pw_test",
                        firstName: "fn_test",
                        lastName: "ln_test",
                        email: "e@e_test.com",
                        usertype: "Student",
                        gpa: 1,
                        coursesTaken: ["a_test", "b_test"],
                        currentCourses: ["c_test", "d_test"]})
                    .end(function (error, response) {
                        response.should.have.status(200);
                        done();
                    });
            });
    });
///api/user/addcourse/:userId
    it('should add previous course to a user', function (done) {
        chai.request(server)
            .get('/api/findallusers')
            .end(function(err, res){
                chai.request(server)
                    .put('/api/user/addcourse/'+ res.body[0]._id)
                    .send({  username: "un_test",
                        password : "pw_test",
                        firstName: "fn_test",
                        lastName: "ln_test",
                        email: "e@e_test.com",
                        usertype: "Student",
                        gpa: 1,
                        coursesTaken: ["a_test", "b_test"],
                        currentCourses: ["c_test", "d_test"]})
                    .end(function (error, response) {
                        response.should.have.status(200);
                        done();
                    });
            });
    });


    it('should add previous course to a user negative path', function (done) {
        chai.request(server)
            .get('/api/findallusers')
            .end(function(err, res){
                chai.request(server)
                    .put('/api/user/addcourse/56')
                    .send({  username: "un_test",
                        password : "pw_test",
                        firstName: "fn_test",
                        lastName: "ln_test",
                        email: "e@e_test.com",
                        usertype: "Student",
                        gpa: 1,
                        coursesTaken: ["a_test", "b_test"],
                        currentCourses: ["c_test", "d_test"]})
                    .end(function (error, response) {
                        response.should.have.status(500);
                        done();
                    });
            });
    });
    // end anvita

    it('should find user by userid', function (done) {
        chai.request(server)
            .get('/api/findallusers')
            .end(function(err, res){
                chai.request(server)
                    .get('/api/user/'+ res.body[0]._id)
                    .end(function (error, response) {
                        response.should.have.status(200);
                        done();
                    })
            });
    });

    it('user should be able to logout', function (done) {
        chai.request(server)
            .post('/api/logout')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            })
    });

    it('should find all users', function (done) {
        chai.request(server)
            .get('/api/user/')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            })
        done();
    });


});


