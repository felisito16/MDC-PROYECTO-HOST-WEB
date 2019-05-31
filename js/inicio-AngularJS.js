if (localStorage.getItem("abreteSesamo") == null || localStorage.getItem("abreteSesamo") == undefined) {
    window.location.href = "./login.html"
}

$(window).on("load", function () {

    // Por defecto, Inicio activado en el menu
    $("a.aAumentado:contains('Inicio')").addClass("activo").css({ "pointer-events": "none" })

    // Evento Hover Pendientes/Erroneas h2 (titulo)
    $("h2.h2Registro").hover(function () {
        $(this).css({ "background": "#212529", "color": "white" })
    }, function () {
        $(this).css({ "background": "none", "color": "black" })
    })

})

var app = angular.module('myApp', []);
app.controller('controller-loadMatriculas', function ($scope, $http) {

    /* Declaramos la url de la peticion */
    const uri = "https://proyecto-mdc-api.herokuapp.com/cargarMatriculas"

    /* Declaramos los $scopes para las pendientes y las erroneas */
    $scope.matriculasPendientes = [];
    $scope.matriculasErroneas = [];

    /* Hacemos la peticion de Pendientes y la guardamos en el
    $scope de Pendientes */
    $http.post(uri, {
        estado: "pendiente",
        rows: "6"
    }).then(function (response) {
        $scope.matriculasPendientes = response.data.matriculas
    }).catch(function (response) {
        console.error('Error', response.status, response.data);
    })

    /* Hacemos la peticion de Erroneas y la guardamos en el
    $scope de Erroneas */
    $http.post(uri, {
        estado: "erronea",
        rows: "6"
    }).then(function (response) {
        $scope.matriculasErroneas = response.data.matriculas
    }).catch(function (response) {
        console.error('Error', response.status, response.data);
    })

});