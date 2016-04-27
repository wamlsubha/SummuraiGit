(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$http', '$rootScope', 'FlashService'];
    function HomeController($http, $rootScope, FlashService) {
        var vm = this;
        vm.custom_data = '1';
        FlashService.Success('no data found');
    }

})();