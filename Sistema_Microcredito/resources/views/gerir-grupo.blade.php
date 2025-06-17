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
        <a href="/dashboard" class="btn-voltar-link">
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
                    <span class="amount">125.400 MT</span>
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
                    <tbody>
                        <tr>
                            <td>
                                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="João Macuácua" class="member-avatar">
                            </td>
                            <td>João Macuácua</td>
                            <td><span class="badge badge-success">Ativo</span></td>
                            <td>05/06/2023</td>
                            <td>6.000 MT</td>
                            <td>
                                <button class="btn-action btn-warning"><i class="fas fa-envelope"></i></button>
                                <button class="btn-action btn-danger"><i class="fas fa-user-times"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Maria Silva" class="member-avatar">
                            </td>
                            <td>Maria Silva</td>
                            <td><span class="badge badge-success">Ativo</span></td>
                            <td>05/06/2023</td>
                            <td>6.000 MT</td>
                            <td>
                                <button class="btn-action btn-warning"><i class="fas fa-envelope"></i></button>
                                <button class="btn-action btn-danger"><i class="fas fa-user-times"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Carlos Mendes" class="member-avatar">
                            </td>
                            <td>Carlos Mendes</td>
                            <td><span class="badge badge-success">Ativo</span></td>
                            <td>05/06/2023</td>
                            <td>6.000 MT</td>
                            <td>
                                <button class="btn-action btn-warning"><i class="fas fa-envelope"></i></button>
                                <button class="btn-action btn-danger"><i class="fas fa-user-times"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Ana Pereira" class="member-avatar">
                            </td>
                            <td>Ana Pereira</td>
                            <td><span class="badge badge-warning">Pendente</span></td>
                            <td>-</td>
                            <td>0 MT</td>
                            <td>
                                <button class="btn-action btn-success"><i class="fas fa-check"></i></button>
                                <button class="btn-action btn-danger"><i class="fas fa-times"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="Pedro Ndlovu" class="member-avatar">
                            </td>
                            <td>Pedro Ndlovu</td>
                            <td><span class="badge badge-danger">Inativo</span></td>
                            <td>15/03/2023</td>
                            <td>1.500 MT</td>
                            <td>
                                <button class="btn-action btn-primary"><i class="fas fa-user-check"></i></button>
                                <button class="btn-action btn-danger"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="tab-content" id="loans">
            <div class="section-header">
                <h2>Empréstimos Ativos</h2>
                <div class="loan-stats">
                    <div class="stat-card">
                        <div class="stat-icon bg-primary">
                            <i class="fas fa-hand-holding-usd"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Total Emprestado</h4>
                            <p>85.000 MT</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon bg-success">
                            <i class="fas fa-coins"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Total Pago</h4>
                            <p>32.500 MT</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon bg-warning">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-info">
                            <h4>Em Atraso</h4>
                            <p>2</p>
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
                    <tbody>
                        <tr>
                            <td>
                                <div class="user-info">
                                    <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="Luísa Fernandes">
                                    <span>Luísa Fernandes</span>
                                </div>
                            </td>
                            <td>
                                <div class="user-info">
                                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="João Macuácua">
                                    <span>João Macuácua</span>
                                </div>
                            </td>
                            <td>15.000 MT</td>
                            <td>12</td>
                            <td>5</td>
                            <td>15/07/2023</td>
                            <td><span class="badge badge-success">Em dia</span></td>
                            <td>
                                <button class="btn-action btn-primary"><i class="fas fa-eye"></i></button>
                                <button class="btn-action btn-warning"><i class="fas fa-edit"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="user-info">
                                    <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="José Nhaca">
                                    <span>José Nhaca</span>
                                </div>
                            </td>
                            <td>
                                <div class="user-info">
                                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Maria Silva">
                                    <span>Maria Silva</span>
                                </div>
                            </td>
                            <td>10.000 MT</td>
                            <td>10</td>
                            <td>3</td>
                            <td>10/07/2023</td>
                            <td><span class="badge badge-warning">Parc. pendente</span></td>
                            <td>
                                <button class="btn-action btn-primary"><i class="fas fa-eye"></i></button>
                                <button class="btn-action btn-warning"><i class="fas fa-edit"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="user-info">
                                    <img src="https://randomuser.me/api/portraits/men/55.jpg" alt="Rui Mutemba">
                                    <span>Rui Mutemba</span>
                                </div>
                            </td>
                            <td>
                                <div class="user-info">
                                    <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Carlos Mendes">
                                    <span>Carlos Mendes</span>
                                </div>
                            </td>
                            <td>20.000 MT</td>
                            <td>18</td>
                            <td>2</td>
                            <td>20/06/2023</td>
                            <td><span class="badge badge-danger">Em atraso</span></td>
                            <td>
                                <button class="btn-action btn-primary"><i class="fas fa-eye"></i></button>
                                <button class="btn-action btn-warning"><i class="fas fa-edit"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="tab-content" id="requests">
            <div class="section-header">
                <h2>Solicitações de Empréstimo</h2>
                <div class="request-stats">
                    <span class="badge badge-primary">5 Novas</span>
                    <span class="badge badge-success">12 Aprovadas</span>
                    <span class="badge badge-danger">3 Recusadas</span>
                </div>
            </div>
            
            <div class="request-filters">
                <div class="filter-group">
                    <label for="request-status">Status:</label>
                    <select id="request-status">
                        <option value="all">Todas</option>
                        <option value="pending">Pendentes</option>
                        <option value="approved">Aprovadas</option>
                        <option value="rejected">Recusadas</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="request-date">Período:</label>
                    <select id="request-date">
                        <option value="all">Todos</option>
                        <option value="week">Última semana</option>
                        <option value="month">Último mês</option>
                        <option value="quarter">Últimos 3 meses</option>
                    </select>
                </div>
            </div>
            
            <div class="requests-list">
                <div class="request-card pending">
                    <div class="request-header">
                        <div class="request-id">#EMP-2023-00528</div>
                        <div class="request-date">10/06/2023</div>
                        <span class="badge badge-pending">Pendente</span>
                    </div>
                    <div class="request-body">
                        <div class="applicant-info">
                            <img src="https://randomuser.me/api/portraits/women/25.jpg" alt="Sofia Nhampossa">
                            <div>
                                <h4>Sofia Nhampossa</h4>
                                <p>Negócio: Mercearia Familiar</p>
                                <p>Solicitação: 12.000 MT por 12 meses</p>
                            </div>
                        </div>
                        <div class="godfather-info">
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="João Macuácua">
                            <div>
                                <h4>Padrinho: João Macuácua</h4>
                                <p>Status: <span class="text-success">Aceitou apadrinhar</span></p>
                                <p>Relação: Vizinho</p>
                            </div>
                        </div>
                    </div>
                    <div class="request-footer">
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
                
                <div class="request-card pending">
                    <div class="request-header">
                        <div class="request-id">#EMP-2023-00529</div>
                        <div class="request-date">11/06/2023</div>
                        <span class="badge badge-pending">Pendente</span>
                    </div>
                    <div class="request-body">
                        <div class="applicant-info">
                            <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="António Sitoe">
                            <div>
                                <h4>António Sitoe</h4>
                                <p>Negócio: Oficina Mecânica</p>
                                <p>Solicitação: 8.000 MT por 6 meses</p>
                            </div>
                        </div>
                        <div class="godfather-info">
                            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Maria Silva">
                            <div>
                                <h4>Padrinho: Maria Silva</h4>
                                <p>Status: <span class="text-warning">Ainda não respondeu</span></p>
                                <p>Relação: Primo</p>
                            </div>
                        </div>
                    </div>
                    <div class="request-footer">
                        <button class="btn btn-success btn-sm" disabled>
                            <i class="fas fa-check"></i> Aprovar
                        </button>
                        <button class="btn btn-danger btn-sm" disabled>
                            <i class="fas fa-times"></i> Recusar
                        </button>
                        <button class="btn btn-outline btn-sm">
                            <i class="fas fa-eye"></i> Ver Detalhes
                        </button>
                    </div>
                </div>
                
                <div class="request-card approved">
                    <div class="request-header">
                        <div class="request-id">#EMP-2023-00520</div>
                        <div class="request-date">05/06/2023</div>
                        <span class="badge badge-approved">Aprovado</span>
                    </div>
                    <div class="request-body">
                        <div class="applicant-info">
                            <img src="https://randomuser.me/api/portraits/men/15.jpg" alt="Paulo Tembe">
                            <div>
                                <h4>Paulo Tembe</h4>
                                <p>Negócio: Agricultura</p>
                                <p>Solicitação: 15.000 MT por 12 meses</p>
                            </div>
                        </div>
                        <div class="godfather-info">
                            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Carlos Mendes">
                            <div>
                                <h4>Padrinho: Carlos Mendes</h4>
                                <p>Status: <span class="text-success">Aceitou apadrinhar</span></p>
                                <p>Relação: Amigo</p>
                            </div>
                        </div>
                    </div>
                    <div class="request-footer">
                        <button class="btn btn-outline btn-sm">
                            <i class="fas fa-eye"></i> Ver Contrato
                        </button>
                        <button class="btn btn-outline btn-sm">
                            <i class="fas fa-file-invoice-dollar"></i> Pagamentos
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="tab-content" id="reports">
            <div class="section-header">
                <h2>Relatórios do Grupo</h2>
                <div class="report-actions">
                    <button class="btn btn-outline">
                        <i class="fas fa-download"></i> Exportar Dados
                    </button>
                    <button class="btn btn-outline">
                        <i class="fas fa-print"></i> Imprimir Relatório
                    </button>
                </div>
            </div>
            
            <div class="reports-grid">
                <div class="report-card">
                    <h3><i class="fas fa-chart-line"></i> Histórico de Contribuições</h3>
                    <div class="chart-placeholder">
                        [Gráfico de linhas mostrando contribuições mensais]
                    </div>
                </div>
                
                <div class="report-card">
                    <h3><i class="fas fa-chart-pie"></i> Distribuição de Empréstimos</h3>
                    <div class="chart-placeholder">
                        [Gráfico de pizza mostrando finalidades dos empréstimos]
                    </div>
                </div>
                
                <div class="report-card">
                    <h3><i class="fas fa-calendar-alt"></i> Próximos Vencimentos</h3>
                    <div class="upcoming-payments">
                        <div class="payment-item">
                            <div class="payment-detail">
                                <span class="payment-date">15/07/2023</span>
                                <span class="payment-amount">1.250 MT</span>
                            </div>
                            <span class="payment-user">Luísa Fernandes</span>
                        </div>
                        <div class="payment-item">
                            <div class="payment-detail">
                                <span class="payment-date">10/07/2023</span>
                                <span class="payment-amount">1.000 MT</span>
                            </div>
                            <span class="payment-user">José Nhaca</span>
                        </div>
                        <div class="payment-item">
                            <div class="payment-detail">
                                <span class="payment-date">20/06/2023</span>
                                <span class="payment-amount">1.111 MT</span>
                            </div>
                            <span class="payment-user">Rui Mutemba</span>
                        </div>
                    </div>
                </div>
                
                <div class="report-card">
                    <h3><i class="fas fa-exclamation-triangle"></i> Empréstimos em Risco</h3>
                    <div class="risk-loans">
                        <div class="loan-item">
                            <span class="loan-user">Rui Mutemba</span>
                            <span class="loan-amount">20.000 MT</span>
                            <span class="loan-status badge badge-danger">2 parcelas atrasadas</span>
                        </div>
                        <div class="loan-item">
                            <span class="loan-user">José Nhaca</span>
                            <span class="loan-amount">10.000 MT</span>
                            <span class="loan-status badge badge-warning">Próxima parcela pendente</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Adicionar Membro -->
    <div class="modal" id="add-member-modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Adicionar Novo Membro</h2>
            
            <form id="add-member-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="member-name">Nome Completo *</label>
                        <input type="text" id="member-name" required>
                    </div>
                    <div class="form-group">
                        <label for="member-phone">Telefone *</label>
                        <input type="tel" id="member-phone" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="member-email">Email</label>
                    <input type="email" id="member-email">
                </div>
                
                <div class="form-group">
                    <label for="member-relation">Relação com o Grupo *</label>
                    <select id="member-relation" required>
                        <option value="">Selecione...</option>
                        <option value="familia">Família</option>
                        <option value="amigo">Amigo</option>
                        <option value="vizinho">Vizinho</option>
                        <option value="colega">Colega de Trabalho</option>
                        <option value="outros">Outros</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="member-notes">Observações</label>
                    <textarea id="member-notes" rows="3"></textarea>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-outline">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Adicionar Membro</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal Detalhes do Empréstimo -->
    <div class="modal" id="loan-details-modal">
        <div class="modal-content large">
            <span class="close-modal">&times;</span>
            <div class="modal-header">
                <h2>Detalhes do Empréstimo <span class="loan-id">#EMP-2023-00528</span></h2>
                <span class="badge badge-success">Em dia</span>
            </div>
            
            <div class="modal-body">
                <div class="loan-parties">
                    <div class="party-card">
                        <h3><i class="fas fa-user-tie"></i> Empreendedor</h3>
                        <div class="party-info">
                            <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="Luísa Fernandes">
                            <div>
                                <h4>Luísa Fernandes</h4>
                                <p><strong>Negócio:</strong> Mercearia Familiar</p>
                                <p><strong>Contacto:</strong> +258 84 123 4567</p>
                                <p><strong>Email:</strong> luisa@exemplo.com</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="party-card">
                        <h3><i class="fas fa-hands-helping"></i> Padrinho</h3>
                        <div class="party-info">
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="João Macuácua">
                            <div>
                                <h4>João Macuácua</h4>
                                <p><strong>Relação:</strong> Vizinho</p>
                                <p><strong>Contacto:</strong> +258 82 987 6543</p>
                                <p><strong>Membro desde:</strong> 15/01/2022</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="loan-terms">
                    <h3><i class="fas fa-file-contract"></i> Termos do Empréstimo</h3>
                    <div class="terms-grid">
                        <div class="term-item">
                            <span class="term-label">Valor Emprestado</span>
                            <span class="term-value">15.000 MT</span>
                        </div>
                        <div class="term-item">
                            <span class="term-label">Taxa de Juros</span>
                            <span class="term-value">5% ao mês</span>
                        </div>
                        <div class="term-item">
                            <span class="term-label">Parcelas</span>
                            <span class="term-value">12 x 1.750 MT</span>
                        </div>
                        <div class="term-item">
                            <span class="term-label">Data de Início</span>
                            <span class="term-value">15/02/2023</span>
                        </div>
                        <div class="term-item">
                            <span class="term-label">Parcelas Pagas</span>
                            <span class="term-value">5/12</span>
                        </div>
                        <div class="term-item">
                            <span class="term-label">Total Pago</span>
                            <span class="term-value">8.750 MT</span>
                        </div>
                        <div class="term-item">
                            <span class="term-label">Próximo Vencimento</span>
                            <span class="term-value">15/07/2023</span>
                        </div>
                        <div class="term-item">
                            <span class="term-label">Saldo Devedor</span>
                            <span class="term-value">6.250 MT</span>
                        </div>
                    </div>
                </div>
                
                <div class="payment-history">
                    <h3><i class="fas fa-history"></i> Histórico de Pagamentos</h3>
                    <table class="payment-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Data</th>
                                <th>Valor</th>
                                <th>Método</th>
                                <th>Status</th>
                                <th>Comprovante</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>15/02/2023</td>
                                <td>1.750 MT</td>
                                <td>M-Pesa</td>
                                <td><span class="badge badge-success">Pago</span></td>
                                <td><a href="#" class="btn-link">Ver</a></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>15/03/2023</td>
                                <td>1.750 MT</td>
                                <td>M-Pesa</td>
                                <td><span class="badge badge-success">Pago</span></td>
                                <td><a href="#" class="btn-link">Ver</a></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>15/04/2023</td>
                                <td>1.750 MT</td>
                                <td>Dinheiro</td>
                                <td><span class="badge badge-success">Pago</span></td>
                                <td><a href="#" class="btn-link">Ver</a></td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>15/05/2023</td>
                                <td>1.750 MT</td>
                                <td>M-Pesa</td>
                                <td><span class="badge badge-success">Pago</span></td>
                                <td><a href="#" class="btn-link">Ver</a></td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>15/06/2023</td>
                                <td>1.750 MT</td>
                                <td>M-Pesa</td>
                                <td><span class="badge badge-success">Pago</span></td>
                                <td><a href="#" class="btn-link">Ver</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="btn btn-outline">Imprimir Contrato</button>
                <button class="btn btn-primary">Registrar Pagamento</button>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
        <script src="{{ asset('js/gerir-grupo.js') }}"></script>
</body>
</html>