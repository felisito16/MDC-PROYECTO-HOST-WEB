// Cuando se cargue la ventana/pagina completamente
$(window).on("load", function () {

    // Evento boton pulsado
    let respuesta = true
    let textoUsuario = $("input:eq(0)").text()
    let textoPass = $("input:eq(1)").text()

    $("button:eq(0)").click(function () {
        if (respuesta == true) {
            window.location.href = './inicio.html';
        } 
    })

})