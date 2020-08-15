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
    
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  var id_token = googleUser.getAuthResponse().id_token;
  console.log(id_token)
}
