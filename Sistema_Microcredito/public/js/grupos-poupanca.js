$(document).ready(function() {
    // Variáveis globais
    const API_BASE_URL = 'https://api.microcred.com/v1';
    
    // Inicialização
    initTabs();
    initModals();
    loadGroupsData();
    
    // Funções de inicialização
    function initTabs() {
        $('.tab-btn').click(function() {
            const tabId = $(this).data('tab');
            $('.tab-btn').removeClass('active');
            $(this).addClass('active');
            $('.tab-content').removeClass('active');
            $(`#${tabId}`).addClass('active');
        });
    }
    
    function initModals() {
        // Abrir/fechar modais genéricos
        $('[data-modal]').click(function() {
            const modalId = $(this).data('modal');
            $(`#${modalId}`).show();
        });
        
        $('.close-modal, .close-modal-btn').click(function() {
            $(this).closest('.modal').hide();
        });
        
        // Modal Criar Grupo
        $('#btn-create-group').click(function() {
            $('#create-group-modal').show();
        });
        
        // Modal Aderir a Grupo
        $('#btn-join-group').click(function() {
            $('#join-group-modal').show();
        });
        
        // Pesquisa de grupos para adesão
        $('#search-group-to-join').on('input', function() {
            const searchTerm = $(this).val().toLowerCase();
            if (searchTerm.length > 2) {
                searchGroupsToJoin(searchTerm);
            } else {
                $('#groups-to-join-list').html(`
                    <div class="no-results">
                        <i class="fas fa-search"></i>
                        <p>Digite pelo menos 3 caracteres para pesquisar</p>
                    </div>
                `);
            }
        });
        
        // Submeter formulário de criação de grupo
        $('#create-group-form').submit(function(e) {
            e.preventDefault();
            createGroup();
        });
        
        // Submeter formulário de solicitação de adesão
        $('#request-join-form').submit(function(e) {
            e.preventDefault();
            requestJoinGroup();
        });
        
        // Fechar modal de confirmação
        $('#btn-close-confirmation').click(function() {
            $('#confirmation-modal').hide();
        });
    }
    
    // Funções para carregar dados
    function loadGroupsData() {
        // Simulando chamadas à API
        setTimeout(() => {
            loadMyGroups();
            loadPendingGroups();
            loadAvailableGroups();
        }, 500);
    }
    
    function loadMyGroups() {
        // Simulação de dados da API
        const myGroups = [
            {
                id: 1,
                name: "Poupança Comunitária Bairro X",
                photo: "https://via.placeholder.com/80/4a6cf7/FFFFFF?text=G1",
                leader: "João Macuácua",
                members: 12,
                minValue: 1000,
                totalBalance: 125400,
                status: "active",
                joinedDate: "15/03/2023"
            },
            {
                id: 2,
                name: "Poupança dos Amigos",
                photo: "https://via.placeholder.com/80/28a745/FFFFFF?text=G2",
                leader: "Maria Silva",
                members: 8,
                minValue: 500,
                totalBalance: 42000,
                status: "active",
                joinedDate: "10/05/2023"
            }
        ];
        
        let html = '';
        myGroups.forEach(group => {
            html += `
                <tr>
                    <td><img src="${group.photo}" alt="${group.name}" class="group-photo"></td>
                    <td>${group.name}</td>
                    <td>${group.leader}</td>
                    <td>${group.members}</td>
                    <td>${group.minValue} MT</td>
                    <td>${group.totalBalance.toLocaleString()} MT</td>
                    <td><span class="badge badge-success">Ativo</span></td>
                    <td>
                        <button class="btn-action btn-primary" onclick="viewGroup(${group.id})">
                            <i class="fas fa-eye"></i> Ver
                        </button>
                    </td>
                </tr>
            `;
        });
        
        $('#my-groups-body').html(html);
        $('#my-groups-table').DataTable({
            language: {
                url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/pt-PT.json'
            }
        });
    }
    
    function loadPendingGroups() {
        // Simulação de dados da API
        const pendingGroups = [
            {
                id: 3,
                name: "Poupança dos Colegas de Trabalho",
                photo: "https://via.placeholder.com/80/ffc107/FFFFFF?text=G3",
                leader: "Carlos Mendes",
                members: 15,
                minValue: 1500,
                requestDate: "05/06/2023",
                status: "pending"
            }
        ];
        
        let html = '';
        pendingGroups.forEach(group => {
            html += `
                <tr>
                    <td><img src="${group.photo}" alt="${group.name}" class="group-photo"></td>
                    <td>${group.name}</td>
                    <td>${group.leader}</td>
                    <td>${group.members}</td>
                    <td>${group.minValue} MT</td>
                    <td>${group.requestDate}</td>
                    <td><span class="badge badge-warning">Pendente</span></td>
                    <td>
                        <button class="btn-action btn-danger" onclick="cancelRequest(${group.id})">
                            <i class="fas fa-times"></i> Cancelar
                        </button>
                    </td>
                </tr>
            `;
        });
        
        $('#pending-groups-body').html(html);
        $('#pending-groups-table').DataTable({
            language: {
                url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/pt-PT.json'
            }
        });
    }
    
    function loadAvailableGroups() {
        // Simulação de dados da API
        const availableGroups = [
            {
                id: 4,
                name: "Poupança dos Vizinhos",
                photo: "https://via.placeholder.com/80/17a2b8/FFFFFF?text=G4",
                leader: "Ana Pereira",
                members: 10,
                minValue: 800,
                type: "Comunitário",
                location: "Bairro Y, Maputo"
            },
            {
                id: 5,
                name: "Poupança dos Colegas de Escola",
                photo: "https://via.placeholder.com/80/dc3545/FFFFFF?text=G5",
                leader: "Pedro Ndlovu",
                members: 7,
                minValue: 600,
                type: "Educacional",
                location: "Matola"
            },
            {
                id: 6,
                name: "Poupança da Igreja",
                photo: "https://via.placeholder.com/80/6f42c1/FFFFFF?text=G6",
                leader: "Pastor José",
                members: 20,
                minValue: 500,
                type: "Religioso",
                location: "Maxaquene"
            }
        ];
        
        let html = '';
        availableGroups.forEach(group => {
            html += `
                <tr>
                    <td><img src="${group.photo}" alt="${group.name}" class="group-photo"></td>
                    <td>${group.name}</td>
                    <td>${group.leader}</td>
                    <td>${group.members}</td>
                    <td>${group.minValue} MT</td>
                    <td>${group.type}</td>
                    <td>${group.location}</td>
                    <td>
                        <button class="btn-action btn-primary" onclick="requestJoin(${group.id}, '${group.name}', '${group.leader}', ${group.minValue}, '${group.photo}')">
                            <i class="fas fa-sign-in-alt"></i> Solicitar
                        </button>
                    </td>
                </tr>
            `;
        });
        
        $('#available-groups-body').html(html);
        $('#available-groups-table').DataTable({
            language: {
                url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/pt-PT.json'
            }
        });
    }
    
    function searchGroupsToJoin(searchTerm) {
        // Simulação de busca na API
        const filteredGroups = [
            {
                id: 7,
                name: "Poupança dos Artesãos",
                photo: "https://via.placeholder.com/80/20c997/FFFFFF?text=G7",
                leader: "Luísa Fernandes",
                members: 5,
                minValue: 700,
                type: "Profissional",
                location: "Cidade de Maputo"
            },
            {
                id: 8,
                name: "Poupança do Bairro Z",
                photo: "https://via.placeholder.com/80/fd7e14/FFFFFF?text=G8",
                leader: "Rui Mutemba",
                members: 12,
                minValue: 1000,
                type: "Comunitário",
                location: "Bairro Z, Maputo"
            }
        ];
        
        let html = '';
        if (filteredGroups.length > 0) {
            filteredGroups.forEach(group => {
                html += `
                    <div class="group-to-join" onclick="requestJoin(${group.id}, '${group.name}', '${group.leader}', ${group.minValue}, '${group.photo}')">
                        <img src="${group.photo}" alt="${group.name}">
                        <div class="group-to-join-info">
                            <h3>${group.name}</h3>
                            <p>Líder: ${group.leader}</p>
                            <p>${group.members} membros • ${group.minValue} MT/mês</p>
                            <p>${group.location}</p>
                        </div>
                    </div>
                `;
            });
        } else {
                        html = `
                <div class="no-results">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Nenhum grupo encontrado com o termo "${searchTerm}"</p>
                </div>
            `;
        }
        
        $('#groups-to-join-list').html(html);
    }
    
    // Funções de ação
    function createGroup() {
        const groupData = {
            name: $('#group-name').val(),
            description: $('#group-description').val(),
            minValue: $('#min-value').val(),
            type: $('#group-type').val(),
            location: $('#group-location').val() || null,
            photo: $('#group-photo')[0].files[0] || null
        };
        
        // Simulação de chamada à API
        console.log('Dados do grupo a ser criado:', groupData);
        
        // Mostrar feedback ao usuário
        $('#confirmation-title').html('Grupo Criado com Sucesso!');
        $('#confirmation-details').html(`
            <p>O grupo <strong>${groupData.name}</strong> foi criado com sucesso.</p>
            <p>Agora você pode convidar membros e começar a poupar.</p>
        `);
        
        $('#create-group-modal').hide();
        $('#confirmation-modal').show();
        
        // Resetar formulário
        $('#create-group-form')[0].reset();
        
        // Recarregar a lista de grupos
        setTimeout(() => {
            loadMyGroups();
        }, 1000);
    }
    
    function requestJoin(groupId, groupName, leader, minValue, photo) {
        // Preencher o modal de solicitação
        $('#request-group-name').text(groupName);
        $('#request-group-leader').text(`Líder: ${leader}`);
        $('#request-group-min-value').text(`Valor mínimo: ${minValue} MT/mês`);
        $('#request-group-photo').attr('src', photo);
        
        // Armazenar o ID do grupo no formulário
        $('#request-join-form').data('group-id', groupId);
        
        // Mostrar o modal de solicitação
        $('#join-group-modal').hide();
        $('#request-join-modal').show();
    }
    
    function requestJoinGroup() {
        const groupId = $('#request-join-form').data('group-id');
        const message = $('#request-message').val();
        
        // Simulação de chamada à API
        console.log('Solicitação de adesão:', {
            groupId: groupId,
            message: message
        });
        
        // Mostrar feedback ao usuário
        const groupName = $('#request-group-name').text();
        $('#confirmation-title').html('Solicitação Enviada!');
        $('#confirmation-details').html(`
            <p>Sua solicitação para o grupo <strong>${groupName}</strong> foi enviada com sucesso.</p>
            <p>Você será notificado quando o líder aprovar sua participação.</p>
        `);
        
        $('#request-join-modal').hide();
        $('#confirmation-modal').show();
        
        // Resetar formulário
        $('#request-join-form')[0].reset();
        $('#accept-terms').prop('checked', false);
        
        // Recarregar a lista de grupos pendentes
        setTimeout(() => {
            loadPendingGroups();
        }, 1000);
    }
    
    function cancelRequest(groupId) {
        // Simulação de chamada à API para cancelar solicitação
        console.log('Cancelando solicitação para o grupo:', groupId);
        
        // Mostrar feedback ao usuário
        alert('Solicitação cancelada com sucesso!');
        
        // Recarregar a lista de grupos pendentes
        loadPendingGroups();
    }
    
    function viewGroup(groupId) {
        // Simulação de redirecionamento para página do grupo
        console.log('Visualizando grupo:', groupId);
        alert(`Redirecionando para a página do grupo ${groupId}`);
        // window.location.href = `/grupos/${groupId}`;
    }
    
    // Funções globais (acessíveis no HTML)
    window.requestJoin = requestJoin;
    window.viewGroup = viewGroup;
    window.cancelRequest = cancelRequest;
});