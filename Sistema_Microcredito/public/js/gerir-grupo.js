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
    const addMemberModal = document.getElementById('add-member-modal');
    const loanDetailsModal = document.getElementById('loan-details-modal');
    const btnAddMember = document.getElementById('btn-add-member');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Abrir modal de adicionar membro
    if (btnAddMember) {
        btnAddMember.addEventListener('click', () => {
            addMemberModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Abrir modal de detalhes do empréstimo (exemplo)
    const viewLoanButtons = document.querySelectorAll('.btn-action.btn-primary');
    viewLoanButtons.forEach(button => {
        button.addEventListener('click', () => {
            loanDetailsModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Fechar modais
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            addMemberModal.style.display = 'none';
            loanDetailsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // Fechar modais ao clicar fora
    window.addEventListener('click', (event) => {
        if (event.target === addMemberModal) {
            addMemberModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === loanDetailsModal) {
            loanDetailsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Formulário de adicionar membro
    const addMemberForm = document.getElementById('add-member-form');
    if (addMemberForm) {
        addMemberForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação e envio do formulário
            const memberName = document.getElementById('member-name').value;
            const memberPhone = document.getElementById('member-phone').value;
            
            if (memberName && memberPhone) {
                // Aqui você pode adicionar a lógica para enviar os dados
                alert(`Membro ${memberName} adicionado com sucesso!`);
                addMemberModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                addMemberForm.reset();
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    }
    
    // Filtros de solicitações
    const requestStatusFilter = document.getElementById('request-status');
    const requestDateFilter = document.getElementById('request-date');
    const requestCards = document.querySelectorAll('.request-card');
    
    if (requestStatusFilter && requestDateFilter) {
        requestStatusFilter.addEventListener('change', filterRequests);
        requestDateFilter.addEventListener('change', filterRequests);
    }
    
    function filterRequests() {
        const statusValue = requestStatusFilter.value;
        const dateValue = requestDateFilter.value;
        
        requestCards.forEach(card => {
            const cardStatus = card.classList.contains('pending') ? 'pending' : 
                             card.classList.contains('approved') ? 'approved' : 'rejected';
            
            // Filtro por status
            const statusMatch = statusValue === 'all' || statusValue === cardStatus;
            
            // Filtro por data (simplificado para exemplo)
            const dateMatch = dateValue === 'all';
            
            if (statusMatch && dateMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Botões de ação nas solicitações
    const approveButtons = document.querySelectorAll('.request-card .btn-success:not([disabled])');
    const rejectButtons = document.querySelectorAll('.request-card .btn-danger:not([disabled])');
    
    approveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.request-card');
            card.querySelector('.badge').className = 'badge badge-approved';
            card.querySelector('.badge').textContent = 'Aprovado';
            card.classList.remove('pending');
            card.classList.add('approved');
            
            // Desabilitar botões de aprovação/rejeição após ação
            const footer = card.querySelector('.request-footer');
            footer.innerHTML = `
                <button class="btn btn-outline btn-sm">
                    <i class="fas fa-eye"></i> Ver Contrato
                </button>
                <button class="btn btn-outline btn-sm">
                    <i class="fas fa-file-invoice-dollar"></i> Pagamentos
                </button>
            `;
        });
    });
    
    rejectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.request-card');
            card.querySelector('.badge').className = 'badge badge-danger';
            card.querySelector('.badge').textContent = 'Recusado';
            card.classList.remove('pending');
            card.classList.add('rejected');
            
            // Desabilitar botões de aprovação/rejeição após ação
            const footer = card.querySelector('.request-footer');
            footer.innerHTML = `
                <button class="btn btn-outline btn-sm">
                    <i class="fas fa-eye"></i> Ver Detalhes
                </button>
            `;
        });
    });
});