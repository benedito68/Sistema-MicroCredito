document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const viewDetailsButtons = document.querySelectorAll('.btn-view-details');
    const joinButtons = document.querySelectorAll('.btn-join');
    const cancelButtons = document.querySelectorAll('.btn-cancel');
    const groupDetailsModal = document.getElementById('group-details-modal');
    const joinConfirmationModal = document.getElementById('join-confirmation-modal');
    const validCodeModal = document.getElementById('valid-code-modal');
    const verifyCodeButton = document.getElementById('btn-verify-code');
    const closeModalButtons = document.querySelectorAll('.close-modal, #btn-close-details, #btn-close-confirmation');
    const confirmJoinButton = document.getElementById('btn-confirm-join');
    const cancelJoinButton = document.getElementById('btn-cancel-join');
    
    // Dados dos grupos (simulados)
    const groupsData = {
        1: {
            name: 'Agricultores Unidos',
            category: 'agriculture',
            description: 'Grupo formado por pequenos agricultores da região norte, com o objetivo de poupar para a compra de equipamentos agrícolas e insumos. Juntos, conseguimos melhores preços e condições de pagamento.',
            members: '12/20',
            amount: '500 MT',
            duration: '12',
            nextMeeting: '15/06/2023 - 14:00 (Escola Primária de Nampula)',
            leader: {
                name: 'João Macuácua',
                email: 'joao.macuacua@exemplo.com',
                phone: '+258 84 123 4567',
                photo: 'https://randomuser.me/api/portraits/men/32.jpg'
            },
            rules: [
                'Contribuição mensal obrigatória até o dia 5 de cada mês',
                'Presença mínima de 75% nas reuniões',
                'Multa de 100 MT por atraso no pagamento',
                'Decisões tomadas por maioria simples',
                'O líder tem voto de qualidade em caso de empate'
            ]
        },
        2: {
            name: 'Pescadores da Baía',
            category: 'fishing',
            description: 'Grupo de pescadores artesanais que se uniram para poupar e adquirir equipamentos de pesca mais eficientes e barco motorizado. Nosso objetivo é aumentar a produtividade e melhorar a qualidade de vida das famílias.',
            members: '8/15',
            amount: '300 MT',
            duration: '18',
            nextMeeting: '20/06/2023 - 10:00 (Associação dos Pescadores)',
            leader: {
                name: 'Carlos Matsinhe',
                email: 'carlos.matsinhe@exemplo.com',
                phone: '+258 82 987 6543',
                photo: 'https://randomuser.me/api/portraits/men/75.jpg'
            },
            rules: [
                'Contribuição mensal até o dia 10',
                'Reuniões mensais obrigatórias',
                'Multa de 50 MT por atraso',
                'Sistema de rodízio para uso dos equipamentos',
                'Proibido faltar mais de 3 reuniões consecutivas'
            ]
        },
        3: {
            name: 'Artesãos Moçambicanos',
            category: 'artists',
            description: 'Coletivo de artesãos que trabalham com materiais tradicionais. Nosso objetivo é criar um fundo comum para compra de matérias-primas em grande quantidade e organizar exposições conjuntas.',
            members: '18/25',
            amount: '200 MT',
            duration: '24',
            nextMeeting: '10/06/2023 - 15:00 (Centro Cultural)',
            leader: {
                name: 'Ana Mondlane',
                email: 'ana.mondlane@exemplo.com',
                phone: '+258 86 555 1234',
                photo: 'https://randomuser.me/api/portraits/women/65.jpg'
            },
            rules: [
                'Contribuição mensal flexível (mínimo 200 MT)',
                'Reuniões quinzenais',
                'Cada membro deve contribuir com pelo menos 3 peças por ano para exposições',
                'Lucros das vendas coletivas divididos proporcionalmente',
                'Votação anual para escolha do líder'
            ]
        },
        4: {
            name: 'Comércio Local',
            category: 'commerce',
            description: 'Grupo de pequenos comerciantes do mercado central que se uniram para obter melhores condições de compra de mercadorias e criar um fundo de emergência para situações difíceis.',
            members: '10/15',
            amount: '400 MT',
            duration: '12',
            nextMeeting: '12/06/2023 - 16:00 (Mercado Central, Box 24)',
            leader: {
                name: 'Maria Chissano',
                email: 'maria.chissano@exemplo.com',
                phone: '+258 84 777 8888',
                photo: 'https://randomuser.me/api/portraits/women/44.jpg'
            },
            rules: [
                'Contribuição fixa de 400 MT/mês',
                'Reuniões mensais no primeiro sábado',
                'Multa de 100 MT por atraso',
                'Empréstimos internos com juros de 5% ao mês',
                'Necessário aviso prévio de 1 mês para saída do grupo'
            ]
        }
    };
    
    // Códigos de convite válidos (simulados)
    const validInviteCodes = {
        'GRP-AGRI1': 1,
        'GRP-PESC1': 2,
        'GRP-ART1': 3,
        'GRP-COM1': 4
    };
    
    // Event Listeners
    tabButtons.forEach(button => {
        button.addEventListener('click', switchTab);
    });
    
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', openGroupDetails);
    });
    
    joinButtons.forEach(button => {
        button.addEventListener('click', requestToJoin);
    });
    
    cancelButtons.forEach(button => {
        button.addEventListener('click', cancelJoinRequest);
    });
    
    verifyCodeButton.addEventListener('click', verifyInviteCode);
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
    
    confirmJoinButton.addEventListener('click', confirmJoinByCode);
    
    cancelJoinButton.addEventListener('click', function() {
        validCodeModal.style.display = 'none';
    });
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal();
        }
    });
    
    // Funções
    function switchTab(e) {
        const tabId = e.target.dataset.tab;
        
        // Atualizar botões da aba
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });
        e.target.classList.add('active');
        
        // Atualizar conteúdo da aba
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');
    }
    
    function openGroupDetails(e) {
        const groupId = e.target.dataset.groupId;
        const group = groupsData[groupId];
        
        // Preencher modal com dados do grupo
        document.getElementById('modal-group-name').textContent = group.name;
        document.getElementById('modal-group-category').textContent = 
            group.category === 'agriculture' ? 'Agricultura' :
            group.category === 'fishing' ? 'Pesca' :
            group.category === 'artists' ? 'Artistas' : 'Comércio';
        
        document.getElementById('modal-group-description').textContent = group.description;
        document.getElementById('modal-group-members').textContent = group.members;
        document.getElementById('modal-group-amount').textContent = group.amount;
        document.getElementById('modal-group-duration').textContent = group.duration;
        document.getElementById('modal-next-meeting').textContent = group.nextMeeting;
        
        const leaderInfo = document.getElementById('modal-group-leader');
        leaderInfo.querySelector('img').src = group.leader.photo;
        leaderInfo.querySelector('.leader-name').textContent = group.leader.name;
        leaderInfo.querySelector('.leader-contact').textContent = group.leader.email;
        leaderInfo.querySelector('.leader-phone').textContent = group.leader.phone;
        
        const rulesList = document.getElementById('modal-group-rules');
        rulesList.innerHTML = '';
        group.rules.forEach(rule => {
            const li = document.createElement('li');
            li.textContent = rule;
            rulesList.appendChild(li);
        });
        
        // Configurar botão de adesão no modal
        const joinFromModalBtn = document.getElementById('btn-join-from-modal');
        joinFromModalBtn.dataset.groupId = groupId;
        
        // Verificar se já existe pedido pendente para este grupo
        const groupCard = document.querySelector(`.group-card .btn-join[data-group-id="${groupId}"]`);
        if (groupCard && groupCard.classList.contains('btn-cancel')) {
            joinFromModalBtn.disabled = true;
            joinFromModalBtn.innerHTML = '<i class="fas fa-clock"></i> Pedido Pendente';
            joinFromModalBtn.classList.remove('btn-primary');
            joinFromModalBtn.classList.add('btn-outline');
        } else {
            joinFromModalBtn.disabled = false;
            joinFromModalBtn.innerHTML = '<i class="fas fa-user-plus"></i> Solicitar Adesão';
            joinFromModalBtn.classList.add('btn-primary');
            joinFromModalBtn.classList.remove('btn-outline');
        }
        
        // Mostrar modal
        groupDetailsModal.style.display = 'flex';
    }
    
    function requestToJoin(e) {
        const groupId = e.target.dataset.groupId;
        const groupName = groupsData[groupId].name;
        
        // Atualizar botão no card do grupo
        e.target.innerHTML = '<i class="fas fa-clock"></i> Pedido Pendente';
        e.target.classList.remove('btn-primary');
        e.target.classList.add('btn-danger', 'btn-cancel');
        e.target.removeEventListener('click', requestToJoin);
        e.target.addEventListener('click', cancelJoinRequest);
        
        // Adicionar badge de pendente
        const groupCard = e.target.closest('.group-card');
        const pendingBadge = document.createElement('span');
        pendingBadge.className = 'pending-badge';
        pendingBadge.textContent = 'Pedido Pendente';
        groupCard.querySelector('.group-header').appendChild(pendingBadge);
        
        // Mostrar modal de confirmação
        document.getElementById('joined-group-name').textContent = groupName;
        joinConfirmationModal.style.display = 'flex';
        
        // Fechar modal de detalhes se estiver aberto
        groupDetailsModal.style.display = 'none';
    }
    
    function cancelJoinRequest(e) {
        const groupId = e.target.dataset.groupId;
        
        // Atualizar botão no card do grupo
        e.target.innerHTML = '<i class="fas fa-user-plus"></i> Solicitar Adesão';
        e.target.classList.remove('btn-danger', 'btn-cancel');
        e.target.classList.add('btn-primary');
        e.target.removeEventListener('click', cancelJoinRequest);
        e.target.addEventListener('click', requestToJoin);
        
        // Remover badge de pendente
        const groupCard = e.target.closest('.group-card');
        const pendingBadge = groupCard.querySelector('.pending-badge');
        if (pendingBadge) {
            pendingBadge.remove();
        }
        
        // Fechar modal de detalhes se estiver aberto
        groupDetailsModal.style.display = 'none';
    }
    
    function verifyInviteCode() {
        const codeInput = document.getElementById('invite-code');
        const code = codeInput.value.trim().toUpperCase();
        
        if (!code) {
            alert('Por favor, insira um código de convite');
            return;
        }
        
        if (validInviteCodes[code]) {
            const groupId = validInviteCodes[code];
            const group = groupsData[groupId];
            
            // Preencher modal de código válido
            document.getElementById('invited-group-name').textContent = group.name;
            document.getElementById('invited-group-amount').textContent = `${group.amount}/mês`;
            document.getElementById('invited-group-duration').textContent = `${group.duration} meses`;
            
            // Configurar botão de confirmação
            document.getElementById('btn-confirm-join').dataset.groupId = groupId;
            
            // Mostrar modal
            validCodeModal.style.display = 'flex';
        } else {
            alert('Código inválido. Por favor, verifique o código e tente novamente.');
        }
    }
    
    function confirmJoinByCode(e) {
        const groupId = e.target.dataset.groupId;
        const groupName = groupsData[groupId].name;
        
        // Mostrar confirmação
        document.getElementById('joined-group-name').textContent = groupName;
        validCodeModal.style.display = 'none';
        joinConfirmationModal.style.display = 'flex';
        
        // Limpar campo de código
        document.getElementById('invite-code').value = '';
    }
    
    function closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }
});