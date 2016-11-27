(function(){
    angular
        .module("TaPortal")
        .controller("SRegisterController", SRegisterController);

    /* HTML and Java script communicate via scope */
    /* handles the JAVA Script */

    function SRegisterController($location, UserService,CoursesandSemestersService) {
        var vm = this;
        function init(){
            CoursesandSemestersService
                .findAllCourses()
                .then(function (response) {
                    vm.courses = response.data;
                    //console.log(vm.courses);
                });

            CoursesandSemestersService
                .findAllSemesters()
                .then(function (response) {
                    vm.semesters = response.data;
                   // console.log(vm.semesters);
                });
        }
        init();


        vm.register = register;
      vm.showCheckboxes=showCheckboxes;
        vm.showCheckboxes2=showCheckboxes2;
        vm.getCheckedBoxes=getCheckedBoxes;
        vm.getCheckedBoxes2=getCheckedBoxes2;
       // vm.showsemesters=showsemesters;


        /*function showsemesters(){

        }
*/
        var expanded = false;
        function showCheckboxes() {
            var checkboxes = document.getElementById("checkboxes");
            if (!expanded) {
               // console.log("expanding");
                checkboxes.style.display = "block";
                expanded = true;
            } else {
                //console.log("not expanding");
                checkboxes.style.display = "none";
                expanded = false;
            }
        }
       // var selectedcourses=[];

        function getCheckedBoxes(chkboxName) {
          // console.log(chkboxName);
            var checkboxes = document.getElementsByName("mybox");
            //console.log(checkboxes.length);
            checkboxesChecked = [];
            for (var i=0; i<checkboxes.length; i++) {
                //console.log("i am here");
                if (checkboxes[i].checked) {
                    console.log(checkboxes[i].value);
                    checkboxesChecked.push(checkboxes[i]);
                }
            }
            console.log(checkboxesChecked);
            //vm.selectedcourses=checkboxesChecked;
            //return checkboxesChecked.length > 0 ? checkboxesChecked : null;


        }


        function getCheckedBoxes2(chkboxName) {
            // console.log(chkboxName);
            var checkboxes2 = document.getElementsByName("mybox2");
            //console.log(checkboxes.length);
            checkboxesChecked2 = [];
            for (var i=0; i<checkboxes2.length; i++) {
                //console.log("i am here");
                if (checkboxes2[i].checked) {
                    console.log(checkboxes2[i].value);
                    checkboxesChecked2.push(checkboxes2[i]);
                }
            }
            console.log(checkboxesChecked2);
            //vm.selectedcourses=checkboxesChecked;
            //return checkboxesChecked.length > 0 ? checkboxesChecked : null;
        }

//console.log(vm.selectedcourses);

        var expanded2 = false;

        function showCheckboxes2() {
            var checkboxes2 = document.getElementById("checkboxes2");
            if (!expanded2) {
                //console.log("expanding");
                checkboxes2.style.display = "block";
                expanded2 = true;
            } else {
                //console.log("not expanding");
                checkboxes2.style.display = "none";
                expanded2 = false;
            }
        }


        function register(username, password, firstName, lastName, email, usertype, gpa, coursestaken, coursetakencurrent) {

            usertype = "student";
            if(vm.myform.$valid == false){
                vm.error = "Enter the valied username/password or verify email";
                vm.alert = "* Enter the fields";
                if(vm.myform.password !== vm.myform.vpassword){
                    vm.pwmatch = "entered passwords do not match!";
                }
            }else {
                UserService
                    .register(username,password, firstName, lastName, email, usertype, gpa, coursestaken, coursetakencurrent)
                    .then(function (response) {
                            var user = response.data;
                        console.log(user);
                            if(user){
                                $location.url("/sprofile");
                            }

                        },
                        function (err) {
                            vm.error = err;
                        });
            }

        }

    }

})();