if (localStorage.getItem("abreteSesamo") == null || localStorage.getItem("abreteSesamo") == undefined) {
    window.location.href = "./login.html"
}

const uri = "https://proyecto-mdc-api.herokuapp.com/cargarMatriculas"

$.post(uri, { estado: "pendiente", rows: "6" }, function (res) {
    if (res.matriculas) {
        var json = res.matriculas
        var json = res.matriculas
        var jsonLength = json.length
        $(".tbodyPendientes")
            .append($("<tr><td>"
                + json[0].nombre_completo.nombre + " "
                + json[0].nombre_completo.primer_apellido + " "
                + json[0].nombre_completo.segundo_apellido
                + "</td></tr>"))
        //$(".tbodyPendientes tr td:eq(1)").hide()
    } else {
        console.log(res)
    }

})

// Cuando se cargue la ventana/pagina completamente
$(window).on("load", function () {

    // Peticion POST


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