// Controlador de pagos para Zaincky

// Variables globales para el sistema de pagos
let selectedPaymentMethod = null;
let currentPlan = null;
let currentAmount = 0;

// Inicializar controlador de pagos
document.addEventListener('DOMContentLoaded', function() {
    initPaymentController();
});

// Función principal de inicialización
function initPaymentController() {
    loadPaymentMethods();
    setupPaymentInteractions();
    loadPlanFromURL();
    setupFormValidation();
    
    debugLog('Controlador de pagos inicializado');
}

// Cargar plan desde URL parameters
function loadPlanFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan');
    const amount = urlParams.get('amount');
    
    if (plan && amount) {
        currentPlan = plan;
        currentAmount = parseFloat(amount);
        
        // Actualizar información del plan en la interfaz
        updatePlanDisplay(plan, currentAmount);
        
        debugLog('Plan cargado desde URL', { plan, amount });
    }
}

// Actualizar visualización del plan seleccionado
function updatePlanDisplay(planType, amount) {
    const planInfo = getPlanInfo(planType);
    if (!planInfo) return;
    
    // Actualizar elementos en la interfaz si existen
    const planNameElement = document.getElementById('selectedPlanName');
    const planAmountElement = document.getElementById('selectedPlanAmount');
    const planPeriodElement = document.getElementById('selectedPlanPeriod');
    
    if (planNameElement) {
        planNameElement.textContent = `Plan ${planType.charAt(0).toUpperCase() + planType.slice(1)}`;
    }
    
    if (planAmountElement) {
        planAmountElement.textContent = `$${amount} USD`;
    }
    
    if (planPeriodElement) {
        planPeriodElement.textContent = planInfo.period;
    }
    
    // Mostrar ahorros si aplica
    const savingsElement = document.getElementById('planSavings');
    if (savingsElement && planInfo.savings) {
        savingsElement.textContent = `¡Ahorras $${planInfo.savings}!`;
        savingsElement.style.display = 'block';
        
    }
}

// Cargar métodos de pago
function loadPaymentMethods() {
    const paymentContainer = document.getElementById('paymentMethods');
    if (!paymentContainer) return;
    
    const methods = getAllPaymentMethods();
    
    paymentContainer.innerHTML = methods.map(method => `
        <div class="payment-method" data-method-id="${method.id}" onclick="selectPaymentMethod(${method.id})">
            <div class="payment-method-header">
                <i class="${method.icon}"></i>
                <h3>${method.name}</h3>
                <span class="processing-time">${method.processingTime}</span>
                
            </div>
            
            <div class="payment-method-content" id="method-content-${method.id}">
                <div class="payment-info">
                    ${generatePaymentInfo(method)}
                </div>
                
                <div class="payment-instructions">
                    <h4>Instrucciones:</h4>
                    <ol>
                        ${method.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                    </ol>
                </div>
                
                <div class="payment-actions">
                    <button class="btn btn-secondary" onclick="copyPaymentData(${method.id})">
                        <i class="fas fa-copy"></i> Copiar Datos
                    </button>
                    <button class="btn btn-primary" onclick="confirmPayment(${method.id})">
                        <i class="fas fa-check"></i> Confirmar Pago
                    </button>
                </div>
                
            </div>
            
        </div>
    `).join('');
}

