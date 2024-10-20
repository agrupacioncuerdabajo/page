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
const imageLinks = [
    "https://i.postimg.cc/wMcWm4mD/img-1.jpg",
    "https://i.postimg.cc/vTrQ6yhX/img-10.jpg",
    "https://i.postimg.cc/SKhfWfmr/img-11.jpg",
    "https://i.postimg.cc/fLH7Q4m2/img-12.jpg",
    "https://i.postimg.cc/tgqVqSXL/img-13.jpg",
    "https://i.postimg.cc/FsSSDkWn/img-14.jpg",
    "https://i.postimg.cc/Y2YQMyYC/img-15.jpg",
    "https://i.postimg.cc/rwKmFK3N/img-16.jpg",
    "https://i.postimg.cc/V6BsHM0m/img-17.jpg",
    "https://i.postimg.cc/5y49c08v/img-18.jpg",
    "https://i.postimg.cc/MH8PXJvW/img-2.jpg",
    "https://i.postimg.cc/Tw9L5B9V/img-21.jpg",
    "https://i.postimg.cc/LXC4pSDb/img-22.jpg",
    "https://i.postimg.cc/Y0vr2Pyq/img-23.jpg",
    "https://i.postimg.cc/fLLZ5Fsj/img-24.jpg",
    "https://i.postimg.cc/HLjd9Rd0/img-25.jpg",
    "https://i.postimg.cc/CxkjLPWN/img-27.jpg",
    "https://i.postimg.cc/Vk8FMP9T/img-28.jpg",
    "https://i.postimg.cc/FKBwr6yR/img-3.jpg",
    "https://i.postimg.cc/P5S8qgS1/img-30.jpg",
    "https://i.postimg.cc/FsgTTKKm/img-33.jpg",
    "https://i.postimg.cc/k5Zs26TN/img-34.jpg",
    "https://i.postimg.cc/gc4w4FPQ/img-36.jpg",
    "https://i.postimg.cc/rmM101Sr/img-39.jpg",
    "https://i.postimg.cc/rwgvbsz5/img-4.jpg",
    "https://i.postimg.cc/9FbQCGfk/img-41.jpg",
    "https://i.postimg.cc/1XPyZt1P/img-42.jpg",
    "https://i.postimg.cc/zXB9HWj6/img-43.jpg",
    "https://i.postimg.cc/zfmMQQrY/img-44.jpg",
    "https://i.postimg.cc/RhQKMN3T/img-45.jpg",
    "https://i.postimg.cc/1Xwh4ZPB/img-47.jpg",
    "https://i.postimg.cc/hv96cbb3/img-48.jpg",
    "https://i.postimg.cc/rmR7YLdT/img-49.jpg",
    "https://i.postimg.cc/MG7jqk20/img-5.jpg",
    "https://i.postimg.cc/pXK5MhNh/img-51.jpg",
    "https://i.postimg.cc/MpdTz19T/img-52.jpg",
    "https://i.postimg.cc/Bv7XB2Fy/img-53.jpg",
    "https://i.postimg.cc/MThHhxdm/img-54.jpg",
    "https://i.postimg.cc/hj9RtBKr/img-55.jpg",
    "https://i.postimg.cc/g2n96RYr/img-56.jpg",
    "https://i.postimg.cc/3NJfQ5NW/img-57.jpg",
    "https://i.postimg.cc/ncrSdJNP/img-58.jpg",
    "https://i.postimg.cc/pdb0Xnrw/img-59.jpg",
    "https://i.postimg.cc/cLQJ8Q90/img-6.jpg",
    "https://i.postimg.cc/j5vvXgcT/img-60.jpg",
    "https://i.postimg.cc/C5Q7yR96/img-61.jpg",
    "https://i.postimg.cc/dVKdhRRj/img-62.jpg",
    "https://i.postimg.cc/vBDxJ0Mb/img-63.jpg",
    "https://i.postimg.cc/6pwzG4Cn/img-64.jpg",
    "https://i.postimg.cc/t4tXg9Jg/img-7.jpg",
    "https://i.postimg.cc/6QpyJ8cK/img-8.jpg",
    "https://i.postimg.cc/BvzZrMt5/img-9.jpg"
];

const imagesPerLoad = 16; // Número de imágenes a cargar por clic
let currentImageIndex = 0; // Índice actual de la imagen

function createGallery() {
    const end = Math.min(currentImageIndex + imagesPerLoad, imageLinks.length);
    for (let i = currentImageIndex; i < end; i++) {
        const imgElement = document.createElement('img');
        imgElement.src = imageLinks[i];
        imgElement.alt = `Imagen ${i + 1}`;
        imgElement.className = 'w-full h-full rounded-lg shadow-md';

        const div = document.createElement('div');
        div.className = 'gallery-item rounded-lg'; // Usamos la clase gallery-item
        div.appendChild(imgElement);
        gallery.appendChild(div);
    }
    currentImageIndex = end; // Actualiza el índice actual

    // Oculta el botón si no hay más imágenes para cargar
    if (currentImageIndex >= imageLinks.length) {
        loadMoreButton.style.display = 'none';
    }
}

// Carga las primeras imágenes al inicio
createGallery();

// Añade funcionalidad al botón de cargar más imágenes
loadMoreButton.addEventListener('click', createGallery);
