
angular.module('myApp', ['ngAnimate'])
    .controller('myCtrl', function($scope){
        //angular app code goes here


        //variable that allows the display of a searching message
        $scope.searching = true;

        //variable that is true when data is found and allows the display of a confirmation message on the UI
        $scope.dataReturned = true;

        //variable that is true when an error occurs and allows the display of an error on the UI
        $scope.errorReturned = true;

        //variable to store the search term
        $scope.searchTerm='';

        //run this when you hit submit
        $scope.submit = function(){
            $scope.searchTerm = $scope.inputBox;
            $scope.inputBox = '';
            alert($scope.searchTerm);



        };




        var url = 'https://api.flickr.com/services/rest';
        var params = {
            method: 'flickr.photos.search',
            //api_key: api_key,
            //tags: search_tag,
            format: 'json',
            nojsoncallback: 1
        };







    });
