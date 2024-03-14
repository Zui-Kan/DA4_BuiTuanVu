var app = angular.module("WebBanXe", []);
app.controller("User_Index", function ($scope, $http, $timeout) {

    $scope.Login_Singup = '';
    $scope.btn_login_Singup = function(loai){
        if(loai == 1){
        console.log("chon 1");
            $scope.Login_Singup = "http://127.0.0.1:5500/USER-HTML/Login_Singup.html?page=login";
        }
        if(loai == 2){
            console.log("chon 2");

            $scope.Login_Singup = '/USER-HTML/Login_Singup.html?page=singup&loai=' + loai;
        }
    }


})