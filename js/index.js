// Header

const menuToggle = document.getElementById('menu-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');

menuToggle.addEventListener('click', function() {
    dropdownMenu.classList.toggle('hidden'); 
});



// Configuración inicial de Three.js

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('3d-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5; // Distancia de la cámara


//  Luz hemisferica
const hemiLight = new THREE.HemisphereLight(0xfd9904, 0x404040, 0.5); 
hemiLight.position.set(0, 10, 0);
scene.add(hemiLight);

// Luz direciconal derecha
const directionalLight = new THREE.DirectionalLight(0xff0000, 1);
directionalLight.position.set(10, 10, 5).normalize();
directionalLight.castShadow = true;
scene.add(directionalLight);

// Luz frontal
const frontLight = new THREE.DirectionalLight(0xffffff, 1);
frontLight.position.set(0, 5, 10).normalize();
frontLight.castShadow = true;
scene.add(frontLight);

// Luz ambiente
const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
scene.add(ambientLight);


// Carga del modelo 3D GLTF/GLB
let loader = new THREE.GLTFLoader();
let model;
loader.load('../js/icon.glb', function(gltf) {
    model = gltf.scene;
    scene.add(model);

    model.scale.set(3.5, 3.8, 3.5);

    model.rotation.x = Math.PI / 9; 
    model.rotation.y = Math.PI / 0.9; 
    model.rotation.z = 0; 

    initialRotationX = model.rotation.x;
    initialRotationY = model.rotation.y;

    model.position.set(2.5, 0, 0);

    function adjustModelPosition() {
        if (window.innerWidth < 640) {
            model.rotation.y = 5.2;
            initialRotationY = model.rotation.y;

            model.rotation.x = 0.2; 
            initialRotationX = model.rotation.x;
            model.scale.set(0.8,0.8,0.8);
            model.position.set(1.1, 1.5, 0);
        } else {
            model.position.set(2.5, 0, 0);
        }
    }

    window.addEventListener('resize', adjustModelPosition);
    adjustModelPosition()

}, undefined, function(error) {
    console.error(error);
});

// Variables para controlar el movimiento del modelo 3D
let targetRotationX = 0;
let targetRotationY = 0;
let rotationSpeed = 0.05;
let isMobile = window.innerWidth < 640; // Detectar si es móvil

// Limites de rotacion
const minRotationX = -Math.PI / 4;
const maxRotationX = Math.PI / 4;
const minRotationY = -Math.PI / 2;
const maxRotationY = Math.PI / 2;



if (!isMobile) {
    document.addEventListener('mousemove', (event) => {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = (event.clientY / window.innerHeight) * 2 - 1;

        targetRotationX = mouseY * 0.5;
        targetRotationY = mouseX * 0.5;
    });
} else {
    // Detectar movimiento del dispositivo móvil
    window.addEventListener('deviceorientation', (event) => {
        const gamma = event.gamma || 0; // Eje Y (horizontal)
        const beta = event.beta || 0;   // Eje X (vertical)

        // Ajustar las rotaciones en función del movimiento del dispositivo
        targetRotationX = beta * 0.01; // Ajustar sensibilidad
        targetRotationY = gamma * 0.01;
    });
}
// Animación y renderizado
function animate() {
    requestAnimationFrame(animate);

    if (model) {
        // Mantén las rotaciones iniciales y añade el ajuste del mouse
        model.rotation.x += ((initialRotationX + targetRotationX) - model.rotation.x) * rotationSpeed;
        model.rotation.y += ((initialRotationY + targetRotationY) - model.rotation.y) * rotationSpeed;

        model.rotation.x = Math.max(minRotationX, Math.min(maxRotationX, model.rotation.x));            }

    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    isMobile = window.innerWidth < 640; // Actualizar la detección móvil
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

// Verificar el tamaño de la pantalla y activar parallax
function activarParallax() {
    // Eliminar todos los eventos de parallax existentes
    document.removeEventListener('mousemove', parallaxMouse);
    window.removeEventListener('deviceorientation', parallaxTilt);

    // Solo activar el parallax de mouse si la pantalla es más grande que 768px
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', parallaxMouse);
    } else {
        // Activar parallax basado en inclinación para pantallas pequeñas
        window.addEventListener('deviceorientation', parallaxTilt);
    }
}

// Ejecutar al cargar y al redimensionar
activarParallax();
window.addEventListener('resize', activarParallax);
