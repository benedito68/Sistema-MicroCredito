<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MicroCred - Criar Grupo de Poupança</title>
          <link rel="stylesheet" href="{{ asset('css/criar-grupo.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <div class="create-group-container">
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
                <div class="step-label">Dados do Grupo</div>
            </div>
            <div class="progress-step" data-step="2">
                <div class="step-number">2</div>
                <div class="step-label">Ciclo de Poupança</div>
            </div>
            <div class="progress-step" data-step="3">
                <div class="step-number">3</div>
                <div class="step-label">Confirmação</div>
            </div>
            <div class="progress-line"></div>
        </div>
        
        <!-- Formulário em Etapas -->
        <form id="group-form" class="group-form">
            <!-- Passo 1 - Dados do Grupo -->
            <div class="form-step active" data-step="1">
                <h2>Informações Básicas do Grupo</h2>
                <p>Preencha os dados principais do seu grupo de poupança</p>
                
                <div class="form-group">
                    <label for="group-name">Nome do Grupo *</label>
                    <input type="text" id="group-name" name="group-name" required placeholder="Ex: Agricultores Unidos">
                </div>
                
                <div class="form-group">
                    <label for="group-objective">Objetivo do Grupo *</label>
                    <textarea id="group-objective" name="group-objective" rows="3" required placeholder="Descreva o principal objetivo deste grupo"></textarea>
                </div>
                
                <div class="form-group">
                    <label for="group-area">Área de Atuação *</label>
                    <select id="group-area" name="group-area" required>
                        <option value="">Selecione uma área...</option>
                        <option value="agricultura">Agricultura</option>
                        <option value="pesca">Pesca</option>
                        <option value="artistas">Artistas</option>
                        <option value="comercio">Comércio</option>
                        <option value="outros">Outros</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="max-members">Capacidade Máxima de Membros *</label>
                    <input type="number" id="max-members" name="max-members" min="5" max="30" required value="15">
                    <small>Mínimo: 5 membros, Máximo: 30 membros</small>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-next" data-next="2">Próximo <i class="fas fa-arrow-right"></i></button>
                </div>
            </div>
            
            <!-- Passo 2 - Ciclo de Poupança -->
            <div class="form-step" data-step="2">
                <h2>Configuração do Ciclo de Poupança</h2>
                <p>Defina como funcionará o ciclo de contribuições do grupo</p>
                
                <div class="form-group">
                    <label for="saving-amount">Valor da Contribuição Mensal (MT) *</label>
                    <input type="number" id="saving-amount" name="saving-amount" min="100" required value="500">
                    <small>Valor que cada membro deverá contribuir mensalmente</small>
                </div>
                
                <div class="form-group">
                    <label for="cycle-duration">Duração do Ciclo (meses) *</label>
                    <select id="cycle-duration" name="cycle-duration" required>
                        <option value="6">6 meses</option>
                        <option value="12" selected>12 meses</option>
                        <option value="18">18 meses</option>
                        <option value="24">24 meses</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="start-date">Data de Início Prevista *</label>
                    <input type="date" id="start-date" name="start-date" required>
                </div>
                
                <div class="form-group">
                    <label for="meeting-frequency">Frequência de Reuniões *</label>
                    <select id="meeting-frequency" name="meeting-frequency" required>
                        <option value="semanal">Semanal</option>
                        <option value="quinzenal" selected>Quinzenal</option>
                        <option value="mensal">Mensal</option>
                    </select>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-prev" data-prev="1"><i class="fas fa-arrow-left"></i> Anterior</button>
                    <button type="button" class="btn btn-next" data-next="3">Próximo <i class="fas fa-arrow-right"></i></button>
                </div>
            </div>
            
            <!-- Passo 3 - Confirmação e Pagamento -->
            <div class="form-step" data-step="3">
                <h2>Termos e Condições</h2>
                
                <div class="terms-warning">
                    <div class="warning-icon">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <div class="warning-content">
                        <h3>Atenção!</h3>
                        <p>Para criar um grupo de poupança é necessário fazer um depósito de reserva no valor de <strong>50.000 MT</strong>.</p>
                        <p>Este valor será utilizado como garantia para o grupo e será devolvido ao final do ciclo, desde que todas as obrigações sejam cumpridas.</p>
                    </div>
                </div>
                
                <div class="terms-content">
                    <h3>Termos e Condições</h3>
                    <div class="terms-text">
                        <p>Ao criar um grupo de poupança, você concorda com os seguintes termos:</p>
                        <ol>
                            <li>Como líder do grupo, você será responsável pela organização das reuniões e pelo cumprimento das regras estabelecidas.</li>
                            <li>O depósito de reserva de 50.000 MT é obrigatório e será bloqueado durante todo o ciclo do grupo.</li>
                            <li>Em caso de dissolução antecipada do grupo, o depósito poderá ser utilizado para cobrir eventuais dívidas.</li>
                            <li>Todos os membros devem concordar com as regras estabelecidas no ato da adesão ao grupo.</li>
                            <li>O sistema MicroCred atuará apenas como intermediário, não se responsabilizando por conflitos internos do grupo.</li>
                        </ol>
                    </div>
                    
                    <div class="form-group checkbox-group">
                        <input type="checkbox" id="agree-terms" name="agree-terms" required>
                        <label for="agree-terms">Eu li e concordo com os termos e condições acima *</label>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-prev" data-prev="2"><i class="fas fa-arrow-left"></i> Anterior</button>
                    <button type="button" id="btn-open-payment" class="btn btn-primary">Pagar Depósito <i class="fas fa-lock"></i></button>
                </div>
            </div>
        </form>
    </div>

    <!-- Modal de Pagamento -->
    <div class="modal" id="payment-modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Pagamento do Depósito</h2>
            <p>Complete o pagamento do depósito de reserva para criar seu grupo</p>
            
            <div class="payment-info">
                <div class="payment-detail">
                    <span>Valor Requerido:</span>
                    <span class="amount">50.000 MT</span>
                </div>
                <div class="payment-detail">
                    <span>Taxa de Processamento:</span>
                    <span class="amount">500 MT</span>
                </div>
                <div class="payment-detail total">
                    <span>Total a Pagar:</span>
                    <span class="amount">50.500 MT</span>
                </div>
            </div>
            
            <form id="payment-form" class="payment-form">
                <div class="form-group">
                    <label for="payment-amount">Valor a Pagar (MT) *</label>
                    <input type="number" id="payment-amount" name="payment-amount" min="50500" value="50500" required>
                </div>
                
                <div class="form-group">
                    <label for="phone-number">Número de Telefone M-Pesa *</label>
                    <div class="phone-input">
                        <span class="prefix">+258</span>
                        <input type="tel" id="phone-number" name="phone-number" pattern="[0-9]{9}" placeholder="84 123 4567" required>
                    </div>
                    <small>Será enviado um pedido de confirmação para este número</small>
                </div>
                
                <div class="payment-methods">
                    <div class="payment-method active">
                        <input type="radio" id="mpesa" name="payment-method" value="mpesa" checked>
                        <label for="mpesa">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/M-PESA_LOGO-01.svg/1200px-M-PESA_LOGO-01.svg.png" alt="M-Pesa">
                        </label>
                    </div>
                    <div class="payment-method">
                        <input type="radio" id="vodacom" name="payment-method" value="vodacom">
                        <label for="vodacom">
                            <img src="https://seeklogo.com/images/V/vodacom-logo-3D55C69E2C-seeklogo.com.png" alt="Vodacom M-Pesa">
                        </label>
                    </div>
                </div>
                
                <button type="submit" class="btn btn-payment">
                    <i class="fas fa-paper-plane"></i> Enviar Pedido de Pagamento
                </button>
            </form>
        </div>
    </div>

    <!-- Modal de Confirmação -->
    <div class="modal" id="confirmation-modal">
        <div class="modal-content small">
            <div class="confirmation-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Pedido Submetido com Sucesso!</h2>
            <p>Seu pedido de criação de grupo foi recebido e está em processamento.</p>
            <p>Assim que o pagamento for confirmado, você receberá uma notificação e poderá começar a gerenciar seu grupo.</p>
            
            <div class="confirmation-details">
                <p><strong>Número do Pedido:</strong> GRP-2023-00528</p>
                <p><strong>Valor Pago:</strong> 50.500 MT</p>
                <p><strong>Método:</strong> M-Pesa</p>
            </div>
            
            <button type="button" id="btn-close-confirmation" class="btn btn-primary">Voltar ao Início</button>
        </div>
    </div>
    <script src="{{ asset('js/criar-grupo.js') }}"></script>
</body>
</html>