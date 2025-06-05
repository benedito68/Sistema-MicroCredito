<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MicroCred - Meu Perfil</title>
          <link rel="stylesheet" href="{{ asset('css/perfil-usuario.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>

<body>
    <div class="profile-container">
        <!-- Botão Voltar -->
        <a href="dashboard.html" class="btn-voltar-link">
            <button class="btn-voltar" id="btn-voltar" title="Voltar">
                <i class="fas fa-arrow-left"></i>
                <span class="tooltip">Voltar</span>
            </button>
        </a>

        <!-- Cabeçalho do Perfil -->
        <div class="profile-header">
            <div class="profile-avatar">
                <img src="https://via.placeholder.com/150" alt="Foto do Usuário" id="user-avatar">
                <button class="btn-edit-avatar" id="btn-edit-avatar">
                    <i class="fas fa-camera"></i>
                </button>
            </div>

            <div class="profile-info">
                <h1 id="user-name">Carregando...</h1>
                <p class="user-email" id="user-email">carregando...</p>
                <p class="user-joined" id="user-joined">Membro desde: carregando...</p>
            </div>

            <div class="profile-balance">
                <div class="balance-card">
                    <h3>Saldo Disponível</h3>
                    <p class="balance-amount" id="user-balance">MT 0,00</p>
                </div>
            </div>
        </div>

        <!-- Menu de Opções -->
        <div class="profile-actions">
            <button class="action-btn" id="btn-edit-profile">
                <i class="fas fa-user-edit"></i> Editar Perfil
            </button>
            <button class="action-btn" id="btn-change-password">
                <i class="fas fa-lock"></i> Alterar Senha
            </button>
            <button class="action-btn" id="btn-security">
                <i class="fas fa-shield-alt"></i> Segurança
            </button>
            <button class="action-btn danger" id="btn-delete-account">
                <i class="fas fa-trash-alt"></i> Cancelar Conta
            </button>
        </div>

        <!-- Informações Detalhadas -->
        <div class="profile-details">
            <div class="detail-section">
                <h2><i class="fas fa-id-card"></i> Informações Pessoais</h2>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Nome Completo</span>
                        <span class="detail-value" id="user-fullname">Carregando...</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Data de Nascimento</span>
                        <span class="detail-value" id="user-birthdate">Carregando...</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Gênero</span>
                        <span class="detail-value" id="user-gender">Carregando...</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Número de Telefone</span>
                        <span class="detail-value" id="user-phone">Carregando...</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Documento de Identificação</span>
                        <span class="detail-value" id="user-document">Carregando...</span>
                    </div>
                </div>
            </div>

            <div class="detail-section">
                <h2><i class="fas fa-map-marker-alt"></i> Endereço</h2>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">País</span>
                        <span class="detail-value" id="user-country">Carregando...</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Província</span>
                        <span class="detail-value" id="user-state">Carregando...</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Cidade</span>
                        <span class="detail-value" id="user-city">Carregando...</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Bairro</span>
                        <span class="detail-value" id="user-neighborhood">Carregando...</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Rua/Avenida</span>
                        <span class="detail-value" id="user-street">Carregando...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Editar Perfil -->
    <div class="modal" id="edit-profile-modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2><i class="fas fa-user-edit"></i> Editar Perfil</h2>

            <form id="edit-profile-form">
                <div class="form-group">
                    <label for="edit-avatar">Foto de Perfil</label>
                    <div class="avatar-upload">
                        <img src="https://via.placeholder.com/150" alt="Foto do Usuário" id="edit-avatar-preview">
                        <label for="edit-avatar-input" class="btn-upload">Escolher Imagem</label>
                        <input type="file" id="edit-avatar-input" accept="image/*">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="edit-firstname">Primeiro Nome *</label>
                        <input type="text" id="edit-firstname" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-lastname">Sobrenome *</label>
                        <input type="text" id="edit-lastname" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="edit-phone">Telefone *</label>
                    <input type="tel" id="edit-phone" required>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="edit-birthdate">Data de Nascimento *</label>
                        <input type="date" id="edit-birthdate" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-gender">Gênero *</label>
                        <select id="edit-gender" required>
                            <option value="male">Masculino</option>
                            <option value="female">Feminino</option>
                            <option value="other">Outro</option>
                            <option value="prefer-not-to-say">Prefiro não dizer</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label for="edit-document">Documento de Identificação *</label>
                    <input type="text" id="edit-document" required>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn btn-outline close-modal-btn">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Salvar Alterações</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal Alterar Senha -->
    <div class="modal" id="change-password-modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2><i class="fas fa-lock"></i> Alterar Senha</h2>

            <form id="change-password-form">
                <div class="form-group">
                    <label for="current-password">Senha Atual *</label>
                    <div class="password-input">
                        <input type="password" id="current-password" required>
                        <i class="fas fa-eye toggle-password"></i>
                    </div>
                </div>

                <div class="form-group">
                    <label for="new-password">Nova Senha *</label>
                    <div class="password-input">
                        <input type="password" id="new-password" required>
                        <i class="fas fa-eye toggle-password"></i>
                    </div>
                    <div class="password-strength" id="password-strength">
                        <div class="strength-bar"></div>
                        <div class="strength-text">Força: <span>fraca</span></div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="confirm-password">Confirmar Nova Senha *</label>
                    <div class="password-input">
                        <input type="password" id="confirm-password" required>
                        <i class="fas fa-eye toggle-password"></i>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn btn-outline close-modal-btn">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Alterar Senha</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal Cancelar Conta -->
    <div class="modal" id="delete-account-modal">
        <div class="modal-content small">
            <div class="warning-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h2>Tem certeza que deseja cancelar sua conta?</h2>

            <div class="warning-message">
                <p>Ao cancelar sua conta:</p>
                <ul>
                    <li>Todos os seus dados serão permanentemente removidos</li>
                    <li>Você perderá acesso a todos os grupos de poupança</li>
                    <li>Qualquer saldo restante será transferido para uma conta bancária indicada por você</li>
                    <li>Esta ação não pode ser desfeita</li>
                </ul>
            </div>

            <form id="delete-account-form">
                <div class="form-group">
                    <label for="delete-reason">Motivo do cancelamento (opcional)</label>
                    <select id="delete-reason">
                        <option value="">Selecione um motivo...</option>
                        <option value="no-longer-need">Não preciso mais do serviço</option>
                        <option value="found-better-service">Encontrei um serviço melhor</option>
                        <option value="too-expensive">Muito caro</option>
                        <option value="privacy-concerns">Preocupações com privacidade</option>
                        <option value="other">Outro</option>
                    </select>
                </div>

                <div class="form-group" id="other-reason-container" style="display: none;">
                    <label for="other-reason">Por favor, especifique</label>
                    <textarea id="other-reason" rows="3"></textarea>
                </div>

                <div class="form-group">
                    <label>
                        <input type="checkbox" id="confirm-delete" required>
                        Eu entendo que esta ação é permanente e não pode ser desfeita
                    </label>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-outline close-modal-btn">Manter Conta</button>
                    <button type="submit" class="btn btn-danger">Confirmar Cancelamento</button>
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
            <h2 id="confirmation-title">Alterações Salvas!</h2>
            <p id="confirmation-message">Suas alterações foram salvas com sucesso.</p>
            <div class="modal-footer">
                <button class="btn btn-primary" id="btn-close-confirmation">Fechar</button>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="util/perfil-usuario.js"></script>
        <script src="{{ asset('js/perfil-usuario.js') }}"></script>
</body>

</html>