document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressLine = document.querySelector('.progress-line');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const paymentModal = document.getElementById('payment-modal');
    const confirmationModal = document.getElementById('confirmation-modal');
    const openPaymentBtn = document.getElementById('btn-open-payment');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const paymentForm = document.getElementById('payment-form');
    const closeConfirmationBtn = document.getElementById('btn-close-confirmation');
    
    // Variáveis de controle
    let currentStep = 1;
    const totalSteps = formSteps.length;
    
    // Inicialização
    updateProgressBar();
    
    // Event Listeners
    nextButtons.forEach(button => {
        button.addEventListener('click', goToNextStep);
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', goToPrevStep);
    });
    
    openPaymentBtn.addEventListener('click', openPaymentModal);
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
    
    paymentForm.addEventListener('submit', processPayment);
    
    closeConfirmationBtn.addEventListener('click', function() {
        // Redirecionar para a página inicial após criar o grupo
        window.location.href = 'dashboard.html';
    });
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal();
        }
    });
    
    // Funções
    function goToNextStep() {
        // Validar o passo atual antes de avançar
        if (!validateStep(currentStep)) {
            return;
        }
        
        // Marcar passo atual como completo
        progressSteps[currentStep - 1].classList.add('completed');
        progressSteps[currentStep - 1].classList.remove('active');
        
        // Avançar para o próximo passo
        currentStep++;
        
        // Atualizar a UI
        updateFormSteps();
        updateProgressBar();
    }
    
    function goToPrevStep() {
        // Remover marcação de completo do passo atual
        progressSteps[currentStep - 1].classList.remove('completed');
        
        // Voltar para o passo anterior
        currentStep--;
        
        // Atualizar a UI
        updateFormSteps();
        updateProgressBar();
    }
    
    function updateFormSteps() {
        formSteps.forEach(step => {
            if (parseInt(step.dataset.step) === currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }
    
    function updateProgressBar() {
        // Atualizar os passos na barra de progresso
        progressSteps.forEach((step, index) => {
            if (index < currentStep - 1) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (index === currentStep - 1) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
        
        // Atualizar a linha de progresso
        const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
        progressLine.style.setProperty('--progress', `${progressPercentage}%`);
    }
    
    function validateStep(stepNumber) {
        let isValid = true;
        const currentFormStep = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
        
        // Validar campos obrigatórios
        const requiredInputs = currentFormStep.querySelectorAll('[required]');
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = 'var(--danger)';
                isValid = false;
                
                // Resetar o estilo após algum tempo
                setTimeout(() => {
                    input.style.borderColor = 'var(--gray-light)';
                }, 2000);
            }
        });
        
        // Validação específica para o passo 3 (termos)
        if (stepNumber === 3) {
            const agreeTerms = document.getElementById('agree-terms');
            if (!agreeTerms.checked) {
                agreeTerms.parentElement.style.color = 'var(--danger)';
                isValid = false;
                
                setTimeout(() => {
                    agreeTerms.parentElement.style.color = '';
                }, 2000);
            }
        }
        
        return isValid;
    }
    
    function openPaymentModal() {
        // Validar o passo atual antes de abrir o modal
        if (!validateStep(currentStep)) {
            return;
        }
        
        paymentModal.style.display = 'flex';
    }
    
    function closeModal() {
        paymentModal.style.display = 'none';
    }
    
    function processPayment(e) {
        e.preventDefault();
        
        // Simular processamento do pagamento
        const paymentAmount = document.getElementById('payment-amount').value;
        const phoneNumber = document.getElementById('phone-number').value;
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        
        console.log('Pagamento submetido:', {
            amount: paymentAmount,
            phone: phoneNumber,
            method: paymentMethod
        });
        
        // Fechar modal de pagamento e mostrar confirmação
        paymentModal.style.display = 'none';
        confirmationModal.style.display = 'flex';
        
        // Marcar todos os passos como completos
        progressSteps.forEach(step => {
            step.classList.add('completed');
            step.classList.remove('active');
        });
        
        // Atualizar a linha de progresso para 100%
        progressLine.style.setProperty('--progress', '100%');
    }
    
    // CSS para a linha de progresso
    const style = document.createElement('style');
    style.textContent = `
        .progress-line::before {
            width: var(--progress, 0);
        }
    `;
    document.head.appendChild(style);
    
    // Configurar data mínima para o campo de data
    const startDateInput = document.getElementById('start-date');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    
    startDateInput.min = `${yyyy}-${mm}-${dd}`;
    startDateInput.value = `${yyyy}-${mm}-${dd}`;
});