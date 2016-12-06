/**
 * Created by seshasai on 11/21/2016.
 */
(function(){
    angular
        .module("TaPortal")
        .controller("SJobApplicationController", SJobApplicationController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function SJobApplicationController($routeParams, $location, UserService, $rootScope, CoursesandSemestersService, PositionService,applicationsService) {
        var vm = this;

        vm.userId = $rootScope.currentUser._id;
        var userId = $rootScope.currentUser._id;
        vm.logout = logout;

        vm.createApplications=createApplications;
        vm.findApplicationForUser = findApplicationForUser;


        /*it is good practice to declare initialization ina function. say init*/
        function init(){
            findAllCourses();
            findAllSemesters();
            findAllPositions();
            findApplicationForUser();

        }
        init();

          
        function findApplicationForUser() {
            applicationsService
                .findApplicationForUser(userId)
                .then(function (response) {
                    vm.applications = response.data;

                    vm.application1 = vm.applications[0];
                    vm.application2 = vm.applications[1];
                    vm.application3 = vm.applications[2];

                    // getting the names
                    var posNames=new Array();
                    for (var i = 0; i < vm.applications.length; i++) {

                        PositionService.findPositionById(vm.applications[i]._position)
                            .then(function (position) {

                            });
                    }


                })
        }

        function createApplications(app1, app2, app3){
            applicationsService
                .findApplicationForUser(userId)
                .then(function (response) {

                    if(response.data.length==0 || response.data.length==1 ||response.data.length==2){
                        PositionService.findPositionIDByTitle(app1._position)
                            .then(function(response){
                                var posId = response.data;

                                applicationsService.createApplication(app1,vm.userId,posId)
                                    .then(function (response){

                                        vm.application1 = response.data;
                                    })
                            });

                        PositionService.findPositionIDByTitle(app2._position)
                            .then(function(response){
                                var posId2 = response.data;

                                applicationsService.createApplication(app2,vm.userId,posId2)
                                    .then(function (response){

                                        vm.application2 = response.data;
                                    })
                            });
                        PositionService.findPositionIDByTitle(app3._position)
                            .then(function(response){

                                var posId3 = response.data;

                                applicationsService.createApplication(app3,vm.userId,posId3)
                                    .then(function (response){

                                        vm.application3 = response.data;
                                    })
                            });
                    } else{
                        vm.updatedmessage = "Maximum applications for course = 3. please delete !";
                    }
                })

        }

        function findAllSemesters() {
            CoursesandSemestersService
                .findAllSemesters()
                .then(function (response) {
                    vm.semesters =  response.data;
                    vm.semesterCount = vm.semesters.length;
                })
        }

        function findAllCourses() {
            CoursesandSemestersService
                .findAllCourses()
                .then(function (response) {
                    vm.courses =  response.data;
                    vm.courseCount = vm.courses.length;
                })
        }

        function findAllPositions() {
            PositionService
                .findAllPositions()
                .then(function (response) {
                    var pos = response.data;

                    for(i=0; i<pos.length; i++){
                        var temp = pos[i].deadline;
                        pos[i].deadline = new Date(temp);
                    }


                    vm.positions = pos;
                    //console.log(  vm.positions);
                    vm.positionCount = vm.positions.length;

                });
        }



        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function () {
                        $location.url("/login");
                    }
                );
        }



    }


})();