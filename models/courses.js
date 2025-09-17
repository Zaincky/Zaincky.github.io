// Modelo de datos para los cursos  high
const coursesData = [
    {
        id: 1,
        title: "Opciones Binarias",
        description: "Domina el trading de opciones binarias con estrategias probadas y gestión de riesgo profesional.",
        image: "assets/img/courses/binary-options.jpg",
        level: "intermediate",
        difficulty: "Intermedio",
        initialCapital: "$100 - $500",
        riskLevel: "medium",
        duration: "+10 horas",
        students: "1,250+",
        rating: 5,
        features: [
            "Análisis técnico avanzado",
            "Estrategias de entrada y salida",
            "Gestión de capital y riesgo",
            "Psicología del trading",
            "Herramientas y plataformas",
            "Soporte en vivo",
            "y mucho mas..."
        ],
        topics: [
            "Fundamentos de opciones binarias",
            "Análisis de gráficos y patrones",
            "Indicadores técnicos clave",
            "Estrategias de 60 segundos",
            "Gestión emocional",
            "y mucho mas..."
        ],
        requirements: [
            "Conocimientos básicos de trading",
            "Capital inicial mínimo $100",
            "Dedicación de 2-3 horas diarias",
            "Computadora o celular con internet estable"
        ],
        benefits: [
            "Potencial de ganancias rápidas",
            "Flexibilidad horaria total",
            "Bajas barreras de entrada",
            "torneos con premios exclusivos",
            "Resultados medibles",
            "y mucho mas..."
        ],
        warnings: [
            "Alto riesgo de pérdida de capital",
            "Requiere disciplina y control emocional",
            "No garantiza ganancias al instante",
            "Mercado altamente volátil"
        ]
    },
    {
        id: 2,
        title: "SMMA Mastery",
        description: "Construye y escala tu agencia de marketing en redes sociales desde cero hasta 5 cifras mensuales.",
        image: "assets/img/courses/smma.jpg",
        level: "beginner",
        difficulty: "Principiante",
        initialCapital: "$0 - $1,000",
        riskLevel: "low",
        duration: "+10 horas",
        students: "2,180+",
        rating: 5,
        features: [
            "Creación de agencia desde cero",
            "Captación de clientes",
            "Sistemas de automatización",
            "Escalado de operaciones",
            "Formación de equipos",
            "Contratos y facturación",
            "y mucho mas..."
        ],
        topics: [
            "Nicho y posicionamiento",
            "Creación de marca personal",
            "Estrategias de prospección",
            "Propuestas irresistibles",
            "Gestión de clientes",
            "Automatización y sistemas",
            "y mucho mas..."
        ],
        requirements: [
            "Sin experiencia previa necesaria",
            "Computadora e internet",
            "Dedicación de 3-4 horas diarias",
            "Ganas de aprender y ejecutar"
        ],
        benefits: [
            "Negocio 100% online",
            "Escalabilidad infinita",
            "Alto margen de ganancia",
            "Demanda creciente del mercado",
            "Sin tope de ganancia",
            "y mucho mas..."
        ],
        warnings: [
            "Requiere constancia y persistencia",
            "Período inicial sin ingresos",
            "Competencia alta en el mercado",
            "Necesita habilidades de ventas"
        ]
    },
    {
        id: 3,
        title: "OnlyFans para Hombres",
        description: "Estrategias específicas para hombres que quieren generar ingresos consistentes en la plataforma.",
        image: "assets/img/courses/onlyfans-men.jpg",
        level: "beginner",
        difficulty: "Principiante",
        initialCapital: "$0 - $300",
        riskLevel: "low",
        duration: "9 horas",
        students: "890+",
        rating: 5,
        features: [
            "Creación de perfil optimizado",
            "Estrategias de contenido masculino",
            "Marketing y promoción",
            "Monetización efectiva",
            "Retención de suscriptores",
            "Automatización de procesos",
            "Y mucho mas..."
        ],
        topics: [
            "Nicho y audiencia objetivo",
            "Fotografía y contenido visual",
            "Estrategias de precios",
            "Marketing en redes sociales",
            "Comunicación con fans",
            "Escalado de ingresos",
            "Y mucho mas..."
        ],
        requirements: [
            "Mayor de 18 años",
            "Cámara o smartphone",
            "Comodidad frente a cámara",
            "Consistencia en creación de contenido"
        ],
        benefits: [
            "Ingresos pasivos potenciales",
            "Control total del negocio",
            "Flexibilidad de horarios",
            "Mercado en crecimiento",
            "Y mucho mas..."
        ],
        warnings: [
            "Contenido adulto explícito",
            "Posible estigma social",
            "Requiere exposición personal",
            "Políticas de plataforma cambiantes"
        ]
    },
    {
        id: 4,
        title: "OnlyFans para Mujeres",
        description: "Guía completa para mujeres emprendedoras que buscan maximizar sus ganancias en OnlyFans o otras plataformas",
        image: "assets/img/courses/onlyfans-women.jpg",
        level: "beginner",
        difficulty: "Principiante",
        initialCapital: "$0 - $100",
        riskLevel: "low",
        duration: "8 semanas",
        students: "1,540+",
        rating: 4.9,
        features: [
            "Branding personal femenino",
            "Estrategias de contenido premium",
            "Seguridad y privacidad",
            "Maximización de ingresos",
            "Community management",
            "Diversificación de plataformas",
            "Y mucho mas..."
        ],
        topics: [
            "Construcción de marca personal",
            "Contenido de alta conversión",
            "Precios y estrategias premium",
            "Marketing multicanal",
            "Gestión de comunidad",
            "Protección y seguridad",
            "Y mucho mas..."
        ],
        requirements: [
            "Mayor de 18 años",
            "Equipo de fotografía básico",
            "Dedicación constante",
            "Mentalidad empresarial"
        ],
        benefits: [
            "Potencial de ingresos alto",
            "Independencia financiera",
            "Empowerment personal",
            "Control creativo total",
            "Y mucho mas..."
        ],
        warnings: [
            "Exposición pública",
            "Manejo de críticas",
            "Aspectos legales y fiscales",
            "Saturación del mercado"
        ]
    },
    {
        id: 5,
        title: "OnlyFans con IA",
        description: "Revolutiona tu negocio usando inteligencia artificial para automatizar y escalar tu presencia.",
        image: "assets/img/courses/onlyfans-ai.jpg",
        level: "intermediate",
        difficulty: "intermediate",
        initialCapital: "$50 - $200",
        riskLevel: "low",
        duration: "10 horas",
        students: "650+",
        rating: 4.6,
        features: [
            "Generación de contenido con IA",
            "Automatización de conversaciones",
            "Análisis predictivo",
            "Optimización de precios",
            "Chatbots inteligentes",
            "Escalado automatizado",
            "Y mucho mas..."
        ],
        topics: [
            "Herramientas de IA para contenido",
            "Automatización de marketing",
            "Análisis de datos avanzado",
            "Personalización masiva",
            "Ética en IA adulta",
            "Futuro del entretenimiento digital",
            "Y mucho mas..."
        ],
        requirements: [
            "Conocimientos técnicos básicos",
            "Experiencia en plataformas digitales",
            "Inversión en herramientas",
            "Mentalidad innovadora"
        ],
        benefits: [
            "Automatización completa",
            "Escalabilidad exponencial",
            "Ventaja competitiva",
            "Eficiencia operativa máxima",
            "Y mucho mas..."
        ],
        warnings: [
            "Tecnología en evolución",
            "Dependencia de herramientas",
            "Aspectos éticos complejos",
            "Curva de aprendizaje media"
        ]
    },
    {
        id: 6,
        title: "Dropshipping Pro",
        description: "Crea tu tienda online rentable sin inventario usando estrategias probadas de dropshipping internacional.",
        image: "assets/img/courses/dropshipping.jpg",
        level: "beginner",
        difficulty: "Principiante",
        initialCapital: "$200 - $1,000",
        riskLevel: "medium",
        duration: "10 semanas",
        students: "1,800+",
        rating: 4.7,
        features: [
            "Selección de productos ganadores",
            "Configuración de tienda Shopify",
            "Publicidad en Facebook/Google",
            "Optimización de conversiones",
            "Proveedores confiables",
            "Automatización de procesos"
        ],
        topics: [
            "Investigación de mercado y productos",
            "Creación de tienda profesional",
            "Estrategias de marketing digital",
            "Gestión de proveedores",
            "Servicio al cliente",
            "Escalado del negocio"
        ],
        requirements: [
            "Sin experiencia previa necesaria",
            "Capital inicial para publicidad",
            "Computadora e internet",
            "Dedicación de 4-5 horas diarias"
        ],
        benefits: [
            "Negocio 100% automatizable",
            "Sin manejo de inventario",
            "Escalabilidad global",
            "Trabajo desde cualquier lugar"
        ],
        warnings: [
            "Competencia alta en algunos nichos",
            "Dependencia de proveedores",
            "Políticas de plataformas cambiantes",
            "Inversión inicial en publicidad requerida"
        ]
    },
    
    // CURSO 7: Afiliados
    {
        id: 7,
        title: "Marketing de Afiliados",
        description: "Genera ingresos pasivos promoviendo productos de terceros con estrategias de afiliación avanzadas.",
        image: "assets/img/courses/affiliate-marketing.jpg",
        level: "intermediate",
        difficulty: "Principiante",
        initialCapital: "$0 - $100",
        riskLevel: "low",
        duration: "+8 horas",
        students: "200+",
        rating: 5,
        features: [
            "Selección de nichos rentables",
            "Creación de contenido viral",
            "Embudo de ventas optimizado",
            "Traffic gratuito y pagado",
            "Análisis de métricas",
            "Escalado de campañas"
        ],
        topics: [
            "Fundamentos del marketing de afiliados",
            "Investigación de productos y nichos",
            "Creación de landing pages",
            "Email marketing automation",
            "SEO para afiliados",
            "Redes sociales para afiliación"
        ],
        requirements: [
            "Conocimiento básico de marketing",
            "Experiencia en redes sociales",
            "Computadora e internet",
            "Presupuesto mínimo para herramientas"
        ],
        benefits: [
            "Ingresos 100% pasivos",
            "Sin atención al cliente",
            "Múltiples fuentes de ingreso",
            "Escalabilidad ilimitada"
        ],
        warnings: [
            "Resultados no inmediatos",
            "Dependencia de terceros",
            "Cambios en comisiones",
            "Competencia creciente"
        ]
    },
    
    // CURSO 8: YouTube Monetization
    {
        id: 8,
        title: "YouTube Cash Cow",
        description: "Crea canales de YouTube automatizados que generen ingresos sin mostrar tu cara ni usar tu voz.",
        image: "assets/img/courses/youtube-automation.jpg",
        level: "beginner",
        difficulty: "Principiante",
        initialCapital: "$0 - $300",
        riskLevel: "low",
        duration: "+12 horas",
        students: "500+",
        rating: 5,
        features: [
            "Investigación de nichos ganadores",
            "Creación de contenido automatizado",
            "Optimización SEO para YouTube",
            "Monetización múltiple",
            "Outsourcing y delegación",
            "Escalado multi-canal"
        ],
        topics: [
            "Análisis de competencia y nichos",
            "Herramientas de automatización",
            "Scripts y guiones virales",
            "Thumbnail y títulos clickbait",
            "Monetización con AdSense",
            "Ingresos adicionales (sponsors, afiliados)"
        ],
        requirements: [
            "Sin experiencia previa necesaria",
            "Creatividad para contenido",
            "Paciencia para crecimiento orgánico",
            "Presupuesto para herramientas básicas"
        ],
        benefits: [
            "Ingresos pasivos a largo plazo",
            "Crecimiento exponencial posible",
            "Multiple streams de revenue",
            "Trabajo 100% remoto"
        ],
        warnings: [
            "Algoritmo de YouTube cambiante",
            "Crecimiento lento inicial",
            "Políticas de monetización estrictas",
            "Saturación en algunos nichos"
        ]
    },
    
    // CURSO 9: Forex Trading
    {
        id: 9,
        title: "Forex Master",
        description: "Domina el mercado de divisas más grande del mundo con estrategias institucionales y gestión de riesgo profesional.",
        image: "assets/img/courses/forex-trading.jpg",
        level: "intermediate",
        difficulty: "Intermedio",
        initialCapital: "$200 - $2,000",
        riskLevel: "high",
        duration: "+16 horas",
        students: "950+",
        rating: 4.8,
        features: [
            "Análisis técnico Intermedio",
            "Análisis fundamental macro",
            "Estrategias institucionales",
            "Gestión avanzada de riesgo",
            "Psicología de trading",
            "Backtesting sistemático"
        ],
        topics: [
            "Estructura del mercado Forex",
            "Pares de divisas y correlaciones",
            "Price Action y patrones",
            "Indicadores técnicos profesionales",
            "Calendario económico",
            "Estrategias de scalping y swing"
        ],
        requirements: [
            "Conocimiento básico de trading",
            "Capital mínimo $500",
            "Mentalidad disciplinada",
            "Disponibilidad para análisis diario"
        ],
        benefits: [
            "Mercado 24/5 disponible",
            "Alta liquidez",
            "Apalancamiento disponible",
            "Potencial de ganancias alto"
        ],
        warnings: [
            "Riesgo muy alto de pérdidas",
            "Requiere control emocional estricto",
            "Curva de aprendizaje pronunciada",
            "Apalancamiento puede amplificar pérdidas"
        ]
    },
    
    // CURSO 10: E-commerce Amazon FBA
    {
        id: 10,
        title: "Amazon FBA Empire",
        description: "Construye un imperio de productos físicos en Amazon usando el programa FBA para logística automatizada.",
        image: "assets/img/courses/amazon-fba.jpg",
        level: "intermediate",
        difficulty: "Intermedio",
        initialCapital: "$100 - $1,000",
        riskLevel: "medium",
        duration: "+14 horas",
        students: "100+",
        rating: 4.5,
        features: [
            "Investigación de productos ganadores",
            "Sourcing en China y negociación",
            "Optimización de listings",
            "PPC y publicidad en Amazon",
            "Gestión de inventarios",
            "Expansión internacional"
        ],
        topics: [
            "Análisis de competencia en Amazon",
            "Validación de productos rentables",
            "Negociación con proveedores",
            "Creación de marca privada",
            "Optimización SEO Amazon",
            "Gestión de reviews y feedback"
        ],
        requirements: [
            "Capital inicial significativo",
            "Conocimiento de importaciones",
            "Paciencia para procesos largos",
            "Habilidades de negociación"
        ],
        benefits: [
            "Logística automatizada con FBA",
            "Acceso al mercado más grande",
            "Potencial de marca a largo plazo",
            "Escalabilidad comprobada"
        ],
        warnings: [
            "Inversión inicial alta",
            "Competencia feroz",
            "Políticas de Amazon cambiantes",
            "Riesgo de productos defectuosos"
        ]
    },
    {
    id: 11,
    title: "Ser Cariñosa sin Mostrarse",
    description: "Descubre cómo generar ingresos en plataformas digitales mostrando un perfil atractivo, sin necesidad de exponerte en fotos o videos personales.",
    image: "assets/img/courses/cariñosa-anonima.jpg",
    level: "beginner",
    difficulty: "Principiante",
    initialCapital: "$0 - $150",
    riskLevel: "low",
    duration: "10 horas",
    students: "870+",
    rating: 4.8,
    features: [
        "Creación de personajes digitales",
        "Uso de bancos de fotos y videos",
        "Automatización con IA",
        "Estrategias de marketing emocional",
        "Gestión de perfiles múltiples",
        "Seguridad y anonimato"
    ],
    topics: [
        "Construcción de identidad virtual",
        "Psicología del cariño digital",
        "Uso de IA para contenido realista",
        "Gestión de chats y mensajes",
        "Monetización en diferentes plataformas"
    ],
    requirements: [
        "Ser mayor de 18 años",
        "Creatividad y empatía",
        "Acceso a internet estable",
        "Herramientas básicas de edición o IA"
    ],
    benefits: [
        "Generar ingresos sin mostrar tu imagen real",
        "Protección de identidad y privacidad",
        "Negocio escalable con múltiples perfiles",
        "Control total del personaje virtual"
    ],
    warnings: [
        "Debe respetar políticas de plataformas",
        "Posible saturación de mercado",
        "Requiere constancia y gestión emocional"
    ]
    },
    {
    id: 98,
    title: "Próximamente Más Cursos",
    description: "Estamos trabajando en nuevos cursos para que sigas aprendiendo y generando ingresos en distintas áreas digitales.",
    image: "assets/img/courses/coming-soon.jpg",
    level: "all",
    difficulty: "Todos los niveles",
    initialCapital: "$0",
    riskLevel: "none",
    duration: "Muy pronto",
    students: "∞",
    rating: 5,
    features: [
        "Cursos de nuevas tendencias digitales",
        "Negocios online innovadores",
        "Monetización con IA",
        "Estrategias exclusivas",
        "Formación continua"
    ],
    topics: [
        "Marketing avanzado",
        "Inteligencia Artificial aplicada",
        "Nuevos modelos de negocio",
        "Herramientas de automatización",
        "y mucho más..."
    ],
    requirements: [
        "Ganas de seguir aprendiendo",
        "Estar atento a los próximos lanzamientos"
    ],
    benefits: [
        "Acceso anticipado a cursos",
        "Contenido siempre actualizado",
        "Oportunidad de estar entre los primeros"
    ],
    warnings: [
        "Este curso aún no está disponible",
        "Fecha de lanzamiento por confirmar"
    ]
    },
    {
    id: 99,
    title: "Próximamente Más Cursos",
    description: "Estamos trabajando en nuevos cursos para que sigas aprendiendo y generando ingresos en distintas áreas digitales.",
    image: "assets/img/courses/coming-soon.jpg",
    level: "all",
    difficulty: "Todos los niveles",
    initialCapital: "$0",
    riskLevel: "none",
    duration: "Muy pronto",
    students: "∞",
    rating: 5,
    features: [
        "Cursos de nuevas tendencias digitales",
        "Negocios online innovadores",
        "Monetización con IA",
        "Estrategias exclusivas",
        "Formación continua"
    ],
    topics: [
        "Marketing avanzado",
        "Inteligencia Artificial aplicada",
        "Nuevos modelos de negocio",
        "Herramientas de automatización",
        "y mucho más..."
    ],
    requirements: [
        "Ganas de seguir aprendiendo",
        "Estar atento a los próximos lanzamientos"
    ],
    benefits: [
        "Acceso anticipado a cursos",
        "Contenido siempre actualizado",
        "Oportunidad de estar entre los primeros"
    ],
    warnings: [
        "Este curso aún no está disponible",
        "Fecha de lanzamiento por confirmar"
    ]
}



];

// Función para obtener todos los cursos
function getAllCourses() {
    return coursesData;
}

// Función para obtener un curso por ID
function getCourseById(id) {
    return coursesData.find(course => course.id === parseInt(id));
}

// Función para filtrar cursos por nivel
function getCoursesByLevel(level) {
    return coursesData.filter(course => course.level === level);
}

// Función para filtrar cursos por nivel de riesgo
function getCoursesByRisk(riskLevel) {
    return coursesData.filter(course => course.riskLevel === riskLevel);
}

// Función para obtener cursos populares (por número de estudiantes)
function getPopularCourses(limit = 3) {
    return coursesData
        .sort((a, b) => parseInt(b.students.replace(/\D/g, '')) - parseInt(a.students.replace(/\D/g, '')))
        .slice(0, limit);
}

// Función para obtener cursos por calificación
function getTopRatedCourses(limit = 3) {
    return coursesData
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
}