(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope','$http', 'FlashService','$location'];
    function LoginController($scope,$http, FlashService,$location) {
        var vm = this;
         vm.login = login;
        function login(){
			vm.dataLoading = true;
			var data={
				email:vm.email, password:vm.password,
				type:1
			};
			$http.post(root_url+'SummuraiApps/ajax_login/', data).then(function(m){
				if(m.data.msg=='done'){
					setItem('user_id', m.data.id);
                    user_id = getItem("user_id");
					$location.path('/');
				}else{
					FlashService.Error(m.data.msg);
                    vm.dataLoading = false;
				}
			});
		}
    }

})();