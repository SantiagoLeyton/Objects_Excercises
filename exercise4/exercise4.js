 // Array vacio que almacenara las citas
let appointments = [ ];

// Agendar una cita nueva
const scheduleAppointment = () => {
    // Obtener los valores de los campos de entrada
    const name = document.getElementById("name").value.trim();
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const doctor = document.getElementById("doctor").value;

    // Validar que todos lo campos esten llenos
    if (!name || !date || !time || !doctor) {
        alert("Please fill out all fields.");
        return;
    }

    // Crear el objeto de la cita para añadirlo al array
    const appointment = {
        name: name,
        date: date,
        time: time,
        doctor: doctor
    };
    appointments.push(appointment);
    
    // Un alert para indicar que la cita fue agendada y limpiar los espacios
    alert("Appointment scheduled successfully.");
    document.getElementById("name").value = "";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    document.getElementById("doctor").value = "";

    viewAppointments();
};

// Ver todas las citas ordenadas por hora y fecha
const viewAppointments = () => {
    appointments.sort((a, b) => { // Ornenar las citas por fecha y hora
        // Convertir la fecha y hora a un objeto Date para compararlos
        const dateTimeA = new Date(`${a.date}T${a.time}`);
        const dateTimeB = new Date(`${b.date}T${b.time}`);
        return dateTimeA - dateTimeB;
    });

    // Se limpiara la lista de clientes antes de mostrar la lista nueva
    const list = document.getElementById("appointmentList");
    list.innerHTML = "";

    appointments.forEach((appt, index) => { // Se mostraran las citas en forma de lista
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${appt.name} - ${appt.date} ${appt.time} with ${appt.doctor}`;
        list.appendChild(li);
    });
};

// Cancelar una cita
// Se le solicita al usuario el numero de cita que desea cancelar
const cancelAppointment = () => {
    // Validar que la cita que va a eliminar si exista
    const index = parseInt(document.getElementById("cancelIndex").value, 10) - 1;

    if (index >= 0 && index < appointments.length) {
        appointments.splice(index, 1);
        alert("Appointment cancelled.");
        viewAppointments();
    } else {
        alert("Invalid appointment number.");
    }

    document.getElementById("cancelIndex").value = "";
};