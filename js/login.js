// Cuando se cargue la ventana/pagina completamente
$(document).ready(function () {

    // Funcionalidad con la API

    (localStorage.getItem("tk") != null || localStorage.getItem("tk") != undefined) ? location.href = "login.html" : ""

    var textoUsuario = $("input:eq(0)").val();
    var textoPass = $("input:eq(1)").val()

    $("button:eq(0)").click(function () {

        if (textoUsuario != "" && textoPass != "") {

            var uri = "https://proyecto-mdc-api.herokuapp.com/validarUsuario/" + textoUsuario + "/" + textoPass
            console.log("URI: " + uri)
            $.get(uri, function (res) {
                if (res.user == textoUsuario) {
                    console.log("USER:"+res.user)
                    console.log("TextoUsuario:"+textoUsuario)
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