// Cuando se cargue la ventana/pagina completamente
if (localStorage.getItem("abreteSesamo") == null || localStorage.getItem("abreteSesamo") == undefined) {
    window.location.href = "./login.html"
}

$(window).on("load", function () {

    // Por defecto, Erroneas activado en el menu
    $("a.aAumentado:contains('Err')").addClass("activo").css({ "pointer-events": "none" })

    // Ocultamos el div de la tabla por defecto, 
    // hasta que se de el caso de que busque o consulte datos

    // Evento Hover Erroneas/Erroneas h2 (titulo)
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
app.controller('loadMatriculasErroneas', function ($scope, $localStorage, $http) {

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

    /* Declaramos el $scope para las Erroneas */
    $scope.matriculasErroneas = [];

    /* Carga de las matriculas con estado Erronea */
    $http.post(uriCargar, {
        estado: "erronea"
    }).then(function (response) {
        var matriculas;
        matriculas = response.data.matriculas
        $scope.matriculasErroneas = matriculas

        /* Recorremos las tablas almacenadas para asignar en que nivel de visualizacion se
        encuentran */
        angular.forEach($scope.matriculasErroneas, function (value, key) {

            /* Asignamos niveles */

            /* Si no existe un campo idUsuarioAsignado o tiene de valor ""
            es una matricula nueva */
            if (value.idUsuarioAsignado == ""
                || value.idUsuarioAsignado == "x"
                || value.idUsuarioAsignado == undefined) {
                $scope.matriculasErroneas[key]['asignada'] = 'nueva'

                /* Si el valor es igual al id del usuario logeado es una matricula
                que tiene asignada */
            } else if (value.idUsuarioAsignado == $scope.idUsuarioSesion) {
                $scope.matriculasErroneas[key]['asignada'] = 'propia'

                /* Entonces lo unico que queda darle el nivel de que esta asignada
                a otro usuario del sistema diferente */
            } else {
                $scope.matriculasErroneas[key]['asignada'] = 'yaAsignada'
            }

        });

        /* Matriculas */
        console.log($scope.matriculasErroneas);

    }).catch(function (response) {
        console.error('Error', response.status, response.data);
    })

    /* Funcion de borrar registro */
    $scope.deleteRegistro = function (index, idMatricula) {
        const uri = "https://proyecto-mdc-api.herokuapp.com/deleteMatricula/" + idMatricula

        var r = confirm("¿Desea borrar la matricula?");

        if (r == true) {
            /* Hacemos la peticion de todas las matriculas con el estado
            Erroneas y la guardamos en el $scope de Erroneas */
            /* $http.delete(uri)
                .then(function (response) {
                    console.log(response.data)
                }).catch(function (response) {
                    console.error('Error', response.status, response.data);
                }) */

            /* Borramos el registro del $scope local */
            $scope.matriculasErroneas.splice(index, 1)
        }
    }

    /* Funcion para asignar la matricula seleccionada al usuario logeado */
    $scope.asignarMatricula = function (index) {
        var r = confirm("¿Desea asignarse la matricula?");
        if (r == true) {
            var idUsuarioLogeado = localStorage.getItem("abreteSesamo")
            console.log($scope.matriculasErroneas[index]._id);
            const uriAsignarMatricula = "https://proyecto-mdc-api.herokuapp.com/asignarMatricula/" + $scope.matriculasErroneas[index]._id
            $http.put(uriAsignarMatricula, {
                idUsuarioAsignado: idUsuarioLogeado
            }).then(function (response) {
                console.log(response.data);
            }).catch(function (response) {
                console.log('Error', response.status, response.data);
            })

            /* Vaciamos $scope de las matriculas */
            $scope.matriculasErroneas = [];

            setTimeout(function () {
                $http.post(uriCargar, {
                    estado: "erronea"
                }).then(function (response) {
                    var matriculas;
                    matriculas = response.data.matriculas
                    $scope.matriculasErroneas = matriculas

                    /* Recorremos las tablas almacenadas para asignar en que nivel de visualizacion se
                    encuentran */
                    angular.forEach($scope.matriculasErroneas, function (value, key) {

                        /* Asignamos niveles */

                        /* Si no existe un campo idUsuarioAsignado o tiene de valor ""
                        es una matricula nueva */
                        if (value.idUsuarioAsignado == ""
                            || value.idUsuarioAsignado == "x"
                            || value.idUsuarioAsignado == undefined) {
                            $scope.matriculasErroneas[key]['asignada'] = 'nueva'

                            /* Si el valor es igual al id del usuario logeado es una matricula
                            que tiene asignada */
                        } else if (value.idUsuarioAsignado == $scope.idUsuarioSesion) {
                            $scope.matriculasErroneas[key]['asignada'] = 'propia'

                            /* Entonces lo unico que queda darle el nivel de que esta asignada
                            a otro usuario del sistema diferente */
                        } else {
                            $scope.matriculasErroneas[key]['asignada'] = 'yaAsignada'
                        }

                    });

                    /* Matriculas */
                    console.log($scope.matriculasErroneas);

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

            const uriDesasignarMatricula = "https://proyecto-mdc-api.herokuapp.com/asignarMatricula/" + $scope.matriculasErroneas[index]._id
            $http.put(uriDesasignarMatricula, {
                idUsuarioAsignado: "x"
            }).then(function (response) {
                console.log(response.data);
            }).catch(function (response) {
                console.log('Error', response.status, response.data);
            })

            /* Vaciamos $scope de las matriculas */
            $scope.matriculasErroneas = [];

            setTimeout(function () {
                $http.post(uriCargar, {
                    estado: "erronea"
                }).then(function (response) {
                    var matriculas;
                    matriculas = response.data.matriculas
                    $scope.matriculasErroneas = matriculas

                    /* Recorremos las tablas almacenadas para asignar en que nivel de visualizacion se
                    encuentran */
                    angular.forEach($scope.matriculasErroneas, function (value, key) {

                        /* Asigamos niveles */

                        /* Si no existe un campo idUsuarioAsignado o tiene de valor ""
                        es una matricula nueva */
                        if (value.idUsuarioAsignado == ""
                            || value.idUsuarioAsignado == "x"
                            || value.idUsuarioAsignado == undefined) {
                            $scope.matriculasErroneas[key]['asignada'] = 'nueva'

                            /* Si el valor es igual al id del usuario logeado es una matricula
                            que tiene asignada */
                        } else if (value.idUsuarioAsignado == $scope.idUsuarioSesion) {
                            $scope.matriculasErroneas[key]['asignada'] = 'propia'

                            /* Entonces lo unico que queda darle el nivel de que esta asignada
                            a otro usuario del sistema diferente */
                        } else {
                            $scope.matriculasErroneas[key]['asignada'] = 'yaAsignada'
                        }

                    });

                    /* Matriculas */
                    console.log($scope.matriculasErroneas);

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
            $scope.matriculasErroneas = [];

            setTimeout(function () {
                $http.post(uriCargar, {
                    estado: "erronea"
                }).then(function (response) {
                    var matriculas;
                    matriculas = response.data.matriculas
                    $scope.matriculasErroneas = matriculas

                    /* Recorremos las tablas almacenadas para asignar en que nivel de visualizacion se
                    encuentran */
                    angular.forEach($scope.matriculasErroneas, function (value, key) {

                        /* Asigamos niveles */

                        /* Si no existe un campo idUsuarioAsignado o tiene de valor ""
                        es una matricula nueva */
                        if (value.idUsuarioAsignado == ""
                            || value.idUsuarioAsignado == "x"
                            || value.idUsuarioAsignado == undefined) {
                            $scope.matriculasErroneas[key]['asignada'] = 'nueva'

                            /* Si el valor es igual al id del usuario logeado es una matricula
                            que tiene asignada */
                        } else if (value.idUsuarioAsignado == $scope.idUsuarioSesion) {
                            $scope.matriculasErroneas[key]['asignada'] = 'propia'

                            /* Entonces lo unico que queda darle el nivel de que esta asignada
                            a otro usuario del sistema diferente */
                        } else {
                            $scope.matriculasErroneas[key]['asignada'] = 'yaAsignada'
                        }

                    });

                    /* Matriculas */
                    console.log($scope.matriculasErroneas);

                    $(".divTablaErroneas").show()
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
        $(".divTablaErroneas").hide()
        $("#divMatriculaVer").show()

        /* TAREA Comprobar que el registro es el asignado */

        if ($scope.matriculasErroneas[index].asignada == "nueva"
            || $scope.matriculasErroneas[index].asignada == "yaAsignada") {
            console.log($scope.matriculasErroneas[index].asignada);
            $scope.esEditable = true
        } else {
            console.log($scope.matriculasErroneas[index].asignada);
            $scope.esEditable = false
        }

        $scope.idMatriculaSeleccionada = $scope.matriculasErroneas[index]._id
        $scope.verValueNombre = $scope.matriculasErroneas[index].nombre_completo.nombre
        $scope.verValuePrimerApellido = $scope.matriculasErroneas[index].nombre_completo.primer_apellido
        $scope.verValueSegundoApellido = $scope.matriculasErroneas[index].nombre_completo.segundo_apellido

        var dia = $scope.matriculasErroneas[index].fecha_nacimiento.dia
        var mes = $scope.matriculasErroneas[index].fecha_nacimiento.mes
        var anio = $scope.matriculasErroneas[index].fecha_nacimiento.anio
        var fechaNacimiento = dia + "/" + mes + "/" + anio
        /* $scope.verValueFechaNacimiento = fechaNacimiento */

        $scope.verValueTipoDocumentacion = $scope.matriculasErroneas[index].dni.tipo_documentacion
        $scope.verValueNumeroDocumentacion = $scope.matriculasErroneas[index].dni.numero

        $scope.verValueNacionalidad = $scope.matriculasErroneas[index].nacionalidad
        $scope.verValueProvincia = $scope.matriculasErroneas[index].provincia
        $scope.verValueLocalidad = $scope.matriculasErroneas[index].localidad.nombre
        var codigoPostal = $scope.matriculasErroneas[index].localidad.codigo_postal
        $scope.verValueCodigoPostal = codigoPostal
        $scope.verValueCalleDomicilio = $scope.matriculasErroneas[index].domicilio.calle
        $scope.verValueNumeroDomicilio = $scope.matriculasErroneas[index].domicilio.numero

        $scope.verValueTelefono = $scope.matriculasErroneas[index].telefono
        $scope.verValueEmail = $scope.matriculasErroneas[index].email

    }

    $scope.Volver = function () {
        /* Ocultamos la tabla y mostramos la vista de la matricula 
        a ver */
        $(".divTablaErroneas").show()
        $("#divMatriculaVer").hide()
    }

    $scope.Guardar = function () {
        /* Ocultamos la tabla y mostramos la vista de la matricula 
        a ver */
        $(".divTablaErroneas").show()
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