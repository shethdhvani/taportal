/**
 * Created by manog on 26-11-2016.
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var ApplicationSchema = require("./application.schema.server")();
    var Application = mongoose.model("Application", ApplicationSchema);


    var api = {
        createApplication: createApplication,
        //findApplicationsForCourse: findApplicationsForCourse,
        updateApplication: updateApplication,
        deleteApplication: deleteApplication,
        findApplicationForUser: findApplicationForUser,
        findApplicationById: findApplicationById
    };

    return api;

    function createApplication(application) {
        console.log("in model");
        console.log(application);
        return  Application.create(application);
    }

    function findApplicationForUser(userId) {
        console.log("in app model server");
        console.log(userId);
        return Application.find({_user: userId});
    }

    function updateApplication(applicationId,application) {
        delete application._id;
        return Application
            .update({_id: applicationId},{
                $set: { _position: application._position,
                    priority : application.priority,
                    previouslyTaken : application.previouslyTaken,
                    gradeObtained : application.gradeObtained,
                    beenTASemester : application.beenTASemester ,
                    availability : application.availability,
                    remarks : application.remarks
                    }}
            );
    }
    
    function deleteApplication(applicationId) {
        return Application.remove({_id: applicationId});
    }

    function findApplicationById(applicationId) {
        return Application.findById({_id: applicationId});
    }
  /*  function findApplicationsForCourse(coursename) {
        return Application.findById({_position.course.: coursename});
    }*/
};