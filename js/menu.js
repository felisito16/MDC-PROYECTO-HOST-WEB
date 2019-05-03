// Cuando se cargue la ventana/pagina completamente
$(window).on("load", function () {

    $("nav a:contains('Inicio')").click(() => { go('./inicio.html') })
    $("nav a:contains('Pendientes')").click(() => { go('./pendientes.html') })
    $("nav a:contains('Erróneas')").click(() => { go('./erroneas.html') })
    $("nav a:contains('Trámite')").click(() => { go('./tramite.html') })
    $("nav a:contains('Ayuda')").click(() => { go('./ayuda.html') })
    $("nav a:contains('Cerrar')").click(() => {
        localStorage.removeItem("abreteSesamo")
        go('./login.html')
    })

    // INICIO EVENTO MENU

    // Evento de clic para cambiar el menu activo
    $("a.aAumentado").click(function () {
        $("a.aAumentado").not("activo").removeClass("activo").css({ "pointer-events": "auto" })
        $(this).addClass("activo").css({ "pointer-events": "none" })
    });

    // Evento de hover, si esta activo solo pondra el color blanco
    $("a.aAumentado").css("color", "white").hover(function () {
        !($(this).hasClass("activo"))
            ? $(this).addClass("aAumentadohover").css("color", "black")
            : $(this).css("color", "white")
    }, function () {
        $(this).removeClass("aAumentadohover").css("color", "white");
    });

    // FIN EVENTO MENU

})

// Funciones
var go = function (e) { window.location.href = e }