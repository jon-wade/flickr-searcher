
angular.module('myApp', ['ngAnimate'])
    .controller('myCtrl', function($scope, $http){
        //angular app code goes here


        //variable that allows the display of a searching message
        $scope.searching = true;

        //variable that is true when data is found and allows the display of a confirmation message on the UI
        $scope.dataReturned = false;

        //variable that is true when an error occurs and allows the display of an error on the UI
        $scope.errorReturned = false;

        //variable to store the search term
        $scope.searchTerm='';

        //variable to store number of photos returned to be displayed on the UI
        $scope.totalPhotos;

        //variable to store the img src urls of all the images returned
        //$scope.imageSrc;

        //array to store img src urls
        $scope.urlStore = [];

        //run this when you hit submit
        $scope.submit = function(){

            //store search term in a variable to allow us to clear the input box
            $scope.searchTerm = $scope.inputBox;

            //clear the input box
            $scope.inputBox = '';

            //perform the JSON call to the API
            getData();



        };


        var getData = function(){
            var url = 'https://api.flickr.com/services/rest';
            var params = {
                method: 'flickr.photos.search',
                api_key: 'd8cdc8ec622bb63d150201cefee6ccb5',
                tags: $scope.searchTerm,
                format: 'json',
                nojsoncallback: 1
            };

            $http({
                url:url,
                params: params,
                method: 'GET'
            })
                .success(function(response){
                    console.log('SUCCESS!');
                    console.log(response);

                    //set the totalPhotos variable ready for display on screen
                    $scope.totalPhotos = response.photos.total;

                    //display the dataReturned message
                    $scope.dataReturned = true;

                    //call function to pull out all the relevant data from response object to format the image src attributes
                    parseData(response);


                })
                .error(function(response){
                    console.log('ERROR!');
                    console.log(response);

                    //display an error message
                    $scope.errorReturned = true;

                })
        };

        var parseData = function(response){


            for (var i=0; i< response.photos.photo.length; i++) {
                var farm = response.photos.photo[i].farm;
                var server = response.photos.photo[i].server;
                var secret = response.photos.photo[i].secret;
                var id = response.photos.photo[i].id;

                $scope.urlStore[i] = 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '.jpg';
            }

            //$scope.imageSrc = urlStore[10];
            console.log(urlStore);
        };









    });
