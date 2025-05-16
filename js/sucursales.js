const tableBody = document.getElementById('sucursalesTableBody');
const sucursales = [
    {
        nombre: 'Sucursal Norte',
        codigo: 'SN002',
        direccion: 'Avenida 15 #45-78',
        ciudad: 'Medellín',
        telefono: '3012345678',
        correo: 'norte@sucursal.com'
    },
    {
        nombre: 'Sucursal Sur',
        codigo: 'SS003',
        direccion: 'Carrera 8 #12-34',
        ciudad: 'Cali',
        telefono: '3023456789',
        correo: 'sur@sucursal.com'
    },
];

document.addEventListener('DOMContentLoaded', () => {
    renderizarSucursales();
});

function renderizarSucursales() {
    tableBody.innerHTML = '';

    sucursales.forEach((sucursal, index) => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
                <td>${sucursal.nombre}</td>
                <td>${sucursal.codigo}</td>
                <td>${sucursal.direccion}</td>
                <td>${sucursal.ciudad}</td>
                <td>${sucursal.telefono}</td>
                <td>${sucursal.correo}</td>
                <td>
                    <div class="tabla-icons">
                        <i class="fa-solid fa-pen-to-square" onclick="editarSucursal(${index})"></i>
                        <i class="fa-solid fa-trash" onclick="eliminarSucursal(${index})"></i>
                    </div>
                </td>
            `;

        tableBody.appendChild(fila);
    });
}

function eliminarSucursal(index) {
    Swal.fire({
        icon: 'question',
        text: '¿Estás seguro de eliminar esta sucursal?',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        customClass: {
            popup: 'swal-small'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            sucursales.splice(index, 1);
            renderizarSucursales();
            Swal.fire({
                icon: 'success',
                text: 'La sucursal fue eliminada.',
                customClass: {
                    popup: 'swal-small'
                }
            })
        }
    });
}

function editarSucursal(index) {
    const sucursal = sucursales[index];
    document.getElementById('nombre').value = sucursal.nombre;
    document.getElementById('codigo').value = sucursal.codigo;
    document.getElementById('direccion').value = sucursal.direccion;
    document.getElementById('ciudad').value = sucursal.ciudad;
    document.getElementById('telefono').value = sucursal.telefono;
    document.getElementById('correo').value = sucursal.correo;

    sucursales.splice(index, 1);
    renderizarSucursales();
}

document.getElementById('saveButton').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value.trim();
    const codigo = document.getElementById('codigo').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const ciudad = document.getElementById('ciudad').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const correo = document.getElementById('correo').value.trim();

    if (!nombre || !codigo || !direccion || !ciudad || !telefono || !correo) {
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
        text: 'La sucursal se registró de forma exitosa. ',
        customClass: {
            popup: 'swal-small'
        }
    });

    const sucursal = {
        nombre: nombre,
        codigo: codigo,
        direccion: direccion,
        ciudad: ciudad,
        telefono: telefono,
        correo: correo
    };

    sucursales.push(sucursal);
    renderizarSucursales();

    document.getElementById('nombre').value = '';
    document.getElementById('codigo').value = '';
    document.getElementById('direccion').value = '';
    document.getElementById('ciudad').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('correo').value = '';
});

