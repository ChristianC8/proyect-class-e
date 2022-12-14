const LIST_URL =
  `https://japceibal.github.io/emercado-api/cats_products/` +
  JSON.parse(localStorage.getItem("catID")) +
  `.json`;

function capturaElJson(url) {
  let result = {};
  /* el fetch se agrega al objeto response para utilizar sus propiedades y luego es convertido en json. Los .then estan conectados entre si por eso va en secuencia uno tras otro. A el segundo .then result se le agrega la propiedad .status = a ok y el .data que trae el json*/
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      return result;
    });
}

let categoriesArray = [];

/* var itemArray = [] */

function showCategoriesList(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let category = array[i];
    htmlContentToAppend +=
      `
        <div class="list-group-item list-group-item-action" id="item` +
      i +
      `" onclick="saveDato(` +
      i +
      `,` +
      array[i].id +
      `)">
            <div class="row">
                <div class="col-3">
                    <img src="` +
      category.image +
      `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>` +
      category.name +
      " - " +
      category.currency +
      " " +
      category.cost +
      `</h4> 
                        <p> ` +
      category.description +
      `</p> 
                        </div>
                        <small class="text-muted">` +
      category.soldCount +
      ` Vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `;
    document.getElementById("cat-list-container").innerHTML =
      htmlContentToAppend;
  }
}

function saveDato(id, spID) {
  localStorage.setItem("selectedProductid", spID);
  location.href = "product-info.html";
}

/* al cargar la pagina se ejectura la funcion con la url del json y un .then que trae el result.Comprueba que el status sea correcto luego se agrega a una array y esta se utiliza en la funcion de showcategories list que crea todo lo que se vera en la pagina. */
document.addEventListener("DOMContentLoaded", function () {
  capturaElJson(LIST_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      categoriesArray = resultObj.data;
      showCategoriesList(categoriesArray.products);
    }
  });
});

/* filtros */

document
  .getElementById("rangeFilterCount")
  .addEventListener("click", function () {
    categoriesArray.products.forEach(
      limpiar
    ); /* faltaba esta linea de codigo para el filter */
    categoriesArray.products.filter(checkPrice);
  });
var contadorP = 0;
function checkPrice(price) {
  let rangeFilterCountMin = document.getElementById(
    "rangeFilterCountMin"
  ).value;
  let rangeFilterCountMax = document.getElementById(
    "rangeFilterCountMax"
  ).value;

  if (price.cost >= rangeFilterCountMin && price.cost <= rangeFilterCountMax) {
    if (contadorP == categoriesArray.products.length - 1) {
      contadorP = 0;
    } else {
      contadorP++;
    }
  } else {
    document.getElementById(`item` + contadorP + ``).style.display = "none";
    if (contadorP == categoriesArray.products.length - 1) {
      contadorP = 0;
    } else {
      contadorP++;
    }
  }
}

document
  .getElementById("clearRangeFilter")
  .addEventListener("click", function clean() {
    categoriesArray.products.forEach(limpiar);
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = " ";
  });
let contadorL = 0;
function limpiar(price2) {
  if (price2) {
    document.getElementById(`item` + contadorL + ``).style.display = "block";
    if (contadorL == categoriesArray.products.length - 1) {
      contadorL = 0;
    } else {
      contadorL++;
    }
  }
}

let arrays = [];

document.getElementById("sortAsc").addEventListener("click", function () {
  categoriesArray.products.sort((a, b) => {
    return a.cost - b.cost;
  });
  categoriesArray.products.forEach((e) => {
    showCategoriesList(categoriesArray.products);
  });
});

document.getElementById("sortDesc").addEventListener("click", function () {
  categoriesArray.products.sort((a, b) => {
    return b.cost - a.cost;
  });
  categoriesArray.products.forEach((e) => {
    showCategoriesList(categoriesArray.products);
  });
});

document.getElementById("sortByCount").addEventListener("click", function () {
  categoriesArray.products.sort((a, b) => {
    return b.soldCount - a.soldCount;
  });
  categoriesArray.products.forEach((e) => {
    showCategoriesList(categoriesArray.products);
  });
});

/* searcher */

let search = document.getElementById("searchProduct");
var contadorH = 0;

search.addEventListener("input", function () {
  let escriboSearch = search.value;
  let searchVal = document.getElementById("searchProduct").value;

  categoriesArray.products.filter(function (producto, index) {
    let resultado = producto.name
      .toLowerCase()
      .includes(searchVal.toLowerCase());

    if (resultado) {
      esVisible();
    } else noEsVisible();

    function esVisible() {
      document.getElementById(`item` + index + ``).style.display = "block";
    }
    function noEsVisible() {
      document.getElementById(`item` + index + ``).style.display = "none";
    }
  });
});
