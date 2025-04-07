// Arreglo para guardar los registros de atención
let attentionLog = [ ];

// Función para registrar un nuevo usuario atendido
const registerAttention = () => {
    // Obtener los datos del formulario
    const id = document.getElementById("userId").value.trim();
    const module = document.getElementById("module").value;
    const type = document.getElementById("adviceType").value;

    // Validación básica de la cédula
    if (id === "" || id.length != 10 || isNaN(id)) {
        alert("Please enter an ID number.");
        return;
    }

    // Crear objeto de atención
    const attention = {
        id: id,
        module: module,
        type: module === "advice" ? type : "N/A"
    };

    // Agregar al arreglo de registros
    attentionLog.push(attention);

    // Mostrar confirmación
    alert("User successfully registered.");

    // Limpiar formulario
    document.getElementById("userId").value = "";
    document.getElementById("module").value = "phone";
    document.getElementById("adviceType").value = "student";
    document.getElementById("adviceTypeContainer").style.display = "none";

    // Actualizar estadísticas
    updateStats();
}

// Mostrar u ocultar tipo de asesoría según módulo
const toggleAdviceType = () => {
    const module = document.getElementById("module").value;
    const adviceContainer = document.getElementById("adviceTypeContainer");
    adviceContainer.style.display = module === "advice" ? "block" : "none";
}

// Función para actualizar estadísticas
const updateStats = () => {
    const total = attentionLog.length;

    const phoneCount = attentionLog.filter(att => att.module === "phone").length;
    const adviceStudent = attentionLog.filter(att => att.module === "advice" && att.type === "student").length;
    const adviceStaff = attentionLog.filter(att => att.module === "advice" && att.type === "staff").length;

    // Mostrar resultados
    document.getElementById("totalCount").textContent = `Total users attended: ${total}`;
    document.getElementById("phoneCount").textContent = `Phone calls: ${phoneCount}`;
    document.getElementById("studentAdviceCount").textContent = `Advice to students: ${adviceStudent}`;
    document.getElementById("staffAdviceCount").textContent = `Advice to staff: ${adviceStaff}`;
}

// Función para transferir de asesoría a llamada
const transferToPhone = () => {
    const id = prompt("Enter the ID of the user to transfer:");

    // Buscar atención con asesoría
    const found = attentionLog.find(att => att.id === id && att.module === "advice");

    if (found) {
        found.module = "phone";
        found.type = "N/A";
        alert("User transferred to phone call.");
        updateStats();
    } else {
        alert("No matching user found in advice module.");
    }
}