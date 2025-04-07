// Definimos la variable del contador de turnos
let turnCounter = 0;
// Creamos una cola de espera vacía donde se almacenarán los turnos
const waitingQueue = [];

// Muestra la cantidad total de turnos en cola
function totalShifts() {
  let shifts = document.getElementById("totalShift");

  // Si hay personas en espera, se muestra la cantidad total
  if (waitingQueue.length > 0) {
    shifts.innerHTML = `Total shifts: ${waitingQueue.length}`;
  } else {
    // Si no hay nadie en la cola, se muestra un mensaje
    shifts.innerHTML = `No turns in the queue.`;
  }
}

// Muestra todos los turnos actuales en la interfaz
function showTurns() {
  const queue = document.getElementById("queue");
  // Limpiamos el contenido anterior de la lista
  queue.innerHTML = ``;

  // Recorremos la cola de espera y agregamos cada turno como un <li>
  waitingQueue.forEach(turn => {
    const li = document.createElement('li');
    li.textContent = `${turn.username} ${turn.lastName}, Turn: ${turn.turn}`;
    queue.appendChild(li);
  });
}

// Actualiza y muestra el turno actual en pantalla
function updateCurrentTurn() {
  const currentTurn = document.getElementById("currentTurn");

  // Si hay alguien en la cola, se muestra su nombre y turno
  if (waitingQueue.length > 0) {
    const nextTurn = waitingQueue[0];
    currentTurn.textContent = `${nextTurn.username} ${nextTurn.lastName}, Turn: ${nextTurn.turn}`;
  } else {
    // Si la cola está vacía, se indica que no hay turnos
    currentTurn.textContent = "No turns in the queue.";
  }
}

// Función que toma los valores del input para crear un nuevo turno
function takeTurnFromInput() {
  // Expresión regular que valida que solo haya letras (mayúsculas o minúsculas, con tildes o Ñ)
  let symb0ls = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();

  // Verificamos que los campos no estén vacíos
  if (firstName === "" || lastName === "") {
    alert("Please enter both first and last name.");
    return;
  // Verificamos que no haya números ni símbolos
  } else if (!(symb0ls.test(firstName)) || !(symb0ls.test(lastName))) {
    alert("Please don't put numbers or symbols, only your name and last name");
    return;
  }

  // Si todo está bien, se toma el turno
  takeTurn(firstName, lastName);

  // Se limpian los inputs
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
}

// Función que crea un nuevo turno y lo añade a la cola
function takeTurn(firstName, lastName) {
  turnCounter++; // Incrementamos el contador global de turnos

  // Creamos el objeto turno
  const turn = {
    username: firstName,
    lastName: lastName,
    turn: turnCounter
  };

  // Agregamos el turno al final de la cola
  waitingQueue.push(turn);

  // Actualizamos la vista de la cola y el total de turnos
  showTurns();
  totalShifts();
}

// Función que llama al siguiente turno en la cola
function callTurn() {
  // Si hay turnos en espera
  if (waitingQueue.length > 0) {
    updateCurrentTurn(); // Mostramos el turno actual
    const turn = waitingQueue.shift(); // Quitamos el primero de la cola
    alert(`Turn called: ${turn.username} ${turn.lastName}, Turn: ${turn.turn}`);
    showTurns();     // Actualizamos la vista
    totalShifts();   // Actualizamos el contador total
  } else {
    // Si no hay turnos
    alert("No turns in the queue.");
  }
}