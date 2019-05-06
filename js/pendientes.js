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