// Generar información específica del método de pago
function generatePaymentInfo(method) {
    switch (method.type) {
        case 'crypto':
            return `
                <div class="crypto-info">
                    <div class="address-container">
                        <label>Dirección ${method.name}:</label>
                        <div class="address-field">
                            <input type="text" value="${method.address}" readonly id="address-${method.id}">
                            <button onclick="copyToClipboard('${method.address}', 'copy-btn-${method.id}')" 
                                    class="copy-btn" id="copy-btn-${method.id}">
                                <i class="fas fa-copy"></i>
                            </button>
                        </div>
                    </div>
                    <div class="network-info">
                        <p><strong>Red:</strong> ${method.network}</p>
                        <p><strong>Monto:</strong> $${currentAmount} USD</p>
                        <p><strong>Comisiones:</strong> ${method.fees}</p>
                    </div>
                    ${method.id === 3 ? '<div class="warning"><i class="fas fa-exclamation-triangle"></i> IMPORTANTE: Usar solo red TRON (TRC-20)</div>' : ''}
                </div>
            `;
            
        case 'bank':
            return `
                <div class="bank-info">
                    <div class="account-details">
                        <p><strong>Banco:</strong> ${method.bankName}</p>
                        <p><strong>Número de Cuenta:</strong> 
                            <span class="copyable" onclick="copyToClipboard('${method.accountNumber}', 'copy-account-${method.id}')">${method.accountNumber}</span>
                            <button class="copy-btn" id="copy-account-${method.id}"><i class="fas fa-copy"></i></button>
                        </p>
                        <p><strong>Titular:</strong> ${method.holder}</p>
                        <p><strong>RUC:</strong> ${method.ruc}</p>
                        <p><strong>Monto:</strong> $${currentAmount} USD</p>
                    </div>
                    ${method.id === 4 ? '<div class="warning"><i class="fas fa-exclamation-triangle"></i> IMPORTANTE: este método de deposito solo es para peruanos con tarjetas BCP</div>' : ''}
                </div>
            `;
            
        case 'mobile':
            return `
                <div class="mobile-payment-info">
                    <div class="qr-container">
                        <img src="${method.qrCode}" alt="QR ${method.name}" class="qr-code" onerror="this.style.display='none'">
                    </div>
                    <div class="mobile-details">
                        <p><strong>Número:</strong> 
                            <span class="copyable" onclick="copyToClipboard('${method.phoneNumber}', 'copy-phone-${method.id}')">${method.phoneNumber}</span>
                            <button class="copy-btn" id="copy-phone-${method.id}"><i class="fas fa-copy"></i></button>
                        </p>
                        <p><strong>Titular:</strong> ${method.holderName}</p>
                        <p><strong>Monto:</strong> S/ ${(currentAmount * 3.8).toFixed(2)} (aprox.)</p>
                    </div>
                </div>
            `;
            
        case 'digital':
            return `
                <div class="digital-payment-info">
                    <p><strong>Email PayPal:</strong> 
                        <span class="copyable" onclick="copyToClipboard('${method.email}', 'copy-email-${method.id}')">${method.email}</span>
                        <button class="copy-btn" id="copy-email-${method.id}"><i class="fas fa-copy"></i></button>
                    </p>
                    <p><strong>Tipo:</strong> ${method.note}</p>
                    <p><strong>Monto:</strong> $${currentAmount} USD</p>
                    <div class="paypal-note">
                        <i class="fas fa-info-circle"></i>
                        Selecciona "Amigos y familia" para evitar comisiones
                    </div>
                </div>
            `;
            
        default:
            return '<p>Información del método de pago no disponible</p>';
    }
}

// Seleccionar método de pago
function selectPaymentMethod(methodId) {
    // Remover selección previa
    const prevSelected = document.querySelector('.payment-method.selected');
    if (prevSelected) {
        prevSelected.classList.remove('selected');
    }
    
    // Agregar nueva selección
    const methodElement = document.querySelector(`[data-method-id="${methodId}"]`);
    if (methodElement) {
        methodElement.classList.add('selected');
        selectedPaymentMethod = getPaymentMethodById(methodId);
        
        // Expandir contenido del método seleccionado
        expandPaymentMethod(methodId);
        
        debugLog('Método de pago seleccionado', selectedPaymentMethod);
    }
}

