/**
 * Created by seshasai on 11/5/2016.
 */

module.exports = function () {

    var mongoose = require ("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User =  mongoose.model("User", UserSchema);

    var api = {

        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        updateResumeOfStudent: updateResumeOfStudent

    };
    return api;
    //findByID returns just one

    function findAllUsers() {
        return User.find();
    }


    function findUserById(userId) {
        return User.findById({_id: userId});
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function updateUser(userId, user) {
       // delete user._id;
        return User
            .update({_id: userId},{
                $set: {username: user.username,
                firstName : user.firstName,
                    lastName : user.lastName,
                    email: user.email,
                    currentCourses: user.currentCourses,
                    coursesTaken: user.coursesTaken,
                    gpa: parseInt(user.gpa),
                    //usertype : user.usertype
                 }}
            );
    }

    function updateResumeOfStudent(userId, resume) {
       // delete user._id;
        console.log("Here at update resume db");
        console.log(resume);
        return User
            .update({_id: userId},{
                $set: {resumeURL : resume.url,
                    resumeName: resume.resume}}
            );
    }


    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function createUser(user){
        console.log(user.coursestaken);
        return  User.create(user);
    }

};