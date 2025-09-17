// Controlador de carruseles para Zaincky

// Variables globales para carruseles
let courseCurrentIndex = 0;
let testimonialCurrentIndex = 0;
let courseAutoplayInterval;
let testimonialAutoplayInterval;
let isAutoplayActive = true;

// Configuraciones
const carouselConfig = {
    courses: {
        itemsPerView: {
            desktop: 3,
            tablet: 2,
            mobile: 1
        },
        autoplayDelay: 5000,
        transitionDuration: 500
    },
    testimonials: {
        itemsPerView: {
            desktop: 4,
            tablet: 2,
            mobile: 1
        },
        autoplayDelay: 4000,
        transitionDuration: 500
    }
};

// Inicializar carruseles cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initCarousels();
});

// Función principal de inicialización de carruseles
function initCarousels() {
    setupCoursesCarousel();
    setupTestimonialsCarousel();
    setupAutoplay();
    setupCarouselControls();
    
    debugLog('Carruseles inicializados correctamente');
}

// Configurar carrusel de cursos
function setupCoursesCarousel() {
    const carousel = document.getElementById('coursesCarousel');
    if (!carousel) return;
    
    // Configurar estilos iniciales
    carousel.style.transform = 'translateX(0)';
    carousel.style.transition = `transform ${carouselConfig.courses.transitionDuration}ms ease-in-out`;
    
    updateCoursesView();
}

// Configurar carrusel de testimonios
function setupTestimonialsCarousel() {
    const carousel = document.getElementById('testimonialsCarousel');
    if (!carousel) return;
    
    // Configurar estilos iniciales
    carousel.style.transform = 'translateX(0)';
    carousel.style.transition = `transform ${carouselConfig.testimonials.transitionDuration}ms ease-in-out`;
    
    updateTestimonialsView();
}

// Navegación de cursos - Anterior
function previousCourse() {
    pauseAutoplay();
    const totalCourses = getAllCourses().length;
    const itemsPerView = getItemsPerView('courses');
    const maxIndex = Math.max(0, totalCourses - itemsPerView);
    
    courseCurrentIndex = Math.max(0, courseCurrentIndex - 1);
    updateCoursesView();
    updateCourseDots();
    
    resumeAutoplayAfterDelay();
}

// Navegación de cursos - Siguiente
function nextCourse() {
    pauseAutoplay();
    const totalCourses = getAllCourses().length;
    const itemsPerView = getItemsPerView('courses');
    const maxIndex = Math.max(0, totalCourses - itemsPerView);
    
    courseCurrentIndex = Math.min(maxIndex, courseCurrentIndex + 1);
    
    // Si llega al final, volver al inicio
    if (courseCurrentIndex >= maxIndex) {
        courseCurrentIndex = 0;
    }
    
    updateCoursesView();
    updateCourseDots();
    
    resumeAutoplayAfterDelay();
}

// Navegación de testimonios - Anterior
function previousTestimonial() {
    pauseAutoplay();
    const totalTestimonials = getRandomTestimonials(8).length;
    const itemsPerView = getItemsPerView('testimonials');
    const maxIndex = Math.max(0, totalTestimonials - itemsPerView);
    
    testimonialCurrentIndex = Math.max(0, testimonialCurrentIndex - 1);
    updateTestimonialsView();
    
    resumeAutoplayAfterDelay();
}

// Navegación de testimonios - Siguiente
function nextTestimonial() {
    pauseAutoplay();
    const totalTestimonials = getRandomTestimonials(8).length;
    const itemsPerView = getItemsPerView('testimonials');
    const maxIndex = Math.max(0, totalTestimonials - itemsPerView);
    
    testimonialCurrentIndex = Math.min(maxIndex, testimonialCurrentIndex + 1);
    
    // Si llega al final, volver al inicio
    if (testimonialCurrentIndex >= maxIndex) {
        testimonialCurrentIndex = 0;
    }
    
    updateTestimonialsView();
    
    resumeAutoplayAfterDelay();
}

// Ir a dot específico de cursos
function goToCourseDot(dotIndex) {
    pauseAutoplay();
    courseCurrentIndex = dotIndex;
    updateCoursesView();
    updateCourseDots();
    resumeAutoplayAfterDelay();
}

// Actualizar vista del carrusel de cursos
function updateCoursesView() {
    const carousel = document.getElementById('coursesCarousel');
    if (!carousel) return;
    
    const itemsPerView = getItemsPerView('courses');
    const itemWidth = getItemWidth('courses');
    const translateX = -courseCurrentIndex * itemWidth;
    
    carousel.style.transform = `translateX(${translateX}px)`;
    
    // Añadir clase de transición suave
    carousel.classList.add('transitioning');
    setTimeout(() => {
        carousel.classList.remove('transitioning');
    }, carouselConfig.courses.transitionDuration);
}

// Actualizar vista del carrusel de testimonios
function updateTestimonialsView() {
    const carousel = document.getElementById('testimonialsCarousel');
    if (!carousel) return;
    
    const itemsPerView = getItemsPerView('testimonials');
    const itemWidth = getItemWidth('testimonials');
    const translateX = -testimonialCurrentIndex * itemWidth;
    
    carousel.style.transform = `translateX(${translateX}px)`;
    
    // Añadir clase de transición suave
    carousel.classList.add('transitioning');
    setTimeout(() => {
        carousel.classList.remove('transitioning');
    }, carouselConfig.testimonials.transitionDuration);
}

// Actualizar dots activos
function updateCourseDots() {
    const dots = document.querySelectorAll('#courseDots .dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === courseCurrentIndex);
    });
}

