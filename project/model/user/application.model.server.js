/**
 * Created by manog on 26-11-2016.
 */
module.exports = function () {

    var mongoose = require("mongoose");
    var ApplicationSchema = require("./application.schema.server")();
    var ApplicationModel = mongoose.model("ApplicationModel", ApplicationSchema);


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
        return  ApplicationModel.create(application);
    }

    function findApplicationForUser(userId) {
        console.log(userId);
        return ApplicationModel.findById({_user: userId});
    }

    function updateApplication(applicationId,application) {
        delete application._id;
        return ApplicationModel
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
        return ApplicationModel.remove({_id: applicationId});
    }

    function findApplicationById(applicationId) {
        return ApplicationModel.findById({_id: applicationId});
    }
  /*  function findApplicationsForCourse(coursename) {
        return ApplicationModel.findById({_position.course.: coursename});
    }*/
};
