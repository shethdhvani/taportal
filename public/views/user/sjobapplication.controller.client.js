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

        /*it is good practice to declare initialization ina function. say init*/
        function init(){
            findAllCourses();
            findAllSemesters();
            findAllPositions();
            UserService
                .findUserById(userId)
                .then(function (response) {
                    vm.user = response.data;
                });
        }
        init();



function createApplications(app1,app2,app3){
    console.log(app1);
    //console.log(app2);
    //console.log(app3);

    console.log(app1._position);
    PositionService.findPositionIDByTitle(app1._position)
        .then(function(response){
            console.log(response);
           console.log(response.data);
            //console.log(JSON.parse(response.data));
            //console.log(response.data[1]._id);

            //console.log(response._id);
            var posId = response.data;

            applicationsService.createApplication(app1,vm.userId,posId)
                .then(function (response){
                    console.log(response.data);
                    vm.application1 = response.data;
                })
        });


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