document.getElementById('loginButton').addEventListener('click', () => {
    const documento = document.getElementById('documento').value.trim();
    const password = document.getElementById('password').value.trim();

    if (documento === '1234567890' && password === '12345') {
        window.location.href = 'dashboard.html';
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Credenciales incorrectas.',
            text: 'Por favor, valide los datos ingresados. ',
            customClass: {
                popup: 'swal-small'
            }
        })
    }
    
})