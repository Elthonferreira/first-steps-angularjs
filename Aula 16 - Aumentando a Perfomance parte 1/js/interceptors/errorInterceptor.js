angular.module("listaTelefonica").factory("errorInterceptor", function ($q, $location) {
	return {
		'responseError': function (rejection) {

			var status = rejection.status ? rejection.status : 'desconhecido'; // verificar se a propriedade 'status' está definida

			if (rejection.status === 404 || status === 'desconhecido') {
				$location.path("/error");
			}
			return $q.reject(rejection);
		}

	};
});