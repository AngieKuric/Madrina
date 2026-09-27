// Confetis (fondo y frente) - versión unificada
// Reemplaza a los antiguos Confeti.js + Confeti2.js

window.oncontextmenu = function () {
  return false;
};

const coloresConfeti = [
  "rgba(255, 155, 170, 1)",
  "rgba(224, 130, 144, 1)",
  "rgba(251, 208, 214, 1)",
  "rgba(248, 93, 116, 1)",
  "rgba(246, 121, 139, 1)",
  "rgba(238, 174, 184, 1)",
  "rgba(255, 255, 255, 1)",
];

function crearCanvasConfeti(canvasId, { fondo = null, cantidad = 100 } = {}) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  let ancho = (canvas.width = window.innerWidth);
  let alto = (canvas.height = window.innerHeight);
  let confetis = [];
  let animando = true;

  function crearConfeti() {
    for (let i = 0; i < cantidad; i++) {
      confetis.push({
        x: Math.random() * ancho, // Posición Horizontal Aleatoria
        y: Math.random() * -alto, // Posición Vertical Aleatoria (Desde arriba por el negativo)
        r: Math.random() * 5 + 2, // Radio Aleatorio (2 y 7 Pixeles)
        color: coloresConfeti[Math.floor(Math.random() * coloresConfeti.length)],
        velocidadY: Math.random() * 2 + 1, // Velocidad Aleatoria (1 y 3 Pixeles/Frame)
      });
    }
  }

  function animarConfeti() {
    if (fondo) {
      ctx.fillStyle = fondo; // Fondo sólido (usado en el canvas de atrás)
      ctx.fillRect(0, 0, ancho, alto);
    } else {
      ctx.clearRect(0, 0, ancho, alto); // Transparente (usado en el canvas de adelante)
    }

    for (let i = 0; i < confetis.length; i++) {
      const c = confetis[i];

      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fillStyle = c.color;
      ctx.fill();

      // Movimiento (Caída Libre)
      c.y += c.velocidadY;

      // Si Termina De Caer, Aparece Arriba Nuevamente
      if (c.y > alto) {
        c.y = -10;
        c.x = Math.random() * ancho;
      }
    }

    if (animando) requestAnimationFrame(animarConfeti);
  }

  // Ajusta el canvas si cambia el tamaño de la ventana (antes se quedaba con las medidas viejas)
  window.addEventListener("resize", () => {
    ancho = canvas.width = window.innerWidth;
    alto = canvas.height = window.innerHeight;
  });

  // Pausa la animación cuando la pestaña no está visible (ahorra batería/CPU)
  document.addEventListener("visibilitychange", () => {
    animando = !document.hidden;
    if (animando) requestAnimationFrame(animarConfeti);
  });

  crearConfeti();

  // Esperar 1.5 segundos antes de iniciar el confeti
  setTimeout(animarConfeti, 1500);
}

// Canvas de atrás: con fondo rosa pastel
crearCanvasConfeti("canvas1", { fondo: "rgba(255, 182, 193, 1)" });
// Canvas de adelante: transparente
crearCanvasConfeti("canvas2");