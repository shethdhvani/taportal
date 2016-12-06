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

        vm.userId = $rootScope.currentUser._id;
        var userId = $rootScope.currentUser._id;
        vm.logout = logout;
        vm.deleteapplication=deleteapplication;

        /*it is good practice to declare initialization ina function. say init*/
        function init(){
            vm.applicationnames=[];
      // AUTHOR: Manognya
            applicationsService
                .findApplicationForUser(userId)
                .then(function (response) {
                    console.log("applications for student");
                    console.log(response.data);
                    vm.applications = response.data;

                    for (var i = 0; i < vm.applications.length; i++) {
                        PositionService.findPositionById(vm.applications[i]._position)
                            .then(function(position){
                                var obj={name:position.data.course};
                                vm.applicationnames.push(obj);
                            });
                    }

                });
        }
        init();



function deleteapplication(applicationname){
    PositionService.findPositionIDByTitle(applicationname)
        .then(function(response){
            console.log("for delete appl");
            console.log(response.data);
            var posId = response.data;

            for (var i = 0; i < vm.applications.length; i++) {

                if(vm.applications[i]._position==posId){
                    console.log("to be deleted application id");
                    console.log(vm.applications[i]._id);
                    applicationsService.deleteApplication(vm.applications[i]._id)
                        .then(function (response) {
                            console.log(response);
                        })
                }
            }
        })

}


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