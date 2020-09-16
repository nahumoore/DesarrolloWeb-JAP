var category = {};
var comments = [];

function showImagesGallery(array){
    
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="carousel-item ${ i===0 ? "active" : ""}">
            <img src="${imageSrc}" class="d-block w-100 " alt="...">
        </div>
        `

    document.getElementById('productImagesGallery').innerHTML=htmlContentToAppend;
    }
}

function stars(numero){
    let content = " ";

    for(var i = 0; i < 5; i++){
        if(i < numero){
            content += `<i class="fas fa-star"></i>`
        }else{
            content += `<i class="far fa-star"></i>`
        }
    }

    return content
}

function showComments(){
    
    let htmlContentToAppend = "";

    for (let i = 0; i < comments.length; i++){
        let comment = comments[i];
        htmlContentToAppend += `
        <div>
        <ul class="list-group mb-3">
                  <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <strong class="mb-1">${comment.user} </strong><span>- ${stars(comment.score)}</span>
                      <div class="col">
                      <div class="d-flex w-100 justify-content-between">
                      <small class="text-muted" style="font-weight: bold">${comment.dateTime}</small><br>
                      </div>
                      </div>
                      <small class="text-muted">${comment.description}</small>
                  </li>
                </ul>
        </div>
        `

        document.getElementById("comentarios").innerHTML = htmlContentToAppend;

    }
}

function sendComment(){
    
    var descripcion = document.getElementById("user-comment").value;
    var puntuacion = document.getElementById("puntuacion").value;
    var user = localStorage.getItem("user");
    let comentario = {};
    
    comentario.description = descripcion;
    comentario.score = puntuacion;
    comentario.user = user;
    comentario.dateTime = fecha();
    
    comments.push(comentario);

    showComments();

}

function fecha(){
    var hoy = new Date();
    var dd = hoy.getDate();
    var mm = hoy.getMonth() + 1;
    var yyyy = hoy.getFullYear();
    var hh = hoy.getHours();
    var minmin= hoy.getMinutes();
    var ss = hoy.getSeconds();

    if(dd < 10){
        dd = "0" + dd;
    }

    if(mm < 10){
        mm = "0" + mm;
    }

    hoy = yyyy + "-" + mm + "-" + dd + " " + hh + ":" + minmin + ":" + ss;
    return hoy

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            hideSpinner()
            category = resultObj.data;

            let categoryNameHTML  = document.getElementById("categoryName");
            let categoryDescriptionHTML = document.getElementById("categoryDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCost = document.getElementById("productCost");

        
            categoryNameHTML.innerHTML = category.name;
            categoryDescriptionHTML.innerHTML = category.description;
            productCountHTML.innerHTML = category.soldCount;
            productCost.innerHTML = category.cost + " USD";


            //Muestro las imagenes en forma de galería
            showImagesGallery(category.images);
        }
        
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comments = resultObj.data;      
            showComments(comments);
            
        }
    });
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            let products = resultObj.data;

            let html = " ";
            category.relatedProducts.forEach(function(currentCategoriesArray) {
                let productRP = products[currentCategoriesArray];
                html += `
                <div class="col-4 ml-10px">
                <div class="card" style="width: 18rem;">
                <img href="#" class="card-img-top" src="${productRP.imgSrc}">
                <div class="card-body">
                    <h5 class="card-title">${productRP.name}</h5>
                    <p class="card-text">${productRP.description}</p>
                    <a href="#" class="btn btn-primary">Ver producto</a>
                </div>
                </div>
                </div>
                <br>
                `
            document.getElementById("relatedProducts").innerHTML = html;
            })
            
        }
       
    })
});