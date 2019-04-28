// Cuando se cargue la ventana/pagina completamente
$(window).on("load", function () {

    // CSS

    // Por defecto, Inicio activado en el menu
    $("a.aAumentado:contains('Inicio')").addClass("activo").css({ "pointer-events": "none" })

    // Esconder/Mostrar tablas
    /* var h2Pendientes = false
    var h2Erroneas = false

    $("h2.h2Registro").click(function () {
        var h2Texto = $(this).text()
        var divSelec = 'divTabla' + h2Texto
        if (h2Texto == "Pendientes") {
            if (h2Pendientes == true) {
                $('.' + divSelec).removeClass("hide").show()
                h2Pendientes = false
            } else {
                $('.' + divSelec).addClass("hide").hide()
                h2Pendientes = true
            }
        } else if (h2Texto == "Erróneas") {
            if (h2Erroneas == true) {
                $('.divTablaErroneas').removeClass("hide").show()
                h2Erroneas = false
            } else {
                $('.divTablaErroneas').addClass("hide").hide()
                h2Erroneas = true
            }
        }
    }) */

    // Evento Hover Pendientes/Erroneas h2 (titulo)
    $("h2.h2Registro").hover(function () {
        $(this).css({ "background": "#212529", "color": "white" })
    }, function () {
        $(this).css({ "background": "none", "color": "black" })
    })

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

    

})