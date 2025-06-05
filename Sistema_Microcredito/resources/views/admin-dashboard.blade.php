<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MicroCred - Painel Administrativo</title>
          <link rel="stylesheet" href="{{ asset('css/admin-dashboard.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css">
</head>
<body>
    <div class="admin-container">
        <!-- Sidebar -->
        <div class="admin-sidebar">
            <div class="sidebar-header">
                <i class="fas fa-hand-holding-usd"></i>
                <h2>MicroCred</h2>
                <span class="admin-badge">Admin</span>
            </div>
            
            <nav class="sidebar-nav">
                <ul>
                    <li class="active">
                        <a href="#">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>Visão Geral</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fas fa-users-cog"></i>
                            <span>Gestão de Usuários</span>
                            <span class="notification-badge">5</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fas fa-users"></i>
                            <span>Grupos</span>
                            <span class="notification-badge">3</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fas fa-file-invoice-dollar"></i>
                            <span>Empréstimos</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fas fa-bell"></i>
                            <span>Notificações</span>
                            <span class="notification-badge">8</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fas fa-chart-line"></i>
                            <span>Relatórios</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i class="fas fa-cog"></i>
                            <span>Configurações</span>
                        </a>
                    </li>
                </ul>
            </nav>
            
            <div class="sidebar-footer">
                <p>Sistema de Microcréditos v2.0</p>
            </div>
        </div>
        
        <!-- Main Content -->
        <div class="admin-main">
            <!-- Navbar -->
            <header class="admin-navbar">
                <div class="navbar-left">
                    <i class="fas fa-bars sidebar-toggle"></i>
                    <h3>Visão Geral</h3>
                </div>
                
                <div class="navbar-right">
                    <div class="notifications">
                        <button class="notification-btn">
                            <i class="fas fa-bell"></i>
                            <span class="notification-count">8</span>
                        </button>
                        <div class="notification-dropdown">
                            <div class="notification-header">
                                <h4>Notificações</h4>
                                <a href="#" class="mark-all-read">Marcar todas como lidas</a>
                            </div>
                            <div class="notification-list">
                                <div class="notification-item unread">
                                    <div class="notification-icon">
                                        <i class="fas fa-user-plus"></i>
                                    </div>
                                    <div class="notification-content">
                                        <p>Novo usuário registrado: João M.</p>
                                        <small>10 minutos atrás</small>
                                    </div>
                                </div>
                                <div class="notification-item unread">
                                    <div class="notification-icon">
                                        <i class="fas fa-users"></i>
                                    </div>
                                    <div class="notification-content">
                                        <p>Solicitação de novo grupo "Agricultores"</p>
                                        <small>1 hora atrás</small>
                                    </div>
                                </div>
                                <div class="notification-item">
                                    <div class="notification-icon">
                                        <i class="fas fa-file-invoice-dollar"></i>
                                    </div>
                                    <div class="notification-content">
                                        <p>Empréstimo aprovado para Maria S.</p>
                                        <small>3 horas atrás</small>
                                    </div>
                                </div>
                            </div>
                            <div class="notification-footer">
                                <a href="#">Ver todas</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="user-dropdown">
                        <button class="user-button">
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Admin" class="user-avatar">
                            <span>Admin</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="dropdown-menu">
                            <a href="#"><i class="fas fa-user"></i> Meu Perfil</a>
                            <a href="#"><i class="fas fa-cog"></i> Configurações</a>
                            <div class="divider"></div>
                            <a href="#" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Terminar Sessão</a>
                        </div>
                    </div>
                </div>
            </header>
            
            <!-- Dashboard Content -->
            <main class="admin-content">
                <!-- Cards de Resumo -->
                <div class="summary-cards">
                    <div class="card">
                        <div class="card-icon bg-primary">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="card-info">
                            <h4>Total de Usuários</h4>
                            <p>1.248</p>
                            <small>+12 este mês</small>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-icon bg-success">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="card-info">
                            <h4>Grupos Ativos</h4>
                            <p>86</p>
                            <small>+5 este mês</small>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-icon bg-warning">
                            <i class="fas fa-file-invoice-dollar"></i>
                        </div>
                        <div class="card-info">
                            <h4>Empréstimos Ativos</h4>
                            <p>324</p>
                            <small>Total: 1.2M MT</small>
                        </div>
                    </div>
                    
                    <div class="card">
                        <div class="card-icon bg-danger">
                            <i class="fas fa-exclamation-circle"></i>
                        </div>
                        <div class="card-info">
                            <h4>Pendências</h4>
                            <p>15</p>
                            <small>5 atrasos, 10 aprovações</small>
                        </div>
                    </div>
                </div>
                
                <!-- Seção de Gestão -->
                <div class="management-section">
                    <div class="section-header">
                        <h3>Gestão de Usuários</h3>
                        <div class="section-actions">
                            <button class="btn btn-primary">
                                <i class="fas fa-plus"></i> Adicionar Usuário
                            </button>
                            <button class="btn btn-outline">
                                <i class="fas fa-filter"></i> Filtrar
                            </button>
                        </div>
                    </div>
                    
                    <div class="table-responsive">
                        <table id="users-table" class="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Tipo</th>
                                    <th>Status</th>
                                    <th>Último Acesso</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>#1001</td>
                                    <td>
                                        <div class="user-info">
                                            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Maria Silva">
                                            <span>Maria Silva</span>
                                        </div>
                                    </td>
                                    <td>maria@exemplo.com</td>
                                    <td><span class="badge badge-user">Usuário</span></td>
                                    <td><span class="badge badge-success">Ativo</span></td>
                                    <td>Hoje, 10:45</td>
                                    <td>
                                        <button class="btn-action btn-edit"><i class="fas fa-edit"></i></button>
                                        <button class="btn-action btn-deactivate"><i class="fas fa-user-slash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>#1002</td>
                                    <td>
                                        <div class="user-info">
                                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="João Santos">
                                            <span>João Santos</span>
                                        </div>
                                    </td>
                                    <td>joao@exemplo.com</td>
                                    <td><span class="badge badge-lider">Líder</span></td>
                                    <td><span class="badge badge-success">Ativo</span></td>
                                    <td>Ontem, 16:30</td>
                                    <td>
                                        <button class="btn-action btn-edit"><i class="fas fa-edit"></i></button>
                                        <button class="btn-action btn-deactivate"><i class="fas fa-user-slash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>#1003</td>
                                    <td>
                                        <div class="user-info">
                                            <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Ana Pereira">
                                            <span>Ana Pereira</span>
                                        </div>
                                    </td>
                                    <td>ana@exemplo.com</td>
                                    <td><span class="badge badge-user">Usuário</span></td>
                                    <td><span class="badge badge-warning">Pendente</span></td>
                                    <td>Nunca</td>
                                    <td>
                                        <button class="btn-action btn-approve"><i class="fas fa-check"></i></button>
                                        <button class="btn-action btn-reject"><i class="fas fa-times"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>#1004</td>
                                    <td>
                                        <div class="user-info">
                                            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Carlos Mendes">
                                            <span>Carlos Mendes</span>
                                        </div>
                                    </td>
                                    <td>carlos@exemplo.com</td>
                                    <td><span class="badge badge-admin">Admin</span></td>
                                    <td><span class="badge badge-success">Ativo</span></td>
                                    <td>Hoje, 09:15</td>
                                    <td>
                                        <button class="btn-action btn-edit"><i class="fas fa-edit"></i></button>
                                        <button class="btn-action btn-deactivate"><i class="fas fa-user-slash"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>#1005</td>
                                    <td>
                                        <div class="user-info">
                                            <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="Luísa Fernandes">
                                            <span>Luísa Fernandes</span>
                                        </div>
                                    </td>
                                    <td>luisa@exemplo.com</td>
                                    <td><span class="badge badge-lider">Líder</span></td>
                                    <td><span class="badge badge-danger">Inativo</span></td>
                                    <td>2 semanas atrás</td>
                                    <td>
                                        <button class="btn-action btn-edit"><i class="fas fa-edit"></i></button>
                                        <button class="btn-action btn-activate"><i class="fas fa-user-check"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <!-- Solicitações de Grupos -->
                <div class="management-section">
                    <div class="section-header">
                        <h3>Solicitações de Grupos</h3>
                        <div class="section-actions">
                            <button class="btn btn-outline">
                                <i class="fas fa-filter"></i> Filtrar
                            </button>
                        </div>
                    </div>
                    
                    <div class="group-requests">
                        <div class="request-card pending">
                            <div class="request-header">
                                <h4>Agricultores Unidos</h4>
                                <span class="badge badge-pending">Pendente</span>
                            </div>
                            <div class="request-body">
                                <div class="request-info">
                                    <p><strong>Criador:</strong> João Santos</p>
                                    <p><strong>Membros:</strong> 8 (propostos)</p>
                                    <p><strong>Poupança Mensal:</strong> 500 MT</p>
                                    <p><strong>Data Solicitação:</strong> 15/05/2023</p>
                                </div>
                                <div class="request-actions">
                                    <button class="btn btn-success btn-sm">
                                        <i class="fas fa-check"></i> Aprovar
                                    </button>
                                    <button class="btn btn-danger btn-sm">
                                        <i class="fas fa-times"></i> Recusar
                                    </button>
                                    <button class="btn btn-outline btn-sm">
                                        <i class="fas fa-eye"></i> Ver Detalhes
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="request-card pending">
                            <div class="request-header">
                                <h4>Comércio Local</h4>
                                <span class="badge badge-pending">Pendente</span>
                            </div>
                            <div class="request-body">
                                <div class="request-info">
                                    <p><strong>Criador:</strong> Maria Silva</p>
                                    <p><strong>Membros:</strong> 12 (propostos)</p>
                                    <p><strong>Poupança Mensal:</strong> 300 MT</p>
                                    <p><strong>Data Solicitação:</strong> 14/05/2023</p>
                                </div>
                                <div class="request-actions">
                                    <button class="btn btn-success btn-sm">
                                        <i class="fas fa-check"></i> Aprovar
                                    </button>
                                    <button class="btn btn-danger btn-sm">
                                        <i class="fas fa-times"></i> Recusar
                                    </button>
                                    <button class="btn btn-outline btn-sm">
                                        <i class="fas fa-eye"></i> Ver Detalhes
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="request-card approved">
                            <div class="request-header">
                                <h4>Artesanato Moçambicano</h4>
                                <span class="badge badge-approved">Aprovado</span>
                            </div>
                            <div class="request-body">
                                <div class="request-info">
                                    <p><strong>Criador:</strong> Ana Pereira</p>
                                    <p><strong>Membros:</strong> 10 (ativos)</p>
                                    <p><strong>Poupança Mensal:</strong> 200 MT</p>
                                    <p><strong>Data Aprovação:</strong> 10/05/2023</p>
                                </div>
                                <div class="request-actions">
                                    <button class="btn btn-outline btn-sm">
                                        <i class="fas fa-eye"></i> Ver Grupo
                                    </button>
                                    <button class="btn btn-danger btn-sm">
                                        <i class="fas fa-trash"></i> Remover
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <!-- Modal de Edição de Usuário -->
    <div class="modal" id="edit-user-modal">
        <div class="modal-content large">
            <span class="close-modal">&times;</span>
            <h3>Editar Usuário</h3>
            <form id="edit-user-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="edit-name">Nome Completo</label>
                        <input type="text" id="edit-name" value="Maria Silva">
                    </div>
                    <div class="form-group">
                        <label for="edit-email">Email</label>
                        <input type="email" id="edit-email" value="maria@exemplo.com">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="edit-phone">Telefone</label>
                        <input type="tel" id="edit-phone" value="+258 84 123 4567">
                    </div>
                    <div class="form-group">
                        <label for="edit-type">Tipo de Usuário</label>
                        <select id="edit-type">
                            <option value="user">Usuário Comum</option>
                            <option value="leader" selected>Líder de Grupo</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="edit-status">Status</label>
                    <select id="edit-status">
                        <option value="active" selected>Ativo</option>
                        <option value="pending">Pendente</option>
                        <option value="inactive">Inativo</option>
                        <option value="blocked">Bloqueado</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="edit-notes">Observações</label>
                    <textarea id="edit-notes" rows="3">Líder do grupo "Comércio Local"</textarea>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-outline">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                </div>
            </form>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
     <script src="{{ asset('js/admin-dashboard.js') }}"></script>
</body>
</html>