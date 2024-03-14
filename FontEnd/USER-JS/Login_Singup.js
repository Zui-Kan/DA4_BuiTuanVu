var app = angular.module("WebBanXe");
app.controller("User_Login_Singup", function ($scope, $http, $timeout,$location) {


    $scope.showLoginForm = false;
    $scope.showSignupForm = false;
    $scope.showLoader = true;

    var key = 'loai';
    var page = window.location.search.substring(window.location.search.indexOf(key) + key.length + 1);
    var loai = window.location.search.substring(window.location.search.indexOf(key) + key.length + 1);

    $scope.baiviet = {
        a : loai,
        b : 20,
    };
    if(page == 'login'){
        $scope.showSignupForm = false;
        $scope.showLoader = true; 
        $timeout(function() {
            $scope.showLoader = false;  
            $scope.showLoginForm = true;
        }, 2000);
    }
    if(page == 'singup'){
        $scope.showLoginForm = false;
        $scope.showLoader = true; 
        $timeout(function() {
            $scope.showLoader = false; 
            $scope.showSignupForm = true;
        }, 2000);
    }

  
});
