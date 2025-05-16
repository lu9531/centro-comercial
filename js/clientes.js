const tableBody = document.getElementById('clientesTableBody');
const clientes = [
  {
    documento: '12345678',
    nombre: 'Juan Pérez',
    correo: 'juan@example.com'
  },
  {
    documento: '87654321',
    nombre: 'María López',
    correo: 'maria@example.com'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  renderizarClientes();
});

function renderizarClientes() {
    tableBody.innerHTML = '';

    clientes.forEach((cliente, index) => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
                <td>${cliente.documento}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.correo}</td>
                <td>
                    <div class="tabla-icons">
                        <i class="fa-solid fa-pen-to-square" onclick="editarCliente(${index})"></i>
                        <i class="fa-solid fa-trash" onclick="eliminarCliente(${index})"></i>
                    </div>
                </td>
            `;

        tableBody.appendChild(fila);
    });
}

function eliminarCliente(index) {
    Swal.fire({
        icon: 'question',
        text: '¿Estás seguro de eliminar este cliente?',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        customClass: {
            popup: 'swal-small'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            clientes.splice(index, 1);
            renderizarClientes();
            Swal.fire({
                icon: 'success',
                text: 'El cliente fue eliminado.',
                customClass: {
                    popup: 'swal-small'
                }
            })
        }
    });
}

function editarCliente(index) {
    const cliente = clientes[index];
    document.getElementById('documentNumber').value = cliente.documento;
    document.getElementById('fullName').value = cliente.nombre;
    document.getElementById('email').value = cliente.correo;

    clientes.splice(index, 1);
    renderizarClientes();
}

document.getElementById('saveButton').addEventListener('click', () => {
    const numeroDocumento = document.getElementById('documentNumber').value.trim();
    const nombreCompleto = document.getElementById('fullName').value.trim();
    const correo = document.getElementById('email').value.trim();

    if (!numeroDocumento || !nombreCompleto || !correo) {
        Swal.fire({
            icon: 'info',
            text: 'Todos los campos son obligatorios.',
            customClass: {
                popup: 'swal-small'
            }
        });
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        Swal.fire({
            icon: 'error',
            text: 'Por favor ingrese un correo válido.',
            customClass: {
                popup: 'swal-small'
            }
        });
        return;
    }

    Swal.fire({
        icon: 'success',
        text: 'El usuario se registró de forma exitosa. ',
        customClass: {
            popup: 'swal-small'
        }
    });

    const cliente = {
        documento: numeroDocumento,
        nombre: nombreCompleto,
        correo: correo
    };

    clientes.push(cliente);
    renderizarClientes();

    document.getElementById('documentNumber').value = '';
    document.getElementById('fullName').value = '';
    document.getElementById('email').value = '';
});