// Obtener número de items por vista según el dispositivo
function getItemsPerView(carouselType) {
    const config = carouselConfig[carouselType];
    const width = window.innerWidth;
    
    if (width <= 768) {
        return config.itemsPerView.mobile;
    } else if (width <= 1024) {
        return config.itemsPerView.tablet;
    } else {
        return config.itemsPerView.desktop;
    }
}

// Obtener ancho del item
function getItemWidth(carouselType) {
    const carousel = document.getElementById(carouselType === 'courses' ? 'coursesCarousel' : 'testimonialsCarousel');
    if (!carousel) return 0;
    
    const firstItem = carousel.querySelector('.carousel-item');
    if (!firstItem) return 0;
    
    return firstItem.offsetWidth + parseInt(getComputedStyle(firstItem).marginRight);
}

// Configurar autoplay
function setupAutoplay() {
    if (!isAutoplayActive) return;
    
    // Autoplay para cursos
    courseAutoplayInterval = setInterval(() => {
        if (isElementVisible('coursesCarousel') && !document.hidden) {
            nextCourse();
        }
    }, carouselConfig.courses.autoplayDelay);
    
    // Autoplay para testimonios
    testimonialAutoplayInterval = setInterval(() => {
        if (isElementVisible('testimonialsCarousel') && !document.hidden) {
            nextTestimonial();
        }
    }, carouselConfig.testimonials.autoplayDelay);
}

// Pausar autoplay
function pauseAutoplay() {
    clearInterval(courseAutoplayInterval);
    clearInterval(testimonialAutoplayInterval);
}

// Reanudar autoplay después de un delay
function resumeAutoplayAfterDelay(delay = 3000) {
    setTimeout(() => {
        if (isAutoplayActive) {
            setupAutoplay();
        }
    }, delay);
}

// Configurar controles de carrusel
function setupCarouselControls() {
    // Pausar autoplay cuando el mouse está sobre el carrusel
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(container => {
        container.addEventListener('mouseenter', () => {
            pauseAutoplay();
        });
        
        container.addEventListener('mouseleave', () => {
            if (isAutoplayActive) {
                setupAutoplay();
            }
        });
    });
    
    // Pausar autoplay cuando la página no está visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pauseAutoplay();
        } else if (isAutoplayActive) {
            setupAutoplay();
        }
    });
    
    // Controles táctiles para móviles
    setupTouchControls();
}

// Configurar controles táctiles
function setupTouchControls() {
    const coursesContainer = document.querySelector('#coursesCarousel').parentElement;
    const testimonialsContainer = document.querySelector('#testimonialsCarousel').parentElement;
    
    if (coursesContainer) {
        setupSwipeGestures(coursesContainer, 'courses');
    }
    
    if (testimonialsContainer) {
        setupSwipeGestures(testimonialsContainer, 'testimonials');
    }
}

// Configurar gestos de swipe
function setupSwipeGestures(container, type) {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    const minSwipeDistance = 50;
    
    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    container.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        // Verificar si es un swipe horizontal
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe derecha (anterior)
                if (type === 'courses') {
                    previousCourse();
                } else {
                    previousTestimonial();
                }
            } else {
                // Swipe izquierda (siguiente)
                if (type === 'courses') {
                    nextCourse();
                } else {
                    nextTestimonial();
                }
            }
        }
    }, { passive: true });
}

// Verificar si un elemento es visible en el viewport
function isElementVisible(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Manejar resize de ventana
window.addEventListener('resize', debounce(() => {
    updateCoursesView();
    updateTestimonialsView();
    
    // Regenerar dots si es necesario
    const totalCourses = getAllCourses().length;
    generateCourseDots(totalCourses);
    updateCourseDots();
}, 250));

// Función debounce para optimizar resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Función para alternar autoplay (puede ser llamada desde la interfaz)
function toggleAutoplay() {
    isAutoplayActive = !isAutoplayActive;
    
    if (isAutoplayActive) {
        setupAutoplay();
        debugLog('Autoplay activado');
    } else {
        pauseAutoplay();
        debugLog('Autoplay desactivado');
    }
    
    return isAutoplayActive;
}

// Función para ir a un slide específico de cursos
function goToCourseSlide(index) {
    pauseAutoplay();
    const totalCourses = getAllCourses().length;
    const itemsPerView = getItemsPerView('courses');
    const maxIndex = Math.max(0, totalCourses - itemsPerView);
    
    courseCurrentIndex = Math.max(0, Math.min(maxIndex, index));
    updateCoursesView();
    updateCourseDots();
    resumeAutoplayAfterDelay();
}

// Función para ir a un slide específico de testimonios
function goToTestimonialSlide(index) {
    pauseAutoplay();
    const totalTestimonials = getRandomTestimonials(8).length;
    const itemsPerView = getItemsPerView('testimonials');
    const maxIndex = Math.max(0, totalTestimonials - itemsPerView);
    
    testimonialCurrentIndex = Math.max(0, Math.min(maxIndex, index));
    updateTestimonialsView();
    resumeAutoplayAfterDelay();
}

// Función para obtener información del estado actual de los carruseles
function getCarouselStatus() {
    return {
        courses: {
            currentIndex: courseCurrentIndex,
            totalItems: getAllCourses().length,
            itemsPerView: getItemsPerView('courses'),
            autoplayActive: isAutoplayActive
        },
        testimonials: {
            currentIndex: testimonialCurrentIndex,
            totalItems: getRandomTestimonials(8).length,
            itemsPerView: getItemsPerView('testimonials'),
            autoplayActive: isAutoplayActive
        }
    };
}

// Función para resetear carruseles a posición inicial
function resetCarouselsToStart() {
    courseCurrentIndex = 0;
    testimonialCurrentIndex = 0;
    
    updateCoursesView();
    updateTestimonialsView();
    updateCourseDots();
    
    debugLog('Carruseles reseteados a posición inicial');
}