// Header

const menuToggle = document.getElementById('menu-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');

menuToggle.addEventListener('click', function() {
    dropdownMenu.classList.toggle('hidden'); 
});


// Efecto parallax

// Funciones de efecto parallax para cada tipo de pantalla
function parallaxMouse(event) {
    const x = (window.innerWidth - event.pageX) / 100;
    const y = (window.innerHeight - event.pageY) / 100;

    // Parallax en otros elementos
    document.getElementById('text1').style.transform = `translate(${x * 2}px, ${y * 2}px)`;
    document.getElementById('text2').style.transform = `translate(${x * 3}px, ${y * 2}px)`;
    document.getElementById('text3').style.transform = `translate(${x * 2}px, ${y * 4}px)`;
    document.getElementById('buy-button').style.transform = `translate(${x * 2}px, ${y * 2}px)`;
}

function parallaxTilt(event) {
    const tiltX = event.beta; // Inclinación adelante/atrás (-180 a 180)
    const tiltY = event.gamma; // Inclinación izquierda/derecha (-90 a 90)

    // Calcular un valor de parallax basado en la inclinación
    const x = (tiltY / 90) * 20; // Escala la inclinación Y a un rango más pequeño para el efecto parallax
    const y = (tiltX / 90) * 20; // Escala la inclinación X a un rango más pequeño para el efecto parallax

    // Parallax en otros elementos
    document.getElementById('text1').style.transform = `translate(${x * 1}px, ${y * 1}px)`;
    document.getElementById('text2').style.transform = `translate(${x * 2}px, ${y * 1}px)`;
    document.getElementById('text3').style.transform = `translate(${x * 1}px, ${y * 3}px)`;
    document.getElementById('buy-button').style.transform = `translate(${x * 1}px, ${y * 1}px)`;
}

// Solicitar permiso para el uso del giroscopio en móviles
function solicitarPermisoGiroscopio() {
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', parallaxTilt);
                }
            })
            .catch(console.error);
    } else {
        // Si el navegador no requiere permisos, activar directamente el parallax
        window.addEventListener('deviceorientation', parallaxTilt);
    }
}

// Verificar el tamaño de la pantalla y activar parallax
function activarParallax() {
    // Eliminar todos los eventos de parallax existentes
    document.removeEventListener('mousemove', parallaxMouse);
    window.removeEventListener('deviceorientation', parallaxTilt);

    // Solo activar el parallax de mouse si la pantalla es más grande que 768px
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', parallaxMouse);
    } else {
        // Activar parallax basado en giroscopio para pantallas pequeñas
        solicitarPermisoGiroscopio();
    }
}

// Ejecutar al cargar y al redimensionar
activarParallax();
window.addEventListener('resize', activarParallax);
