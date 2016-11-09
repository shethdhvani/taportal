/**
 * Created by Dhvani on 11/9/2016.
 */

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
// var server = require('../project/app');
var should = chai.should();
var expect = chai.expect();

var user = require('../project/model/user/user.schema.server');

var express = require('express');



var app = express();
exports.app = app;
chai.use(chaiHttp);


describe('users', function() {
    it('should list ALL blobs on /blobs GET', function (done) {
        chai.request(server)
            .get('/api/findallusers')
            .end(function(err, res){
                res.should.have.status(200);
                done();
            });
        
    });



    it('should list a SINGLE blob on /blob/<id> GET');
    it('should add a SINGLE blob on /blobs POST');
    it('should update a SINGLE blob on /blob/<id> PUT');
    it('should delete a SINGLE blob on /blob/<id> DELETE');
});


