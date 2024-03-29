/* const LIST_URL = `https://japceibal.github.io/emercado-api/cats_products/`+JSON.parse(localStorage.getItem("catID"))+`.json`; */

const Comment_URL =
  `https://japceibal.github.io/emercado-api/products_comments/` +
  JSON.parse(localStorage.getItem("selectedProductid")) +
  `.json`;
const Product_Info_URL =
  `https://japceibal.github.io/emercado-api/products/` +
  JSON.parse(localStorage.getItem("selectedProductid")) +
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

function comprar() {
  let compruebo = [];
  if (localStorage.getItem("alCarrito")) {
    compruebo = localStorage.getItem("alCarrito");
  }

  if (compruebo.indexOf(localStorage.getItem("selectedProductid")) != -1) {
    document.getElementById("irCarrito").classList.remove("d-none");
    setTimeout(() => {
      document.getElementById("irCarrito").classList.add("d-none");
    }, 4400);
  } else {
    if (localStorage.getItem("alCarrito")) {
      var arrCarrito = [localStorage.getItem("alCarrito")];
    } else {
      var arrCarrito = [];
    }
    arrCarrito.push(localStorage.getItem("selectedProductid"));
    localStorage.setItem("alCarrito", arrCarrito);
    location.href = "cart.html";
  }
}

let categoriesArray = [];

function showProductInfo(array) {
  let htmlContentToAppend = "";

  htmlContentToAppend += `
        <div style="display:flex;justify-content: space-between;"> <p id="tituloProducto">${array.name}</p>  <button type="button" class="btn btn-success" style="height:10%;margin-top:4%;" onclick="comprar()">Comprar</button> </div>
        <hr>
        <p><strong>Precio</strong> <br> ${array.currency} ${array.cost}</p>
        <p><strong>Descripción</strong><br>${array.description}</p>
        <p><strong>Categoría</strong><br>${array.category}</p>
        <p><strong>Cantidad de vendidos</strong><br>${array.soldCount}</p>
        <p><strong>Imágenes ilustrativas</strong></p>




        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" style="width: 70%;  padding-left: 10%;">
        <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="img/prod${array.id}_1.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="img/prod${array.id}_2.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="img/prod${array.id}_3.jpg" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="img/prod${array.id}_4.jpg" class="d-block w-100" alt="...">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
    
      </div>







        <div id="padreImagenesP">
        <img src="img/prod${array.id}_1.jpg" class="imgProduct" data-bs-target="#carouselExampleControls" data-bs-slide-to="0">
        <img src="img/prod${array.id}_2.jpg" class="imgProduct" data-bs-target="#carouselExampleControls" data-bs-slide-to="1">
        <img src="img/prod${array.id}_3.jpg" class="imgProduct" data-bs-target="#carouselExampleControls" data-bs-slide-to="2">
        <img src="img/prod${array.id}_4.jpg" class="imgProduct" data-bs-target="#carouselExampleControls" data-bs-slide-to="3">
        </div>













        `;
  document.getElementById("productInfo").innerHTML = htmlContentToAppend;
}

function showComments(array) {
  let htmlContentToAppend = "";
  for (let i = 0; i < array.length; i++) {
    htmlContentToAppend +=
      `

                <li class="border rounded-3 cont" id="listaComm">
                <div  id="padreImagenesP"> 
                    <p>  <strong style="margin:5px">${array[i].user}</strong>   -${array[i].dateTime}-                 </p>
                    <div id="puntaje` +
      i +
      `" class = "puntajes${i}"> 
                    
                    ${puntuacion(array[i].score)}

                    </div>
                    </div>
                    
                    <p>${array[i].description}</p>
                </li>


        `;

    document.getElementById("contenedor").innerHTML = htmlContentToAppend;
  }
}
function puntuacion(a) {
  if (a === 0) {
    return ` 
    <span class="far fa-star"></span>
    <span class="far fa-star"></span>
    <span class="far fa-star"></span>
    <span class="far fa-star"></span>
    <span class="far fa-star"></span> `;
  }
  if (a === 1) {
    return `
        <span class="fa fa-star checked"></span>
        <span class="far fa-star"></span>
        <span class="far fa-star"></span>
        <span class="far fa-star"></span>
        <span class="far fa-star"></span> `;
  }
  if (a === 2) {
    return `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="far fa-star"></span>
            <span class="far fa-star"></span>
            <span class="far fa-star"></span> `;
  }
  if (a === 3) {
    return `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="far fa-star"></span>
            <span class="far fa-star"></span> `;
  }
  if (a === 4) {
    return `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="far fa-star"></span> `;
  }
  if (a === 5) {
    return `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span> `;
  }
}

