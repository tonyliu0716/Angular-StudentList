/*global angular*/
'use strict';
var app = angular.module("myModel", ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {

        $routeProvider
            .when("/home", {
                templateUrl: "Templates/home.html",
                controller: "homeController"
            })
            .when("/courses", {
                templateUrl: "Templates/courses.html",
                controller: "coursesContrller"
            })
            .when("/students", {
                templateUrl: "Templates/students.html",
                controller: "studentsController"
            })
            .when("/student/:id", {
                templateUrl: "Templates/studentDetail.html",
                controller: "studentDetailController"
            })
            .otherwise({
                redirectTo: '/home'
            });

        $routeProvider.caseInsensitiveMatch = true;
        $locationProvider.html5Mode(true);
    })
    .service("studentService", function () {
        this.transformStudent = function (student) {
            this.studentDetail = student;
        }
    })
    .controller("homeController", ["$scope", function ($scope) {
        $scope.message = "Home Page";


    }])
    .controller("coursesContrller", ["$scope", function ($scope) {
        $scope.courses = ["C#", "VB.NET", "JAVA", "SPRING", "Hibernate"];

    }])
    .controller("studentsController", ["$scope", "studentService", "$route", function ($scope, studentService, $route) {
        // we can call the webservice here
        //        $http.get("....")
        //            .success(function(result){
        //                $scope.students = result;
        //            })
        //            .error(function(data, status) {
        //                ...
        //            })

        $scope.list = "List of Students";

        //instead, we use some fake data here
        $scope.students = [
            {
                id: 1,
                name: "Mark",
                gender: "Male",
                city: "Chicago"
            },
            {
                id: 2,
                name: "John",
                gender: "Male",
                city: "Beijing"
            },
            {
                id: 3,
                name: "Sara",
                gender: "Female",
                city: "Iowa"
            },
            {
                id: 4,
                name: "Tom",
                gender: "Male",
                city: "Fairfield"
            },
            {
                id: 5,
                name: "Pam",
                gender: "Female",
                city: "Columbus"
            },
            {
                id: 6,
                name: "Catherine",
                gender: "Female",
                city: "GuangZhou"
            },
            {
                id: 7,
                name: "Mary",
                gender: "Female",
                city: "ShenZhen"
            }
        ];

        $scope.$on("$routeChangeStart", function (event, next, current) {
            if (!confirm("Are you sure you want to navigate away from this site to " + next.$$route.originalPath)) {
                event.preventDefault();
            }
        });

        $scope.trans = function (student) {
            studentService.transformStudent(student);
        };

    }])
    .controller("studentDetailController", ["$scope", "studentService", "$routeParams", "$timeout", "$route", function ($scope, studentService, $routeParams, $timeout, $route) {
        $scope.details = "Student Details";
        $scope.num = $routeParams.id;

        $scope.reloadData = function () {
            $route.reload();
        }

        $timeout(function () {
            $scope.student = studentService.studentDetail;
        }, 2000);
    }]);