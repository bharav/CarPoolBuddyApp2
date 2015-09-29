(function () {
    angular.module('carPoolBuddyApp2').controller('findridectrl', ['$scope', "$compile", findridectrl]);
    function findridectrl($scope, $compile) {
        var vm = this;
        var startMarker;
        var startWindow;
        var endMarker;
        var endWindow;
        // Wait for Cordova to load
        //
        document.addEventListener("deviceready", onDeviceReady, false);

        // Cordova is ready
        //
        function onDeviceReady() {
            var options = { enableHighAccuracy: true };
            navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
        }

        function onSuccess(position) {

            if (vm.startLocation != null && vm.endLocation != null) {
                document.getElementById("btnConfirm").disabled = false;
            }
            var autocomplete;
            var mylocation = new google.maps.LatLng(position.coords.latitude , position.coords.longitude);
            $scope.seachbox1Visible = true;
            $scope.seachbox2Visible = true;
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
            var CurrentLocation = new google.maps.Marker({
                position: mylocation,
                map: map,
                title: 'My Location'
            });
            var currentWindow = new google.maps.InfoWindow({
                content: $compile("<div>Current Location</div>")($scope)[0]
            });
            currentWindow.open(map, CurrentLocation);
            $scope.Pickup = function () {
                $scope.seachbox1Visible = false;
                $scope.seachbox2Visible = true;
                autocomplete = new google.maps.places.Autocomplete(document.getElementById('searchLocation'));
                document.getElementById("btnPickup").disabled = true;
                document.getElementById("btnDrop").disabled = false;
                if (vm.startLocation != null && vm.endLocation != null) {
                    document.getElementById("btnConfirm").disabled = false;
                }
                CurrentLocation.setMap(null);
                if (endMarker != null) {
                    endMarker.setMap(null);
                }
                var mystartlocation;
                if (vm.startLocation != null) {
                    mystartlocation = new google.maps.LatLng(vm.startLocation.H, vm.startLocation.L);
                }
                else {
                    mystartlocation = new google.maps.LatLng(position.coords.latitude , position.coords.longitude);
                }
                var mapOptions = {
                    center: mystartlocation,
                    zoom: 17,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoomControl: true,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false
                };
                map = null;
                map = new google.maps.Map(document.getElementById("map"), mapOptions);
                startMarker = new google.maps.Marker({
                    position: mystartlocation,
                    map: map,
                    draggable: true,
                    title: 'My Location'
                });
                startWindow = new google.maps.InfoWindow({
                    content: $compile("<div>Start Location</div>")($scope)[0]
                });
                startWindow.open(map, startMarker);
                google.maps.event.addListener(startMarker, 'dragend', function (event) {
                    console.log(event.latLng);
                    vm.startLocation = event.latLng;
                });
                autocomplete.bindTo('bounds', map);
                autocomplete.addListener('place_changed', function () {
                    var place = autocomplete.getPlace();
                    startMarker.setPosition(place.geometry.location)
                    map.setCenter(place.geometry.location);
                    vm.startLocation = place.geometry.location;
                });
            } 
     
            // Drop Location 
            $scope.Drop = function () {
                autocomplete = null;
                $scope.seachbox1Visible = true;
                $scope.seachbox2Visible = false;
                var autocompleteEnd = new google.maps.places.Autocomplete(document.getElementById('searchLocation2'));
                document.getElementById("btnDrop").disabled = true;
                document.getElementById("btnPickup").disabled = false;
                if (vm.startLocation != null && vm.endLocation != null) {
                    document.getElementById("btnConfirm").disabled = false;
                }
                CurrentLocation.setMap(null);
                if (startMarker != null) {
                    startMarker.setMap(null);
                }
                var myendlocation;
                if (vm.endLocation != null) {
                    myendlocation = new google.maps.LatLng(vm.endLocation.H, vm.endLocation.L);
                }
                else {
                    myendlocation = new google.maps.LatLng(position.coords.latitude , position.coords.longitude);
                }
                var mapEndOptions = {
                    center: myendlocation,
                    zoom: 17,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoomControl: true,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false
                };
                map = null;
                map = new google.maps.Map(document.getElementById("map"), mapEndOptions);
                endMarker = new google.maps.Marker({
                    position: myendlocation,
                    map: map,
                    draggable: true,
                    title: 'My Location'
                });
                endWindow = new google.maps.InfoWindow({
                    content: $compile("<div>End Location</div>")($scope)[0]
                });
                endWindow.open(map, endMarker);
                google.maps.event.addListener(endMarker, 'dragend', function (event) {
                    console.log(event.latLng);
                    vm.endLocation = event.latLng;
                });
                autocompleteEnd.bindTo('bounds', map);
                autocompleteEnd.addListener('place_changed', function () {
                    var place = autocompleteEnd.getPlace();
                    endMarker.setPosition(place.geometry.location)
                    vm.endLocation = place.geometry.location;
                    map.setCenter(place.geometry.location);
                });
            }
            // Drop Location 
            $scope.Confirm = function () {
                document.getElementById("btnDrop").disabled = true;
                document.getElementById("btnPickup").disabled = true;
                $scope.seachbox1Visible = true;
                $scope.seachbox2Visible = true;
                CurrentLocation.setMap(null);
                if (startMarker != null) {
                    startMarker.setMap(null);
                }
                if (endMarker != null) {
                    endMarker.setMap(null);
                }
                var myendlocation;
                var mystartlocation;
                var mymidlocation;
                myendlocation = new google.maps.LatLng(vm.endLocation.H, vm.endLocation.L);
                mystartlocation = new google.maps.LatLng(vm.startLocation.H, vm.startLocation.L);
                mymidlocation = new google.maps.LatLng((vm.startLocation.H + vm.endLocation.H) / 2, (vm.startLocation.L + vm.endLocation.L) / 2)
                var mapConfirmOptions = {
                    center: mymidlocation,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoomControl: true,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false
                };
                map = null;
                map = new google.maps.Map(document.getElementById("map"), mapConfirmOptions);
                startMarker = new google.maps.Marker({
                    position: mystartlocation,
                    map: map,
                    title: 'My Location'
                });
                startWindow = new google.maps.InfoWindow({
                    content: $compile("<div>Start Location</div>")($scope)[0]
                });
                startWindow.open(map, startMarker);
                endMarker = new google.maps.Marker({
                    position: myendlocation,
                    map: map,
                    title: 'My Location'
                });
                endWindow = new google.maps.InfoWindow({
                    content: $compile("<div>End Location</div>")($scope)[0]
                });
                endWindow.open(map, endMarker);
            }
        }
        function onError(error) {
            alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }
    }
})();