var AddressService = angular.module('AddressService', []);
AddressService.factory('LocationData', ['$http', function ($http) {

    var urlBase = '/data/location.json', LocationData = {};

    LocationData.getAddress = function () {
        return $http.get(urlBase);
    };
    
    LocationData.initializeMap = function(){
        return (new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: 0,
                    lng: 0
                },
                zoom: 2
            }))
    };

    return LocationData;

}]);