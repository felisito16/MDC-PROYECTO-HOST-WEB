// Cuando se cargue la ventana/pagina completamente
$(window).on("load", function () {

    $(".divContenedor2").hide()

    // Evento de clic "Continuar"
    $("button:first").click(function (e) {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($("input").val()) == true) {
            $(".divContenedor").hide()
            $(".divContenedor2").show()
        } else {
            inputCambio(e.currentTarget.outerText);
        }
    });

    // Evento de clic "Volver" e "Ir a Login" (al Login)
    $("button").not("button:first").not("button:eq(2)").click(function () {
        window.location.href = '../login/login.html';
    })

    // Evento de clic "Volver" (Alerta)
    $("button:eq(3)").click(function (e) {
        $(".divContenedor2").hide()
        $(".divContenedor").show()
        inputCambio(e.currentTarget.outerText);
    })

    // Funcion - Cambio de input
    const inputCambio = (e) => {
        (e == "Continuar")
            ? $("input").val("").attr("placeholder", "Formato incorrecto")
            : $("input").val("").attr("placeholder", "Escribe aqui tu correo")
    }
})