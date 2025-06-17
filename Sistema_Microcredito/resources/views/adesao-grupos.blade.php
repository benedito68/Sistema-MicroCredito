<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MicroCred - Adesão a Grupos</title>
      <link rel="stylesheet" href="{{ asset('css/adesao-grupos.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
   

</head>
<body>
    <div class="groups-container">
                <!-- Botão Voltar -->
        <a href="/dashboard" class="btn-voltar-link">
            <button class="btn-voltar" id="btn-voltar" title="Voltar">
                <i class="fas fa-arrow-left"></i>
                <span class="tooltip">Voltar</span>
            </button>
        </a>
        <div class="groups-header">
            <h1><i class="fas fa-users"></i> Adesão a Grupos de Poupança</h1>
            <p>Junte-se a um grupo existente ou entre com um código de convite</p>
        </div>
        
        <!-- Aba de Navegação -->
        <div class="groups-tabs">
            <button class="tab-btn active" data-tab="available-groups">Grupos Disponíveis</button>
            <button class="tab-btn" data-tab="join-by-code">Entrar com Código</button>
        </div>
        
        <!-- Conteúdo das Abas -->
        <div class="tab-content active" id="available-groups">
            <!-- Filtros -->
            <div class="filters">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" placeholder="Pesquisar grupos...">
                </div>
                <div class="filter-group">
                    <label for="area-filter">Área:</label>
                    <select id="area-filter">
                        <option value="">Todas</option>
                        <option value="agricultura">Agricultura</option>
                        <option value="pesca">Pesca</option>
                        <option value="artistas">Artistas</option>
                        <option value="comercio">Comércio</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="size-filter">Tamanho:</label>
                    <select id="size-filter">
                        <option value="">Todos</option>
                        <option value="small">Pequeno (5-10)</option>
                        <option value="medium">Médio (11-20)</option>
                        <option value="large">Grande (21-30)</option>
                    </select>
                </div>
            </div>
            
            <!-- Lista de Grupos -->
            <div class="groups-list">
                <!-- Grupo 1 -->
                <div class="group-card">
                    <div class="group-header">
                        <h3>Agricultores Unidos</h3>
                        <span class="group-badge agriculture">Agricultura</span>
                    </div>
                    <div class="group-details">
                        <div class="detail-item">
                            <i class="fas fa-users"></i>
                            <span>12/20 membros</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-hand-holding-usd"></i>
                            <span>500 MT/mês</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-calendar-alt"></i>
                            <span>12 meses</span>
                        </div>
                    </div>
                    <div class="group-actions">
                        <button class="btn btn-outline btn-view-details" data-group-id="1">
                            <i class="fas fa-eye"></i> Ver Detalhes
                        </button>
                        <button class="btn btn-primary btn-join" data-group-id="1">
                            <i class="fas fa-user-plus"></i> Solicitar Adesão
                        </button>
                    </div>
                </div>
                
                <!-- Grupo 2 -->
                <div class="group-card">
                    <div class="group-header">
                        <h3>Pescadores da Baía</h3>
                        <span class="group-badge fishing">Pesca</span>
                    </div>
                    <div class="group-details">
                        <div class="detail-item">
                            <i class="fas fa-users"></i>
                            <span>8/15 membros</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-hand-holding-usd"></i>
                            <span>300 MT/mês</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-calendar-alt"></i>
                            <span>18 meses</span>
                        </div>
                    </div>
                    <div class="group-actions">
                        <button class="btn btn-outline btn-view-details" data-group-id="2">
                            <i class="fas fa-eye"></i> Ver Detalhes
                        </button>
                        <button class="btn btn-primary btn-join" data-group-id="2">
                            <i class="fas fa-user-plus"></i> Solicitar Adesão
                        </button>
                    </div>
                </div>
                
                <!-- Grupo 3 -->
                <div class="group-card">
                    <div class="group-header">
                        <h3>Artesãos Moçambicanos</h3>
                        <span class="group-badge artists">Artistas</span>
                    </div>
                    <div class="group-details">
                        <div class="detail-item">
                            <i class="fas fa-users"></i>
                            <span>18/25 membros</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-hand-holding-usd"></i>
                            <span>200 MT/mês</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-calendar-alt"></i>
                            <span>24 meses</span>
                        </div>
                    </div>
                    <div class="group-actions">
                        <button class="btn btn-outline btn-view-details" data-group-id="3">
                            <i class="fas fa-eye"></i> Ver Detalhes
                        </button>
                        <button class="btn btn-primary btn-join" data-group-id="3">
                            <i class="fas fa-user-plus"></i> Solicitar Adesão
                        </button>
                    </div>
                </div>
                
                <!-- Grupo 4 (com pedido pendente) -->
                <div class="group-card">
                    <div class="group-header">
                        <h3>Comércio Local</h3>
                        <span class="group-badge commerce">Comércio</span>
                        <span class="pending-badge">Pedido Pendente</span>
                    </div>
                    <div class="group-details">
                        <div class="detail-item">
                            <i class="fas fa-users"></i>
                            <span>10/15 membros</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-hand-holding-usd"></i>
                            <span>400 MT/mês</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-calendar-alt"></i>
                            <span>12 meses</span>
                        </div>
                    </div>
                    <div class="group-actions">
                        <button class="btn btn-outline btn-view-details" data-group-id="4">
                            <i class="fas fa-eye"></i> Ver Detalhes
                        </button>
                        <button class="btn btn-danger btn-cancel" data-group-id="4">
                            <i class="fas fa-times"></i> Cancelar Pedido
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Tab Entrar com Código -->
        <div class="tab-content" id="join-by-code">
            <div class="join-by-code-container">
                <div class="code-instructions">
                    <h3><i class="fas fa-key"></i> Entrar com Código de Convite</h3>
                    <p>Se você recebeu um código de convite para um grupo privado, insira-o abaixo para solicitar sua adesão.</p>
                </div>
                
                <div class="code-form">
                    <div class="form-group">
                        <label for="invite-code">Código de Convite</label>
                        <input type="text" id="invite-code" placeholder="Ex: GRP-XY7Z9P">
                    </div>
                    <button class="btn btn-primary" id="btn-verify-code">
                        <i class="fas fa-check-circle"></i> Verificar Código
                    </button>
                </div>
                
                <div class="code-help">
                    <p><i class="fas fa-info-circle"></i> O código deve ter sido fornecido pelo líder do grupo. Caso não tenha, entre em contato com o líder.</p>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Modal de Detalhes do Grupo -->
    <div class="modal" id="group-details-modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-header">
                <h2 id="modal-group-name">Agricultores Unidos</h2>
                <span class="group-badge agriculture" id="modal-group-category">Agricultura</span>
            </div>
            
            <div class="modal-body">
                <div class="group-description">
                    <h3><i class="fas fa-info-circle"></i> Descrição</h3>
                    <p id="modal-group-description">Grupo formado por pequenos agricultores da região norte, com o objetivo de poupar para a compra de equipamentos agrícolas e insumos.</p>
                </div>
                
                <div class="group-stats">
                    <div class="stat-item">
                        <div class="stat-value" id="modal-group-members">12/20</div>
                        <div class="stat-label">Membros</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value" id="modal-group-amount">500 MT</div>
                        <div class="stat-label">Mensal</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value" id="modal-group-duration">12</div>
                        <div class="stat-label">Meses</div>
                    </div>
                </div>
                
                <div class="group-additional-info">
                    <h3><i class="fas fa-calendar-check"></i> Próxima Reunião</h3>
                    <p id="modal-next-meeting">15/06/2023 - 14:00 (Escola Primária de Nampula)</p>
                    
                    <h3><i class="fas fa-user-tie"></i> Líder do Grupo</h3>
                    <div class="leader-info" id="modal-group-leader">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Líder">
                        <div>
                            <p class="leader-name">João Macuácua</p>
                            <p class="leader-contact">joao.macuacua@exemplo.com</p>
                            <p class="leader-phone">+258 84 123 4567</p>
                        </div>
                    </div>
                    
                    <h3><i class="fas fa-file-alt"></i> Regras do Grupo</h3>
                    <ul class="group-rules" id="modal-group-rules">
                        <li>Contribuição mensal obrigatória até o dia 5 de cada mês</li>
                        <li>Presença mínima de 75% nas reuniões</li>
                        <li>Multa de 100 MT por atraso no pagamento</li>
                        <li>Decisões tomadas por maioria simples</li>
                    </ul>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="btn btn-outline" id="btn-close-details">Fechar</button>
                <button class="btn btn-primary" id="btn-join-from-modal">
                    <i class="fas fa-user-plus"></i> Solicitar Adesão
                </button>
            </div>
        </div>
    </div>
    
    <!-- Modal de Confirmação de Adesão -->
    <div class="modal" id="join-confirmation-modal">
        <div class="modal-content small">
            <div class="confirmation-icon success">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Pedido de Adesão Enviado!</h2>
            <p>Seu pedido para ingressar no grupo <strong id="joined-group-name">Agricultores Unidos</strong> foi enviado com sucesso.</p>
            <p>O líder do grupo será notificado e você receberá uma resposta em breve.</p>
            <button class="btn btn-primary" id="btn-close-confirmation">OK</button>
        </div>
    </div>
    
    <!-- Modal de Código Válido -->
    <div class="modal" id="valid-code-modal">
        <div class="modal-content small">
            <div class="confirmation-icon success">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Código Válido!</h2>
            <p>Você está sendo adicionado ao grupo <strong id="invited-group-name">Pescadores da Baía</strong>.</p>
            <div class="group-info">
                <p><strong>Contribuição:</strong> <span id="invited-group-amount">300 MT/mês</span></p>
                <p><strong>Duração:</strong> <span id="invited-group-duration">18 meses</span></p>
            </div>
            <div class="modal-actions">
                <button class="btn btn-outline" id="btn-cancel-join">Cancelar</button>
                <button class="btn btn-primary" id="btn-confirm-join">Confirmar Adesão</button>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/adesao-grupos.js') }}"></script>

</body>
</html>