//var root_url = 'http://192.168.0.154/summary_time/';
var root_url = 'http://summarytime.co/';
//var root_url = 'http://dev.summarytime.co/';
var user_id=getItem("user_id");
function setItem(key, value)
{
	try
	{
		window.localStorage.removeItem(key);
		window.localStorage.setItem(key, value);
	}
	catch(e) {}
}
//window.localStorage.removeItem('user_id');
function getItem(key)
{
	var value;
	try
	{
		value = window.localStorage.getItem(key);
	}
	catch(e)
	{
		value = null;
	}

	return value;
}
var app = angular
			.module('myApp', ['ngAnimate', 'ngRoute', 'ngCookies'])
			.config(config)
			.run(run);

	config.$inject = ['$routeProvider', '$locationProvider'];	
	function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'mvc/home/home.html',
                controllerAs: 'vm'
            })
            
            .when('/home', {
                controller: 'HomeController',
                templateUrl: 'mvc/home/home.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'mvc/login/login.html',
                controllerAs: 'vm',
                animate: "slideLeft"
            })
            .otherwise({ redirectTo: '/' });
            
            //$locationProvider.html5Mode(true);
    }		
    
    run.$inject = ['$window', '$rootScope', '$location', '$cookieStore', '$http'];
    
    function run($window,$rootScope, $location, $cookieStore, $http) { 
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/home']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/');
            }
		   /*if (!user_id) {
		   	console.log('DENY');
		   	$location.path('/login');
		   }
		   else {
		   	console.log('ALLOW');
		   	$location.path('/');
		   }*/
        });
		 $rootScope.online = navigator.onLine;
		 $window.addEventListener("offline", function() {
		 		$rootScope.$apply(function() {
		 				$rootScope.online = false;
		 			});
		 	}, false);

		 $window.addEventListener("online", function() {
		 		$rootScope.$apply(function() {
		 				$rootScope.online = true;
		 			});
		 	}, false);
	}		

app.directive('animClass',function($route){
  return {
    link: function(scope, elm, attrs){
      var enterClass = $route.current.animate;
      elm.addClass(enterClass);
      scope.$on('$destroy',function(){
        elm.removeClass(enterClass);
        elm.addClass($route.current.animate);
      })
    }
  }
});
