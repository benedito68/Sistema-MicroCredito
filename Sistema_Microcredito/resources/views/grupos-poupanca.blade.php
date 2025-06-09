<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MicroCred - Meus Grupos de Poupança</title>
   
          <link rel="stylesheet" href="{{ asset('css/grupos-poupanca.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css">
</head>

<body>
    <div class="savings-groups-container">
        <!-- Cabeçalho -->
        <div class="groups-header">
            <!-- Botão Voltar -->
            <a href="/dashboard" class="btn-voltar-link">
                <button class="btn-voltar" id="btn-voltar" title="Voltar">
                    <i class="fas fa-arrow-left"></i>
                    <span class="tooltip">Voltar</span>
                </button>
            </a>
            <div class="header-left">
                <h1><i class="fas fa-piggy-bank"></i> Meus Grupos de Poupança</h1>
                <p>Gerencie seus grupos de poupança comunitária</p>
            </div>
            <div class="header-right">
                <a href="/adesao-grupos">
                    <button class="btn btn-primary" id="btn-join-group">
                        <i class="fas fa-sign-in-alt"></i> Aderir a Grupo
                    </button>
                </a>
                <a href="/criar-grupo">
                    <button class="btn btn-success" id="btn-create-group">
                        <i class="fas fa-plus-circle"></i> Criar Grupo
                    </button>
                </a>
            </div>
        </div>

        <!-- Tabs de Navegação -->
        <div class="groups-tabs">
            <button class="tab-btn active" data-tab="my-groups"><i class="fas fa-users"></i> Meus Grupos</button>
            <button class="tab-btn" data-tab="pending-groups"><i class="fas fa-clock"></i> Pendentes</button>
            <button class="tab-btn" data-tab="available-groups"><i class="fas fa-search"></i> Grupos
                Disponíveis</button>
        </div>

        <!-- Conteúdo das Abas -->
        <div class="tab-content active" id="my-groups">
            <div class="section-header">
                <h2>Grupos que Participo</h2>
                <div class="search-box">
                    <input type="text" id="search-my-groups" placeholder="Pesquisar grupo...">
                    <i class="fas fa-search"></i>
                </div>
            </div>

            <div class="table-responsive">
                <table id="my-groups-table" class="data-table">
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Nome do Grupo</th>
                            <th>Líder</th>
                            <th>Membros</th>
                            <th>Valor Mínimo</th>
                            <th>Saldo Total</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="my-groups-body">
                        <!-- Dados serão carregados via API -->
                    </tbody>
                </table>
            </div>
        </div>

        <div class="tab-content" id="pending-groups">
            <div class="section-header">
                <h2>Solicitações Pendentes</h2>
                <div class="search-box">
                    <input type="text" id="search-pending-groups" placeholder="Pesquisar grupo...">
                    <i class="fas fa-search"></i>
                </div>
            </div>

            <div class="table-responsive">
                <table id="pending-groups-table" class="data-table">
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Nome do Grupo</th>
                            <th>Líder</th>
                            <th>Membros</th>
                            <th>Valor Mínimo</th>
                            <th>Data Solicitação</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="pending-groups-body">
                        <!-- Dados serão carregados via API -->
                    </tbody>
                </table>
            </div>
        </div>

        <div class="tab-content" id="available-groups">
            <div class="section-header">
                <h2>Grupos Disponíveis</h2>
                <div class="search-box">
                    <input type="text" id="search-available-groups" placeholder="Pesquisar grupo...">
                    <i class="fas fa-search"></i>
                </div>
            </div>

            <div class="table-responsive">
                <table id="available-groups-table" class="data-table">
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Nome do Grupo</th>
                            <th>Líder</th>
                            <th>Membros</th>
                            <th>Valor Mínimo</th>
                            <th>Tipo</th>
                            <th>Localização</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="available-groups-body">
                        <!-- Dados serão carregados via API -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Modal Criar Grupo -->
    <div class="modal" id="create-group-modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2><i class="fas fa-plus-circle"></i> Criar Novo Grupo</h2>

            <form id="create-group-form">
                <div class="form-group">
                    <label for="group-name">Nome do Grupo </label>
                    <input type="text" id="group-name" placeholder="Ex: Poupança Comunitária Bairro X" required>
                </div>

                <div class="form-group">
                    <label for="group-description">Descrição </label>
                    <textarea id="group-description" rows="3" placeholder="Descreva os objetivos do grupo"
                        required></textarea>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="min-value">Valor Mínimo Mensal </label>
                        <div class="input-with-symbol">
                            <span>MT</span>
                            <input type="number" id="min-value" min="500" step="100" value="1000" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="group-type">Tipo de Grupo *</label>
                        <select id="group-type" required>
                            <option value="">Selecione...</option>
                            <option value="community">Comunitário</option>
                            <option value="professional">Profissional</option>
                            <option value="family">Familiar</option>
                            <option value="religious">Religioso</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="group-location">Localização (opcional)</label>
                    <input type="text" id="group-location" placeholder="Ex: Bairro, Cidade">
                </div>

                <div class="form-group">
                    <label for="group-photo">Foto do Grupo (opcional)</label>
                    <input type="file" id="group-photo" accept="image/*">
                </div>

                <div class="form-actions">
                    <button type="button" class="btn btn-outline close-modal-btn">Cancelar</button>
                    <button type="submit" class="btn btn-success">Criar Grupo</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal Aderir a Grupo -->
    <div class="modal" id="join-group-modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2><i class="fas fa-sign-in-alt"></i> Aderir a Grupo</h2>

            <div class="search-box-modal">
                <input type="text" id="search-group-to-join" placeholder="Pesquisar grupo...">
                <i class="fas fa-search"></i>
            </div>

            <div class="groups-to-join-list" id="groups-to-join-list">
                <!-- Grupos serão carregados via API -->
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <p>Digite o nome do grupo que deseja encontrar</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Solicitação de Adesão -->
    <div class="modal" id="request-join-modal">
        <div class="modal-content small">
            <div class="group-info">
                <img src="https://via.placeholder.com/80" alt="Grupo" id="request-group-photo" class="group-photo">
                <h3 id="request-group-name">Poupança Comunitária Bairro X</h3>
                <p id="request-group-leader">Líder: João Macuácua</p>
                <p id="request-group-min-value">Valor mínimo: 1.000 MT/mês</p>
            </div>

            <form id="request-join-form">
                <div class="form-group">
                    <label for="request-message">Mensagem para o Líder (opcional)</label>
                    <textarea id="request-message" rows="3"
                        placeholder="Ex: Gostaria de me juntar ao grupo porque..."></textarea>
                </div>

                <div class="form-group">
                    <label>
                        <input type="checkbox" id="accept-terms" required>
                        Eu concordo com os termos do grupo e me comprometo a contribuir mensalmente
                    </label>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-outline close-modal-btn">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Enviar Solicitação</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal Confirmação -->
    <div class="modal" id="confirmation-modal">
        <div class="modal-content small">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2 id="confirmation-title">Solicitação Enviada!</h2>
            <div class="success-details" id="confirmation-details">
                <p>Sua solicitação para o grupo <strong>Poupança Comunitária Bairro X</strong> foi enviada com sucesso.
                </p>
                <p>Você será notificado quando o líder aprovar sua participação.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" id="btn-close-confirmation">Fechar</button>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
        <script src="{{ asset('js/grupos-poupanca.js') }}"></script>
</body>

</html>