//Slider function
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


const menuToggle = document.getElementById('menu-toggle');
const dropdownMenu = document.getElementById('dropdown-menu');

menuToggle.addEventListener('click', function() {
    dropdownMenu.classList.toggle('hidden');
});
const products = [
    { 
        id: 1, 
        title: "Música Carranguera", 
        description: "Disfruta de un show de una hora con la mejor música carranguera para bailar.", 
        duration: "1 hora", 
        price: "Con servicio de sonido: $350,000 - Sin servicio de sonido: $300,000", 
        vidyt: "https://www.youtube.com/embed/OIymNUeuJIA?si=PBuNS7uuIK_Ju6xz",
        image: "https://i.postimg.cc/rwgvbsz5/img-4.jpg" // Nueva imagen aleatoria
    },
    { 
        id: 2, 
        title: "Música Parrandera", 
        description: "Un show vibrante con la mejor música parrandera bailable.", 
        duration: "1 hora", 
        price: "Con servicio de sonido: $350,000 - Sin servicio de sonido: $300,000", 
        vidyt: "https://www.youtube.com/embed/f81I3x0BKH4?start=7&si=HSxCHnkCQvXgMe1Y",
        image: "https://i.postimg.cc/cLQJ8Q90/img-6.jpg" // Nueva imagen aleatoria
    },
    { 
        id: 3, 
        title: "Música Dicembrina", 
        description: "Celebra la temporada con el mejor show de música de diciembre.", 
        duration: "1 hora", 
        price: "Con servicio de sonido: $600,000 - Sin servicio de sonido: $500,000", 
        vidyt: "https://www.youtube.com/embed/UJvBnxgmWd8?start=12&si=NjaDvYwpBkfTqTbx",
        image: "https://i.postimg.cc/MH8PXJvW/img-2.jpg" // Nueva imagen aleatoria
    },
    { 
        id: 4, 
        title: "Música Tropical", 
        description: "Disfruta de una fiesta tropical con ritmos alegres y bailables.", 
        duration: "1 hora", 
        price: "Con servicio de sonido: $400,000 - Sin servicio de sonido: $350,000", 
        vidyt: "https://www.youtube.com/embed/J9Fay9smjkg",
        image: "https://i.postimg.cc/t4tXg9Jg/img-7.jpg" // Nueva imagen aleatoria
    },
    { 
        id: 5, 
        title: "Música Vallenata", 
        description: "Una hora de música vallenata para disfrutar en cualquier ocasión.", 
        duration: "1 hora", 
        price: "Con servicio de sonido: $450,000 - Sin servicio de sonido: $400,000", 
        vidyt: "https://www.youtube.com/embed/8f4lUn_jnIk",
        image: "https://i.postimg.cc/Y2YQMyYC/img-15.jpg" // Nueva imagen aleatoria
    }
];


const productsGrid = document.getElementById('products-grid');
const productInfo = document.getElementById('product-info');
const productTitle = document.getElementById('product-title');
const productDescription = document.getElementById('product-description');
const productDuration = document.getElementById('product-duration');
const productPrice = document.getElementById('product-price');
const videoIframe = document.getElementById('video-iframe'); 
const productDetailsTitle = document.getElementById('product-details-title');
const productDetailsText = document.getElementById('product-details-text');
const pagination = document.getElementById('pagination');

const productsPerPage = 2;
let currentPage = 1;

function renderProducts() {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const visibleProducts = products.slice(startIndex, endIndex);

    // Limpiar el grid
    productsGrid.innerHTML = '';
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
    // Crear tarjetas para los productos visibles
    visibleProducts.forEach((product) => {
        const card = document.createElement('div');
        card.classList.add("bg-gray-900",'text-white', "shadow-xl", "overflow-hidden", "transition-transform", "duration-300", "hover:scale-105", "focus-within:ring-2", "focus-within:ring-pink-500", 'rounded-lg');
        card.setAttribute("tabindex", "0");

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = `Product ${product.id}`;
        img.classList.add("w-full", "h-48", "object-cover");

        const content = document.createElement('div');
        content.classList.add("p-4");

        const title = document.createElement('h3');
        title.classList.add("text-lg", "font-semibold");
        title.textContent = product.title;

        content.appendChild(title);
        card.appendChild(img);
        card.appendChild(content);
        productsGrid.appendChild(card);

        card.addEventListener('click', () => {
            productTitle.textContent = product.title;
            productDescription.textContent = product.description;
            productPrice.textContent = product.price;
            productInfo.classList.remove('hidden');
        
            // Reemplazar el video en el iframe con el de la tarjeta seleccionada
            videoIframe.src = product.vidyt;
        
            // Solo desplazar la página hasta el video si la pantalla es de tamaño móvil
            if (window.innerWidth <= 768) {
                const videoSection = document.querySelector('#video-iframe');
                videoSection.scrollIntoView({ behavior: 'smooth' });
            }
        
            // Ocultar la sección de detalles del producto
            productDetailsTitle.classList.add('hidden');
            productDetailsText.classList.add('hidden');
        });
        
        

        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                card.click();
            }
        });
    });
    renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(products.length / productsPerPage);
    pagination.innerHTML = '';

    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Anterior';
        prevButton.classList.add('px-4', 'py-2', 'bg-gray-300', 'hover:bg-gray-400', 'text-gray-800', 'rounded-l', 'mr-2');
        prevButton.addEventListener('click', () => {
            currentPage--;
            renderProducts();
        });
        pagination.appendChild(prevButton);
    }

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('px-4', 'py-2', 'bg-gray-200', 'hover:bg-gray-300', 'text-gray-800', 'rounded', 'mx-2'); // Aquí se agrega 'mx-2'
        if (i === currentPage) {
            pageButton.classList.add('bg-blue-500', 'text-white');
        }
        pageButton.addEventListener('click', () => {
            currentPage = i;
            renderProducts();
        });
        pagination.appendChild(pageButton);
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Siguiente';
        nextButton.classList.add('px-4', 'py-2', 'bg-gray-300', 'hover:bg-gray-400', 'text-gray-800', 'rounded-r', 'ml-2'); // Aquí se agrega 'ml-2'
        nextButton.addEventListener('click', () => {
            currentPage++;
            renderProducts();
        });
        pagination.appendChild(nextButton);
    }
}


renderProducts();