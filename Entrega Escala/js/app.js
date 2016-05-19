var categoriaApp = angular.module('categoriaApp',
  ['categoria-componentes', 'categoria-service']);

categoriaApp.controller('CategoriaCtrl',
  function ($scope, CategoriaAPI) {
    $scope.categorias = [];

    CategoriaAPI.listar(function (categoriasDoServidor) {
      $scope.categorias = categoriasDoServidor;
    });

    $scope.adicionarCategoria = function (categoriaSalva) {
      $scope.categorias.unshift(categoriaSalva);
    };

    $scope.removerCategoria = function (indice) {
      $scope.categorias.splice(indice, 1);
    }
  });