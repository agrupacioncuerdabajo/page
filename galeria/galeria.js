window.addEventListener('scroll', function() {
    const header = document.getElementById('main-header');
    if (window.scrollY > 40) {
        header.classList.add('bg-gray-900');
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('bg-gray-900');
        header.classList.remove('header-scrolled');
    }
});
const menuToggle = document.getElementById('menu-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');

menuToggle.addEventListener('click', function() {
    dropdownMenu.classList.toggle('hidden');
});
const imageContainer = document.getElementById('imageContainer');
const prevBtn2 = document.getElementById('prevBtn2');
const nextBtn2 = document.getElementById('nextBtn2');
const images = imageContainer.children;
let currentIndex = 0;

function showImage(index) {
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    imageContainer.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
}

prevBtn2.addEventListener('click', () => showImage(currentIndex - 1));
nextBtn2.addEventListener('click', () => showImage(currentIndex + 1));

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
if (e.key === 'ArrowRight') showImage(currentIndex + 1);
});
const gallery = document.getElementById('gallery');
const loadMoreButton = document.getElementById('loadMore');
const totalImages = 64; // Total de imágenes
const imagesPerLoad = 16; // Número de imágenes a cargar por clic
let currentImageIndex = 0; // Índice actual de la imagen

function createGallery() {
    const end = Math.min(currentImageIndex + imagesPerLoad, totalImages);
    for (let i = currentImageIndex + 1; i <= end; i++) {
        const imgElement = document.createElement('img');
        imgElement.src = `img/img (${i}).jpg`; // Asegúrate de que la extensión sea correcta (jpg, png, etc.)
        imgElement.alt = `img (${i})`;
        imgElement.className = 'w-full h-full rounded-lg shadow-md';

        const div = document.createElement('div');
        div.className = 'gallery-item rounded-lg'; // Usamos la clase gallery-item
        div.appendChild(imgElement);
        gallery.appendChild(div);
    }
    currentImageIndex = end; // Actualiza el índice actual

    // Oculta el botón si no hay más imágenes
    if (currentImageIndex >= totalImages) {
        loadMoreButton.style.display = 'none';
    }
}

// Carga las primeras imágenes al inicio
createGallery();

// Maneja el clic en el botón "Ver más"
loadMoreButton.addEventListener('click', createGallery);