<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MicroCred - Minha Participação no Grupo</title>
          <link rel="stylesheet" href="{{ asset('css/membro-grupo.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css">
</head>

<body>
    <div class="member-group-container">
                <!-- Botão Voltar -->
        <a href="/dashboard" class="btn-voltar-link">
            <button class="btn-voltar" id="btn-voltar" title="Voltar">
                <i class="fas fa-arrow-left"></i>
                <span class="tooltip">Voltar</span>
            </button>
        </a>
        <!-- Cabeçalho -->
        <div class="group-header">
            <div class="header-left">
                <h1><i class="fas fa-users"></i> Grupo Poupança Comunitária</h1>
                <p>Você é membro deste grupo desde 15/03/2023</p>
            </div>
            <div class="header-right">
                <button class="btn btn-danger" id="btn-leave-group">
                    <i class="fas fa-sign-out-alt"></i> Sair do Grupo
                </button>
            </div>
        </div>

        <!-- Informações do Grupo -->
        <div class="group-info-cards">
            <div class="info-card">
                <div class="info-icon bg-primary">
                    <i class="fas fa-coins"></i>
                </div>
                <div class="info-content">
                    <h3>Valor Mínimo Mensal</h3>
                    <p>1.000 MT</p>
                </div>
            </div>

            <div class="info-card">
                <div class="info-icon bg-success">
                    <i class="fas fa-user-friends"></i>
                </div>
                <div class="info-content">
                    <h3>Membros Ativos</h3>
                    <p>12</p>
                </div>
            </div>

            <div class="info-card">
                <div class="info-icon bg-warning">
                    <i class="fas fa-hand-holding-usd"></i>
                </div>
                <div class="info-content">
                    <h3>Total Emprestado</h3>
                    <p>85.000 MT</p>
                </div>
            </div>

            <div class="info-card">
                <div class="info-icon bg-info">
                    <i class="fas fa-piggy-bank"></i>
                </div>
                <div class="info-content">
                    <h3>Saldo do Grupo</h3>
                    <p>125.400 MT</p>
                </div>
            </div>
        </div>

        <!-- Abas de Navegação -->
        <div class="member-tabs">
            <button class="tab-btn active" data-tab="members"><i class="fas fa-users"></i> Membros</button>
            <button class="tab-btn" data-tab="loans"><i class="fas fa-file-invoice-dollar"></i> Empréstimos</button>
            <button class="tab-btn" data-tab="my-contributions"><i class="fas fa-history"></i> Minhas
                Contribuições</button>
            <button class="tab-btn" data-tab="sponsorship-requests"><i class="fas fa-handshake"></i>
                Solicitações</button>
        </div>

        <!-- Conteúdo das Abas -->
        <div class="tab-content active" id="members">
            <div class="section-header">
                <h2>Lista de Membros do Grupo</h2>
                <div class="search-box">
                    <input type="text" placeholder="Pesquisar membro...">
                    <i class="fas fa-search"></i>
                </div>
            </div>

            <div class="table-responsive">
                <table id="members-table" class="data-table">
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Nome</th>
                            <th>Status</th>
                            <th>Membro Desde</th>
                            <th>Total Contribuído</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="João Macuácua"
                                    class="member-avatar">
                            </td>
                            <td>João Macuácua (Líder)</td>
                            <td><span class="badge badge-success">Ativo</span></td>
                            <td>15/01/2022</td>
                            <td>18.000 MT</td>
                        </tr>
                        <tr>
                            <td>
                                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Maria Silva"
                                    class="member-avatar">
                            </td>
                            <td>Maria Silva</td>
                            <td><span class="badge badge-success">Ativo</span></td>
                            <td>20/02/2022</td>
                            <td>15.500 MT</td>
                        </tr>
                        <tr>
                            <td>
                                <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Carlos Mendes"
                                    class="member-avatar">
                            </td>
                            <td>Carlos Mendes</td>
                            <td><span class="badge badge-success">Ativo</span></td>
                            <td>05/03/2022</td>
                            <td>12.750 MT</td>
                        </tr>
                        <tr>
                            <td>
                                <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Ana Pereira"
                                    class="member-avatar">
                            </td>
                            <td>Ana Pereira</td>
                            <td><span class="badge badge-warning">Pendente</span></td>
                            <td>-</td>
                            <td>0 MT</td>
                        </tr>
                        <tr>
                            <td>
                                <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="Pedro Ndlovu"
                                    class="member-avatar">
                            </td>
                            <td>Pedro Ndlovu</td>
                            <td><span class="badge badge-danger">Inativo</span></td>
                            <td>15/03/2023</td>
                            <td>1.500 MT</td>
                        </tr>
                        <tr>
                            <td>
                                <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="Você"
                                    class="member-avatar">
                            </td>
                            <td><strong>Você</strong></td>
                            <td><span class="badge badge-success">Ativo</span></td>
                            <td>15/03/2023</td>
                            <td>6.000 MT</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="tab-content" id="loans">
            <div class="section-header">
                <h2>Empréstimos do Grupo</h2>
                <div class="loan-filters">
                    <select id="loan-status">
                        <option value="all">Todos</option>
                        <option value="active">Ativos</option>
                        <option value="paid">Quitados</option>
                        <option value="late">Em atraso</option>
                    </select>
                </div>
            </div>

            <div class="table-responsive">
                <table id="loans-table" class="data-table">
                    <thead>
                        <tr>
                            <th>Empreendedor</th>
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
                            <td>15.000 MT</td>
                            <td>12</td>
                            <td>5</td>
                            <td>15/07/2023</td>
                            <td><span class="badge badge-success">Em dia</span></td>
                            <td>
                                <button class="btn-action btn-primary view-loan-btn">
                                    <i class="fas fa-eye"></i> Detalhes
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="user-info">
                                    <img src="https://randomuser.me/api/portraits/men/22.jpg" alt="José Nhaca">
                                    <span>José Nhaca</span>
                                </div>
                            </td>
                            <td>10.000 MT</td>
                            <td>10</td>
                            <td>3</td>
                            <td>10/07/2023</td>
                            <td><span class="badge badge-warning">Parc. pendente</span></td>
                            <td>
                                <button class="btn-action btn-primary view-loan-btn">
                                    <i class="fas fa-eye"></i> Detalhes
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="user-info">
                                    <img src="https://randomuser.me/api/portraits/men/55.jpg" alt="Rui Mutemba">
                                    <span>Rui Mutemba</span>
                                </div>
                            </td>
                            <td>20.000 MT</td>
                            <td>18</td>
                            <td>2</td>
                            <td>20/06/2023</td>
                            <td><span class="badge badge-danger">Em atraso</span></td>
                            <td>
                                <button class="btn-action btn-primary view-loan-btn">
                                    <i class="fas fa-eye"></i> Detalhes
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="tab-content" id="my-contributions">
            <div class="section-header">
                <h2>Minhas Contribuições</h2>
                <button class="btn btn-primary" id="btn-make-deposit">
                    <i class="fas fa-plus-circle"></i> Fazer Depósito
                </button>
            </div>

            <div class="contribution-stats">
                <div class="stat-card">
                    <div class="stat-icon bg-primary">
                        <i class="fas fa-coins"></i>
                    </div>
                    <div class="stat-info">
                        <h4>Total Contribuído</h4>
                        <p>6.000 MT</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon bg-success">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                    <div class="stat-info">
                        <h4>Depósitos Realizados</h4>
                        <p>6</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon bg-warning">
                        <i class="fas fa-calendar-times"></i>
                    </div>
                    <div class="stat-info">
                        <h4>Depósitos Pendentes</h4>
                        <p>0</p>
                    </div>
                </div>
            </div>

            <div class="table-responsive">
                <table id="contributions-table" class="data-table">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Valor</th>
                            <th>Método</th>
                            <th>Comprovante</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>05/06/2023</td>
                            <td>1.000 MT</td>
                            <td>M-Pesa</td>
                            <td><a href="#" class="btn-link">Ver</a></td>
                            <td><span class="badge badge-success">Confirmado</span></td>
                        </tr>
                        <tr>
                            <td>05/05/2023</td>
                            <td>1.000 MT</td>
                            <td>M-Pesa</td>
                            <td><a href="#" class="btn-link">Ver</a></td>
                            <td><span class="badge badge-success">Confirmado</span></td>
                        </tr>
                        <tr>
                            <td>05/04/2023</td>
                            <td>1.000 MT</td>
                            <td>Dinheiro</td>
                            <td><a href="#" class="btn-link">Ver</a></td>
                            <td><span class="badge badge-success">Confirmado</span></td>
                        </tr>
                        <tr>
                            <td>05/03/2023</td>
                            <td>1.000 MT</td>
                            <td>M-Pesa</td>
                            <td><a href="#" class="btn-link">Ver</a></td>
                            <td><span class="badge badge-success">Confirmado</span></td>
                        </tr>
                        <tr>
                            <td>05/02/2023</td>
                            <td>1.000 MT</td>
                            <td>M-Pesa</td>
                            <td><a href="#" class="btn-link">Ver</a></td>
                            <td><span class="badge badge-success">Confirmado</span></td>
                        </tr>
                        <tr>
                            <td>05/01/2023</td>
                            <td>1.000 MT</td>
                            <td>M-Pesa</td>
                            <td><a href="#" class="btn-link">Ver</a></td>
                            <td><span class="badge badge-success">Confirmado</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="tab-content" id="sponsorship-requests">
            <div class="section-header">
                <h2>Solicitações de Apadrinhamento</h2>
                <div class="search-box">
                    <input type="text" placeholder="Pesquisar empreendedor...">
                    <i class="fas fa-search"></i>
                </div>
            </div>

            <div class="table-responsive">
                <table id="sponsorship-table" class="data-table">
                    <thead>
                        <tr>
                            <th>Empreendedor</th>
                            <th>Data Solicitação</th>
                            <th>Valor Empréstimo</th>
                            <th>Finalidade</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div class="user-info">
                                    <img src="https://randomuser.me/api/portraits/women/28.jpg" alt="Ana Muchanga">
                                    <span>Ana Muchanga</span>
                                </div>
                            </td>
                            <td>10/06/2023</td>
                            <td>25.000 MT</td>
                            <td>Compra de mercadoria</td>
                            <td><span class="badge badge-warning">Pendente</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn-action btn-success accept-request">
                                        <i class="fas fa-check"></i> Aceitar
                                    </button>
                                    <button class="btn-action btn-danger reject-request">
                                        <i class="fas fa-times"></i> Recusar
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="user-info">
                                    <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Carlos Manhique">
                                    <span>Carlos Manhique</span>
                                </div>
                            </td>
                            <td>05/06/2023</td>
                            <td>15.000 MT</td>
                            <td>Reforma da loja</td>
                            <td><span class="badge badge-success">Aceito</span></td>
                            <td>
                                <button class="btn-action btn-primary view-details">
                                    <i class="fas fa-eye"></i> Ver Detalhes
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="user-info">
                                    <img src="https://randomuser.me/api/portraits/women/50.jpg" alt="Beatriz Nhantumbo">
                                    <span>Beatriz Nhantumbo</span>
                                </div>
                            </td>
                            <td>01/06/2023</td>
                            <td>18.000 MT</td>
                            <td>Compra de equipamento</td>
                            <td><span class="badge badge-danger">Recusado</span></td>
                            <td>
                                <button class="btn-action btn-outline view-reason">
                                    <i class="fas fa-comment-alt"></i> Ver Motivo
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Modal Aceitar Solicitação -->
    <div class="modal" id="accept-request-modal">
        <div class="modal-content small">
            <div class="success-icon">
                <i class="fas fa-handshake"></i>
            </div>
            <h2>Aceitar Solicitação de Apadrinhamento</h2>
            <p>Tem certeza que deseja aceitar ser padrinho do empréstimo de <strong>Ana Muchanga</strong> no valor de
                <strong>25.000 MT</strong>?</p>

            <div class="form-group">
                <label for="accept-notes">Observações (opcional)</label>
                <textarea id="accept-notes" rows="3"
                    placeholder="Ex: Aceito ser padrinho com as condições discutidas"></textarea>
            </div>

            <div class="modal-footer">
                <button class="btn btn-outline" id="btn-cancel-accept">Cancelar</button>
                <button class="btn btn-success" id="btn-confirm-accept">Confirmar Aceitação</button>
            </div>
        </div>
    </div>

    <!-- Modal Recusar Solicitação -->
    <div class="modal" id="reject-request-modal">
        <div class="modal-content small">
            <div class="warning-icon">
                <i class="fas fa-handshake-slash"></i>
            </div>
            <h2>Recusar Solicitação de Apadrinhamento</h2>
            <p>Tem certeza que deseja recusar ser padrinho do empréstimo de <strong>Ana Muchanga</strong> no valor de
                <strong>25.000 MT</strong>?</p>

            <div class="form-group">
                <label for="reject-reason">Motivo da Recusa *</label>
                <select id="reject-reason" required>
                    <option value="">Selecione um motivo...</option>
                    <option value="no-relation">Não conheço o empreendedor</option>
                    <option value="no-confidence">Não confio na capacidade de pagamento</option>
                    <option value="no-availability">Não posso me comprometer no momento</option>
                    <option value="other">Outro motivo</option>
                </select>
            </div>

            <div class="form-group" id="other-reason-group" style="display: none;">
                <label for="other-reason">Especifique o motivo *</label>
                <textarea id="other-reason" rows="3" placeholder="Descreva o motivo da recusa"></textarea>
            </div>

            <div class="modal-footer">
                <button class="btn btn-outline" id="btn-cancel-reject">Cancelar</button>
                <button class="btn btn-danger" id="btn-confirm-reject">Confirmar Recusa</button>
            </div>
        </div>
    </div>

    <!-- Modal Confirmação de Aceitação -->
    <div class="modal" id="accept-success-modal">
        <div class="modal-content small">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Solicitação Aceita com Sucesso!</h2>
            <div class="success-details">
                <p><strong>Empreendedor:</strong> Ana Muchanga</p>
                <p><strong>Valor:</strong> 25.000 MT</p>
                <p><strong>Data:</strong> 15/06/2023</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" id="btn-close-accept-success">Fechar</button>
            </div>
        </div>
    </div>

    <!-- Modal Confirmação de Recusa -->
    <div class="modal" id="reject-success-modal">
        <div class="modal-content small">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Solicitação Recusada com Sucesso!</h2>
            <div class="success-details">
                <p><strong>Empreendedor:</strong> Ana Muchanga</p>
                <p><strong>Motivo:</strong> Não posso me comprometer no momento</p>
                <p><strong>Data:</strong> 15/06/2023</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" id="btn-close-reject-success">Fechar</button>
            </div>
        </div>
    </div>

    <!-- Modal Fazer Depósito -->
    <div class="modal" id="deposit-modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2><i class="fas fa-coins"></i> Fazer Depósito</h2>

            <form id="deposit-form">
                <div class="form-group">
                    <label for="deposit-amount">Valor do Depósito *</label>
                    <div class="input-with-symbol">
                        <span>MT</span>
                        <input type="number" id="deposit-amount" min="1000" step="100" value="1000" required>
                    </div>
                    <p class="form-hint">Valor mínimo: 1.000 MT</p>
                </div>

                <div class="form-group">
                    <label for="deposit-method">Método de Pagamento *</label>
                    <select id="deposit-method" required>
                        <option value="">Selecione...</option>
                        <option value="mpesa">M-Pesa</option>
                        <option value="e-mola">e-Mola</option>
                        <option value="cash">Dinheiro (presencial)</option>
                        <option value="bank">Transferência Bancária</option>
                    </select>
                </div>

                <div class="form-group" id="mpesa-fields" style="display: none;">
                    <label for="mpesa-phone">Número de Telefone M-Pesa *</label>
                    <input type="tel" id="mpesa-phone" placeholder="84 123 4567">
                </div>

                <div class="form-group">
                    <label for="deposit-notes">Observações (opcional)</label>
                    <textarea id="deposit-notes" rows="3" placeholder="Ex: Depósito referente a junho/2023"></textarea>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn btn-outline close-deposit-modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Confirmar Depósito</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal Confirmação de Depósito -->
    <div class="modal" id="deposit-success-modal">
        <div class="modal-content small">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Depósito Realizado com Sucesso!</h2>
            <div class="success-details">
                <p><strong>Valor:</strong> 1.000 MT</p>
                <p><strong>Método:</strong> M-Pesa</p>
                <p><strong>Data:</strong> 15/06/2023</p>
                <p><strong>Nº Transação:</strong> MP123456789</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" id="btn-close-success">Fechar</button>
            </div>
        </div>
    </div>

    <!-- Modal Confirmar Saída do Grupo -->
    <div class="modal" id="leave-group-modal">
        <div class="modal-content small">
            <div class="warning-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h2>Confirmar Saída do Grupo</h2>
            <p>Tem certeza que deseja sair do grupo "Poupança Comunitária"?</p>
            <div class="warning-message">
                <p><i class="fas fa-info-circle"></i> Você só poderá reingressar no grupo mediante nova aprovação do
                    líder.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" id="btn-cancel-leave">Cancelar</button>
                <button class="btn btn-danger" id="btn-confirm-leave">Sim, Sair do Grupo</button>
            </div>
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
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script src="util/membro-grupo.js"></script>
        <script src="{{ asset('js/membro-grupo.js') }}"></script>
</body>

</html>