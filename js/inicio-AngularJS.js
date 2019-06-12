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

// Angular, peticion API
var app = angular.module('myApp', ['ngStorage']);
app.controller('loadMatriculasAsignadas', function ($scope, $localStorage, $http) {

    /* Declaramos la url de la peticion de cargas de Matriculas */
    const uriCargarAsignadas = "https://proyecto-mdc-api.herokuapp.com/cargarMatriculasAsignadas/" + localStorage.getItem("abreteSesamo")

    /* Guardamos el id del usuario logeado */
    $scope.idUsuarioSesion = localStorage.getItem('abreteSesamo')

    /* Creamos la variable de la matricula seleccionada para editar */
    $scope.idMatriculaSeleccionada;

    /* Declaramos la variable que dara poder para ver o editar */
    $scope.esEditable = true;

    /* Declaramos el $scope de la matricula que se visualiza al darle
    al boton de "Ver registro" */
    $scope.matriculaVer = [];

    /* Declaramos el $scope para las pendientes */
    $scope.matriculasAsignadas = [];

    /* Carga de las matriculas con estado pendiente */
    $http.post(uriCargarAsignadas, {
        rows: 5
    }).then(function (response) {
        var matriculas;
        matriculas = response.data.matriculas
        $scope.matriculasAsignadas = matriculas

        /* Recorremos las tablas almacenadas para asignar en que nivel de visualizacion se
        encuentran */
        angular.forEach($scope.matriculasAsignadas, function (value, key) {

            /* Asignamos niveles */

            /* Si no existe un campo idUsuarioAsignado o tiene de valor ""
            es una matricula nueva */
            if (value.idUsuarioAsignado == ""
                || value.idUsuarioAsignado == "x"
                || value.idUsuarioAsignado == undefined) {
                $scope.matriculasAsignadas[key]['asignada'] = 'nueva'

                /* Si el valor es igual al id del usuario logeado es una matricula
                que tiene asignada */
            } else if (value.idUsuarioAsignado == $scope.idUsuarioSesion) {
                $scope.matriculasAsignadas[key]['asignada'] = 'propia'

                /* Entonces lo unico que queda darle el nivel de que esta asignada
                a otro usuario del sistema diferente */
            } else {
                $scope.matriculasAsignadas[key]['asignada'] = 'yaAsignada'
            }

        });

        /* Matriculas */
        console.log($scope.matriculasAsignadas);

    }).catch(function (response) {
        console.error('Error', response.status, response.data);
    })


    /* Funcion de borrar registro */
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
            $scope.matriculasAsignadas.splice(index, 1)
        }
    }

    /* Funcion para asignar la matricula seleccionada al usuario logeado */
    $scope.asignarMatricula = function (index) {
        var r = confirm("¿Desea asignarse la matricula?");
        if (r == true) {
            var idUsuarioLogeado = localStorage.getItem("abreteSesamo")
            console.log($scope.matriculasAsignadas[index]._id);
            const uriAsignarMatricula = "https://proyecto-mdc-api.herokuapp.com/asignarMatricula/" + $scope.matriculasAsignadas[index]._id
            $http.put(uriAsignarMatricula, {
                idUsuarioAsignado: idUsuarioLogeado
            }).then(function (response) {
                console.log(response.data);
            }).catch(function (response) {
                console.log('Error', response.status, response.data);
            })

            /* Vaciamos $scope de las matriculas */
            $scope.matriculasAsignadas = [];

            setTimeout(function () {
                $http.post(uriCargarAsignadas, {
                    rows: 5
                }).then(function (response) {
                    var matriculas;
                    matriculas = response.data.matriculas
                    $scope.matriculasAsignadas = matriculas

                    /* Recorremos las tablas almacenadas para asignar en que nivel de visualizacion se
                    encuentran */
                    angular.forEach($scope.matriculasAsignadas, function (value, key) {

                        /* Asignamos niveles */

                        /* Si no existe un campo idUsuarioAsignado o tiene de valor ""
                        es una matricula nueva */
                        if (value.idUsuarioAsignado == ""
                            || value.idUsuarioAsignado == "x"
                            || value.idUsuarioAsignado == undefined) {
                            $scope.matriculasAsignadas[key]['asignada'] = 'nueva'

                            /* Si el valor es igual al id del usuario logeado es una matricula
                            que tiene asignada */
                        } else if (value.idUsuarioAsignado == $scope.idUsuarioSesion) {
                            $scope.matriculasAsignadas[key]['asignada'] = 'propia'

                            /* Entonces lo unico que queda darle el nivel de que esta asignada
                            a otro usuario del sistema diferente */
                        } else {
                            $scope.matriculasAsignadas[key]['asignada'] = 'yaAsignada'
                        }

                    });

                    /* Matriculas */
                    console.log($scope.matriculasAsignadas);

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

            const uriDesasignarMatricula = "https://proyecto-mdc-api.herokuapp.com/asignarMatricula/" + $scope.matriculasAsignadas[index]._id
            $http.put(uriDesasignarMatricula, {
                idUsuarioAsignado: "x"
            }).then(function (response) {
                console.log(response.data);
            }).catch(function (response) {
                console.log('Error', response.status, response.data);
            })

            /* Vaciamos $scope de las matriculas */
            $scope.matriculasAsignadas = [];

            setTimeout(function () {
                $http.post(uriCargarAsignadas, {
                    rows: 5
                }).then(function (response) {
                    var matriculas;
                    matriculas = response.data.matriculas
                    $scope.matriculasAsignadas = matriculas

                    /* Recorremos las tablas almacenadas para asignar en que nivel de visualizacion se
                    encuentran */
                    angular.forEach($scope.matriculasAsignadas, function (value, key) {

                        /* Asignamos niveles */

                        /* Si no existe un campo idUsuarioAsignado o tiene de valor ""
                        es una matricula nueva */
                        if (value.idUsuarioAsignado == ""
                            || value.idUsuarioAsignado == "x"
                            || value.idUsuarioAsignado == undefined) {
                            $scope.matriculasAsignadas[key]['asignada'] = 'nueva'

                            /* Si el valor es igual al id del usuario logeado es una matricula
                            que tiene asignada */
                        } else if (value.idUsuarioAsignado == $scope.idUsuarioSesion) {
                            $scope.matriculasAsignadas[key]['asignada'] = 'propia'

                            /* Entonces lo unico que queda darle el nivel de que esta asignada
                            a otro usuario del sistema diferente */
                        } else {
                            $scope.matriculasAsignadas[key]['asignada'] = 'yaAsignada'
                        }

                    });

                    /* Matriculas */
                    console.log($scope.matriculasAsignadas);

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
            $scope.matriculasAsignadas = [];

            setTimeout(function () {
                $http.post(uriCargarAsignadas, {
                    rows: 5
                }).then(function (response) {
                    var matriculas;
                    matriculas = response.data.matriculas
                    $scope.matriculasAsignadas = matriculas

                    /* Recorremos las tablas almacenadas para asignar en que nivel de visualizacion se
                    encuentran */
                    angular.forEach($scope.matriculasAsignadas, function (value, key) {

                        /* Asignamos niveles */

                        /* Si no existe un campo idUsuarioAsignado o tiene de valor ""
                        es una matricula nueva */
                        if (value.idUsuarioAsignado == ""
                            || value.idUsuarioAsignado == "x"
                            || value.idUsuarioAsignado == undefined) {
                            $scope.matriculasAsignadas[key]['asignada'] = 'nueva'

                            /* Si el valor es igual al id del usuario logeado es una matricula
                            que tiene asignada */
                        } else if (value.idUsuarioAsignado == $scope.idUsuarioSesion) {
                            $scope.matriculasAsignadas[key]['asignada'] = 'propia'

                            /* Entonces lo unico que queda darle el nivel de que esta asignada
                            a otro usuario del sistema diferente */
                        } else {
                            $scope.matriculasAsignadas[key]['asignada'] = 'yaAsignada'
                        }

                    });

                    /* Matriculas */
                    console.log($scope.matriculasAsignadas);

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
        $(".divTablaAsignadas").hide()
        $("#divMatriculaVer").show()

        /* TAREA Comprobar que el registro es el asignado */

        if ($scope.matriculasAsignadas[index].asignada == "nueva"
            || $scope.matriculasAsignadas[index].asignada == "yaAsignada") {
            console.log($scope.matriculasAsignadas[index].asignada);
            $scope.esEditable = true
        } else {
            console.log($scope.matriculasAsignadas[index].asignada);
            $scope.esEditable = false
        }

        $scope.idMatriculaSeleccionada = $scope.matriculasAsignadas[index]._id
        $scope.verValueNombre = $scope.matriculasAsignadas[index].nombre_completo.nombre
        $scope.verValuePrimerApellido = $scope.matriculasAsignadas[index].nombre_completo.primer_apellido
        $scope.verValueSegundoApellido = $scope.matriculasAsignadas[index].nombre_completo.segundo_apellido

        var dia = $scope.matriculasAsignadas[index].fecha_nacimiento.dia
        var mes = $scope.matriculasAsignadas[index].fecha_nacimiento.mes
        var anio = $scope.matriculasAsignadas[index].fecha_nacimiento.anio
        var fechaNacimiento = dia + "/" + mes + "/" + anio
        /* $scope.verValueFechaNacimiento = fechaNacimiento */

        $scope.verValueTipoDocumentacion = $scope.matriculasAsignadas[index].dni.tipo_documentacion
        $scope.verValueNumeroDocumentacion = $scope.matriculasAsignadas[index].dni.numero

        $scope.verValueNacionalidad = $scope.matriculasAsignadas[index].nacionalidad
        $scope.verValueProvincia = $scope.matriculasAsignadas[index].provincia
        $scope.verValueLocalidad = $scope.matriculasAsignadas[index].localidad.nombre
        var codigoPostal = $scope.matriculasAsignadas[index].localidad.codigo_postal
        $scope.verValueCodigoPostal = codigoPostal
        $scope.verValueCalleDomicilio = $scope.matriculasAsignadas[index].domicilio.calle
        $scope.verValueNumeroDomicilio = $scope.matriculasAsignadas[index].domicilio.numero

        $scope.verValueTelefono = $scope.matriculasAsignadas[index].telefono
        $scope.verValueEmail = $scope.matriculasAsignadas[index].email

    }

    $scope.Volver = function () {
        /* Ocultamos la tabla y mostramos la vista de la matricula 
        a ver */
        $(".divTablaAsignadas").show()
        $("#divMatriculaVer").hide()
    }

    $scope.Guardar = function () {
        /* Ocultamos la tabla y mostramos la vista de la matricula 
        a ver */
        $(".divTablaAsignadas").show()
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