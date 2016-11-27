/**
 * Created by seshasai on 11/5/2016.
 */
(function(){
    angular
        .module("TaPortal")
        .controller("SProfileController", SProfileController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function SProfileController($routeParams, $location, UserService,CoursesandSemestersService, $rootScope, $scope) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.userId = $rootScope.currentUser._id;
        vm.logout = logout;
        var userId = $rootScope.currentUser._id;
        var user;
        var oldCoursesCurrent;
        var oldCoursesTaken;



        /*it is good practice to declare initialization ina function. say init*/


        function init($scope){
            UserService
                .findUserById(userId)
                .then(function (response) {
                    vm.user = response.data;
                    user = vm.user;
                    oldCoursesCurrent = user.currentCourses;
                    oldCoursesTaken = user.coursesTaken;
                });


                CoursesandSemestersService
                    .findAllCourses()
                    .then(function (response) {
                        vm.courses = response.data;
                        //$rootScope.options = vm.courses;
                        //$rootScope.selectedOption = $scope.options[1];
                        //console.log(vm.courses); (CS 5010) PDP
                    });

            //UserService
            //    .findUserById(userId)
            //    .then(function (response) {
            //        vm.OldCourses =  response.data.coursesTaken;
            //       // console.log(vm.OldCourses);
            //        $rootScope.oldCourses = user.coursesTaken[1];
            //
            //         console.log( $rootScope.oldCourses);
            //    });



        }
        init();

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
        function deleteUser() {
            UserService
                .deleteUser(userId)
                .then(function (response) {
                    var result= response.data;
                    if(result){
                        $location.url("/login");
                    }else{
                        vm.error = "can't delete you."
                    }
                });
        }

        function updateUser(user, newcoursesCurrent, newcoursesTaken){
            console.log(user);

            UserService
                .updateUser(userId, user, newcoursesCurrent, oldCoursesCurrent, newcoursesTaken, oldCoursesTaken)
                .then(function (res) {
                    var updatedUser = res.data;
                    if (updatedUser){
                        vm.success="successfully updated!";
                    }else{
                        vm.error = "Some thing doesn't seem right here";
                    }
                });
        }

        function  SafePath(path){
            console.log(path);

            return $sce.trustAsResourceUrl(path);
        }

    }


})();
