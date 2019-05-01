// Cuando se cargue la ventana/pagina completamente
if (localStorage.getItem("abreteSesamo") == null || localStorage.getItem("abreteSesamo") == undefined) {
    window.location.href = "./login.html"
}

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

    // Buscador Avanzado (NO TOCAR) Funciona 25/04/2019 !!

    // Nombre v2
    $("input:eq(0)").on("keyup", function () {
        var valor = $(this).val()
        $("tbody tr").each(function (index) {
            var $valorRegistro = $(this).find("td:eq(1)").text()
            if ($valorRegistro.indexOf(valor) != 0) {
                $(this).addClass("NoMostrarNombre").removeClass("mostrarNombre")
            } else {
                $(this).addClass("mostrarNombre").removeClass("NoMostrarNombre")
            }
            if ($(this).hasClass("mostrarNombre") == true) {

                if ((($(this).hasClass("mostrarApellido") == true)
                    || ($(this).hasClass("NoMostrarApellido") == false))
                    &&
                    (($(this).hasClass("mostrarGrado") == true)
                        || ($(this).hasClass("NoMostrarGrado") == false))
                    &&
                    (($(this).hasClass("mostrarAnioCurso") == true)
                        || ($(this).hasClass("NoMostrarAnioCurso") == false))) {

                    $(this).show()
                }
            } else {
                $(this).hide()
            }
        })
    })

    // Apellido v2
    $("input:eq(1)").on("keyup", function () {
        var valor = $(this).val()
        $("tbody tr").each(function (index) {
            var $valorRegistro = $(this).find("td:eq(2)").text()
            if ($valorRegistro.indexOf(valor) != 0) {
                $(this).addClass("NoMostrarApellido").removeClass("mostrarApellido")
            } else {
                $(this).addClass("mostrarApellido").removeClass("NoMostrarApellido")
            }
            if ($(this).hasClass("mostrarApellido") == true) {

                if ((($(this).hasClass("mostrarNombre") == true)
                    || ($(this).hasClass("NoMostrarNombre") == false))
                    &&
                    (($(this).hasClass("mostrarGrado") == true)
                        || ($(this).hasClass("NoMostrarGrado") == false))
                    &&
                    (($(this).hasClass("mostrarAnioCurso") == true)
                        || ($(this).hasClass("NoMostrarAnioCurso") == false))) {

                    $(this).show()
                }
            } else {
                $(this).hide()
            }
        })
    })

    // Grado v2
    $("select:eq(0)").on("change", function () {
        var valor = $("select:eq(0) option:selected").val()
        if (valor != "Grado") {
            $("tbody tr").each(function (index) {
                var $valorRegistro = $(this).find("td:eq(3)").text()
                if ($valorRegistro.indexOf(valor) != 0) {
                    $(this).addClass("NoMostrarGrado").removeClass("mostrarGrado")
                } else {
                    $(this).addClass("mostrarGrado").removeClass("NoMostrarGrado")
                }
                if ($(this).hasClass("mostrarGrado") == true) {

                    if ((($(this).hasClass("mostrarNombre") == true)
                        || ($(this).hasClass("NoMostrarNombre") == false))
                        &&
                        (($(this).hasClass("mostrarApellido") == true)
                            || ($(this).hasClass("NoMostrarApellido") == false))
                        &&
                        (($(this).hasClass("mostrarAnioCurso") == true)
                            || ($(this).hasClass("NoMostrarAnioCurso") == false))) {

                        $(this).show()
                    }
                } else {
                    $(this).hide()
                }
            })
        }
    })

    // Año Curso v2
    $("select:eq(1)").on("change", function () {
        var valor = $("select:eq(1) option:selected").val()
        if (valor != "Año Curso") {
            $("tbody tr").each(function (index) {
                var $valorRegistro = $(this).find("td:eq(4)").text()
                if ($valorRegistro.indexOf(valor) != 0) {
                    $(this).addClass("NoMostrarAnioCurso").removeClass("mostrarAnioCurso")
                } else {
                    $(this).addClass("mostrarAnioCurso").removeClass("NoMostrarAnioCurso")
                }
                if ($(this).hasClass("mostrarAnioCurso") == true) {

                    if ((($(this).hasClass("mostrarNombre") == true)
                        || ($(this).hasClass("NoMostrarNombre") == false))
                        &&
                        (($(this).hasClass("mostrarApellido") == true)
                            || ($(this).hasClass("NoMostrarApellido") == false))
                        &&
                        (($(this).hasClass("mostrarGrado") == true)
                            || ($(this).hasClass("NoMostrarGrado") == false))) {

                        $(this).show()
                    }
                } else {
                    $(this).hide()
                }
            })
        }
    })

})