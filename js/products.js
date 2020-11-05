const ORDER_ASC_BY_COST = "+-";
const ORDER_DESC_BY_COST = "-+";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

/* <a href="product-info.html" class="list-group-item list-group-item-action">
<div class="row">
    <div class="col-3">
        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
    </div>
    <div class="col">
        <div class="d-flex w-100 justify-content-between">
            <h4 class="mb-1">`+ category.name +`</h4>
            <small class="text-muted" style="font-weight: bold">` + category.soldCount + ` artículos vendidos</small>
        </div>
        <div class="d-flex w-100 justify-content-between">    
            <p class="mb-1">` + category.description + `</p>
        </div><br>    
        <div class="d-flex w-100 justify-content-between">
        <p class="mb-1" style="font-weight: bold"> ${category.currency}: ${category.cost}</p>
        </div>
    </div>
</div>
</a> */

function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];
        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){

            htmlContentToAppend += `
            <div class="col-md-4">
            <a href="product-info.html" class="list-group-item-action">
              <div class="card mb-4 shadow-sm">
              <img src="${category.imgSrc}" class="img-thumbnail">
                <div class="card-body">
                  <h3><b>${category.name}</b></h3>
                  <h5>${category.description}</h5><br>
                  <h4><b>${category.currency} ${category.cost}</b></h4>
                  
                  <div class="d-flex justify-content-between align-items-center">
                    <small>Artículos vendidos: ${category.soldCount}</small>
                  </div>
                </div>
              </div>
              </a>
            </div>
            `
        }
        document.getElementById("info").innerHTML = htmlContentToAppend;
    }
}

  // Botones de filtracion

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            if ( a.soldCount < b.soldCount ){ return -1; }
            if ( a.soldCount > b.soldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}
function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
      if (resultObj.status === "ok")
      {
        sortAndShowCategories(ORDER_ASC_BY_COST, resultObj.data);
      }
      hideSpinner();
    });
    document.getElementById("sortAsc").addEventListener("click", function(){
    sortAndShowCategories(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
    sortAndShowCategories(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
    sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });
    
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    
});
});