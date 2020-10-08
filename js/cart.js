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

        if(carrito.currency === "UYU"){
         carrito.unitCost = ((carrito.unitCost*carrito.count) / 40).toFixed(1);
        }

       contenido += `
      <tbody>
       <td>
      <img src="${carrito.src}" width="70" height="70"  class="sc-product-image"/>
      </td>
      <td><h4>${carrito.name}</h4></td>
      <td>
        <input class="form-control" type="number" id="${i}" value="${carrito.count}" min="1" max="10" onchange="update(${i})">
      </td>
      <td><h4 id="costo${i}">USD ${carrito.unitCost * carrito.count}</h4></td>
      </tbody>
      
      `



      }

    }
    contenido+=` <td></td>`
        

      contenedor.innerHTML = contenido;
      total();

  }

function costoEnvio(envioPor){
  var costoTotal = 0;

  for(var i = 0; i < cart.articles.length; i++){
    var item = cart.articles[i];
    costoTotal+= item.unitCost * item.count;
  }
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

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(COMPLETE_CART).then(function(resultObj){
        if(resultObj.status === "ok"){
            hideSpinner();
            cart = resultObj.data;
            cartArticles(cart);
            total();
        }
    })
});