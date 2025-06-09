document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressLine = document.querySelector('.progress-line');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const toGodfatherButton = document.getElementById('btn-to-godfather');
    const loanForm = document.getElementById('loan-form');
    const compatibleGroupsList = document.getElementById('compatible-groups');
    const groupInfoSection = document.getElementById('selected-group-info');
    const groupMembersList = document.getElementById('group-members');
    const confirmationModal = document.getElementById('confirmation-modal');
    const closeConfirmationBtn = document.getElementById('btn-close-confirmation');
    
    // Variáveis de controle
    let currentStep = 1;
    const totalSteps = formSteps.length;
    let selectedGroup = null;
    let selectedGodfather = null;
    
    // Dados simulados
    const userGroups = [
        {
            id: 1,
            name: 'Agricultores Unidos',
            availableAmount: 8000,
            maxLoanTerm: 18,
            contribution: 500,
            members: 12,
            maxMembers: 20,
            membersList: [
                { id: 101, name: 'João Macuácua', role: 'Líder', status: 'active', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
                { id: 102, name: 'Carlos Matsinhe', role: 'Membro', status: 'active', avatar: 'https://randomuser.me/api/portraits/men/75.jpg' },
                { id: 103, name: 'Ana Mondlane', role: 'Membro', status: 'active', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
                { id: 104, name: 'Maria Chissano', role: 'Membro', status: 'active', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
                { id: 105, name: 'Pedro Ndlovu', role: 'Membro', status: 'pending', avatar: 'https://randomuser.me/api/portraits/men/85.jpg' }
            ]
        },
        {
            id: 2,
            name: 'Pescadores da Baía',
            availableAmount: 5000,
            maxLoanTerm: 12,
            contribution: 300,
            members: 8,
            maxMembers: 15,
            membersList: [
                { id: 201, name: 'António Sitoe', role: 'Líder', status: 'active', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
                { id: 202, name: 'Luísa Fernandes', role: 'Membro', status: 'active', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
                { id: 203, name: 'José Nhaca', role: 'Membro', status: 'active', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
                { id: 204, name: 'Teresa Manjate', role: 'Membro', status: 'pending', avatar: 'https://randomuser.me/api/portraits/women/55.jpg' }
            ]
        },
        {
            id: 3,
            name: 'Comércio Local',
            availableAmount: 10000,
            maxLoanTerm: 24,
            contribution: 400,
            members: 10,
            maxMembers: 15,
            membersList: [
                { id: 301, name: 'Fernando Cossa', role: 'Líder', status: 'active', avatar: 'https://randomuser.me/api/portraits/men/65.jpg' },
                { id: 302, name: 'Sofia Nhampossa', role: 'Membro', status: 'active', avatar: 'https://randomuser.me/api/portraits/women/25.jpg' },
                { id: 303, name: 'Paulo Tembe', role: 'Membro', status: 'active', avatar: 'https://randomuser.me/api/portraits/men/15.jpg' },
                { id: 304, name: 'Amélia Zeca', role: 'Membro', status: 'active', avatar: 'https://randomuser.me/api/portraits/women/75.jpg' },
                { id: 305, name: 'Rui Mutemba', role: 'Membro', status: 'active', avatar: 'https://randomuser.me/api/portraits/men/55.jpg' }
            ]
        }
    ];
    
    // Event Listeners
    nextButtons.forEach(button => {
        button.addEventListener('click', goToNextStep);
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', goToPrevStep);
    });
    
    loanForm.addEventListener('submit', submitLoanRequest);
    
    closeConfirmationBtn.addEventListener('click', function() {
        // Redirecionar para a página inicial após enviar a solicitação
        window.location.href = '/dashboard';
    });
    
    // Funções
    function goToNextStep() {
        // Validar o passo atual antes de avançar
        if (!validateStep(currentStep)) {
            return;
        }
        
        // Se estamos indo para o passo 2, carregar grupos compatíveis
        if (currentStep === 1) {
            loadCompatibleGroups();
        }
        
        // Se estamos indo para o passo 3, carregar membros do grupo selecionado
        if (currentStep === 2 && selectedGroup) {
            loadGroupMembers(selectedGroup);
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
        
        // Validação específica para o passo 2 (seleção de grupo)
        if (stepNumber === 2 && !selectedGroup) {
            alert('Por favor, selecione um grupo para continuar');
            isValid = false;
        }
        
        // Validação específica para o passo 3 (seleção de padrinho e termos)
        if (stepNumber === 3) {
            if (!selectedGodfather) {
                alert('Por favor, selecione um padrinho para continuar');
                isValid = false;
            }
            
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
    
    function loadCompatibleGroups() {
        const loanAmount = parseInt(document.getElementById('loan-amount').value);
        const loanTerm = parseInt(document.getElementById('loan-term').value);
        
        // Limpar lista atual
        compatibleGroupsList.innerHTML = '';
        
        // Filtrar grupos compatíveis
        const compatibleGroups = userGroups.filter(group => {
            return group.availableAmount >= loanAmount && group.maxLoanTerm >= loanTerm;
        });
        
        if (compatibleGroups.length === 0) {
            compatibleGroupsList.innerHTML = `
                <div class="no-groups">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Nenhum grupo compatível encontrado com os critérios do seu empréstimo.</p>
                    <p>Por favor, ajuste o valor ou prazo do empréstimo.</p>
                </div>
            `;
            toGodfatherButton.disabled = true;
            return;
        }
        
        // Adicionar grupos compatíveis à lista
        compatibleGroups.forEach(group => {
            const groupCard = document.createElement('div');
            groupCard.className = 'group-card';
            groupCard.dataset.groupId = group.id;
            groupCard.innerHTML = `
                <div class="group-header">
                    <h3>${group.name}</h3>
                    <span class="group-amount">${group.availableAmount.toLocaleString()} MT disponíveis</span>
                </div>
                <div class="group-details">
                    <div class="detail-item">
                        <i class="fas fa-users"></i>
                        <span>${group.members}/${group.maxMembers} membros</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-hand-holding-usd"></i>
                        <span>${group.contribution} MT/mês</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Até ${group.maxLoanTerm} meses</span>
                    </div>
                </div>
            `;
            
            groupCard.addEventListener('click', function() {
                // Remover seleção de outros grupos
                document.querySelectorAll('.group-card').forEach(card => {
                    card.classList.remove('selected');
                });
                
                // Selecionar este grupo
                this.classList.add('selected');
                selectedGroup = userGroups.find(g => g.id === group.id);
                toGodfatherButton.disabled = false;
            });
            
            compatibleGroupsList.appendChild(groupCard);
        });
    }
    
    function loadGroupMembers(group) {
        // Limpar informações anteriores
        groupInfoSection.innerHTML = '';
        groupMembersList.innerHTML = '';
        
        // Adicionar informações do grupo selecionado
        groupInfoSection.innerHTML = `
            <h3>${group.name}</h3>
            <p>Selecione um membro para ser seu padrinho neste empréstimo:</p>
            <p><strong>Valor do empréstimo:</strong> ${document.getElementById('loan-amount').value} MT</p>
            <p><strong>Prazo:</strong> ${document.getElementById('loan-term').value} meses</p>
        `;
        
        // Adicionar membros do grupo
        group.membersList.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.className = 'member-card';
            memberCard.dataset.memberId = member.id;
            memberCard.innerHTML = `
                <img src="${member.avatar}" alt="${member.name}" class="member-avatar">
                <div class="member-info">
                    <h4>${member.name}</h4>
                    <p>${member.role}</p>
                </div>
                <span class="member-status ${member.status === 'active' ? 'status-active' : 'status-pending'}">
                    ${member.status === 'active' ? 'Ativo' : 'Pendente'}
                </span>
            `;
            
            memberCard.addEventListener('click', function() {
                // Remover seleção de outros membros
                document.querySelectorAll('.member-card').forEach(card => {
                    card.classList.remove('selected');
                });
                
                // Selecionar este membro
                this.classList.add('selected');
                selectedGodfather = member;
            });
            
            groupMembersList.appendChild(memberCard);
        });
    }
    
    function submitLoanRequest(e) {
        e.preventDefault();
        
        // Validar o passo atual antes de enviar
        if (!validateStep(currentStep)) {
            return;
        }
        
        // Coletar dados do empréstimo
        const loanData = {
            amount: document.getElementById('loan-amount').value,
            purpose: document.getElementById('loan-purpose').value,
            term: document.getElementById('loan-term').value,
            description: document.getElementById('loan-description').value,
            group: selectedGroup.name,
            godfather: selectedGodfather.name,
            date: new Date().toLocaleDateString()
        };
        
        // Simular envio do pedido (substituir por chamada AJAX real)
        console.log('Solicitação de empréstimo enviada:', loanData);
        
        // Preencher modal de confirmação
        document.getElementById('confirmed-amount').textContent = `${loanData.amount} MT`;
        document.getElementById('confirmed-group').textContent = loanData.group;
        document.getElementById('confirmed-godfather').textContent = loanData.godfather;
        document.getElementById('confirmed-term').textContent = `${loanData.term} meses`;
        
        // Mostrar modal de confirmação
        confirmationModal.style.display = 'flex';
    }
    
    // CSS para a linha de progresso
    const style = document.createElement('style');
    style.textContent = `
        .progress-line::before {
            width: var(--progress, 0);
        }
    `;
    document.head.appendChild(style);
});