var addLocApp = angular.module('addLocApp', ['ngRoute', 'AddressService'])
	.config(function ($routeProvider, $locationProvider) {
		$routeProvider.when("/", {
		    'templateUrl': 'map.html',
		    'controllerAs': 'AddressController'
		}).when("/detail/:lat/:lng/", {
		    'templateUrl': 'map.html',
		    'controllerAs': 'MapController'
		}).otherwise({
		    'redirectTo': '/'
		});
		$locationProvider.html5Mode(true);
    });

addLocApp.constant('_', window._);

addLocApp.controller('AddressController', function ($scope, LocationData, _) {
    $scope.status = '';
    $scope.addresses = [];
   
	$scope.showList = false;
	$scope.active = false;
	$scope.groupCategory = [{id: '1', value: 'City'}, {id: '2', value: 'Country'}];
	
    function getLocationDetails() {
        LocationData.getAddress()
            .success(function (addr) {
                $scope.addresses = addr;
				$scope.orig = angular.copy($scope.addresses);
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
	
	$scope.update = function (item) {
		$scope.active = true;
		if (item !== null) {
			var itemId = item.id;
			if (itemId === 1) {
				$scope.data = angular.copy($scope.orig);
				$scope.addresses = _.groupBy($scope.data, function (d) {return d.city; });
				$scope.showList = true;
			} else {
				$scope.data = angular.copy($scope.orig);
				$scope.addresses = _.groupBy($scope.data, function (d) {return d.country; });
				$scope.showList = true;
			}
		} else {
			    $scope.showList = false;
		}
	}
    getLocationDetails();

});

addLocApp.controller('MapController', function ($scope, $window, $route, $routeParams, _) {
	
	$window.map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 2
    });
	
	var lat = $routeParams.lat,
        lng = $routeParams.lng,	
        markers = [], 
        mapOptions = {
            zoom: 16,
            center: new google.maps.LatLng(lat,lng),
            mapTypeId: google.maps.MapTypeId.STREET
        }

	$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
	
	$scope.setMarker = function (map, position, title, content) {
            var marker,
                markerOptions = {
                position: position,
                map: map,
                title: title,
                icon: '/img/green-dot.png'
            },infowindow = new google.maps.InfoWindow({
			     content: 'You are here!'
			});

            marker = new google.maps.Marker(markerOptions);
            markers.push(marker);
			
            marker.addListener('click', function() {
			  infowindow.open(map, marker);
			});
        }
		
		$scope.setMarker($scope.map, new google.maps.LatLng(lat, lng), 'Here', '');
	
});

