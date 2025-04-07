//Lista para almacenar los usuarios atendidos
const users = [];

//Función para registrar un usuario
function registerUser(id, type, module) {
    users.push({ id, type, module });
}

// Función para transferir asesoría a llamada telefónica
function transferToCall(id) {
    const user = users.find(user => user.id === id && user.module === 'asesoría');
    if (user) {
        user.module = 'llamada telefónica';
    } else {
        console.error('User not found or not in asesoría module');
    }
}

// Función para generar estadísticas
function generateStatistics() {
    const totalUsers = users.length;

    const byType = users.reduce((acc, user) => {
        acc[user.type] = (acc[user.type] || 0) + 1;
        return acc;
    }, {});

    const byModule = users.reduce((acc, user) => {
        acc[user.module] = (acc[user.module] || 0) + 1;
        return acc;
    }, {});

    return {
        totalUsers,
        byType,
        byModule
    };
}

// Add users manually

function addUser() {
    let Id = 0
    let Type;
    let Module;

    while(true){
        Id = parseInt(prompt('Please put you ID here.'))
        if(Id.length < 10) {
            alert(`Your ID is too short, it must have at least 10 numbers.`)
        } else if (Id.length > 10) {
            alert(`Your ID is too long, it must have at least 10 numbers.`)
        } else {
            break;
        };
    };

    while(true){
        Type = prompt(`What is your role at the university?\n1. Student\n2. Teacher\n3. Director\n4. Attendant\n5. Particular`);
        switch(Type){
            case 1: 
                Type = "student";
                break;
            case 2:
                Type = "teacher";
                break;
            case 3:
                Type = "director";
                break;
            case 4:
                Type = "attendant";
                break;
            case 5:
                Type = "particular";
                break;
            default:
                alert(`Please choose an option`);
        };
    };

    //CONTINUAR AQUI
}