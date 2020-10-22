const COMPLETE_CART = "https://japdevdep.github.io/ecommerce-api/cart/654.json"; 
let cart = [];
let envio = 0;

function cartArticles(array) {
    var contenedor = document.getElementById('productsCart')
    var contenido = ""

    contenedor.innerHTML = contenido;



    contenido += `
    <div>
       
    <table class="table">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Producto</th>
        <th scope="col">Cantidad</th>
        <th scope="col" style="align-right">Precio</th>
      </tr>
    </thead>
    </div>
    `

    for (var i = 0; i < array.articles.length; i++) {
      let carrito = array.articles[i]; {

       contenido += `
      <tbody>
       <td>
      <img src="${carrito.src}" width="70" height="70"  class="sc-product-image"/>
      </td>
      <td><h4>${carrito.name}</h4></td>
      <td>
        <input class="form-control" type="number" id="${i}" value="${carrito.count}" min="1" max="10" onchange="update(${i})">
      </td>
      <td><h4 id="costo${i}">USD ${carrito.unitCost * carrito.count}</td>
      <td> <button class="btn btn-danger" onclick="trash(${i}); costoEnvio(envio); cartArticles(cart)" ><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg></button></h4></td>
      </tbody>
      
      `



      }

    }
    contenido+=` <td></td>`
        

      contenedor.innerHTML = contenido;
      total();

}

function USD(){
  for (var i = 0; i < cart.articles.length; i++) {
    let carrito = cart.articles[i]; {

      if(carrito.currency === "UYU"){
       carrito.unitCost = (carrito.unitCost / 40).toFixed(1);
      }
}}}

function trash(i){
  cart.articles.splice(i , 1)
}

function costoEnvio(envioPor){
  var costoTotal = 0;

  for(var i = 0; i < cart.articles.length; i++){
    var item = cart.articles[i];
    costoTotal+= item.unitCost * item.count;
  }
  document.getElementById("CostoEnvio").innerHTML = "USD " + Math.round(costoTotal * envioPor);
  costoTotal+= Math.round(costoTotal * envioPor);
  envio = envioPor
  document.getElementById("totalCost").innerHTML = "USD " + costoTotal;
}

function update(i){
    var cantidad= document.getElementById(i).value;
    var subtotal = "USD " + cart.articles[i].unitCost*cantidad;
    cart.articles[i].count = cantidad;

    document.getElementById('costo'+i).innerHTML=subtotal;
    total();
    if(envio !== 0){
      costoEnvio(envio)
    }
    
}

function total(){
    var costoTotal = 0;

    for(var i = 0; i < cart.articles.length; i++){
      var item = cart.articles[i];
      costoTotal+= item.unitCost * item.count;
    }
    document.getElementById("subtotal").innerHTML = "USD "+ costoTotal;
}

function buy(){
  let name = document.getElementById("name");
  let surname = document.getElementById("surname");
  let email = document.getElementById("email");
  let calle = document.getElementById("calle");
  let departamento =  document.getElementById("departamento");
  let codigoPostal = document.getElementById("codp");
  let celular = document.getElementById("celular");
  let fdp = document.getElementById("fdp");
  let faltaInfo = false;

  name.classList.remove("is-invalid");
  surname.classList.remove("is-invalid");
  email.classList.remove("is-invalid");
  calle.classList.remove("is-invalid");
  departamento.classList.remove("is-invalid");
  codigoPostal.classList.remove("is-invalid");
  celular.classList.remove("is-invalid");
  fdp.classList.remove("rojo");
 
  if(name.value.trim()===""){
    name.classList.add("is-invalid")
    faltaInfo = true;
  }
  else{
    name.classList.add("is-valid")
  }
  if(surname.value.trim()===""){
    surname.classList.add("is-invalid");
    faltaInfo = true;
  }else{
    surname.classList.add("is-valid")
  }

  if(email.value.trim()===""){
    email.classList.add("is-invalid");
    faltaInfo = true;
  }else{
    email.classList.add("is-valid")
  }

  if(calle.value.trim()===""){
    calle.classList.add("is-invalid")
    faltaInfo= true;
  }else{
    calle.classList.add("is-valid")
  }
  
  if(departamento.value.trim()===""){
    departamento.classList.add("is-invalid")
    faltaInfo = true;
  }else{
    departamento.classList.add("is-valid")
  }

  if(codigoPostal.value.trim()===""){
    codigoPostal.classList.add("is-invalid")
    faltaInfo = true;
  }else{
    codigoPostal.classList.add("is-valid")
  }

  if(celular.value.trim()===""){
    celular.classList.add("is-invalid")
    faltaInfo = true;
  }else{
    celular.classList.add("is-valid")
  }
  if(fdp.textContent==="Seleccione una forma de pago"){
    fdp.classList.add("rojo"); 
    faltaInfo = true;
  }else{
    fdp.classList.add("verde")
  }

  if(!faltaInfo){
    let msgToShowHTML = document.getElementById("resultSpan");
    let msgToShow = "";

    msgToShow = "Tu compra se a realizado con exito!";
      document.getElementById("alertResult").classList.add('alert-success');
      msgToShowHTML.innerHTML = msgToShow;
      document.getElementById("alertResult").classList.add("show");
  }

}

function tarjetaDeCredito(){
  let fdp = document.getElementById("fdp");

  fdp.classList.remove("rojo");

  if(fdp.textContent==="Seleccione una forma de pago"){
    fdp.classList.add("rojo"); 
    faltaInfo = true;
  }else{
    fdp.classList.add("verde")
  }
} 


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(COMPLETE_CART).then(function(resultObj){
        if(resultObj.status === "ok"){
            hideSpinner();
            cart = resultObj.data;
            USD();
            cartArticles(cart);
            total();
        }
    })
});