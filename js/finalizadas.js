// Cuando se cargue la ventana/pagina completamente
if (localStorage.getItem("abreteSesamo") == null || localStorage.getItem("abreteSesamo") == undefined) {
    window.location.href = "./login.html"
}

// Datepicker de Fecha de Nacimiento 
$('#fechaNacimiento').datepicker({
    locale: 'es-es',
    uiLibrary: 'bootstrap4',
    format: 'dd/mm/yyyy'
});

$(window).on("load", function () {

    // Por defecto, Finalizadas activado en el menu
    $("a.aAumentado:contains('Finalizadas')").addClass("activo").css({ "pointer-events": "none" })

    // Ocultamos el div de la tabla por defecto, 
    // hasta que se de el caso de que busque o consulte datos

    // Evento Hover Finalizadas/Erroneas h2 (titulo)
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
app.controller('loadMatriculasFinalizadas', function ($scope, $localStorage, $http) {

    /* Declaramos la url de la peticion de cargas de Matriculas */
    const uriCargar = "https://proyecto-mdc-api.herokuapp.com/cargarMatriculas"

    /* Guardamos el id del usuario logeado */
    $scope.idUsuarioSesion = localStorage.getItem('abreteSesamo')

    /* Creamos la variable de la matricula seleccionada para editar */
    $scope.idMatriculaSeleccionada;

    /* Declaramos la variable que dara poder para ver o editar */
    $scope.esEditable = true;

    /* Declaramos el $scope de la matricula que se visualiza al darle
    al boton de "Ver registro" */
    $scope.matriculaVer = [];

    /* Declaramos el $scope para las Finalizadas */
    $scope.matriculasFinalizadas = [];

    /* Carga de las matriculas con estado finalizada */
    $http.post(uriCargar, {
        estado: "finalizada"
    }).then(function (response) {
        var matriculas;
        matriculas = response.data.matriculas
        $scope.matriculasFinalizadas = matriculas

        /* Recorremos las tablas almacenadas para asignar en que nivel de visualizacion se
        encuentran */
        angular.forEach($scope.matriculasFinalizadas, function (value, key) {

            /* Asignamos niveles */

            /* Si no existe un campo idUsuarioAsignado o tiene de valor ""
            es una matricula nueva */
            if (value.idUsuarioAsignado == ""
                || value.idUsuarioAsignado == "x"
                || value.idUsuarioAsignado == undefined) {
                $scope.matriculasFinalizadas[key]['asignada'] = 'nueva'

                /* Si el valor es igual al id del usuario logeado es una matricula
                que tiene asignada */
            } else if (value.idUsuarioAsignado == $scope.idUsuarioSesion) {
                $scope.matriculasFinalizadas[key]['asignada'] = 'propia'

                /* Entonces lo unico que queda darle el nivel de que esta asignada
                a otro usuario del sistema diferente */
            } else {
                $scope.matriculasFinalizadas[key]['asignada'] = 'yaAsignada'
            }

        });

        /* Matriculas */
        console.log($scope.matriculasFinalizadas);

    }).catch(function (response) {
        console.error('Error', response.status, response.data);
    })

    /* Funcion de borrar registro */
    $scope.deleteRegistro = function (index, idMatricula) {
        const uri = "https://proyecto-mdc-api.herokuapp.com/deleteMatricula/" + idMatricula

        var r = confirm("¿Desea borrar la matricula?");

        if (r == true) {
            /* Hacemos la peticion de todas las matriculas con el estado
            Finalizadas y la guardamos en el $scope de Finalizadas */
            $http.delete(uri)
                .then(function (response) {
                    console.log(response.data)
                }).catch(function (response) {
                    console.error('Error', response.status, response.data);
                })

            /* Borramos el registro del $scope local */
            $scope.matriculasFinalizadas.splice(index, 1)
        }
    }

    /* Funcion para asignar la matricula seleccionada al usuario logeado */
    $scope.asignarMatricula = function (index) {
        var r = confirm("¿Desea asignarse la matricula?");
        if (r == true) {
            var idUsuarioLogeado = localStorage.getItem("abreteSesamo")
            console.log($scope.matriculasFinalizadas[index]._id);
            const uriAsignarMatricula = "https://proyecto-mdc-api.herokuapp.com/asignarMatricula/" + $scope.matriculasFinalizadas[index]._id
            $http.put(uriAsignarMatricula, {
                idUsuarioAsignado: idUsuarioLogeado
            }).then(function (response) {
                console.log(response.data);
            }).catch(function (response) {
                console.log('Error', response.status, response.data);
            })

            /* Vaciamos $scope de las matriculas */
            $scope.matriculasFinalizadas = [];

            setTimeout(function () {
                $http.post(uriCargar, {
                    estado: "finalizada"
                }).then(function (response) {
                    var matriculas;
                    matriculas = response.data.matriculas
                    $scope.matriculasFinalizadas = matriculas

                    /* Recorremos las tablas almacenadas para asignar en que nivel de visualizacion se
                    encuentran */
                    angular.forEach($scope.matriculasFinalizadas, function (value, key) {

                        /* Asignamos niveles */

                        /* Si no existe un campo idUsuarioAsignado o tiene de valor ""
                        es una matricula nueva */
                        if (value.idUsuarioAsignado == ""
                            || value.idUsuarioAsignado == "x"
                            || value.idUsuarioAsignado == undefined) {
                            $scope.matriculasFinalizadas[key]['asignada'] = 'nueva'

                            /* Si el valor es igual al id del usuario logeado es una matricula
                            que tiene asignada */
                        } else if (value.idUsuarioAsignado == $scope.idUsuarioSesion) {
                            $scope.matriculasFinalizadas[key]['asignada'] = 'propia'

                            /* Entonces lo unico que queda darle el nivel de que esta asignada
                            a otro usuario del sistema diferente */
                        } else {
                            $scope.matriculasFinalizadas[key]['asignada'] = 'yaAsignada'
                        }

                    });

                    /* Matriculas */
                    console.log($scope.matriculasFinalizadas);

                }).catch(function (response) {
                    console.error('Error', response.status, response.data);
                })
            }, 500)
        }
    }

    /* Funcion para desasignar una matricula del usuario logeado */
    $scope.desasignarMatricula = function (index) {
        var r = confirm("¿Desea desasignarse la matricula?");
        if (r == true) {

            const uriDesasignarMatricula = "https://proyecto-mdc-api.herokuapp.com/asignarMatricula/" + $scope.matriculasFinalizadas[index]._id
            $http.put(uriDesasignarMatricula, {
                idUsuarioAsignado: "x"
            }).then(function (response) {
                console.log(response.data);
            }).catch(function (response) {
                console.log('Error', response.status, response.data);
            })

            /* Vaciamos $scope de las matriculas */
            $scope.matriculasFinalizadas = [];

            setTimeout(function () {
                $http.post(uriCargar, {
                    estado: "finalizada"
                }).then(function (response) {
                    var matriculas;
                    matriculas = response.data.matriculas
                    $scope.matriculasFinalizadas = matriculas

                    /* Recorremos las tablas almacenadas para asignar en que nivel de visualizacion se
                    encuentran */
                    angular.forEach($scope.matriculasFinalizadas, function (value, key) {

                        /* Asigamos niveles */

                        /* Si no existe un campo idUsuarioAsignado o tiene de valor ""
                        es una matricula nueva */
                        if (value.idUsuarioAsignado == ""
                            || value.idUsuarioAsignado == "x"
                            || value.idUsuarioAsignado == undefined) {
                            $scope.matriculasFinalizadas[key]['asignada'] = 'nueva'

                            /* Si el valor es igual al id del usuario logeado es una matricula
                            que tiene asignada */
                        } else if (value.idUsuarioAsignado == $scope.idUsuarioSesion) {
                            $scope.matriculasFinalizadas[key]['asignada'] = 'propia'

                            /* Entonces lo unico que queda darle el nivel de que esta asignada
                            a otro usuario del sistema diferente */
                        } else {
                            $scope.matriculasFinalizadas[key]['asignada'] = 'yaAsignada'
                        }

                    });

                    /* Matriculas */
                    console.log($scope.matriculasFinalizadas);

                }).catch(function (response) {
                    console.error('Error', response.status, response.data);
                })
            }, 500)
        }
    }

    /* Funcion para cuando guardamos una matricula al darle a Editar */
    $scope.actualizarMatricula = function (index) {
        var r = confirm("¿Desea actualizar la matricula?");
        if (r == true) {

            const uriDesasignarMatricula = "https://proyecto-mdc-api.herokuapp.com/asignarMatricula/" + $scope.idMatriculaSeleccionada
            var estadoNuevoMatricula = $("#selectMatriculaEstado option:selected").val()

            /* Fecha de nacimiento nueva, guardamos los valores y hacemos split */
            var fechaNacimientoNueva = $("#fechaNacimiento").val()
            var dia = fechaNacimientoNueva.split("/")[0]
            var mes = fechaNacimientoNueva.split("/")[1]
            var anio = fechaNacimientoNueva.split("/")[2]

            $http.put(uriDesasignarMatricula, {

                nombre_completo: {
                    nombre: $scope.verValueNombre,
                    primer_apellido: $scope.verValuePrimerApellido,
                    segundo_apellido: $scope.verValueSegundoApellido
                },

                dni: {
                    numero: $scope.verValueNumeroDocumentacion,
                    tipo_documentacion: $scope.verValueTipoDocumentacion
                },

                fecha_nacimiento: {
                    dia: dia,
                    mes: mes,
                    anio: anio
                },

                nacionalidad: $scope.verValueNacionalidad,
                provincia: $scope.verValueProvincia,

                localidad: {
                    codigo_postal: $scope.verValueCodigoPostal,
                    nombre: $scope.verValueLocalidad
                },

                domicilio: {
                    calle: $scope.verValueCalleDomicilio,
                    numero: $scope.verValueNumeroDomicilio
                },

                telefono: $scope.verValueTelefono,
                email: $scope.verValueEmail,

                estado_matricula: estadoNuevoMatricula

            }).then(function (response) {
                console.log(response.data);
            }).catch(function (response) {
                console.log('Error', response.status, response.data);
            })

            /* Vaciamos $scope de las matriculas */
            $scope.matriculasFinalizadas = [];

            setTimeout(function () {
                $http.post(uriCargar, {
                    estado: "finalizada"
                }).then(function (response) {
                    var matriculas;
                    matriculas = response.data.matriculas
                    $scope.matriculasFinalizadas = matriculas

                    /* Recorremos las tablas almacenadas para asignar en que nivel de visualizacion se
                    encuentran */
                    angular.forEach($scope.matriculasFinalizadas, function (value, key) {

                        /* Asigamos niveles */

                        /* Si no existe un campo idUsuarioAsignado o tiene de valor ""
                        es una matricula nueva */
                        if (value.idUsuarioAsignado == ""
                            || value.idUsuarioAsignado == "x"
                            || value.idUsuarioAsignado == undefined) {
                            $scope.matriculasFinalizadas[key]['asignada'] = 'nueva'

                            /* Si el valor es igual al id del usuario logeado es una matricula
                            que tiene asignada */
                        } else if (value.idUsuarioAsignado == $scope.idUsuarioSesion) {
                            $scope.matriculasFinalizadas[key]['asignada'] = 'propia'

                            /* Entonces lo unico que queda darle el nivel de que esta asignada
                            a otro usuario del sistema diferente */
                        } else {
                            $scope.matriculasFinalizadas[key]['asignada'] = 'yaAsignada'
                        }

                    });

                    /* Matriculas */
                    console.log($scope.matriculasFinalizadas);

                    $(".divTablaFinalizadas").show()
                    $("#divMatriculaVer").hide()

                }).catch(function (response) {
                    console.error('Error', response.status, response.data);
                })
            }, 500)
        }
    }


    /* Funcion que asigna los valores a los input al darle al boton ver
    / editar */
    $scope.verMatricula = function (index) {

        /* Ocultamos la tabla y mostramos la vista de la matricula 
        a ver */
        $(".divTablaFinalizadas").hide()
        $("#divMatriculaVer").show()

        /* TAREA Comprobar que el registro es el asignado */

        if ($scope.matriculasFinalizadas[index].asignada == "nueva"
            || $scope.matriculasFinalizadas[index].asignada == "yaAsignada") {
            console.log($scope.matriculasFinalizadas[index].asignada);
            $scope.esEditable = true
        } else {
            console.log($scope.matriculasFinalizadas[index].asignada);
            $scope.esEditable = false
        }

        $scope.idMatriculaSeleccionada = $scope.matriculasFinalizadas[index]._id
        $scope.verValueNombre = $scope.matriculasFinalizadas[index].nombre_completo.nombre
        $scope.verValuePrimerApellido = $scope.matriculasFinalizadas[index].nombre_completo.primer_apellido
        $scope.verValueSegundoApellido = $scope.matriculasFinalizadas[index].nombre_completo.segundo_apellido

        var dia = $scope.matriculasFinalizadas[index].fecha_nacimiento.dia
        var mes = $scope.matriculasFinalizadas[index].fecha_nacimiento.mes
        var anio = $scope.matriculasFinalizadas[index].fecha_nacimiento.anio
        var fechaNacimiento = dia + "/" + mes + "/" + anio
        $scope.verValueFechaNacimiento = fechaNacimiento

        $scope.verValueTipoDocumentacion = $scope.matriculasFinalizadas[index].dni.tipo_documentacion
        $scope.verValueNumeroDocumentacion = $scope.matriculasFinalizadas[index].dni.numero

        $scope.verValueNacionalidad = $scope.matriculasFinalizadas[index].nacionalidad
        $scope.verValueProvincia = $scope.matriculasFinalizadas[index].provincia
        $scope.verValueLocalidad = $scope.matriculasFinalizadas[index].localidad.nombre
        var codigoPostal = $scope.matriculasFinalizadas[index].localidad.codigo_postal
        $scope.verValueCodigoPostal = codigoPostal
        $scope.verValueCalleDomicilio = $scope.matriculasFinalizadas[index].domicilio.calle
        $scope.verValueNumeroDomicilio = $scope.matriculasFinalizadas[index].domicilio.numero

        $scope.verValueTelefono = $scope.matriculasFinalizadas[index].telefono
        $scope.verValueEmail = $scope.matriculasFinalizadas[index].email

    }

    $scope.Volver = function () {
        /* Ocultamos la tabla y mostramos la vista de la matricula 
        a ver */
        $(".divTablaFinalizadas").show()
        $("#divMatriculaVer").hide()
    }

    $scope.Guardar = function () {
        /* Ocultamos la tabla y mostramos la vista de la matricula 
        a ver */
        $(".divTablaFinalizadas").show()
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