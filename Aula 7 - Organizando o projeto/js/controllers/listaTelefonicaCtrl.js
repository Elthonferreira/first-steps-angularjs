angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $http) {
	$scope.app = "Lista Telefonica";
	$scope.contatos = [];
	$scope.operadoras = [];
	/*$scope.contatos = [
		{nome: $filter('uppercase')("Pedro"), telefone: "9999-8888", data: new Date(), operadora: {nome: "Claro", codigo: 21, categoria: "Celular"}, cor: "blue"},
		{nome: "Maria", telefone: "9999-8877", data: new Date(), operadora: {nome: "GVT", codigo: 25, categoria: "Fixo"}, cor: "yellow"},
		{nome: "Ana", telefone:   "9999-8866", data: new Date(), operadora: {nome: "Tim", codigo: 41, categoria: "Celular"},cor: "red"}
	];
	$scope.operadoras = [
		{nome: "Claro", codigo: 21, categoria: "Celular", preco: 2},
		{nome: "Vivo", codigo: 15, categoria: "Celular", preco: 1},
		{nome: "Tim", codigo: 41, categoria: "Celular", preco: 3},
		{nome: "Oi", codigo: 14, categoria: "Celular", preco: 3},
		{nome: "GVT", codigo: 25, categoria: "Fixo", preco: 1},
		{nome: "Embratel", codigo: 21, categoria: "Fixo", preco: 1}	
	],*/

	var carregarContatos = function() {
		$http.get("http://localhost:8081/contatos").then(function (response) {
			$scope.contatos = response.data;
		}).catch(function (data, status) {
			$scope.message = "Aconteceu um problema!" + data;
		});
	};

	var carregarOperadoras = function() {
		$http.get("http://localhost:8081/operadoras").then(function (response) {
			$scope.operadoras = response.data;
		}).catch(function (data, status) {
			$scope.message = "Aconteceu um problema!" + data;
		});
	};
	
	$scope.adicionarContato = function (contato) {
		contato.data = new Date();
		$http.post("http://localhost:8081/contatos", contato).then(function (response) {	
			delete $scope.contato;
			$scope.contatoForm.$setPristine();
			carregarContatos();					
		});
	};
	$scope.apagarContatos = function (contatos) {
		$scope.contatos = contatos.filter(function (contato) {
			if (!contato.selecionado) return contato;
		});
	};
	$scope.isContatoSelecionado = function (contatos) {
		return contatos.some(function (contato) {
			return contato.selecionado;
		});
		/*var contatos = contatos.filter(function (contato) {
			if (contato.selecionado)  return contato;
		});
		if (contatos.length <= 0) return true;*/
	};
	$scope.ordenarPor = function (campo) {
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	};

	carregarContatos();
	carregarOperadoras();
	
	$scope.classe1 = "selecionado";
	$scope.classe2 = "negrito";


});