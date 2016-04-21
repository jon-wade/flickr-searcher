

var app = angular.module('myApp', ['ngAnimate'])
    .controller('myCtrl', function($scope, $http, $q){

        //variable that allows the display of a searching message
        $scope.searching = false;

        //variable that is true when data is found and allows the display of a confirmation message on the UI
        $scope.dataReturned = false;

        //variable that is true when an error occurs and allows the display of an error on the UI
        $scope.errorReturned = false;

        //variable to display results once loaded
        $scope.imagesLoaded = false;

        //variable to store the search term
        $scope.searchTerm='';

        //variable to store number of photos returned to be displayed on the UI
        $scope.totalPhotos=null;

        //array to store img src urls
        $scope.urlStore = [];

        //array to store image objects
        $scope.imageStore = [];



        //run this when you hit submit
        $scope.submit = function(){

            //display searching message for at least two seconds
            $scope.searching = true;

            //hide any previous messages
            $scope.dataReturned = false;
            $scope.errorReturned = false;
            $scope.imagesLoaded = false;


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

        var parseData = function(response) {

            function grabImages() {
                return $q(function (resolve) {
                    for (var i = 0; i < response.photos.photo.length; i++) {
                        var farm = response.photos.photo[i].farm;
                        var server = response.photos.photo[i].server;
                        var secret = response.photos.photo[i].secret;
                        var id = response.photos.photo[i].id;

                        //construct the src and store each in an array
                        $scope.urlStore[i] = 'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '.jpg';
                        //create an image object for each image so it's possible to extract the height and width attributes before loading onto a page (and amend)
                        $scope.imageStore[i] = new Image();
                        $scope.imageStore[i].src = $scope.urlStore[i];
                    }
                    console.log('Waiting for 1, 2, 3...10 seconds');


                    setTimeout(function(){console.log('Timeout finished! Go...'); $scope.searching = false; resolve();}, 10000);
                })
            }

            grabImages().then(function(){console.log($scope.urlStore); console.log($scope.imageStore);}).then(function(){resizeImages();});


            function resizeImages() {
                for (var i = 0; i < $scope.imageStore.length; i++) {
                    //set images to 50x50 thumbnails (for now)
                    var currentHeight =  $scope.imageStore[i].height;
                    var currentWidth = $scope.imageStore[i].width;

                    console.log(currentHeight, currentWidth);

                    var newHeight = 100;
                    var newWidth = (newHeight/currentHeight) * currentWidth;

                    $scope.imageStore[i].height = newHeight;
                    $scope.imageStore[i].width = newWidth;
                    console.log('Image ' + i + ' height=' + $scope.imageStore[i].height);
                    console.log('Image ' + i + ' width=' + $scope.imageStore[i].width);

                }

                //render the images in the UI
                $scope.imagesLoaded = true;

                //display the dataReturned message
                $scope.dataReturned = true;


            }
        }

    });






