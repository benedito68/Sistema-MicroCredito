<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MicroCred - Solicitar Empréstimo</title>
          <link rel="stylesheet" href="{{ asset('css/solcitar-emprestimo.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <div class="loan-container">
                <!-- Botão Voltar -->
        <a href="dashboard.html" class="btn-voltar-link">
            <button class="btn-voltar" id="btn-voltar" title="Voltar">
                <i class="fas fa-arrow-left"></i>
                <span class="tooltip">Voltar</span>
            </button>
        </a>
        <!-- Barra de Progresso -->
        <div class="progress-bar">
            <div class="progress-step active" data-step="1">
                <div class="step-number">1</div>
                <div class="step-label">Dados do Empréstimo</div>
            </div>
            <div class="progress-step" data-step="2">
                <div class="step-number">2</div>
                <div class="step-label">Escolher Grupo</div>
            </div>
            <div class="progress-step" data-step="3">
                <div class="step-number">3</div>
                <div class="step-label">Selecionar Padrinho</div>
            </div>
            <div class="progress-line"></div>
        </div>
        
        <!-- Formulário em Etapas -->
        <form id="loan-form" class="loan-form">
            <!-- Passo 1 - Dados do Empréstimo -->
            <div class="form-step active" data-step="1">
                <h2>Informações do Empréstimo</h2>
                <p>Preencha os detalhes do empréstimo que deseja solicitar</p>
                
                <div class="form-group">
                    <label for="loan-amount">Montante do Empréstimo (MT) *</label>
                    <input type="number" id="loan-amount" name="loan-amount" min="500" max="50000" required placeholder="Ex: 5000">
                    <small>Valor mínimo: 500 MT | Valor máximo: 50.000 MT</small>
                </div>
                
                <div class="form-group">
                    <label for="loan-purpose">Finalidade do Empréstimo *</label>
                    <select id="loan-purpose" name="loan-purpose" required>
                        <option value="">Selecione uma finalidade...</option>
                        <option value="negocio">Investimento no Negócio</option>
                        <option value="educacao">Educação</option>
                        <option value="saude">Saúde</option>
                        <option value="agricultura">Agricultura</option>
                        <option value="construcao">Construção/Reforma</option>
                        <option value="emergencia">Emergência</option>
                        <option value="outros">Outros</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="loan-term">Prazo de Pagamento (meses) *</label>
                    <select id="loan-term" name="loan-term" required>
                        <option value="3">3 meses</option>
                        <option value="6">6 meses</option>
                        <option value="12" selected>12 meses</option>
                        <option value="18">18 meses</option>
                        <option value="24">24 meses</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="loan-description">Descrição Adicional</label>
                    <textarea id="loan-description" name="loan-description" rows="3" placeholder="Descreva com mais detalhes como usará o empréstimo"></textarea>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-next" data-next="2">Próximo <i class="fas fa-arrow-right"></i></button>
                </div>
            </div>
            
            <!-- Passo 2 - Escolher Grupo -->
            <div class="form-step" data-step="2">
                <h2>Escolha um Grupo</h2>
                <p>Selecione um dos seus grupos disponíveis para o empréstimo</p>
                
                <div class="groups-list" id="compatible-groups">
                    <!-- Grupos serão carregados dinamicamente via JavaScript -->
                    <div class="no-groups">
                        <i class="fas fa-info-circle"></i>
                        <p>Carregando grupos compatíveis com seu empréstimo...</p>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-prev" data-prev="1"><i class="fas fa-arrow-left"></i> Anterior</button>
                    <button type="button" class="btn btn-next" data-next="3" id="btn-to-godfather" disabled>Próximo <i class="fas fa-arrow-right"></i></button>
                </div>
            </div>
            
            <!-- Passo 3 - Selecionar Padrinho -->
            <div class="form-step" data-step="3">
                <h2>Selecione um Padrinho</h2>
                <p>Escolha um membro do grupo para ser seu padrinho nesta solicitação</p>
                
                <div class="group-info" id="selected-group-info">
                    <!-- Informações do grupo selecionado serão carregadas aqui -->
                </div>
                
                <div class="members-list" id="group-members">
                    <!-- Membros serão carregados dinamicamente via JavaScript -->
                    <div class="no-members">
                        <i class="fas fa-info-circle"></i>
                        <p>Selecione um grupo na etapa anterior para carregar os membros</p>
                    </div>
                </div>
                
                <div class="terms-warning">
                    <div class="warning-icon">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div class="warning-content">
                        <h3>Termos Importantes</h3>
                        <p>O padrinho selecionado será responsável por garantir o pagamento caso você não cumpra com suas obrigações.</p>
                        <p>Ao prosseguir, você concorda com os termos do empréstimo e com a responsabilidade compartilhada com seu padrinho.</p>
                    </div>
                </div>
                
                <div class="form-group checkbox-group">
                    <input type="checkbox" id="agree-terms" name="agree-terms" required>
                    <label for="agree-terms">Eu li e concordo com os termos e condições do empréstimo *</label>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-prev" data-prev="2"><i class="fas fa-arrow-left"></i> Anterior</button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-paper-plane"></i> Enviar Solicitação
                    </button>
                </div>
            </div>
        </form>
    </div>
    
    <!-- Modal de Confirmação -->
    <div class="modal" id="confirmation-modal">
        <div class="modal-content small">
            <div class="confirmation-icon success">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Solicitação Enviada!</h2>
            <p>Sua solicitação de empréstimo foi enviada com sucesso.</p>
            
            <div class="loan-details">
                <p><strong>Montante:</strong> <span id="confirmed-amount">5.000 MT</span></p>
                <p><strong>Grupo:</strong> <span id="confirmed-group">Agricultores Unidos</span></p>
                <p><strong>Padrinho:</strong> <span id="confirmed-godfather">João Macuácua</span></p>
                <p><strong>Prazo:</strong> <span id="confirmed-term">12 meses</span></p>
            </div>
            
            <p>Você receberá uma resposta em até 48 horas. Obrigado por usar o MicroCred!</p>
            
            <button class="btn btn-primary" id="btn-close-confirmation">
                <i class="fas fa-home"></i> Voltar ao Início
            </button>
        </div>
    </div>

        <script src="{{ asset('js/solicitar-emprestimo.js') }}"></script>
</body>
</html>