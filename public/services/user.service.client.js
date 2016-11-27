/**
 * Created by seshasai on 11/5/2016.
 */
(function(){
    angular
        .module("TaPortal")
        .factory("UserService", UserService);




    function UserService($http) {
        /* provide an API that allows access to this thing */
        var api = {
            loggedIn: loggedIn,
            createUser: createUser,
            register: register,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            updateUser: updateUser,
            deleteUser: deleteUser,
            login: login,
            logout: logout,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers
        };

        return api;
        /*functions are implemented below*/

        function register(username,password, firstName, lastName, email, usertype, gpa, coursestaken, coursecurrent) {

            console.log(coursecurrent);

            var coursesTakenList = [

            ];

            for(var i in coursestaken)
            {
                var x = {name: coursestaken[i]};
                coursesTakenList.push(x);
            }

            var coursesCurrent = [

            ];
            for(var i in coursecurrent)
            {
                var x = {name: coursecurrent[i]};
                coursesCurrent.push(x);
            }


            console.log(coursesTakenList);

            var user= {
                username: username,
                password : password,
                firstName: firstName,
                lastName: lastName,
                email: email,
                usertype: usertype,
                gpa: gpa,
                coursesTaken: coursesTakenList,
                currentCourses: coursesCurrent
            };
         console.log(user);
            return $http.post("/api/register",user);

        }

        function findAllUsers() {
            var url = "/api/findallusers";
            return $http.get(url);
        }

        function loggedIn() {
            return $http.get("/api/loggedIn");
        }
        function logout() {
            return $http.post("/api/logout" );
        }
        function login(username, password) {
            var user ={
                username: username,
                password: password
            };
            return $http.post("/api/login", user);

        }
        function findUserByCredentials(username, password){

            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url,user);

        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);
        }

        function findUserByUsername(username){
            var url ="/api/user?username="+username;
            return $http.get(url);

        }



        function updateUser(userId, user, newCourcesCurrent, oldCoursesCurrent, newcoursesTaken, oldcoursesTaken){

            // current courses
            var newCourcesCurrent1 = [

            ];
            for(var i in newCourcesCurrent)
            {
                var x = {name: newCourcesCurrent[i]};
                newCourcesCurrent1.push(x);
            }

            if(newCourcesCurrent1.length > 0){
                user.currentCourses = newCourcesCurrent1;
            }
            else{
                user.currentCourses = oldCoursesCurrent;
            }

            // courses taken

            var newCourcesTaken1 = [

            ];
            for(var i in newcoursesTaken)
            {
                var x = {name: newcoursesTaken[i]};
                newCourcesTaken1.push(x);
            }

            if(newCourcesTaken1.length > 0){
                user.coursesTaken = newCourcesTaken1;
            }
            else{
                user.coursesTaken = oldcoursesTaken;
            }

          //  console.log(user);
            var url="/api/user/"+userId;
            return $http.put(url, user);


        }


        function deleteUser(userId){
            var url = "/api/user/"+userId;
            return $http.delete(url);

        }


        
    }
})();