var AddressService = angular.module('AddressService', []);
AddressService.factory('LocationData', ['$http', function ($http) {

    var urlBase = '/data/location.json', LocationData = {};

    LocationData.getAddress = function () {
        return $http.get(urlBase);
    };

    return LocationData;

}]);