const boton_inicio = document.getElementById("btninicio");

function alertWarning() {
  document.getElementById("alertred").style.visibility = "visible";
  setTimeout(hideWarning, 3000);
}

function hideWarning() {
  document.getElementById("alertred").style.visibility = "hidden";
}

/* evento click Ingresar */
boton_inicio.addEventListener("click", cambiarPag);
function cambiarPag() {
  let email = document.getElementById("floatingInput").value;
  let paswo = document.getElementById("floatingPassword").value;
  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (paswo.length != 0 && email.length != 0 && email.match(validRegex)) {
    localStorage.setItem("userId", email);
    location.href = "portada.html";
  } else {
    alertWarning();
  }
}

function loginGoogle() {
  localStorage.setItem("userId", "GoogleUser");
  if (localStorage.getItem("userId") === "GoogleUser") {
    location.href = "portada.html";
  }
}
