var app = angular.module("WebBanXe", []);
app.controller("User_Index", function ($scope, $http, $timeout, $location, $rootScope) {

    // Biến cờ để theo dõi trạng thái của dữ liệu
    $scope.showLoader = true;

    $timeout(function() {
        $scope.showLoader = false;
    }, 1000);

    $scope.btn_login_Singup = function(loai){
        if(loai == 1){
    $scope.showLoader = true;

               $timeout(function() {
                   $scope.showLoader = false;
                $scope.Login_Signup = "http://127.0.0.1:5500/FontEnd/USER-HTML/Login_Signup.html";
                $rootScope.biengiatri = 1;
                },500);

        
        }
        if(loai == 2){
            $scope.showLoader = true;

            $timeout(function() {
                $scope.showLoader = false;
                $scope.Login_Signup = 'http://127.0.0.1:5500/FontEnd/USER-HTML/Login_Signup.html';
                $rootScope.biengiatri = 2;
             },500);

        }
    };
});
