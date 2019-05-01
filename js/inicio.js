if (localStorage.getItem("abreteSesamo") == null || localStorage.getItem("abreteSesamo") == undefined) {
    window.location.href = "./login.html"
}

// Cuando se cargue la ventana/pagina completamente
$(window).on("load", function () {

    // Por defecto, Inicio activado en el menu
    $("a.aAumentado:contains('Inicio')").addClass("activo").css({ "pointer-events": "none" })

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