function agregarComentario() {
  let puntaje = document.getElementById("puntajes").value;

  let htmlAppend = " ";
  htmlAppend += `
    <li class="border rounded-3 cont" id="listaComm">
    <div  id="padreImagenesP"> 
        <p>  <strong style="margin:5px">nombre</strong>   -datetime-                 </p>
        <div> 
        
        ${puntuacion(puntaje)}

        </div>
        </div>
        
        <p>descripcion</p>
    </li>

`;
  document.getElementById("contenedor").innerHTML = htmlAppend;
}

const cargaLista = [];

/* uso var porq son globales */
var tiempo = new Date();
var year = tiempo.getFullYear();
var month = tiempo.getMonth();
var day = tiempo.getDate();
var hours = tiempo.getHours();
var minutes = tiempo.getMinutes();
var seconds = tiempo.getSeconds();

function agregoLista(text = document.getElementById("textAreaCom").value) {
  document.getElementById("textAreaCom").value = "";
  let puntaje = document.getElementById("puntajes").value;

  const contens = document.getElementById("contenedor");
  const comentario = document.createElement("li");
  comentario.classList.add("border");
  comentario.classList.add("rounded-3");
  comentario.classList.add("cont");
  comentario.innerHTML = `
    <li class="border rounded-3 cont" id="listaComm">
    <div  id="padreImagenesP"> 
        <p>  <strong style="margin:5px">${localStorage.getItem(
          "userId"
        )}</strong>   -${year}-${month}-${day} ${hours}:${minutes}:${seconds}-                 </p>
        <div> 
        
        ${puntuacion(JSON.parse(puntaje))}

        </div>
        </div>
        
        <p>${text}</p>
    </li>

`;

  contens.appendChild(comentario);
}

function productosRel(array) {
  let contenedor = document.getElementById("contenedorProductosRel");
  let htmlAppendProductosRelacionados = ``;
  let contador = -1;

  for (let i = 0; i < array.relatedProducts.length; i++) {
    contador++;
    htmlAppendProductosRelacionados += `<div class="card" style="width: 18rem;"  onclick="actualizarPagina(${contador})">
    <img src="${array.relatedProducts[contador].image}" class="card-img-top " alt="...">
    <div class="card-body">
    <h5 class="card-title">${array.relatedProducts[contador].name}</h5>
    </div>
    </div>    `;
  }

  contenedor.innerHTML = htmlAppendProductosRelacionados;
}

function actualizarPagina(id) {
  /*   localStorage.setItem("catID",categoriesArrayProducts.relatedProducts[id].id)  */
  localStorage.setItem(
    "selectedProductid",
    categoriesArrayProducts.relatedProducts[id].id
  );
  location.href = "product-info.html";
}

document.addEventListener("DOMContentLoaded", function () {
  capturaElJson(Product_Info_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      categoriesArray = resultObj.data;
      showProductInfo(categoriesArray);
    }
  });
  capturaElJson(Comment_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      categoriesArrayD = resultObj.data;
      showComments(categoriesArrayD);
    }
  });
  capturaElJson(Product_Info_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      categoriesArrayProducts = resultObj.data;
      productosRel(categoriesArrayProducts);
    }
  });
});
