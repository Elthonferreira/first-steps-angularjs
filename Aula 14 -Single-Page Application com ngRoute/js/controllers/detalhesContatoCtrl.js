angular.module("listaTelefonica").controller("detalhesContatoCtrl", function ($scope, $routeParams, contatosAPI) {
	contatosAPI.getContato($routeParams.id).then(function (contato) {
		$scopeContato = contato;
	});
});