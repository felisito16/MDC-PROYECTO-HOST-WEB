// Cuando se cargue la ventana/pagina completamente
$(document).ready(function () {

    // Funcionalidad con la API

    (localStorage.getItem("tk") != null || localStorage.getItem("tk") != undefined) ? location.href = "login.html" : ""

    $("button:eq(0)").click(function () {

        var textoUsuario = $("input:eq(0)").val();
        var textoPass = $("input:eq(1)").val()

        if ((textoUsuario != "" || textoUsuario != undefined) && (textoPass != "" || textoPass != undefined)) {
            var uri = "https://proyecto-mdc-api.herokuapp.com/validarUsuario/Felix/123"
            console.log("URI: " + uri)

            $.ajax({
                type: "get",
                url: uri,
                beforeSend: function () {
                    //console.log("Opteniendo usuario.");
                },
                success: function (res) {
                    console.log("USER:" + res.usuario.user)
                    console.log("PASS:" + res.usuario.pass)
                    console.log("TextoUsuario:" + textoUsuario)
                    console.log("TextoPass:" + textoPass)
                    if (res.usuario.user == textoUsuario) {
                        localStorage.setItem("tk", res.usuario._id);
                        location.href = "inicio.html";
                    } else {
                        alert("Introduce un usuario y contraseña validos");
                    }
                },
                timeout: 2000
            });
        } else {
            alert("Inserte todos los campos");
        }
        /*  var uri = "https://proyecto-mdc-api.herokuapp.com/validarUsuario/" + textoUsuario + "/" + textoPass;
        var uri = "https://proyecto-mdc-api.herokuapp.com/validarUsuario/Felix/123"
        console.log("URI: " + uri)
        $.get(uri, function (res) {
            console.log("USER:" + res.usuario.user)
            console.log("PASS:" + res.usuario.pass)
            console.log("TextoUsuario:" + textoUsuario)
            console.log("TextoPass:" + textoPass)
            if (res.usuario.user == textoUsuario) {
                localStorage.setItem("tk", res.usuario._id);
                location.href = "inicio.html";
            } else {
                alert("Introduce un usuario y contraseña validos");
            }
        }) */

    });

});