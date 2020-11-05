
document.getElementById("saveBtn").addEventListener("click", ()=>{
    
    let name = document.getElementById("personName");
    let email = document.getElementById("personEmail");
    let phone = document.getElementById("personPhone");
    let mobile = document.getElementById("personMobile");
    let address =  document.getElementById("personAdress");
    let age = document.getElementById("personAge");
    let twitter = document.getElementById("twitter");
    let instagram = document.getElementById("instagram");
    let facebook = document.getElementById("facebook");
    let faltaInfo = false;

    name.classList.remove("is-invalid");
    email.classList.remove("is-invalid");
    phone.classList.remove("is-invalid");
    mobile.classList.remove("is-invalid");
    address.classList.remove("is-invalid");
    age.classList.remove("is-invalid")
    twitter.classList.remove("is-valid");
    instagram.classList.remove("is-valid");
    facebook.classList.remove("is-valid");

    if(name.value===""){
        name.classList.add("is-invalid");
        faltaInfo = true;
    }
        else{
        name.classList.add("is-valid");
        let nameJSON = JSON.stringify(name.value);
        localStorage.setItem("name", JSON.parse(nameJSON));
    }
    if(email.value===""){
        email.classList.add("is-invalid");
        faltaInfo = true;
    }
        else{
        email.classList.add("is-valid");
        let emailJSON = JSON.stringify(email.value);
        localStorage.setItem("email", JSON.parse(emailJSON));
    }
    if(phone.value.trim()===""){
        phone.classList.add("is-invalid");
        faltaInfo = true;
      }
        else{
        phone.classList.add("is-valid");
        let phoneJSON = JSON.stringify(phone.value);
        localStorage.setItem("phone", JSON.parse(phoneJSON));
      }
    if(mobile.value.trim()===""){
        mobile.classList.add("is-invalid")
        faltaInfo = true;
      }
        else{
        mobile.classList.add("is-valid");
        let mobileJSON = JSON.stringify(mobile.value);
        localStorage.setItem("mobile", JSON.parse(mobileJSON));
      }
    if(address.value.trim()===""){
        adress.classList.add("is-invalid");
        faltaInfo = true;
      }
      else{
        address.classList.add("is-valid");
        let addressJSON = JSON.stringify(address.value);
        localStorage.setItem("address", JSON.parse(addressJSON));
      }
      if(age.value.trim()===""){
        age.classList.add("is-invalid");
        faltaInfo = true;
      }
      else{
        age.classList.add("is-valid");
        let ageJSON = JSON.stringify(age.value);
        localStorage.setItem("age", JSON.parse(ageJSON));
      }
    if(twitter.value==="" || twitter.value==="-"){
        twitter.value = "-";
    }else{
        twitter.classList.add("is-valid");
        let twitterJSON = JSON.stringify(twitter.value);
        localStorage.setItem("twitter", JSON.parse(twitterJSON));
    }
    if(instagram.value==="" || instagram.value==="-"){
        instagram.value = "-";
    }else{
        instagram.classList.add("is-valid");
        let instagramJSON = JSON.stringify(instagram.value);
        localStorage.setItem("instagram", JSON.parse(instagramJSON));
    }
    if(facebook.value==="" || facebook.value==="-"){
        facebook.value = "-";
    }else{
        facebook.classList.add("is-valid");
        let facebookJSON = JSON.stringify(facebook.value);
        localStorage.setItem("facebook", JSON.parse(facebookJSON));
    }
    if(!faltaInfo){
        let msgToShowHTML = document.getElementById("resultSpan");
        let msgToShow = "";
    
        msgToShow = "Tus datos se han guardado con exito!";
          document.getElementById("alertResult").classList.add('alert-success');
          msgToShowHTML.innerHTML = msgToShow;
          document.getElementById("alertResult").classList.add("show");
    }

})

//Local storage
document.getElementById("name").innerHTML = localStorage.getItem("user");
document.getElementById("personName").value = localStorage.getItem("name");
document.getElementById("personEmail").value = localStorage.getItem("email");
document.getElementById("personPhone").value = localStorage.getItem("phone");
document.getElementById("personMobile").value = localStorage.getItem("mobile");
document.getElementById("personAdress").value = localStorage.getItem("address");
document.getElementById("personAge").value = localStorage.getItem("age");
document.getElementById("twitter").value = localStorage.getItem("twitter");
document.getElementById("instagram").value = localStorage.getItem("instagram");
document.getElementById("facebook").value = localStorage.getItem("facebook");

//IMG in LocalStorage
bannerImage = document.getElementById('userIMG');
imgData = getBase64Image(bannerImage);
localStorage.setItem("userIMG", imgData);

function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

var dataImage = localStorage.getItem('userIMG');
bannerImg = document.getElementById('userIMG');
bannerImg.src = "data:image/png;base64," + dataImage;