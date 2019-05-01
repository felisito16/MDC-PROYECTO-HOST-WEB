// Cuando se cargue la ventana/pagina completamente
$(document).ready(function () {

    // Funcionalidad con la API

    $("button:eq(0)").click(function () {

        var textoUsuario = $("input:eq(0)").val();
        var textoPass = $("input:eq(1)").val();
        textoPass = SHA512(textoPass);

        if ((textoUsuario != "") && (textoPass != "")) {

            var uri = "https://proyecto-mdc-api.herokuapp.com/validarUsuario/" + textoUsuario + "/" + textoPass;
            console.log("URI: " + uri)
            $.get(uri, function (res) {
                if (res.usuario[0].user == textoUsuario) {
                    localStorage.setItem("abreteSesamo", res.usuario[0]._id);
                    location.href = "inicio.html";
                } else {
                    alert("Introduce un usuario y contraseña validos");
                }
            })
        } else {
            alert("Inserte todos los campos");
        }
    });

});