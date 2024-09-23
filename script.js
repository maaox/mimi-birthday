// Lista de invitados como un objeto inmutable
const LISTA_INVITADOS = Object.freeze({
  "C25-RNAO01": "Mishi",
  "C25-RNAO02": "Lishi",
  "C25-RNAO03": "Mi peque",
  "C25-RNAO04": "Yay",
  "C25-RNAO05": "Nato",
  "C25-RNAO06": "Sarish",
  "C25-RNAO07": "Elder",
  "C25-RNAO08": "Jhona",
  "C25-RNAO09": "Melish",
  "C25-RNAO10": "Alvarasho",
  "C25-RNAO11": "Nelish",
  "C25-RNAO12": "Manés",
  "C25-RNAO13": "Hermano Vic",
  "C25-RNAO14": "Daniel",
  "C25-RNAO15": "Angeleto",
  "C25-RNAO16": "Anaís",
  "C25-RNAO17": "Primita Naomi",
  "C25-RNAO18": "Primito Jorge",
  "C25-RNAO19": "Tía Ceci",
  "C25-RNAO20": "Nora y Carlos",
  "C25-RNAO21": "Josias",
  "C25-RNAO22": "Geidy",
  "C25-RNAO23": "Sarita",
  "C25-RNAO24": "Seleste",
  "C25-RNAO25": "Tío Eddy",
  "C25-RNAO26": "Tía Rosita",
  "C25-RNAO27": "Yovana",
  "C25-RNAO28": "Wilder Huaccha",
  "C25-RNAO29": "Wilmer Asto",
  "C25-RNAO30": "Elías Asto",
  "C25-RNAO31": "Flor Asto",
  "C25-RNAO32": "Marlene Asto",
  "C25-RNAO33": "Luzmila",
  "C25-RNAO34": "Caleb",
});

// URL de la aplicación AppScript
const URL_BASE =
  "https://script.google.com/macros/s/AKfycbx1JGUEWsVVNGl6UWfWLjdB9BCvBcsiw2Mes3nrxI0/dev";

// Obtener elementos del DOM
const modal = document.getElementById("modal");
const confirmButton = document.getElementById("confirmButton");
const closeBtn = document.querySelector(".close");

const siButton = document.getElementById("siButton");
const confirmarButton = document.getElementById("confirmarButton");
const noButton = document.getElementById("noButton");

const nombreElement = document.getElementById("nombre");

// Variable para almacenar el elemento que tenía el foco antes de abrir el modal
let previousActiveElement = null;

/**
 * Función para abrir el modal
 */
const openModal = () => {
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");

  // Guardar el elemento que tenía el foco
  previousActiveElement = document.activeElement;

  // Mover el foco al primer botón del modal
  siButton.focus();
};

/**
 * Función para cerrar el modal
 */
const closeModal = () => {
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");

  // Restaurar el foco al elemento previamente activo
  if (previousActiveElement) {
    previousActiveElement.focus();
  }
};

/**
 * Función para manejar clic fuera del modal
 * @param {MouseEvent} event
 */
const handleWindowClick = (event) => {
  if (event.target === modal) {
    closeModal();
  }
};

/**
 * Función para manejar la tecla Escape
 * @param {KeyboardEvent} event
 */
const handleKeyDown = (event) => {
  if (event.key === "Escape" && modal.style.display === "block") {
    closeModal();
  }
};

/**
 * Funciones para manejar los botones dentro del modal
 * Puedes reemplazar los console.log con tus peticiones personalizadas
 */

/**
 * Manejar el botón "Sí asistiré"
 */
const handleSiButtonClick = () => {
  console.log("Usuario confirmó asistencia");
  confirmarAsistencia("Asistiré");
  closeModal();
};

/**
 * Manejar el botón "Confirmaré luego"
 */
const handleConfirmarButtonClick = () => {
  console.log("Usuario confirmará más tarde");
  confirmarAsistencia("Por confirmar");
  closeModal();
};

/**
 * Manejar el botón "No asistiré"
 */
const handleNoButtonClick = () => {
  console.log("Usuario no asistirá");
  confirmarAsistencia("No asistiré");
  closeModal();
};

/**
 * Función para obtener el ID del parámetro de la URL.
 * @returns {string|null} - El valor del parámetro si existe, o null si no.
 */
const obtenerIdInvitado = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (!id) {
    alert("La URL debe contener el parámetro 'id'.");
    return null;
  }

  return id;
};

/**
 * Función para establecer el nombre dinámico en el elemento <p>
 * @param {string} nombre - El nombre a mostrar
 */
const setNombre = (nombre) => {
  nombreElement.textContent = nombre;
};

/**
 * Establecer el nombre dinámico al cargar la página
 */
const inicializarPagina = () => {
  const idInvitado = obtenerIdInvitado();

  if (!idInvitado) {
    setNombre("No Invitado");
    return;
  }

  const invitado = LISTA_INVITADOS[idInvitado];
  if (invitado) {
    setNombre(invitado);
  } else {
    // Manejar error si no encuentra el nombre
    console.error("El ID del invitado no existe en la lista");
    alert("No estás en la lista de invitados");
    setNombre("No Invitado"); // Valor por defecto si no se recibe el nombre
  }
};

/**
 * Manejar peticiones de confirmación de asistencia
 * @param {string} respuesta - Respuesta del usuario
 */
const confirmarAsistencia = (respuesta) => {
  const idInvitado = obtenerIdInvitado();

  if (!idInvitado) {
    console.error("ID de invitado no disponible.");
    return;
  }

  // Preparar los datos para enviar a la hoja de cálculo
  const dataToGSheet = {
    id: idInvitado,
    confirmation: respuesta,
  };

  // URL para enviar los datos a la hoja de cálculo
  const encodedData = encodeURIComponent(JSON.stringify(dataToGSheet));
  const urlFinal = `${URL_BASE}?data=${encodedData}`;

  // Redirigir a la URL final
  window.location.href = urlFinal;
};

// Event Listeners
confirmButton.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", handleWindowClick);
window.addEventListener("keydown", handleKeyDown);

siButton.addEventListener("click", handleSiButtonClick);
confirmarButton.addEventListener("click", handleConfirmarButtonClick);
noButton.addEventListener("click", handleNoButtonClick);

// Inicializar la página al cargar el DOM
document.addEventListener("DOMContentLoaded", inicializarPagina);
