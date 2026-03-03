document.addEventListener("DOMContentLoaded", () => {

    const progressBars = document.querySelectorAll(".progress-bar-custom");

    progressBars.forEach(bar => {

        const percent = bar.getAttribute("data-progress");
        const container = bar.parentElement;
        const ball = container.querySelector(".ball-icon");

        bar.style.width = percent + "%";

        setTimeout(() => {
            ball.style.left = `calc(${percent}% - 14px)`;
        }, 300);

    });

});

const profileRing = document.getElementById("profileRing");
const ringOptions = document.querySelectorAll(".ring-option");

// Simulamos progreso
const followers = 120;  // puedes usar tu valor dinámico
const messages = 10;

// ===== DESBLOQUEO =====
if (followers >= 100) {
  document.querySelector('[data-ring="ring-red"]').classList.remove("locked");
}

if (messages >= 50) {
  document.querySelector('[data-ring="ring-nitro"]').classList.remove("locked");
}

// ===== CAMBIAR ARO =====
ringOptions.forEach(option => {
  option.addEventListener("click", () => {

    if (option.classList.contains("locked")) return;

    const selectedRing = option.getAttribute("data-ring");

    // quitar clases anteriores
    profileRing.className = "profile-ring " + selectedRing;

    // guardar en localStorage
    localStorage.setItem("selectedRing", selectedRing);

  });
});

// ===== CARGAR ARO GUARDADO =====
const savedRing = localStorage.getItem("selectedRing");

if (savedRing) {
  profileRing.className = "profile-ring " + savedRing;
}

// ===============================
// SISTEMA COMPLETO DE TAREAS
// ===============================
const taskList = document.getElementById("taskList");
const newTaskInput = document.getElementById("newTaskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const pointsDisplay = document.getElementById("pointsCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let points = parseInt(localStorage.getItem("userPoints")) || 0;

pointsDisplay.textContent = points;

// Renderizar tareas
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      <div>
        <input type="checkbox" class="form-check-input me-2"
               ${task.completed ? "checked" : ""}
               onchange="toggleTask(${index})">
        <span style="${task.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''}">
          ${task.text}
        </span>
      </div>
      <button class="btn btn-sm btn-outline-danger"
              onclick="deleteTask(${index})">
        <i class="fas fa-trash"></i>
      </button>
    `;

    taskList.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Agregar tarea
addTaskBtn.addEventListener("click", () => {
  const text = newTaskInput.value.trim();
  if (text === "") return;

  tasks.push({
    text: text,
    completed: false
  });

  newTaskInput.value = "";
  renderTasks();
});

// Enter agrega tarea
newTaskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTaskBtn.click();
});

// Marcar completada y sumar puntos
function toggleTask(index) {

  if (!tasks[index].completed) {
    points += 1; // ← cada tarea vale 10 puntos
  } else {
     
  }

  tasks[index].completed = !tasks[index].completed;

  localStorage.setItem("userPoints", points);
  pointsDisplay.textContent = points;

  renderTasks();
}

// Eliminar tarea
function deleteTask(index) {

  if (tasks[index].completed) {
    points -= 10; // quitar puntos si estaba completada
    localStorage.setItem("userPoints", points);
    pointsDisplay.textContent = points;
  }

  tasks.splice(index, 1);
  renderTasks();
}

// Inicializar
renderTasks();

// ===========================
// TIENDA
// ===========================

const shopOverlay = document.getElementById("shopOverlay");
const shopPoints = document.getElementById("shopPoints");

function openShop() {
  shopOverlay.style.display = "flex";
  shopPoints.textContent = points;
}

function closeShop() {
  shopOverlay.style.display = "none";
}

// Comprar
document.querySelectorAll(".buy-btn").forEach(btn => {

  btn.addEventListener("click", function() {

    const item = this.closest(".shop-item");
    const price = parseInt(item.dataset.price);

    if (points >= price) {
      points -= price;
      localStorage.setItem("userPoints", points);
      document.getElementById("pointsCount").textContent = points;
      shopPoints.textContent = points;

      alert("Compra exitosa 🎉");
    } else {
      alert("No tienes suficientes puntos 😢");
    }

  });

});
