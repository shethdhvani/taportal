(function(){
    angular
        .module("TaPortal")
        .controller("FEditProfileController", FEditProfileController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function FEditProfileController($routeParams, $location, UserService, $rootScope, CoursesandSemestersService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.addUserCourses = addUserCourses;
        vm.deleteUserCourse = deleteUserCourse;

        vm.userId = $rootScope.currentUser._id;
        var userId = $rootScope.currentUser._id;
        vm.logout = logout;

        /*it is good practice to declare initialization ina function. say init*/
        function init(){
            findAllCourses();
            UserService
                .findUserById(userId)
                .then(function (response) {
                    vm.user = response.data;
                });
        }
        init();

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //                      Developed by Srivatsav                                                      //
        ////////////////////////////////////////////////////////////////////////////////////////////////////


        // Author: Sesha Sai Srivatsav
        function findAllCourses() {
            CoursesandSemestersService
                .findAllCourses()
                .then(function (response) {
                    vm.courses =  response.data;
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

        // Author: Sesha Sai Srivatsav
        function deleteUserCourse(course) {
           UserService
                .deleteUserCourse(userId, course)
                .then(function (res) {
                    var updatedUser = res.data;
                    if(updatedUser){
                        vm.success="Successfully Deleted courses";
                        init();
                    }else {
                        vm.error="Someting is off";
                    }
                })

        }


        // Author: Sesha Sai Srivatsav
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

        // Author: Sesha Sai Srivatsav
        function addUserCourses(user) {
            UserService
                .addUserCourses(userId, user)
                .then(function (res) {
                    var updatedUser = res.data;
                    if(updatedUser){
                        vm.success="Successfully updated courses";
                        init();
                    }else {
                        vm.error="Someting is off";
                    }
                })
        }
        // Author: Sesha Sai Srivatsav
        function updateUser(user){
           
            UserService
                .updateUser(userId, user)
                .then(function (res) {
                    var updatedUser = res.data;
                    if (updatedUser){
                        vm.success="successfully updated!";

                    }else{
                        vm.error = "Some thing doesn't seem right here";
                    }
                });
        }



    }


})();