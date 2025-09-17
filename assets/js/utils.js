// Utilidades JavaScript para Zaincky

// Función de debounce para optimizar eventos
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Función de throttle para limitar ejecución
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Detectar tipo de dispositivo
const DeviceDetector = {
    isMobile: () => {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    
    isTablet: () => {
        return window.innerWidth > 768 && window.innerWidth <= 1024;
    },
    
    isDesktop: () => {
        return window.innerWidth > 1024;
    },
    
    getDeviceType: () => {
        if (DeviceDetector.isMobile()) return 'mobile';
        if (DeviceDetector.isTablet()) return 'tablet';
        return 'desktop';
    }
};

// Utilidades para localStorage (con manejo de errores)
const LocalStorage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Error saving to localStorage:', e);
            return false;
        }
    },
    
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Error reading from localStorage:', e);
            return defaultValue;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Error removing from localStorage:', e);
            return false;
        }
    },
    
    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Error clearing localStorage:', e);
            return false;
        }
    }
};

// Sistema de notificaciones
const NotificationSystem = {
    container: null,
    
    init: () => {
        if (!NotificationSystem.container) {
            NotificationSystem.container = document.createElement('div');
            NotificationSystem.container.id = 'notification-container';
            NotificationSystem.container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
                pointer-events: none;
            `;
            document.body.appendChild(NotificationSystem.container);
        }
    },
    
    show: (message, type = 'info', duration = 4000) => {
        NotificationSystem.init();
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        const colors = {
            success: '#00ff88',
            error: '#ff4757',
            warning: '#ffd700',
            info: '#00d4ff'
        };
        
        notification.innerHTML = `
            <div style="
                background: ${colors[type]};
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 10px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                font-weight: 600;
                pointer-events: auto;
                animation: slideInRight 0.3s ease;
                cursor: pointer;
            ">
                <i class="${icons[type]}"></i>
                <span>${message}</span>
                <i class="fas fa-times" style="margin-left: auto; cursor: pointer;"></i>
            </div>
        `;
        
        NotificationSystem.container.appendChild(notification);
        
        // Auto remove
        const autoRemove = setTimeout(() => {
            NotificationSystem.remove(notification);
        }, duration);
        
        // Manual close
        notification.addEventListener('click', () => {
            clearTimeout(autoRemove);
            NotificationSystem.remove(notification);
        });
        
        return notification;
    },
    
    remove: (notification) => {
        if (notification && notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }
};

// Alias para facilidad de uso
const showNotification = NotificationSystem.show;

// Utilidades para animaciones
const AnimationUtils = {
    fadeIn: (element, duration = 300) => {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        const start = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = progress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    },
    
    fadeOut: (element, duration = 300, callback) => {
        const start = performance.now();
        const initialOpacity = parseFloat(getComputedStyle(element).opacity);
        
        function animate(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            element.style.opacity = initialOpacity * (1 - progress);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.style.display = 'none';
                if (callback) callback();
            }
        }
        
        requestAnimationFrame(animate);
    },
    
    slideDown: (element, duration = 300) => {
        element.style.height = '0px';
        element.style.overflow = 'hidden';
        element.style.display = 'block';
        
        const targetHeight = element.scrollHeight + 'px';
        
        element.style.transition = `height ${duration}ms ease`;
        element.style.height = targetHeight;
        
        setTimeout(() => {
            element.style.height = 'auto';
            element.style.overflow = 'visible';
            element.style.transition = '';
        }, duration);
    },
    
    slideUp: (element, duration = 300, callback) => {
        element.style.height = element.offsetHeight + 'px';
        element.style.overflow = 'hidden';
        element.style.transition = `height ${duration}ms ease`;
        
        setTimeout(() => {
            element.style.height = '0px';
        }, 10);
        
        setTimeout(() => {
            element.style.display = 'none';
            element.style.height = 'auto';
            element.style.overflow = 'visible';
            element.style.transition = '';
            if (callback) callback();
        }, duration);
    }
};

// Utilidades para URLs
const URLUtils = {
    getParams: () => {
        return new URLSearchParams(window.location.search);
    },
    
    getParam: (name, defaultValue = null) => {
        return URLUtils.getParams().get(name) || defaultValue;
    },
    
    setParam: (name, value) => {
        const params = URLUtils.getParams();
        params.set(name, value);
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({}, '', newUrl);
    },
    
    removeParam: (name) => {
        const params = URLUtils.getParams();
        params.delete(name);
        const newUrl = params.toString() ? 
            `${window.location.pathname}?${params.toString()}` : 
            window.location.pathname;
        window.history.pushState({}, '', newUrl);
    },
    
    buildUrl: (baseUrl, params) => {
        const url = new URL(baseUrl);
        Object.keys(params).forEach(key => {
            url.searchParams.set(key, params[key]);
        });
        return url.toString();
    }
};

// Utilidades para validación
const ValidationUtils = {
    email: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    phone: (phone) => {
        const re = /^\+?[\d\s\-\(\)]{10,}$/;
        return re.test(phone);
    },
    
    required: (value) => {
        return value && value.toString().trim().length > 0;
    },
    
    minLength: (value, min) => {
        return value && value.toString().length >= min;
    },
    
    maxLength: (value, max) => {
        return !value || value.toString().length <= max;
    },
    
    numeric: (value) => {
        return !isNaN(value) && !isNaN(parseFloat(value));
    },
    
    url: (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
};

// Utilidades para formateo
const FormatUtils = {
    currency: (amount, currency = 'USD', locale = 'es-PE') => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0
        }).format(amount);
    },
    
    number: (number, decimals = 0) => {
        return new Intl.NumberFormat('es-PE', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(number);
    },
    
    percentage: (value, decimals = 0) => {
        return new Intl.NumberFormat('es-PE', {
            style: 'percent',
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(value / 100);
    },
    
    date: (date, options = {}) => {
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(date).toLocaleDateString('es-PE', {...defaultOptions, ...options});
    },
    
    truncate: (text, length = 100, suffix = '...') => {
        if (text.length <= length) return text;
        return text.substring(0, length) + suffix;
    },
    
    capitalize: (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    },
    
    slugify: (text) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
};

// Utilidades para elementos DOM
const DOMUtils = {
    createElement: (tag, attributes = {}, children = []) => {
        const element = document.createElement(tag);
        
        Object.keys(attributes).forEach(key => {
            if (key === 'className') {
                element.className = attributes[key];
            } else if (key === 'innerHTML') {
                element.innerHTML = attributes[key];
            } else {
                element.setAttribute(key, attributes[key]);
            }
        });
        
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else {
                element.appendChild(child);
            }
        });
        
        return element;
    },
    
    findAncestor: (element, selector) => {
        while (element && element !== document) {
            if (element.matches && element.matches(selector)) {
                return element;
            }
            element = element.parentElement;
        }
        return null;
    },
    
    isVisible: (element) => {
        const rect = element.getBoundingClientRect();
        return rect.top >= 0 && rect.left >= 0 && 
               rect.bottom <= window.innerHeight && 
               rect.right <= window.innerWidth;
    },
    
    scrollIntoView: (element, options = {}) => {
        const defaultOptions = {
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
        };
        element.scrollIntoView({...defaultOptions, ...options});
    }
};

// Sistema de eventos personalizado
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
    
    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }
}

// Instancia global del event emitter
const GlobalEvents = new EventEmitter();

// Utilidades de performance
const PerformanceUtils = {
    measureTime: (name, fn) => {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        console.log(`${name} took ${end - start} milliseconds.`);
        return result;
    },
    
    debounceResize: (callback, delay = 250) => {
        return debounce(callback, delay);
    },
    
    throttleScroll: (callback, delay = 16) => {
        return throttle(callback, delay);
    }
};

// Utilidades para cookies (si se necesitan)
const CookieUtils = {
    set: (name, value, days = 7) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    },
    
    get: (name) => {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    
    delete: (name) => {
        CookieUtils.set(name, "", -1);
    }
};

// Función para inicializar utilidades cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar sistema de notificaciones
    NotificationSystem.init();
    
    // Agregar animaciones CSS dinámicamente
    if (!document.getElementById('utils-animations')) {
        const style = document.createElement('style');
        style.id = 'utils-animations';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            
            .notification {
                pointer-events: auto;
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('Zaincky Utils initialized successfully');
});

// Exportar utilidades para uso global
window.ZainckyUtils = {
    DeviceDetector,
    LocalStorage,
    NotificationSystem,
    AnimationUtils,
    URLUtils,
    ValidationUtils,
    FormatUtils,
    DOMUtils,
    EventEmitter,
    GlobalEvents,
    PerformanceUtils,
    CookieUtils,
    debounce,
    throttle,
    showNotification
};