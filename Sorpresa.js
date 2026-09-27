// Personalización de la carta vía parámetros en la URL
// Ejemplo: index.html?nombre=Ana&remitente=Tu%20Novio
const params = new URLSearchParams(window.location.search);
const nombre = params.get("nombre");
const remitente = params.get("remitente");

const elNombre = document.getElementById("nombreDestinatario");
const elFirma = document.getElementById("firmaRemitente");

if (elNombre && nombre) elNombre.textContent = nombre;
if (elFirma && remitente) elFirma.textContent = remitente;

// Carta
const regalo = document.querySelector(".regalo");
const regalos = document.querySelector(".regalos");
const modalCarta = document.getElementById("modalCarta");

regalo.addEventListener("click", () => {
  modalCarta.classList.add("activo");
});

regalos.addEventListener("click", () => {
  modalCarta.classList.add("activo");
});

modalCarta.addEventListener("click", () => {
  modalCarta.classList.remove("activo");
});

// Todo Oscuro + Soplido + Canción
const overlay = document.querySelector(".overlay");
const soplido = document.getElementById("soplido");
const cancion = document.getElementById("cancion");
const llama = document.querySelector(".llama");
const avisoVela = document.getElementById("avisoVela");

// El overlay negro se destraba al tocarlo, revelando la escena
overlay.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

llama.addEventListener("click", () => {
  soplido.currentTime = 0;
  soplido.play();

  if (avisoVela) avisoVela.classList.add("oculto");

  llama.style.animation = "apagar 0.5s forwards"; // forwards -> Ultimo frame (to)

  setTimeout(() => {
    cancion.currentTime = 0;
    cancion.play();
    overlay.classList.add("hidden");
  }, 1000);
});