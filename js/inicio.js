if (localStorage.getItem("abreteSesamo") == null || localStorage.getItem("abreteSesamo") == undefined) {
    window.location.href = "./login.html"
}

const uri = "https://proyecto-mdc-api.herokuapp.com/cargarMatriculas"

// Cargando matriculas pendientes
$.post(uri, { estado: "pendiente", rows: "6" }, function (res) {
    if (res.matriculas) {

        var json = res.matriculas
        var jsonLength = res.matriculas.length
        MostrarMatriculas("Pendientes", json, jsonLength)
    }
})

// Cargando matriculas erroneas
$.post(uri, { estado: "erronea", rows: "6" }, function (res) {
    
    if (res.matriculas) {
        var json = res.matriculas
        var jsonLength = res.matriculas.length
        MostrarMatriculas("Erroneas", json, jsonLength)
    }
})

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

})

// Funciones

// function MostrarMatriculas(estado, json, jsonLength)
// estado: Pendientes, Erroneas
// json: res.matriculas
// jsonLength: Ancho de res.matriculas (res.matriculas.length)
function MostrarMatriculas(estado, json, jsonLength) {

    var i = 0

    for (i = 0; i < jsonLength; i++) {
        $(".tbody" + estado)
            .append($("<tr><td>"
                + json[i].nombre_completo.nombre + " "
                + json[i].nombre_completo.primer_apellido + " "
                + json[i].nombre_completo.segundo_apellido
                + "</td><td>"
                + json[i].ciclo_formativo.ciclo
                + "</td><td>"
                + json[i].ciclo_formativo.curso
                + "</td></tr>"))
        //$(".tbodyPendientes tr td:eq(1)").hide()
        $(".tbody" + estado + " tr").not(document.getElementsByClassName("registroPinchado")).hover(function () {
            ($(this).hasClass("registroPinchado") == false) ? $(this).addClass("registroHover") : ""
        }, function () {
            $(this).removeClass("registroHover")
        })
        $(".tbody" + estado + " tr").click(function () {
            $(".tbody" + estado + " tr").not(this).removeClass("registroPinchado")
            $(this).removeClass("registroHover").addClass("registroPinchado")
        })
    }
}

