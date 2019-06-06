// Cuando se cargue la ventana/pagina completamente
if (localStorage.getItem("abreteSesamo") == null || localStorage.getItem("abreteSesamo") == undefined) {
    window.location.href = "./login.html"
}

$(window).on("load", function () {

    // Por defecto, Pendientes activado en el menu
    $("a.aAumentado:contains('Pendientes')").addClass("activo").css({ "pointer-events": "none" })

    // Ocultamos el div de la tabla por defecto, 
    // hasta que se de el caso de que busque o consulte datos

    // Evento Hover Pendientes/Erroneas h2 (titulo)
    $("h2.h2Registro").hover(function () {
        $(this).css({ "background": "#212529", "color": "white" })
    }, function () {
        $(this).css({ "background": "none", "color": "black" })
    })

    // Registrostablas
    // Evento Hover registros
    $("tbody tr").not(document.getElementsByClassName("registroPinchado")).hover(function () {
        ($(this).hasClass("registroPinchado") == false) ? $(this).addClass("registroHover") : ""
    }, function () {
        $(this).removeClass("registroHover")
    })

    //  Evento Hover registroPinchado
    $("tbody tr").click(function () {
        $("tbody tr").not(this).removeClass("registroPinchado")
        $(this).removeClass("registroHover").addClass("registroPinchado")
    })

    // Evento Boton Limpiar
    $(".botonLimpiar").click(function () {
        $("#buscador").val("")
    })

})

// Angular, peticion API
var app = angular.module('myApp', ['ngStorage']);
app.controller('loadMatriculasPendientes', function ($scope, $ngStorage, $http) {

    /* Declaramos la url de la peticion */
    const uriCargar = "https://proyecto-mdc-api.herokuapp.com/cargarMatriculas"
    const uriAsignada = "https://proyecto-mdc-api.herokuapp.com/matriculaAsignada/" + localStorage.getItem("abreteSesamo")

    $scope.

    $scope.IHAVETHEPOWER_ornot = function() {
        angular.forEach($scope.matriculasPendientes, function(value, key) {
            this.push(key + ': ' + value);
          }, log);
    };
    /* Declaramos el $scope de la matricula que se visualiza al darle
    al boton de "Ver registro" */
    $scope.matriculaVer = [];
    $scope.matsAsignadas = []

    /* Declaramos el $scope para las pendientes */
    $scope.matriculasPendientes = [];

    /* Hacemos la peticion de todas las matriculas con el estado
    Pendientes y la guardamos en el $scope de Pendientes */
    $http.get(uriAsignada
    ).then(function (response) {
        var matriculasAsignadas;
        matriculasAsignadas = response.data.matricula
        $scope.matsAsignadas = matriculasAsignadas
        console.log($scope.matsAsignadas);
    }).catch(function (response) {
        console.error('Error', response.status, response.data);
    })

    $http.post(uriCargar, {
        estado: "pendiente"
    }).then(function (response) {
        var matriculas;
        matriculas = response.data.matriculas
        $scope.matriculasPendientes = matriculas
        console.log($scope.matriculasPendientes);
    }).catch(function (response) {
        console.error('Error', response.status, response.data);
    })

    $scope.deleteRegistro = function (index, idMatricula) {
        const uri = "https://proyecto-mdc-api.herokuapp.com/deleteMatricula/" + idMatricula

        var r = confirm("¿Desea borrar la matricula?");
        if (r == true) {
            /* Hacemos la peticion de todas las matriculas con el estado
            Pendientes y la guardamos en el $scope de Pendientes */
            /* $http.delete(uri)
                .then(function (response) {
                    console.log(response.data)
                }).catch(function (response) {
                    console.error('Error', response.status, response.data);
                }) */

            /* Borramos el registro del $scope local */
            $scope.matriculasPendientes.splice(index, 1)
        }
    }
    $scope.cambiarEstadoErronea = function (index) {
        const uri = "https://proyecto-mdc-api.herokuapp.com/cambiarEstadoMatricula/"

        var r = confirm("¿Desea cambiar el estado de la matricula a Erronea?");
        if (r == true) {
            /* Hacemos la peticion de todas las matriculas con el estado
            Pendientes y la guardamos en el $scope de Pendientes */
            /* $http.post(uri)
                .then(function (response) {
                    console.log(response.data)
                }).catch(function (response) {
                    console.error('Error', response.status, response.data);
                }) */

            /* Borramos el registro del $scope local */
            $scope.matriculasPendientes.splice(index, 1)
        }
    }
    $scope.verMatricula = function (index) {

        /* Ocultamos la tabla y mostramos la vista de la matricula 
        a ver */
        $(".divTablaPendientes").hide()
        $("#divMatriculaVer").show()

        /* TAREA Comprobar que el registro es el asignado */

        $scope.verValueNombre = $scope.matriculasPendientes[index].nombre_completo.nombre
        $scope.verValuePrimerApellido = $scope.matriculasPendientes[index].nombre_completo.primer_apellido
        $scope.verValueSegundoApellido = $scope.matriculasPendientes[index].nombre_completo.segundo_apellido

        var dia = $scope.matriculasPendientes[index].fecha_nacimiento.dia
        var mes = $scope.matriculasPendientes[index].fecha_nacimiento.mes
        var anio = $scope.matriculasPendientes[index].fecha_nacimiento.anio
        var fechaNacimiento = dia + "/" + mes + "/" + anio
        /* $scope.verValueFechaNacimiento = fechaNacimiento */

        $scope.verValueTipoDocumentacion = $scope.matriculasPendientes[index].dni.tipo_documentacion
        $scope.verValueNumeroDocumentacion = $scope.matriculasPendientes[index].dni.numero

        $scope.verValueNacionalidad = $scope.matriculasPendientes[index].nacionalidad
        $scope.verValueProvincia = $scope.matriculasPendientes[index].provincia
        $scope.verValueLocalidad = $scope.matriculasPendientes[index].localidad.nombre
        var codigoPostal = $scope.matriculasPendientes[index].localidad.codigo_postal
        $scope.verValueCodigoPostal = codigoPostal
        $scope.verValueCalleDomicilio = $scope.matriculasPendientes[index].domicilio.calle
        $scope.verValueNumeroDomicilio = $scope.matriculasPendientes[index].domicilio.numero

        $scope.verValueTelefono = $scope.matriculasPendientes[index].telefono
        $scope.verValueEmail = $scope.matriculasPendientes[index].email
    }

    $scope.Volver = function () {
        /* Ocultamos la tabla y mostramos la vista de la matricula 
        a ver */
        $(".divTablaPendientes").show()
        $("#divMatriculaVer").hide()

    }

    $scope.Guardar = function () {
        /* Ocultamos la tabla y mostramos la vista de la matricula 
        a ver */
        $(".divTablaPendientes").show()
        $("#divMatriculaVer").hide()
    }

    /* Funcion de seleccion de las acciones de la lista */
    $scope.selectedItemChanged = function (index) {
        console.log($scope.selectedItem);
        console.log(index);
    }
});

$(document).ready(function () {
    $("#buscador").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".table tbody tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});