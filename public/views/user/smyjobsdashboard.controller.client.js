/**
 * Created by seshasai on 11/21/2016.
 */

(function(){
    angular
        .module("TaPortal")
        .controller("SMyJobsDashboardController", SMyJobsDashboardController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function SMyJobsDashboardController($routeParams, $location, UserService, $rootScope,applicationsService,PositionService) {
        var vm = this;
        vm.applicationnames=[];
        vm.userId = $rootScope.currentUser._id;
        var userId = $rootScope.currentUser._id;
        vm.logout = logout;

        /*it is good practice to declare initialization ina function. say init*/
        function init(){

            UserService
                .findUserById(userId)
                .then(function (response) {
                    vm.user = response.data;
                });

      // AUTHOR: Manognya
            applicationsService
                .findApplicationForUser(userId)
                .then(function (response) {
                    console.log("applications for student");
                    console.log(response.data);
                    vm.applications = response.data;
                    application_name(vm.applications);
                   // vm.application1 = vm.applications[0];
                    //vm.application2 = vm.applications[1];
                    //vm.application3 = vm.applications[2];

                    //console.log("each application:");
                    //console.log(vm.application1);

                })



        }
        init();


 function application_name(applications){
    console.log("in application_name client");
    for (var i = 0; i < applications.length; i++) {
        console.log("in application names");
        console.log(applications[i]._position);
        PositionService.findPositionById(applications[i]._position)
            .then(function(position){
               console.log(position.data.course);
                var obj={name:position.data.course};
                vm.applicationnames.push(obj);
            });
       //applicationNames[i]=applications[i]._position
    }

}
       // console.log("outside all functions");
       // console.log(vm.applicationNames);


        // Author: Sesha Sai Srivatsav
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