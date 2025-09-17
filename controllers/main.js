// Controlador principal de Zaincky
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Variables globales
let selectedPlan = null;
let selectedAmount = 0;

// Función principal de inicialización
function initializeApp() {
    setupNavigation();
    loadCourses();
    loadTestimonials();
    setupScrollAnimations();
    setupSmoothScrolling();
    
    console.log('Zaincky App inicializada correctamente');
}

// Configuración de navegación
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Toggle del menú móvil
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
}

// Carga de cursos
function loadCourses() {
    const coursesCarousel = document.getElementById('coursesCarousel');
    if (!coursesCarousel) return;
    
    const courses = getAllCourses();
    
    coursesCarousel.innerHTML = courses.map(course => `
        <div class="carousel-item">
            <div class="course-card">
                <div class="course-image">
                    <img src="${course.image}" alt="${course.title}" onerror="this.style.display='none'">
                    <div class="course-level ${course.level}">${course.difficulty}</div>
                </div>
                <div class="course-content">
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-description">${course.description}</p>
                    
                    <div class="course-meta">
                        <div class="meta-item">
                            <i class="fas fa-clock"></i>
                            <span>${course.duration}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-users"></i>
                            <span>${course.students}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-star"></i>
                            <span>${course.rating}/5</span>
                        </div>
                    </div>
                    
                    <ul class="course-features">
                        ${course.features.slice(0, 3).map(feature => `
                            <li><i class="fas fa-check"></i>${feature}</li>
                        `).join('')}
                    </ul>
                    
                    <div class="course-actions">
                        <button class="btn btn-secondary" onclick="showCourseDetails(${course.id})">
                            Saber Más
                        </button>
                        <button class="btn btn-primary" onclick="selectCourseAndPay(${course.id})">
                            Comenzar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    // Generar dots para navegación
    generateCourseDots(courses.length);
}

// Carga de testimonios
function loadTestimonials() {
    const testimonialsCarousel = document.getElementById('testimonialsCarousel');
    if (!testimonialsCarousel) return;
    
    const testimonials = getRandomTestimonials(8);
    
    testimonialsCarousel.innerHTML = testimonials.map(testimonial => `
        <div class="carousel-item">
            <div class="testimonial-card" onclick="openImageModal('${testimonial.image}', '${testimonial.name}')">
                <div class="testimonial-image">
                    <img src="${testimonial.image}" alt="Testimonio de ${testimonial.name}" onerror="this.src='assets/img/testimonials/placeholder.jpg'">
                </div>
                <h4 class="testimonial-name">${testimonial.name}</h4>
                <p class="testimonial-course">${testimonial.course}</p>
                <p class="testimonial-preview">"${testimonial.preview}"</p>
                <div class="click-hint">Click para ampliar</div>
            </div>
        </div>
    `).join('');
}

// Generar dots para cursos
function generateCourseDots(totalCourses) {
    const dotsContainer = document.getElementById('courseDots');
    if (!dotsContainer) return;
    
    // Calcular número de dots basado en cursos visibles
    const coursesPerView = window.innerWidth > 768 ? 3 : 1;
    const totalDots = Math.ceil(totalCourses / coursesPerView);
    
    dotsContainer.innerHTML = Array.from({length: totalDots}, (_, i) => 
        `<span class="dot ${i === 0 ? 'active' : ''}" onclick="goToCourseDot(${i})"></span>`
    ).join('');
}

// Función para seleccionar plan
function selectPlan(planType, amount) {
    selectedPlan = planType;
    selectedAmount = amount;
    
    // Scroll hacia métodos de pago o abrir modal
    showPaymentModal(planType, amount);
}

// Mostrar modal de pago (o redirigir)
function showPaymentModal(planType, amount) {
    const paymentUrl = `views/payment.html?plan=${planType}&amount=${amount}`;
    window.open(paymentUrl, '_blank');
}

// Mostrar detalles del curso
function showCourseDetails(courseId) {
    const courseUrl = `views/courses.html?id=${courseId}`;
    window.open(courseUrl, '_blank');
}

// Seleccionar curso y ir a pagar
function selectCourseAndPay(courseId) {
    // Guardar curso seleccionado en localStorage temporalmente
    localStorage.setItem('selectedCourse', courseId);
    
    // Scroll hacia los planes o mostrar modal
    const pricingSection = document.querySelector('.pricing');
    if (pricingSection) {
        pricingSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start' 
        });
        
        // Destacar tarjetas de precio temporalmente
        const pricingCards = document.querySelectorAll('.pricing-card');
        pricingCards.forEach(card => {
            card.style.animation = 'pulse 0.6s ease-in-out';
            setTimeout(() => {
                card.style.animation = '';
            }, 600);
        });
    }
}

// Modal de imagen
function openImageModal(imageSrc, altText) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    if (modal && modalImg) {
        modal.style.display = 'block';
        modalImg.src = imageSrc;
        modalImg.alt = altText || 'Testimonio';
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Cerrar modal al hacer clic fuera de la imagen
document.addEventListener('click', function(e) {
    const modal = document.getElementById('imageModal');
    if (e.target === modal) {
        closeImageModal();
    }
});

// Cerrar modal con escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeImageModal();
    }
});

// Configurar smooth scrolling
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Ajuste por header fijo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Configurar animaciones de scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos que se animan
    const animatedElements = document.querySelectorAll('.course-card, .testimonial-card, .pricing-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Función para manejar errores de carga de imágenes
function handleImageError(img) {
    img.style.display = 'none';
    
    // Mostrar placeholder o ícono alternativo
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.innerHTML = '<i class="fas fa-image"></i>';
    placeholder.style.cssText = `
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg-tertiary);
        color: var(--text-secondary);
        font-size: 2rem;
    `;
    
    img.parentElement.appendChild(placeholder);
}

// Función para mostrar loading
function showLoading(container) {
    if (container) {
        container.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Cargando...</p>
            </div>
        `;
    }
}

// Función para ocultar loading
function hideLoading(container) {
    const loading = container.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

// Función para manejar resize de ventana
window.addEventListener('resize', function() {
    // Regenerar dots si es necesario
    const courses = getAllCourses();
    if (courses) {
        generateCourseDots(courses.length);
    }
    
    // Reajustar carruseles
    resetCarousels();
});

// Función para resetear carruseles
function resetCarousels() {
    const coursesCarousel = document.getElementById('coursesCarousel');
    const testimonialsCarousel = document.getElementById('testimonialsCarousel');
    
    if (coursesCarousel) {
        coursesCarousel.style.transform = 'translateX(0)';
    }
    
    if (testimonialsCarousel) {
        testimonialsCarousel.style.transform = 'translateX(0)';
    }
    
    // Resetear dots activos
    const activeDots = document.querySelectorAll('.dot.active');
    activeDots.forEach(dot => dot.classList.remove('active'));
    
    const firstDots = document.querySelectorAll('.dot');
    if (firstDots.length > 0) {
        firstDots[0].classList.add('active');
    }
}

// Función utilitaria para formatear números
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}

// Función utilitaria para formatear precios
function formatPrice(price, currency = 'USD') {
    return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0
    }).format(price);
}

// Función para detectar dispositivo móvil
function isMobileDevice() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Función para debug (solo en desarrollo)
function debugLog(message, data = null) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log(`[Zaincky Debug] ${message}`, data);
    }
}