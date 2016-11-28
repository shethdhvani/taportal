/**
 * Created by seshasai on 11/5/2016.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var bcrypt = require("bcrypt-nodejs");

/* For resume upload */
var fs = require("fs");
var multer  = require('multer');
var upload = multer({ dest: __dirname+'/../../public/uploads' });


module.exports= function(app, models){

    var userModel = models.userModel;

    app.get("/api/user", getUsers);
    app.post("/api/user", createUser);
    app.post("/api/register", register);
    app.get("/api/loggedIn",loggedIn);
    app.post("/api/logout", logout);
    app.post('/api/login', passport.authenticate('TaPortal'), login);
    app.get("/api/user/:userId", findUserById);
    app.delete("/api/user/:userId", deleteUser);
    app.put("/api/user/:userId", updateUser);
    app.put("/api/user/addcourse/:userId", addUserCourses);
    app.put("/api/user/addcurrentcourse/:userId", addCurrentCourses);
    app.put("/api/user/deleteusercourse/:userId",deleteUserCourse);
    app.put("/api/user/deletecurrentcourse/:userId",deleteCurrentCourse);
    app.get('/api/findallusers', findallusers);
    app.post("/api/resumeupload",upload.single('myResume'), uploadResume);


    passport.use('TaPortal', new LocalStrategy(localStrategy));



    //done - is to notify passport of success/failures

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);



    function uploadResume(req, res) {
       var UserId        = req.body.userId;
        
        var myFile        = req.file;
        var path          = myFile.path;
        var originalname  = myFile.originalname;
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        var filename      = myFile.filename;
 
        //Get the file type
        var mimes = mimetype.split('/');
        var extension = mimes[mimes.length - 1];
        
        //Append the file extension at the end of randomly generated filename
        var file = filename+"."+extension;

        var newpath = path+"."+extension;

        //Rename the file path
        fs.rename(path, newpath);

        //Check whether the upload is for UPLOAD widget or IMAGE widget
        var resume =
        {
            url: "/uploads/"+file, //originalname;
            resume: originalname
        };

        //Check whether the user needs to be edited or created!
        if(UserId){
            userModel
                .updateResumeOfStudent(UserId, resume)
                .then(
                    function(user) {
                        res.send(200);
                       // res.redirect("/sprofile");
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
        }

    }
    
    

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }


    function findallusers(req, res) {

        userModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }


    function register(req,res) {
        console.log("here");
        var username = req.body.username;
        var password = req.body.password;
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                    if(user){
                        res.status(400).send("Username is in use");
                        return;
                    }else{

                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModel
                            .createUser(req.body);

                    }
                },
                function (err) {
                    res.status(400).send(err);

                })

            .then(
                function (user) {
                    if(user){
                        //provided by passport
                        req.login(user, function (err) {
                            if(err){
                                res.status(400).send(err);
                            }else{
                                res.json(user);
                            }
                        })
                    }
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {

                    if(user && bcrypt.compareSync(password, user.password)){
                        done(null,user);

                    }else {
                        done("Error in login!", null);
                    }
                },
                function(err) {
                    done(err);
                });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }



    function login ( req, res){
        var user = req.user;
        res.json(user);
    }


    function loggedIn(req,res) {
        if(req.isAuthenticated()){
            res.json(req.user);
        }else{
            res.send('0');
        }
    }

    function addUserCourses(req,res) {
        var id = req.params.userId;
        var user = req.body;
        userModel
            .addUserCourses(id, user)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function addCurrentCourses(req,res) {
        var id = req.params.userId;
        var user = req.body;
        userModel
            .addCurrentCourses(id, user)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var user = req.body;


        userModel
            .updateUser(id, user)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }


    function createUser(req, res) {

        var username = req.body.username;

        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user){
                        res.send("Username already in use");
                        return;
                    } else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModel
                            .createUser(req.body)
                    }
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            )
            .then(
                function (user) {
                    if(user){
                        res.sendStatus(200);
                    }
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );

    }


    function deleteUserCourse(req,res) {
        var userId = req.params.userId;
        var coursename = req.body;
        userModel
            .deleteUserCourse(userId, coursename)
            .then(function (stats) {

                res.sendStatus(200);
            },
            function (error) {
                res.statusCode(404).send(error);
            });
    }


    function deleteCurrentCourse(req,res) {
        var userId = req.params.userId;
        var coursename = req.body;
        userModel
            .deleteCurrentCourse(userId, coursename)
            .then(function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });
    }



    function deleteUser(req,res) {
        var userId = req.params.userId;

        userModel
            .deleteUser(userId)
            //responds with some stats
            .then(function (stats) {

                    res.sendStatus(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });


    }


    function findUserById(req, res){
        var id = req.params.userId;

        userModel
            .findUserById(id)
            .then(function (user) {
                    res.send(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });

    }

    function getUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password){
            findUserByCredentials(username, password, req, res);
        } else if(username){
            findUserByUsername(username, res);
        }else {
            findallusers();
        }
    }

    function findUserByCredentials (username, password, req, res){
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                    req.session.currentUser= user;
                    res.json(user);
                },
                function (err) {
                    res.statusCode(404).send(err);
                });
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }


};