/**
 * Created by manog on 01-12-2016.
 */
/**
 * Created by manog on 27-11-2016.
 */
module.exports= function(app, models) {

    var applicationModel = models.applicationModel;

    app.post("/api/user/:userId/application", createApplication);
    app.get("/api/application/:applicationId", findApplicationById);
    app.delete("/api/application/:applicationId", deleteApplication);
    app.put("/api/application/:applicationId", updateApplication);
    //app.get("/api/findallapplications", findallapplications);
    app.get("/api/user/:userId/application", findApplicationForUser);


    function createApplication(req,res) {
        console.log("in server");

        var application = req.body;
        console.log(application);
        applicationModel
            .createApplication(application)
            .then(
                function (application) {
                    res.send(200);

                }, function (err) {
                    console.log("error in server return");
                    res.sendStatus(400).send(err);
                }
            );
    }


    function findApplicationById(req,res) {
        var aid=req.params.applicationId;
        applicationModel.findApplicationById(aid)
            .then(
                function (application)
                {
                    res.json(application);
                },
                function (error) {
                    res.sendStatus(400).send(err);
                }
            );
    }

    function findApplicationForUser(req,res) {
        applicationModel.findApplicationForUser(req.params.userId)
            .then(
                function (application) {
                    console.log(application[0].name);
                    res.json(application);
                },
                function (error) {
                    res.sendStatus(400).send(err);
                }
            )
    }

    function updateApplication(req,res) {
        var application = req.body;
        var aid=req.params.applicationId;
        console.log(application);
        applicationModel.updateApplication(aid, application)
            .then(
                function (status) {
                    console.log(status.data);
                    res.send(200);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function deleteApplication(req,res) {
        var aid = req.params.applicationId;

        applicationModel.deleteApplication(aid)
            .then(function (status) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });
    }

};