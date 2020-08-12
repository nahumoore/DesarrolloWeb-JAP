var user = document.getElementById("user");
var pass = document.getElementById("pass");

function enviarForm(){
    if (user.value.trim()===""){
        alert("Ingresa tu usuario")
        return false
    }
    if (pass.value.trim()===""){
        alert("Ingresa tu contraseña")
        return false
    } 
    if (pass.value.length > 0 && user.value.length > 0){
        onclick=location.href='index2.html'

    }    
    }
    
