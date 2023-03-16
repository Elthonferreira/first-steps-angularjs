angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, contatos, operadoras, serialGenerator, $filter) {
	$scope.app = $filter('upper')("Lista Telefônica");
	$scope.contatos = contatos.data;
	$scope.operadoras = operadoras.data;

	var init = function () {
		calcularImpostos($scope.contatos);
		$scope.contatos.push($scope.contatos[0]);
	};

	var calcularImpostos = function (contatos) {
		let imposto = 1.2;
		for (let contato of contatos) {
			contato.operadora.precoComImposto = contato.operadora.preco * imposto;
		}
	};

	$scope.adicionarContato = function (contato) {
		contato.serial = serialGenerator.generate();
		contatosAPI.saveContato(contato).then(function (response) {	
			delete $scope.contato;
			$scope.contatoForm.$setPristine();
			carregarContatos();					
		});
	};

	$scope.apagarContatos = function (contatos) {
		$scope.contatos = contatos.filter(function (contato) {
			if (!contato.selecionado) return contato;
		});
		$scope.verificarContatoSelecionado($scope.contatos);
	};

	$scope.verificarContatoSelecionado = function (contatos) {
		$scope.hasContatoSelecionado = contatos.some(function (contato) {
			return contato.selecionado;
		});	
	};

	$scope.ordenarPor = function (campo) {
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	};

	init();
});