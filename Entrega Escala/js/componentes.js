var categoriaComponentes = angular.module('categoria-componentes',
  ['categoria-service']);

categoriaComponentes.directive('categoriaForm', function () {
  return {
    restrict: 'E',
    templateUrl: '/static/categoria/form.html',
    replace: true,
    scope: {categoriaSalva: '&'},
    controller: function ($scope, CategoriaAPI) {
      $scope.categoria = {nome: '', codigo: ''};
      $scope.formVisivelFlag = false;
      $scope.salvandoFlag = false;
      $scope.erros = {};


      $scope.salvar = function () {
        $scope.salvandoFlag = true;
        $scope.erros = {};
        CategoriaAPI.salvar($scope.categoria, function (categoriaDoServidor) {

          $scope.categoria = {nome: '', codigo: ''};

          if ($scope.categoriaSalva !== undefined) {
            $scope.categoriaSalva({categoria: categoriaDoServidor});
          }
        }, function (erros) {
          $scope.erros = erros;
        }, function () {
          $scope.salvandoFlag = false;
        });
      };

      $scope.alternarVisibilidade = function () {
        $scope.formVisivelFlag = !$scope.formVisivelFlag;
      };

    }
  };
});


categoriaComponentes.directive('categoriaLinha', function () {
  return {
    restrict: 'A',
    templateUrl: '/static/categoria/linha.html',
    replace: true,
    scope: {
      categoria: '=',
      categoriaApagada:'&'
    },
    controller: function ($scope, CategoriaAPI) {
      $scope.visivel = true;
      $scope.apagar = function () {
        $scope.visivel = false;
        CategoriaAPI.apagar($scope.categoria.id, function () {
              if($scope.categoriaApagada!==undefined){
                $scope.categoriaApagada();
              }
          },
          function () {
            alert('Não foi possível apagar no momento, tente novamente mais tarde');
            $scope.visivel = true;
          });

      }

    }
  };
});