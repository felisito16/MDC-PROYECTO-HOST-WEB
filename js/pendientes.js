// Cuando se cargue la ventana/pagina completamente
if (localStorage.getItem("abreteSesamo") == null || localStorage.getItem("abreteSesamo") == undefined) {
    window.location.href = "./login.html"
}

$("input[type=date]").datepicker(/* {
    locale: 'es-es',
    dateFormat: 'dd-mm-yyyy',
    onSelect: function (dateText, inst) {
        $(inst).val(dateText); // Write the value in the input
    }
} */);

// Datepicker de Fecha de Nacimiento
/* $('#fechaNacimiento').datepicker({
    locale: 'es-es',
    uiLibrary: 'bootstrap4',
    format: 'dd/mm/yyyy'
}); */

$(window).on("load", function () {

    /* $("tbody tr").hide() */
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

    // Evento Boton de Busqueda avanzada
    $("button:eq(0)").click(function () {

    })

    // Evento Boton de Buscar todo
    $("button:eq(1)").click(function () {
        $(".divContenedorPendientes").show()
    })

    // Evento Boton Limpiar
    $("button:eq(2)").click(function () {
        $("input").val("")
        $("select:eq(0)").val("Grado")
        $("select:eq(1)").val("Año curso")
        $("tbody tr").each(function () {
            $(this).show()
            $("tbody tr.registroPinchado").removeClass("registroPinchado")
        })
    })

    // Buscador Avanzado (NO TOCAR) Funciona 06/05/2019 !!

    // Nombre v3
    $("input:eq(0)").on("keyup", function () {
        var valor = $(this).val()
        buscador(valor, 1, "mostrarNombre", "NoMostrarNombre", "mostrarApellido",
            "NoMostrarApellido", "mostrarAnioCurso", "NoMostrarAnioCurso", "mostrarGrado", "NoMostrarGrado")
    })

    // Apellido v3
    $("input:eq(1)").on("keyup", function () {
        var valor = $(this).val()
        buscador(valor, 2, "mostrarApellido", "NoMostrarApellido", "mostrarAnioCurso",
            "NoMostrarAnioCurso", "mostrarNombre", "NoMostrarNombre", "mostrarGrado", "NoMostrarGrado")
    })

    // Grado v3
    $("select:eq(0)").on("change", function () {
        var valor = $("select:eq(0) option:selected").val()
        if (valor != "Grado") {
            buscador(valor, 3, "mostrarAnioCurso", "NoMostrarAnioCurso", "mostrarNombre",
                "NoMostrarNombre", "mostrarApellido", "NoMostrarApellido", "mostrarGrado", "NoMostrarGrado")
        }
    })

    // Año Curso v3
    $("select:eq(1)").on("change", function () {
        var valor = $("select:eq(1) option:selected").val()
        if (valor != "Año Curso") {
            buscador(valor, 4, "mostrarAnioCurso", "NoMostrarAnioCurso", "mostrarNombre",
                "NoMostrarNombre", "mostrarApellido", "NoMostrarApellido", "mostrarGrado", "NoMostrarGrado")
        }
    })
})

// FUNCION Buscador / Filtro muticampo
function buscador(valor, pos, HasscampoActual, noHassCampoActual, Hass1, noHassAnio1, Hass2, noHass2, Hass3, noHass3) {
    $("tbody tr").each(function (index) {
        var $valorRegistro = $(this).find("td:eq(" + pos + ")").text()
        if ($valorRegistro.indexOf(valor) != 0) {
            $(this).addClass(noHassCampoActual).removeClass(HasscampoActual)
        } else {
            $(this).addClass(HasscampoActual).removeClass(noHassCampoActual)
        }
        if ($(this).hasClass(HasscampoActual) == true) {

            if ((($(this).hasClass(Hass1) == true)
                || ($(this).hasClass(noHassAnio1) == false))
                &&
                (($(this).hasClass(Hass2) == true)
                    || ($(this).hasClass(noHass2) == false))
                &&
                (($(this).hasClass(Hass3) == true)
                    || ($(this).hasClass(noHass3) == false))) {

                $(this).show()
            }
        } else {
            $(this).hide()
        }
    })
}

// Angular, peticion API
var app = angular.module('myApp', []);
app.controller('loadMatriculasPendientes', function ($scope, $http) {

    /* Declaramos la url de la peticion */
    const uri = "https://proyecto-mdc-api.herokuapp.com/cargarMatriculas"

    /* Declaramos el $scope de la matricula que se visualiza al darle
    al boton de "Ver registro" */
    $scope.matriculaVer = [];

    /* Declaramos el $scope para las pendientes */
    $scope.matriculasPendientes = [];

    /* Hacemos la peticion de todas las matriculas con el estado
    Pendientes y la guardamos en el $scope de Pendientes */
    $http.post(uri, {
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

        var txt;
        var r = confirm("¿Desea borrar la matricula?");
        if (r == true) {
            /* Hacemos la peticion de todas las matriculas con el estado
            Pendientes y la guardamos en el $scope de Pendientes */
            $http.delete(uri)
                .then(function (response) {
                    console.log(response.data)
                }).catch(function (response) {
                    console.error('Error', response.status, response.data);
                })

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
});