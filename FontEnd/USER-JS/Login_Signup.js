var app = angular.module("WebBanXe");
app.controller("User_Login_Signup", function ($scope, $http, $timeout,$location, $rootScope) {

    $scope.showLoginForm = false;
    $scope.showSignupForm = false;

    $rootScope.$watch('biengiatri', function(newVal, oldVal){
        if (newVal) {
            if (newVal === 1) {
                $scope.showSignupForm = false;
                $scope.showLoginForm = true;
            } else if (newVal === 2) {
                $scope.showLoginForm = false;
                $scope.showSignupForm = true;

            }
        }
    });

    $scope.btn_showlogin = function(){
        $scope.showSignupForm = false;
    
        $timeout(function() {
            $scope.showLoginForm = true;
         },200);
    
    };

    $scope.btn_showsignup = function(){
        $scope.showLoginForm = false;
    
        $timeout(function() {
            $scope.showSignupForm = true;

         },200);
    
    };



});
