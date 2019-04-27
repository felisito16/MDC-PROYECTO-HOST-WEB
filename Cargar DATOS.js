//Cargar los datos del usuario
$.ajax({
    type: "get",
    url: "https://proyecto-studium.herokuapp.com/api/user/getUser/" + localStorage.getItem("tk"),
    beforeSend: function() {
        //console.log("Opteniendo usuario.");
    },
    success: function(res) {
        if (res.user.Rol != "adminTKtrue") {
            $(".npad").hide();
        }

        $(".nameUser").html(res.user.Nombre);
        $(".is1").eq(0).attr("placeholder", res.user.Nombre);
        $(".is1").eq(1).attr("placeholder", res.user.Apellido);
        $(".is1").eq(2).attr("placeholder", res.user.Informacion.Descripcion);
        $(".img-profile").attr("src", res.user.Informacion.Avatar);
        $(".is2").eq(0).attr("placeholder", res.user.Email);

    },
    timeout: 2000
});