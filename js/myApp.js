
angular.module('myApp', ['ngAnimate'])
    .controller('myCtrl', function($scope){
        //angular app code goes here


        //variable that allows the display of a searching message
        $scope.searching = true;

        //variable that is true when data is found and allows the display of a confirmation message on the UI
        $scope.dataReturned = true;

        //variable that is true when an error occurs and allows the display of an error on the UI
        $scope.errorReturned = true;

        //run this when you hit submit
        $scope.submit = function(){
            alert('search pressed');
        };







    });
