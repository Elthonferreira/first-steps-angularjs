angular.module("listaTelefonica").factory("loadingInterceptor", function ($q, $rootScope, $timeout) {
	return {
		request: function (config) {
			$rootScope.loading = true;
			return config;
		},
		requestError: function (rejection) {
			$rootScope.loading = true;
			return $q.reject(rejection);
		},
		response: function (response) {
			$timeout(function () {
				$rootScope.loading = false;
			}, 500);
			//$rootScope.loading = false;
			return response;
		},
		responseError: function (rejection) {
			$rootScope.loading = true;
			return $q.reject(rejection);
		}
	};
});