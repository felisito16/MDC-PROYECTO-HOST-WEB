// Cuando se cargue la ventana/pagina completamente
$(window).on("load", function () {

    // Funcionalidad con la API

    (localStorage.getItem("tk") != null || localStorage.getItem("tk") != undefined) ? location.href = "login.html" : ""

    $("button:eq(0)").click(function () {
        var textoUsuario = $("input:eq(0)").val();
        var textoPass = $("input:eq(1)").val()

        if (textoUsuario != "" && textoPass != "") {

            var uri = "https://proyecto-mdc-api.herokuapp.com/validarUsuario/" + textoUsuario + "/" + textoPass
            console.log("URI: " + uri)
            $.get(uri, function (res) {
            }).done(function (res) {
                if (res.user == textoUsuario) {
                    console.log("USER: " + res.user)
                    console.log("PASS: " + res.pass)
                    localStorage.setItem("tk", textoUsuario);
                    location.href = "inicio.html";
                } else {
                    alert("Introduce un usuario y contraseña validos");
                }
            })

        } else {
            alert("Inserte todos los campos");
        }
        return false;
    });


});