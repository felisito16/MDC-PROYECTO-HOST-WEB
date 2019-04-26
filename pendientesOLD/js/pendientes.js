// Cuando se cargue la ventana/pagina completamente

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
    $("button:eq(0)").click(function() {
        
    })

    // Evento Boton de Buscar todo
    $("button:eq(1)").click(function() {
        $(".divContenedorPendientes").show()
    })
    
    // Evento Boton Limpiar
    $("button:eq(2)").click(function() {
        $("input").val("")
        $("select:eq(0)").val("Grado")
        $("select:eq(1)").val("Año curso")
        $("tbody tr").each(function () {
            $(this).show()
        $("tbody tr.registroPinchado").removeClass("registroPinchado")
        })
    })

    // NOMBRE
    $("input:eq(0)").on("keyup", function () {
        var value = $(this).val()
        $("tbody tr").each(function (index) {
            var $valorRegistro = $(this).find("td:eq(1)").text()
            if ($valorRegistro.indexOf(value) != 0) {
                $(this).hide()
            }
            else {
                $(this).show()
            }
        })
    });

    // APELLIDO
    $("input:eq(1)").on("keyup", function () {
        var value = $(this).val();
        $("tbody tr").each(function (index) {
            var $valorRegistro = $(this).find("td:eq(2)").text()
            if ($valorRegistro.indexOf(value) != 0) {
                $(this).hide();
            }
            else {
                $(this).show();
            }
        })
    });

    // GRADO
    $("select:eq(0)").on("change", function () {
        var value = $(this).val()
        $("tbody tr").each(function (index) {
            var $valorRegistro = $(this).find("td:eq(3)").text()
            if ($valorRegistro.indexOf(value) != 0) {
                $(this).hide();
            }
            else {
                $(this).show();
            }
        })
    });

    // ANIO / CURSO
    $("select:eq(1)").on("change", function () {
        var value = $(this).val()
        $("tbody tr").each(function (index) {
            var $valorRegistro = $(this).find("td:eq(4)").text()
            if ($valorRegistro.indexOf(value) != 0) {
                $(this).hide();
            }
            else {
                $(this).show();
            }
        })
    });

})