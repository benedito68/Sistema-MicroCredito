<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MicroCred - Gestão de Grupo</title>
    <link rel="stylesheet" href="{{ asset('css/gerir-grupo.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css">
</head>
<body>
    <div class="group-management-container">
        <!-- Cabeçalho -->
        <div class="management-header">
            <!-- Botão Voltar -->
            <a href="{{ route('savings-groups') }}" class="btn-voltar-link">
                <button class="btn-voltar" id="btn-voltar" title="Voltar">
                    <i class="fas fa-arrow-left"></i>
                    <span class="tooltip">Voltar</span>
                </button>
            </a>
            <div class="header-left">
                <h1><i class="fas fa-users-cog"></i> Gestão do Grupo</h1>
                <p>Painel de controle para líderes de grupos de poupança</p>
            </div>
            <div class="header-right">
                <div class="group-balance">
                    <span>Saldo do Grupo:</span>
                    <span class="amount" id="group-balance">Carregando...</span>
                </div>
            </div>
        </div>
        
        <!-- Abas de Navegação -->
        <div class="management-tabs">
            <button class="tab-btn active" data-tab="members"><i class="fas fa-users"></i> Membros</button>
            <button class="tab-btn" data-tab="loans"><i class="fas fa-file-invoice-dollar"></i> Empréstimos</button>
            <button class="tab-btn" data-tab="requests"><i class="fas fa-handshake"></i> Solicitações</button>
            <button class="tab-btn" data-tab="reports"><i class="fas fa-chart-bar"></i> Relatórios</button>
        </div>
        
        <!-- Conteúdo das Abas -->
        <div class="tab-content active" id="members">
            <div class="section-header">
                <h2>Membros do Grupo</h2>
                <button class="btn btn-primary" id="btn-add-member">
                    <i class="fas fa-user-plus"></i> Adicionar Membro
                </button>
            </div>
            
            <div class="table-responsive">
                <table id="members-table" class="data-table">
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Nome</th>
                            <th>Status</th>
                            <th>Última Contribuição</th>
                            <th>Total Contribuído</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="members-table-body">
                        <!-- Data will be loaded via API -->
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="tab-content" id="loans">
            <!-- Loans content remains similar but with API integration -->
            <div class="section-header">
                <h2>Empréstimos Ativos</h2>
                <div class="loan-stats">
                    <div class="stat-card">
                        <div class="stat-icon bg-primary">
                            <i class="fas fa-hand-holding-usd"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Total Emprestado</h4>
                            <p id="total-loaned">Carregando...</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon bg-success">
                            <i class="fas fa-coins"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Total Pago</h4>
                            <p id="total-paid">Carregando...</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon bg-warning">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Em Atraso</h4>
                            <p id="late-loans">Carregando...</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="table-responsive">
                <table id="loans-table" class="data-table">
                    <thead>
                        <tr>
                            <th>Empreendedor</th>
                            <th>Padrinho</th>
                            <th>Valor</th>
                            <th>Parcelas</th>
                            <th>Pagas</th>
                            <th>Próximo Venc.</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="loans-table-body">
                        <!-- Data will be loaded via API -->
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Other tabs (requests, reports) would follow similar pattern -->
        
    </div>

    <!-- Modal Adicionar Membro -->
    <div class="modal" id="add-member-modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Adicionar Novo Membro</h2>
            
            <div class="add-member-options">
                <button id="invite-existing-user" class="btn btn-primary">Convidar Usuário Existente</button>
                <button id="generate-invite-link" class="btn btn-secondary">Gerar Link de Convite</button>
            </div>
            
            <div id="existing-users-section" style="display: none;">
                <h3>Usuários Disponíveis para Convite</h3>
                <div class="search-box">
                    <input type="text" id="user-search" placeholder="Pesquisar usuários...">
                    <button id="search-users"><i class="fas fa-search"></i></button>
                </div>
                <div class="table-responsive">
                    <table id="users-table" class="data-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Apelido</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Distrito</th>
                                <th>Província</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody id="users-table-body">
                            <!-- Users will be loaded here -->
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div id="invite-link-section" style="display: none;">
                <h3>Link de Convite para o Grupo</h3>
                <div class="invite-link-box">
                    <input type="text" id="invite-link" readonly>
                    <button id="copy-invite-link" class="btn btn-secondary">
                        <i class="fas fa-copy"></i> Copiar
                    </button>
                </div>
                <p class="info-text">Compartilhe este link com pessoas que deseja convidar para o grupo.</p>
                <div class="form-group">
                    <label for="invite-expiry">Validade do Link:</label>
                    <select id="invite-expiry">
                        <option value="1">1 dia</option>
                        <option value="7" selected>1 semana</option>
                        <option value="30">1 mês</option>
                        <option value="0">Sem expiração</option>
                    </select>
                </div>
                <button id="generate-new-link" class="btn btn-primary">
                    <i class="fas fa-sync-alt"></i> Gerar Novo Link
                </button>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-outline close-modal">Fechar</button>
            </div>
        </div>
    </div>

    <!-- Modal Detalhes do Empréstimo -->
    <div class="modal" id="loan-details-modal">
        <!-- Content remains similar but with API integration -->
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script>
        // Current group ID - this would come from Laravel
        const GROUP_ID = {{ $group->id ?? 'null' }};
        const API_BASE_URL = '{{ url("/api") }}';
        const APP_URL = '{{ url("/") }}';
        
        $(document).ready(function() {
            // Load initial data
            loadGroupData();
            loadMembers();
            loadLoans();
            
            // Tab switching logic
            $('.tab-btn').click(function() {
                const tabId = $(this).data('tab');
                $('.tab-btn').removeClass('active');
                $(this).addClass('active');
                $('.tab-content').removeClass('active');
                $(`#${tabId}`).addClass('active');
            });
            
            // Add member modal logic
            $('#btn-add-member').click(function() {
                $('#add-member-modal').show();
            });
            
            $('.close-modal').click(function() {
                $(this).closest('.modal').hide();
            });
            
            // Add member options
            $('#invite-existing-user').click(function() {
                $('#existing-users-section').show();
                $('#invite-link-section').hide();
                loadAvailableUsers();
            });
            
            $('#generate-invite-link').click(function() {
                $('#existing-users-section').hide();
                $('#invite-link-section').show();
                generateInviteLink();
            });
            
            // Search users
            $('#search-users').click(function() {
                loadAvailableUsers($('#user-search').val());
            });
            
            // Copy invite link
            $('#copy-invite-link').click(function() {
                const link = $('#invite-link');
                link.select();
                document.execCommand('copy');
                alert('Link copiado para a área de transferência!');
            });
            
            // Generate new link
            $('#generate-new-link').click(function() {
                generateInviteLink();
            });
        });
        
        function loadGroupData() {
            // In a real app, this would be an API call
            // For now, we'll use mock data
            setTimeout(() => {
                $('#group-balance').text('125.400 MT');
                $('#total-loaned').text('85.000 MT');
                $('#total-paid').text('32.500 MT');
                $('#late-loans').text('2');
            }, 500);
        }
        
        function loadMembers() {
            // Mock API call to get members
            const mockMembers = [
                {
                    id: 1,
                    name: "João Macuácua",
                    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                    status: "active",
                    last_contribution: "05/06/2023",
                    total_contributed: "6.000 MT"
                },
                {
                    id: 2,
                    name: "Maria Silva",
                    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
                    status: "active",
                    last_contribution: "05/06/2023",
                    total_contributed: "6.000 MT"
                },
                {
                    id: 3,
                    name: "Carlos Mendes",
                    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
                    status: "active",
                    last_contribution: "05/06/2023",
                    total_contributed: "6.000 MT"
                },
                {
                    id: 4,
                    name: "Ana Pereira",
                    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
                    status: "pending",
                    last_contribution: "-",
                    total_contributed: "0 MT"
                },
                {
                    id: 5,
                    name: "Pedro Ndlovu",
                    avatar: "https://randomuser.me/api/portraits/men/85.jpg",
                    status: "inactive",
                    last_contribution: "15/03/2023",
                    total_contributed: "1.500 MT"
                }
            ];
            
            let membersHtml = '';
            mockMembers.forEach(member => {
                let statusBadge = '';
                if (member.status === 'active') {
                    statusBadge = '<span class="badge badge-success">Ativo</span>';
                } else if (member.status === 'pending') {
                    statusBadge = '<span class="badge badge-warning">Pendente</span>';
                } else {
                    statusBadge = '<span class="badge badge-danger">Inativo</span>';
                }
                
                let actions = '';
                if (member.status === 'pending') {
                    actions = `
                        <button class="btn-action btn-success" onclick="approveMember(${member.id})">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn-action btn-danger" onclick="rejectMember(${member.id})">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                } else if (member.status === 'inactive') {
                    actions = `
                        <button class="btn-action btn-primary" onclick="activateMember(${member.id})">
                            <i class="fas fa-user-check"></i>
                        </button>
                        <button class="btn-action btn-danger" onclick="deleteMember(${member.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    `;
                } else {
                    actions = `
                        <button class="btn-action btn-warning" onclick="messageMember(${member.id})">
                            <i class="fas fa-envelope"></i>
                        </button>
                        <button class="btn-action btn-danger" onclick="removeMember(${member.id})">
                            <i class="fas fa-user-times"></i>
                        </button>
                    `;
                }
                
                membersHtml += `
                    <tr>
                        <td>
                            <img src="${member.avatar}" alt="${member.name}" class="member-avatar">
                        </td>
                        <td>${member.name}</td>
                        <td>${statusBadge}</td>
                        <td>${member.last_contribution}</td>
                        <td>${member.total_contributed}</td>
                        <td>${actions}</td>
                    </tr>
                `;
            });
            
            $('#members-table-body').html(membersHtml);
            $('#members-table').DataTable();
        }
        
        function loadLoans() {
            // Mock loans data
            const mockLoans = [
                {
                    id: 1,
                    entrepreneur: {
                        name: "Luísa Fernandes",
                        avatar: "https://randomuser.me/api/portraits/women/33.jpg"
                    },
                    godfather: {
                        name: "João Macuácua",
                        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
                    },
                    amount: "15.000 MT",
                    installments: 12,
                    paid: 5,
                    next_due: "15/07/2023",
                    status: "current"
                },
                {
                    id: 2,
                    entrepreneur: {
                        name: "José Nhaca",
                        avatar: "https://randomuser.me/api/portraits/men/22.jpg"
                    },
                    godfather: {
                        name: "Maria Silva",
                        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
                    },
                    amount: "10.000 MT",
                    installments: 10,
                    paid: 3,
                    next_due: "10/07/2023",
                    status: "pending"
                },
                {
                    id: 3,
                    entrepreneur: {
                        name: "Rui Mutemba",
                        avatar: "https://randomuser.me/api/portraits/men/55.jpg"
                    },
                    godfather: {
                        name: "Carlos Mendes",
                        avatar: "https://randomuser.me/api/portraits/men/75.jpg"
                    },
                    amount: "20.000 MT",
                    installments: 18,
                    paid: 2,
                    next_due: "20/06/2023",
                    status: "late"
                }
            ];
            
            let loansHtml = '';
            mockLoans.forEach(loan => {
                let statusBadge = '';
                if (loan.status === 'current') {
                    statusBadge = '<span class="badge badge-success">Em dia</span>';
                } else if (loan.status === 'pending') {
                    statusBadge = '<span class="badge badge-warning">Parc. pendente</span>';
                } else {
                    statusBadge = '<span class="badge badge-danger">Em atraso</span>';
                }
                
                loansHtml += `
                    <tr>
                        <td>
                            <div class="user-info">
                                <img src="${loan.entrepreneur.avatar}" alt="${loan.entrepreneur.name}">
                                <span>${loan.entrepreneur.name}</span>
                            </div>
                        </td>
                        <td>
                            <div class="user-info">
                                <img src="${loan.godfather.avatar}" alt="${loan.godfather.name}">
                                <span>${loan.godfather.name}</span>
                            </div>
                        </td>
                        <td>${loan.amount}</td>
                        <td>${loan.installments}</td>
                        <td>${loan.paid}</td>
                        <td>${loan.next_due}</td>
                        <td>${statusBadge}</td>
                        <td>
                            <button class="btn-action btn-primary" onclick="viewLoanDetails(${loan.id})">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-action btn-warning" onclick="editLoan(${loan.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                        </td>
                    </tr>
                `;
            });
            
            $('#loans-table-body').html(loansHtml);
            $('#loans-table').DataTable();
        }
        
        function loadAvailableUsers(searchTerm = '') {
            // Mock API call to get available users
            const mockUsers = [
                {
                    id: 101,
                    first_name: "Miguel",
                    last_name: "Sitoe",
                    email: "miguel.sitoe@example.com",
                    phone: "+258841234567",
                    district: "KaMavota",
                    province: "Maputo"
                },
                {
                    id: 102,
                    first_name: "Ana",
                    last_name: "Mondlane",
                    email: "ana.mondlane@example.com",
                    phone: "+258842345678",
                    district: "KaMpfumo",
                    province: "Maputo"
                },
                {
                    id: 103,
                    first_name: "Carlos",
                    last_name: "Nhaca",
                    email: "carlos.nhaca@example.com",
                    phone: "+258843456789",
                    district: "Matola",
                    province: "Maputo"
                },
                {
                    id: 104,
                    first_name: "Sofia",
                    last_name: "Manjate",
                    email: "sofia.manjate@example.com",
                    phone: "+258844567890",
                    district: "Boane",
                    province: "Maputo"
                },
                {
                    id: 105,
                    first_name: "Paulo",
                    last_name: "Mabunda",
                    email: "paulo.mabunda@example.com",
                    phone: "+258845678901",
                    district: "Marracuene",
                    province: "Maputo"
                }
            ];
            
            // Filter users if search term is provided
            const filteredUsers = searchTerm ? 
                mockUsers.filter(user => 
                    `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.phone.includes(searchTerm)
                ) : 
                mockUsers;
            
            let usersHtml = '';
            filteredUsers.forEach(user => {
                usersHtml += `
                    <tr>
                        <td>${user.first_name}</td>
                        <td>${user.last_name}</td>
                        <td>${user.email}</td>
                        <td>${user.phone}</td>
                        <td>${user.district}</td>
                        <td>${user.province}</td>
                        <td>
                            <button class="btn btn-sm btn-primary" onclick="inviteUser(${user.id})">
                                <i class="fas fa-user-plus"></i> Convidar
                            </button>
                        </td>
                    </tr>
                `;
            });
            
            $('#users-table-body').html(usersHtml);
        }
        
        function generateInviteLink() {
            // In a real app, this would call the API to generate an invite token
            const expiryDays = $('#invite-expiry').val();
            const mockToken = 'invite_' + Math.random().toString(36).substr(2, 16);
            
            // Mock API response
            setTimeout(() => {
                const inviteLink = `${APP_URL}/join-group/${GROUP_ID}?token=${mockToken}`;
                $('#invite-link').val(inviteLink);
            }, 500);
        }
        
        // Member actions
        function approveMember(memberId) {
            alert(`Aprovar membro ${memberId} - Esta ação chamaria a API`);
            // API call would go here
        }
        
        function rejectMember(memberId) {
            if (confirm('Tem certeza que deseja rejeitar este membro?')) {
                alert(`Rejeitar membro ${memberId} - Esta ação chamaria a API`);
                // API call would go here
            }
        }
        
        function activateMember(memberId) {
            alert(`Ativar membro ${memberId} - Esta ação chamaria a API`);
            // API call would go here
        }
        
        function deleteMember(memberId) {
            if (confirm('Tem certeza que deseja remover permanentemente este membro?')) {
                alert(`Remover membro ${memberId} - Esta ação chamaria a API`);
                // API call would go here
            }
        }
        
        function messageMember(memberId) {
            alert(`Enviar mensagem para membro ${memberId} - Esta ação chamaria a API`);
            // API call would go here
        }
        
        function removeMember(memberId) {
            if (confirm('Tem certeza que deseja remover este membro do grupo?')) {
                alert(`Remover membro ${memberId} do grupo - Esta ação chamaria a API`);
                // API call would go here
            }
        }
        
        // Loan actions
        function viewLoanDetails(loanId) {
            alert(`Ver detalhes do empréstimo ${loanId} - Esta ação chamaria a API`);
            // API call would go here
        }
        
        function editLoan(loanId) {
            alert(`Editar empréstimo ${loanId} - Esta ação chamaria a API`);
            // API call would go here
        }
        
        // User invitation
        function inviteUser(userId) {
            if (confirm(`Deseja enviar um convite para este usuário participar do grupo?`)) {
                alert(`Enviar convite para usuário ${userId} - Esta ação chamaria a API`);
                // API call would go here
            }
        }
    </script>
</body>
</html>