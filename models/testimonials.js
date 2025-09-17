// Modelo de datos para testimonios
const testimonialsData = [
    {
        id: 1,
        name: "Carlos Mendoza",
        course: "Opciones Binarias",
        image: "assets/img/testimonials/carlos-mendoza.jpg",
        preview: "Increíbles resultados en solo 3 meses...",
        location: "México City, MX",
        achievement: "$2,450 en ganancias mensuales",
        date: "Marzo 2024"
    },
    {
        id: 2,
        name: "Ana Patricia Silva",
        course: "SMMA Mastery",
        image: "assets/img/testimonials/ana-silva.jpg",
        preview: "Mi agencia factura $8,500 mensuales...",
        location: "Lima, Perú",
        achievement: "Agencia de 12 clientes activos",
        date: "Febrero 2024"
    },
    {
        id: 3,
        name: "Miguel Rodriguez",
        course: "OnlyFans para Hombres",
        image: "assets/img/testimonials/miguel-rodriguez.jpg",
        preview: "Pasé de $0 a $1,200 mensuales...",
        location: "Buenos Aires, AR",
        achievement: "$1,200+ mensuales recurrentes",
        date: "Enero 2024"
    },
    {
        id: 4,
        name: "Isabella Martín",
        course: "OnlyFans para Mujeres",
        image: "assets/img/testimonials/isabella-martin.jpg",
        preview: "Libertad financiera total en 6 meses...",
        location: "Madrid, España",
        achievement: "$4,800+ mensuales",
        date: "Abril 2024"
    },
    {
        id: 5,
        name: "Roberto Chen",
        course: "OnlyFans con IA",
        image: "assets/img/testimonials/roberto-chen.jpg",
        preview: "La automatización cambió mi negocio...",
        location: "Barcelona, España",
        achievement: "300% incremento en eficiencia",
        date: "Mayo 2024"
    },
    {
        id: 6,
        name: "Sofía Delgado",
        course: "SMMA Mastery",
        image: "assets/img/testimonials/sofia-delgado.jpg",
        preview: "Dejé mi trabajo corporativo gracias a Zaincky...",
        location: "Bogotá, Colombia",
        achievement: "$6,200 mensuales estables",
        date: "Marzo 2024"
    },
    {
        id: 7,
        name: "Diego Vargas",
        course: "Opciones Binarias Pro",
        image: "assets/img/testimonials/diego-vargas.jpg",
        preview: "Estrategias que realmente funcionan...",
        location: "Santiago, Chile",
        achievement: "85% de trades exitosos",
        date: "Abril 2024"
    },
    {
        id: 8,
        name: "Valentina Castro",
        course: "OnlyFans para Mujeres",
        image: "assets/img/testimonials/valentina-castro.jpg",
        preview: "Top 1% en la plataforma en 4 meses...",
        location: "Medellín, Colombia",
        achievement: "Top 1% creadora global",
        date: "Febrero 2024"
    },
    {
        id: 9,
        name: "Lucas Fernandez",
        course: "SMMA Mastery",
        image: "assets/img/testimonials/lucas-fernandez.jpg",
        preview: "Equipo de 5 personas y creciendo...",
        location: "Montevideo, Uruguay",
        achievement: "Agencia de 20+ clientes",
        date: "Mayo 2024"
    },
    {
        id: 10,
        name: "Camila Torres",
        course: "OnlyFans con IA",
        image: "assets/img/testimonials/camila-torres.jpg",
        preview: "La IA me permitió escalar sin límites...",
        location: "Quito, Ecuador",
        achievement: "$3,100+ mensuales automatizados",
        date: "Junio 2024"
    }
];

// Función para obtener todos los testimonios
function getAllTestimonials() {
    return testimonialsData;
}

// Función para obtener un testimonio por ID
function getTestimonialById(id) {
    return testimonialsData.find(testimonial => testimonial.id === parseInt(id));
}

// Función para obtener testimonios por curso
function getTestimonialsByCourse(courseName) {
    return testimonialsData.filter(testimonial => 
        testimonial.course.toLowerCase().includes(courseName.toLowerCase())
    );
}

// Función para obtener testimonios recientes
function getRecentTestimonials(limit = 5) {
    // Ordenar por fecha (más recientes primero)
    const monthOrder = {
        'Junio': 6, 'Mayo': 5, 'Abril': 4, 'Marzo': 3, 'Febrero': 2, 'Enero': 1
    };
    
    return testimonialsData
        .sort((a, b) => {
            const monthA = monthOrder[a.date.split(' ')[0]];
            const monthB = monthOrder[b.date.split(' ')[0]];
            return monthB - monthA;
        })
        .slice(0, limit);
}

// Función para obtener testimonios aleatorios
function getRandomTestimonials(limit = 4) {
    const shuffled = [...testimonialsData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, limit);
}

// Función para obtener testimonios por ubicación
function getTestimonialsByLocation(country) {
    return testimonialsData.filter(testimonial => 
        testimonial.location.toLowerCase().includes(country.toLowerCase())
    );
}

// Función para obtener estadísticas de testimonios
function getTestimonialsStats() {
    const totalTestimonials = testimonialsData.length;
    const courseStats = {};
    const locationStats = {};
    
    testimonialsData.forEach(testimonial => {
        // Estadísticas por curso
        courseStats[testimonial.course] = (courseStats[testimonial.course] || 0) + 1;
        
        // Estadísticas por ubicación (país)
        const country = testimonial.location.split(',')[1]?.trim() || testimonial.location;
        locationStats[country] = (locationStats[country] || 0) + 1;
    });
    
    return {
        total: totalTestimonials,
        byCourse: courseStats,
        byLocation: locationStats
    };
}