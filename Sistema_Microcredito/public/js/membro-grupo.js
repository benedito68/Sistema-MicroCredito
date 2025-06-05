document.addEventListener('DOMContentLoaded', function() {
    // Inicialização das tabelas DataTables
    $('#members-table').DataTable({
        responsive: true,
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/pt-PT.json'
        }
    });
    
    $('#loans-table').DataTable({
        responsive: true,
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/pt-PT.json'
        }
    });
    
    $('#contributions-table').DataTable({
        responsive: true,
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/pt-PT.json'
        },
        order: [[0, 'desc']]
    });

    // Controle das abas
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove a classe active de todos os botões e conteúdos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adiciona a classe active ao botão clicado e ao conteúdo correspondente
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Controle dos modais
    const depositModal = document.getElementById('deposit-modal');
    const depositSuccessModal = document.getElementById('deposit-success-modal');
    const leaveGroupModal = document.getElementById('leave-group-modal');
    const loanDetailsModal = document.getElementById('loan-details-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Abrir modal de depósito
    const btnMakeDeposit = document.getElementById('btn-make-deposit');
    if (btnMakeDeposit) {
        btnMakeDeposit.addEventListener('click', () => {
            depositModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Abrir modal de sair do grupo
    const btnLeaveGroup = document.getElementById('btn-leave-group');
    if (btnLeaveGroup) {
        btnLeaveGroup.addEventListener('click', () => {
            leaveGroupModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Abrir modal de detalhes do empréstimo
    const viewLoanButtons = document.querySelectorAll('.view-loan-btn');
    viewLoanButtons.forEach(button => {
        button.addEventListener('click', () => {
            loanDetailsModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Fechar modais
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            depositModal.style.display = 'none';
            depositSuccessModal.style.display = 'none';
            leaveGroupModal.style.display = 'none';
            loanDetailsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Fechar modais ao clicar fora
    window.addEventListener('click', (event) => {
        if (event.target === depositModal) {
            depositModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === depositSuccessModal) {
            depositSuccessModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === leaveGroupModal) {
            leaveGroupModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === loanDetailsModal) {
            loanDetailsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Fechar modal de depósito com botão Cancelar
    const closeDepositModalBtn = document.querySelector('.close-deposit-modal');
    if (closeDepositModalBtn) {
        closeDepositModalBtn.addEventListener('click', () => {
            depositModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Fechar modal de sucesso de depósito
    const btnCloseSuccess = document.getElementById('btn-close-success');
    if (btnCloseSuccess) {
        btnCloseSuccess.addEventListener('click', () => {
            depositSuccessModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Cancelar saída do grupo
    const btnCancelLeave = document.getElementById('btn-cancel-leave');
    if (btnCancelLeave) {
        btnCancelLeave.addEventListener('click', () => {
            leaveGroupModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Confirmar saída do grupo
    const btnConfirmLeave = document.getElementById('btn-confirm-leave');
    if (btnConfirmLeave) {
        btnConfirmLeave.addEventListener('click', () => {
            // Aqui você pode adicionar a lógica para processar a saída do grupo
            alert('Você saiu do grupo com sucesso. Para reingressar, entre em contato com o líder do grupo.');
            leaveGroupModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Redirecionar para a página inicial (simulação)
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }
    
    // Mostrar campos específicos do método de pagamento
    const depositMethod = document.getElementById('deposit-method');
    const mpesaFields = document.getElementById('mpesa-fields');
    
    if (depositMethod) {
        depositMethod.addEventListener('change', function() {
            if (this.value === 'mpesa') {
                mpesaFields.style.display = 'block';
            } else {
                mpesaFields.style.display = 'none';
            }
        });
    }
    
    // Formulário de depósito
    const depositForm = document.getElementById('deposit-form');
    if (depositForm) {
        depositForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const amount = document.getElementById('deposit-amount').value;
            const method = document.getElementById('deposit-method').value;
            
            if (amount && method) {
                // Simular processamento do depósito
                setTimeout(() => {
                    // Fechar modal de depósito
                    depositModal.style.display = 'none';
                    
                    // Atualizar detalhes no modal de sucesso
                    const successDetails = depositSuccessModal.querySelector('.success-details');
                    successDetails.innerHTML = `
                        <p><strong>Valor:</strong> ${amount} MT</p>
                        <p><strong>Método:</strong> ${getMethodName(method)}</p>
                        <p><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
                        <p><strong>Nº Transação:</strong> ${generateTransactionId()}</p>
                    `;
                    
                    // Mostrar modal de sucesso
                    depositSuccessModal.style.display = 'block';
                    
                    // Resetar formulário
                    depositForm.reset();
                }, 1000);
            }
        });
    }
    
    // Função auxiliar para obter o nome do método de pagamento
    function getMethodName(methodValue) {
        const methods = {
            'mpesa': 'M-Pesa',
            'e-mola': 'e-Mola',
            'cash': 'Dinheiro (presencial)',
            'bank': 'Transferência Bancária'
        };
        return methods[methodValue] || methodValue;
    }
    
    // Função auxiliar para gerar um ID de transação fictício
    function generateTransactionId() {
        const prefix = {
            'mpesa': 'MP',
            'e-mola': 'EM',
            'cash': 'CSH',
            'bank': 'BANK'
        }[document.getElementById('deposit-method').value] || 'TXN';
        
        return prefix + Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
    }
});