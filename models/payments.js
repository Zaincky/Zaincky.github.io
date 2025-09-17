// Modelo de datos para métodos de pago
const paymentMethodsData = {
    whatsapp: "+51 927 703 410",
    telegram: "@Zaincky",
    
    methods: [
        {
            id: 1,
            name: "Bitcoin (BTC)",
            type: "crypto",
            icon: "fab fa-bitcoin",
            address: "13EXYRn7znjxSnF6Fb1EFKLh2xJNK3my45",
            network: "Bitcoin",
            minAmount: 15,
            processingTime: "10-30 minutos",
            fees: "Red Bitcoin",
            instructions: [
                "Copia la dirección de Bitcoin mostrada",
                "Envía el monto exacto desde tu wallet",
                "Toma captura del comprobante de transacción",
                "Envía la captura por WhatsApp o Telegram"
            ]
        },
        {
            id: 2,
            name: "Ethereum (ETH)",
            type: "crypto",
            icon: "fab fa-ethereum",
            address: "0x376472b047ddeea13a428ba006a068edcf117cf0",
            network: "Ethereum (ERC-20)",
            minAmount: 15,
            processingTime: "5-15 minutos",
            fees: "Gas fees de Ethereum",
            instructions: [
                "Usa la red Ethereum (ERC-20)",
                "Copia la dirección mostrada",
                "Envía el equivalente en ETH",
                "Captura el hash de transacción y envía por WhatsApp/Telegram"
            ]
        },
        {
            id: 3,
            name: "USDT (Tether)",
            type: "crypto",
            icon: "fas fa-dollar-sign",
            address: "TXJSEDGj6mjd7fhQZ6FhNcd8sy4Na9UagD",
            network: "TRON (TRC-20)",
            minAmount: 15,
            processingTime: "1-5 minutos",
            fees: "Muy bajas (TRC-20)",
            instructions: [
                "IMPORTANTE: Usar red TRON (TRC-20)",
                "Copia la dirección TRC-20",
                "Envía el monto exacto en USDT",
                "Envía captura de confirmación por WhatsApp/Telegram"
            ]
        },
        {
            id: 4,
            name: "Transferencia Bancaria",
            type: "bank",
            icon: "fas fa-university",
            bankName: "Banco de Crédito del Perú",
            accountNumber: "20504949218095",
            accountType: "Cuenta Ahorros",
            holder: "Luis F. Cardenas G.",
            ruc: "ninguno",
            swift: "BCPLPEPL",
            processingTime: "1-2 días hábiles",
            fees: "Según tu banco",
            instructions: [
                "Realizar transferencia al número de cuenta mostrado",
                "Incluir tu nombre en el concepto",
                "Tomar foto del voucher de transferencia",
                "Enviar voucher por WhatsApp o Telegram con tu nombre completo"
            ]
        },
        {
            id: 5,
            name: "Yape",
            type: "mobile",
            icon: "fas fa-mobile-alt",
            phoneNumber: "927 703 410",
            holderName: "Luis F. Cardenas G.",
            qrCode: "assets/img/payments/yape-qr.png",
            processingTime: "Inmediato",
            fees: "Sin costo",
            instructions: [
                "Escanea el código QR desde la app Yape",
                "O envía al número: 927 703 410",
                "Incluye tu nombre en el mensaje",
                "Toma captura de la transacción exitosa",
                "Envía captura por WhatsApp con tu nombre"
            ]
        },
        {
            id: 6,
            name: "Plin",
            type: "mobile",
            icon: "fas fa-mobile-alt",
            phoneNumber: "927 703 410",
            holderName: "Luis F. Cardenas G.",
            qrCode: "assets/img/payments/plin-qr.png",
            processingTime: "Inmediato",
            fees: "Sin costo",
            instructions: [
                "Escanea el código QR desde la app Plin",
                "O envía al número: 927 703 410",
                "Añade tu nombre en el concepto",
                "Captura la confirmación de pago",
                "Envía por WhatsApp o Telegram"
            ]
        },
        {
            id: 7,
            name: "PayPal",
            type: "digital",
            icon: "fab fa-paypal",
            email: "zaincky@gmail.com",
            note: "Amigos y familia para evitar comisiones",
            processingTime: "Inmediato",
            fees: "Sin costo (amigos y familia)",
            instructions: [
                "Envía a: zaincky@gmail.com",
                "Selecciona 'Amigos y familia'",
                "Incluye tu nombre en la nota",
                "Toma captura del pago realizado",
                "Envía captura por WhatsApp/Telegram"
            ]
        }
    ],
    
    plans: {
        monthly: {
            amount: 15,
            currency: "USD",
            period: "1 mes"
        },
        quarterly: {
            amount: 40,
            currency: "USD",
            period: "3 meses",
            savings: 5
        },
        yearly: {
            amount: 150,
            currency: "USD",
            period: "12 meses",
            savings: 30
        }
    }
};

// Función para obtener todos los métodos de pago
function getAllPaymentMethods() {
    return paymentMethodsData.methods;
}

// Función para obtener método de pago por ID
function getPaymentMethodById(id) {
    return paymentMethodsData.methods.find(method => method.id === parseInt(id));
}

// Función para obtener métodos por tipo
function getPaymentMethodsByType(type) {
    return paymentMethodsData.methods.filter(method => method.type === type);
}

// Función para obtener información del plan
function getPlanInfo(planType) {
    return paymentMethodsData.plans[planType];
}

// Función para obtener información de contacto
function getContactInfo() {
    return {
        whatsapp: paymentMethodsData.whatsapp,
        telegram: paymentMethodsData.telegram
    };
}

// Función para generar mensaje de WhatsApp
function generateWhatsAppMessage(planType, paymentMethod, amount) {
    const plan = getPlanInfo(planType);
    const whatsappNumber = paymentMethodsData.whatsapp.replace(/\s/g, '');
    
    const message = encodeURIComponent(
        `¡Hola! Quiero suscribirme a Zaincky.\n\n` +
        `📋 *Detalles del pago:*\n` +
        `• Plan: ${plan.period}\n` +
        `• Monto: $${amount} USD\n` +
        `• Método: ${paymentMethod}\n` +
        `• Fecha: ${new Date().toLocaleDateString()}\n\n` +
        `Adjunto el comprobante de pago. ¡Gracias!`
    );
    
    return `https://wa.me/${whatsappNumber}?text=${message}`;
}

// Función para generar enlace de Telegram
function generateTelegramMessage(planType, paymentMethod, amount) {
    const plan = getPlanInfo(planType);
    const telegramUser = paymentMethodsData.telegram.replace('@', '');
    
    const message = encodeURIComponent(
        `¡Hola! Suscripción a Zaincky\n\n` +
        `Plan: ${plan.period}\n` +
        `Monto: $${amount} USD\n` +
        `Método: ${paymentMethod}\n` +
        `Fecha: ${new Date().toLocaleDateString()}\n\n` +
        `Comprobante adjunto`
    );
    
    return `https://t.me/${telegramUser}?text=${message}`;
}

// Función para copiar al portapapeles
function copyToClipboard(text, elementId) {
    navigator.clipboard.writeText(text).then(function() {
        // Mostrar feedback visual
        const button = document.getElementById(elementId);
        if (button) {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
            button.style.background = '#00ff88';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
            }, 2000);
        }
        
        // Mostrar notificación
        showNotification('Información copiada al portapapeles', 'success');
    }).catch(function(err) {
        console.error('Error al copiar: ', err);
        showNotification('Error al copiar. Intenta de nuevo.', 'error');
    });
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Estilos inline para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00ff88' : '#ff4757'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}