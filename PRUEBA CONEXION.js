if (localStorage.getItem("tk") != null || localStorage.getItem("tk") != undefined) {
    location.href = "app";
}
$(document).ready(function() {
    var has = sha512('123456');
    console.log(has);
    $("#login").submit(function() {
        var email = $("#email-log").val();
        var pass = sha512($("#pass-log").val());

        if (email != "" && pass != "") {
            $.get("https://proyecto-studium.herokuapp.com/api/user/getEmail/" + email, function(res) {
                if (email == res.emailDocument.Email && pass == res.emailDocument.Pass) {
                    localStorage.setItem("tk", res.emailDocument._id);
                    location.href = "app";
                } else {
                    alert("Introduce un email y contraseña validos");
                }
            });
        } else {
            alert("Inserte todos los campos");
        }

        return false;
    });
});