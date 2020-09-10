var category = {};
var comments = [];

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showComments(){
    let htmlContentToAppend = "";
    comments.forEach(function(comment) {
        let stars = comment.score;
        var score = "";
        
        for(let i = 1; i <= stars; i++){
            score += '<i class="fas fa-star checked"></i>';
        }

        for(let i = stars +1 ; i <= 5; i++){
            score += '<i class="fas fa-star"></i>';
        }
    })

    for (let i = 0; i < comments.length; i++){
        let comment = comments[i];
        htmlContentToAppend += `
        <div>
        <ul class="list-group mb-3">
                  <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <strong class="mb-1">${comment.user} </strong><span>- ${comment.score}</span>
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

function enviarForm(){
    
    var descripcion = document.getElementById("user-comment").value;
    var puntuacion = document.getElementById("puntuacion").value;
    var user = document.getElementById("usuario").value;
    var date = "2020-01-01 00:00:00";
    let comentario = {};
    
    comentario.description = descripcion;
    comentario.score = puntuacion;
    comentario.user = user;
    comentario.dateTime = date;
    
    comments.push(comentario);

    showComments();

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
            let relatedProducts = document.getElementById("relatedProducts");
        
            categoryNameHTML.innerHTML = category.name;
            categoryDescriptionHTML.innerHTML = category.description;
            productCountHTML.innerHTML = category.soldCount;
            productCost.innerHTML = category.cost + " USD";
            relatedProducts.innerHTML = category.relatedProducts;

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
    })
});