// Expandir método de pago seleccionado
function expandPaymentMethod(methodId) {
    const allContents = document.querySelectorAll('.payment-method-content');
    allContents.forEach(content => {
        content.style.display = 'none';
    });
    
    const selectedContent = document.getElementById(`method-content-${methodId}`);
    if (selectedContent) {
        selectedContent.style.display = 'block';
        selectedContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Copiar datos del método de pago
function copyPaymentData(methodId) {
    const method = getPaymentMethodById(methodId);
    if (!method) return;
    
    let dataToCopy = '';
    
    switch (method.type) {
        case 'crypto':
            dataToCopy = `Dirección ${method.name}: ${method.address}\nRed: ${method.network}\nMonto: $${currentAmount} USD`;
            break;
        case 'bank':
            dataToCopy = `Banco: ${method.bankName}\nCuenta: ${method.accountNumber}\nTitular: ${method.holder}\nRUC: ${method.ruc}`;
            break;
        case 'mobile':
            dataToCopy = `${method.name}: ${method.phoneNumber}\nTitular: ${method.holderName}`;
            break;
        case 'digital':
            dataToCopy = `PayPal: ${method.email}\nMonto: $${currentAmount} USD`;
            break;
    }
    
    copyToClipboard(dataToCopy, `copy-data-${methodId}`);
}

// Confirmar pago
function confirmPayment(methodId) {
    if (!selectedPaymentMethod) {
        showNotification('Por favor selecciona un método de pago', 'warning');
        return;
    }
    
    // Mostrar modal de confirmación
    showPaymentConfirmation(methodId);
}

// Mostrar confirmación de pago
function showPaymentConfirmation(methodId) {
    const method = selectedPaymentMethod;
    const whatsappUrl = generateWhatsAppMessage(currentPlan, method.name, currentAmount);
    const telegramUrl = generateTelegramMessage(currentPlan, method.name, currentAmount);
    
    const modalHtml = `
        <div class="payment-confirmation-modal" id="paymentModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Confirmar Pago</h3>
                    <button class="close-modal" onclick="closePaymentModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="modal-body">
                    <div class="payment-summary">
                        <h4>Resumen del Pago</h4>
                        <div class="summary-item">
                            <span>Plan:</span>
                            <strong>${currentPlan} - ${getPlanInfo(currentPlan).period}</strong>
                        </div>
                        <div class="summary-item">
                            <span>Método:</span>
                            <strong>${method.name}</strong>
                        </div>
                        <div class="summary-item">
                            <span>Monto:</span>
                            <strong>$${currentAmount} USD</strong>
                        </div>
                    </div>
                    
                    <div class="next-steps">
                        <h4>Siguientes Pasos:</h4>
                        <ol>
                            <li>Realiza el pago usando los datos proporcionados</li>
                            <li>Toma una captura del comprobante</li>
                            <li>Envía la captura por WhatsApp o Telegram</li>
                            <li>Espera la confirmación y el acceso a Skool</li>
                        </ol>
                    </div>
                </div>
                
                <div class="modal-footer">
                    <a href="${whatsappUrl}" target="_blank" class="btn btn-success">
                        <i class="fab fa-whatsapp"></i> Enviar por WhatsApp
                    </a>
                    <a href="${telegramUrl}" target="_blank" class="btn btn-primary">
                        <i class="fab fa-telegram"></i> Enviar por Telegram
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Agregar modal al DOM
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Mostrar modal
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Cerrar modal de confirmación
function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modal.remove();
    }
}

// Configurar interacciones de pago
function setupPaymentInteractions() {
    // Cerrar modal al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('payment-confirmation-modal')) {
            closePaymentModal();
        }
    });
    
    // Cerrar modal con escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePaymentModal();
        }
    });
}

// Configurar validación de formularios
function setupFormValidation() {
    // Validar que se haya seleccionado un método antes de proceder
    const confirmButtons = document.querySelectorAll('.btn-primary[onclick^="confirmPayment"]');
    confirmButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!selectedPaymentMethod) {
                e.preventDefault();
                showNotification('Selecciona un método de pago primero', 'warning');
                return false;
            }
        });
    });
}

// Función para cambiar de plan (si el usuario quiere cambiar)
function changePlan(planType, amount) {
    currentPlan = planType;
    currentAmount = amount;
    
    // Actualizar URL sin recargar página
    const newUrl = `${window.location.pathname}?plan=${planType}&amount=${amount}`;
    window.history.pushState({}, '', newUrl);
    
    // Actualizar interfaz
    updatePlanDisplay(planType, amount);
    loadPaymentMethods(); // Recargar con nuevos montos
    
    showNotification(`Plan cambiado a ${planType}`, 'success');
}

// Función para obtener tipo de cambio (simulado)
function getExchangeRate(fromCurrency, toCurrency) {
    // Simulación de tipos de cambio
    const rates = {
        'USD_PEN': 3.8,
        'USD_EUR': 0.85,
        'USD_ARS': 350,
        'USD_CLP': 800,
        'USD_COP': 4000
    };
    
    return rates[`${fromCurrency}_${toCurrency}`] || 1;
}

// Función para formatear monto en moneda local
function formatLocalAmount(usdAmount, currency) {
    const rate = getExchangeRate('USD', currency);
    const localAmount = usdAmount * rate;
    
    const formatters = {
        'PEN': new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }),
        'EUR': new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }),
        'ARS': new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }),
        'CLP': new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }),
        'COP': new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' })
    };
    
    return formatters[currency] ? formatters[currency].format(localAmount) : `${localAmount} ${currency}`;
}

// Función para validar dirección de criptomoneda
function validateCryptoAddress(address, cryptoType) {
    const patterns = {
        'bitcoin': /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/,
        'ethereum': /^0x[a-fA-F0-9]{40}$/,
        'tron': /^T[A-Za-z1-9]{33}$/
    };
    
    return patterns[cryptoType] ? patterns[cryptoType].test(address) : false;
}

// Función para generar QR de pago (simulado)
function generatePaymentQR(method, amount) {
    // En una implementación real, esto generaría un QR dinámico
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`${method.name}:${amount}`)}`;
}

// Función para track del evento de pago (analytics)
function trackPaymentEvent(eventName, data) {
    // Aquí se integraría con Google Analytics, Facebook Pixel, etc.
    debugLog(`Payment Event: ${eventName}`, data);
    
    // Ejemplo de integración con Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            'custom_parameter_1': data.method,
            'custom_parameter_2': data.amount,
            'custom_parameter_3': data.plan
        });
    }
}

// Función de utilidad para debugg de pagos
function debugPaymentStatus() {
    return {
        selectedMethod: selectedPaymentMethod,
        currentPlan: currentPlan,
        currentAmount: currentAmount,
        urlParams: new URLSearchParams(window.location.search).toString()
    };
}