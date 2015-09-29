(function () {
    'use strict'
    angular.module('carPoolBuddyApp2').controller('findridepickupCtrl', ['$scope', "$compile", findridepickupCtrl]);
    function findridepickupCtrl($scope, $compile) {
        var vm = this;
        vm.startPosition = null

        var mylocation = new google.maps.LatLng(position.coords.latitude, position.coords.latitude);
        var mapOptions = {
            center: mylocation,
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var startMarker = new google.maps.Marker({
            position: mylocation,
            map: map,
            draggable: true,
            title: 'My Location'
        });
        var startWindow = new google.maps.InfoWindow({
            content: $compile("<div>Start Marker</div>")($scope)[0]
        });
        startWindow.open(map, startMarker);

        google.maps.event.addListener(startMarker, 'dragend', function (event) {
            console.log(event.latLng);
            vm.startLocation = event.latLng;
        });
      /*  $scope.Pickup = function () {
            mylocation;
            if (vm.startPosition != null) {
                mylocation = new google.maps.LatLng(vm.startPosition);

            }
            else {
                mylocation = new google.maps.LatLng(12.9824, 77.69279900000001);
                var mapOptions = {
                    center: mylocation,
                    zoom: 17,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoomControl: true,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false
                };
                var map = new google.maps.Map(document.getElementById("map"), mapOptions);

                var startMarker = new google.maps.Marker({
                    position: mylocation,
                    map: map,
                    draggable: true,
                    title: 'My Location'
                });
                var startWindow = new google.maps.InfoWindow({
                    content: $compile("<div>Start Marker</div>")($scope)[0]
                });
                startWindow.open(map, startMarker);

                google.maps.event.addListener(startMarker, 'dragend', function (event) {
                    console.log(event.latLng);
                    vm.startLocation = event.latLng;
                });
            }
        }*/
    
        /* document.addEventListener("deviceready", onDeviceReady, false);*/
        var startLocation;
        var watchID = null;

        navigator.geolocation.clearWatch(watchID);
        // Cordova is ready
        //
        /*function onDeviceReady() {
            // Throw an error if no update is received every 30 seconds
            //var options = { timeout: 30000000 };
            watchID = navigator.geolocation.watchPosition(onSuccess, onError);
        }
    
        // onSuccess Geolocation
        //
        function onSuccess(position) {
          
            
        } 
    
      
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }*/
        console.log(startLocation);

    }

})();

