var user = document.getElementById("user");
var pass = document.getElementById("pass");

function enviarForm(){
    if (user.value===null || user.value===""){
        alert("Ingresa tu usuario")
    }
    if (pass.value===null || pass.value===""){
        alert("Ingresa tu contraseña")
    } else{
        onclick=location.href='index2.html'
    }
    
}