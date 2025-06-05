$(document).ready(function() {
    // Variáveis globais
    const API_BASE_URL = 'https://api.microcred.com/v1';
    let userData = {};
    
    // Inicialização
    loadUserProfile();
    initModals();
    initEventListeners();
    
    // Carregar dados do usuário
    function loadUserProfile() {
        // Simulação de chamada à API
        setTimeout(() => {
            // Dados mockados - substituir por chamada real à API
            userData = {
                id: 12345,
                firstName: "João",
                lastName: "Macuácua",
                fullName: "João Macuácua",
                email: "joao.macuacua@example.com",
                phone: "+258 84 123 4567",
                birthdate: "1985-07-15",
                gender: "male",
                document: "1234567890123",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                balance: 125400,
                joinedDate: "2022-03-15",
                address: {
                    country: "Moçambique",
                    state: "Maputo",
                    city: "Maputo",
                    neighborhood: "Bairro X",
                    street: "Av. 25 de Setembro, 1234"
                }
            };
            
            // Preencher os dados na página
            updateProfileUI();
        }, 800);
    }
    
    function updateProfileUI() {
        // Cabeçalho
        $('#user-name').text(userData.fullName);
        $('#user-email').text(userData.email);
        $('#user-joined').text(`Membro desde: ${formatDate(userData.joinedDate)}`);
        $('#user-balance').text(`MT ${userData.balance.toLocaleString('pt-PT')}`);
        $('#user-avatar').attr('src', userData.avatar);
        
        // Informações pessoais
        $('#user-fullname').text(userData.fullName);
        $('#user-birthdate').text(formatDate(userData.birthdate));
        $('#user-gender').text(formatGender(userData.gender));
        $('#user-phone').text(userData.phone);
        $('#user-document').text(userData.document);
        
        // Endereço
        $('#user-country').text(userData.address.country);
        $('#user-state').text(userData.address.state);
        $('#user-city').text(userData.address.city);
        $('#user-neighborhood').text(userData.address.neighborhood);
        $('#user-street').text(userData.address.street);
        
        // Preencher formulário de edição
        $('#edit-firstname').val(userData.firstName);
        $('#edit-lastname').val(userData.lastName);
        $('#edit-phone').val(userData.phone);
        $('#edit-birthdate').val(userData.birthdate);
        $('#edit-gender').val(userData.gender);
        $('#edit-document').val(userData.document);
        $('#edit-avatar-preview').attr('src', userData.avatar);
    }
    
    function initModals() {
        // Abrir/fechar modais genéricos
        $('.close-modal, .close-modal-btn').click(function() {
            $(this).closest('.modal').hide();
        });
        
        // Modal Editar Perfil
        $('#btn-edit-profile').click(function() {
            $('#edit-profile-modal').show();
        });
        
        // Modal Alterar Senha
        $('#btn-change-password').click(function() {
            $('#change-password-modal').show();
        });
        
        // Modal Cancelar Conta
        $('#btn-delete-account').click(function() {
            $('#delete-account-modal').show();
        });
        
        // Botão Voltar
        $('#btn-voltar').click(function() {
            window.history.back();
        });
    }
    
    function initEventListeners() {
        // Upload de nova foto
        $('#edit-avatar-input').change(function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    $('#edit-avatar-preview').attr('src', event.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Mostrar/ocultar motivo outro
        $('#delete-reason').change(function() {
            if ($(this).val() === 'other') {
                $('#other-reason-container').show();
            } else {
                $('#other-reason-container').hide();
            }
        });
        
        // Mostrar/ocultar senha
        $('.toggle-password').click(function() {
            const input = $(this).siblings('input');
            const type = input.attr('type') === 'password' ? 'text' : 'password';
            input.attr('type', type);
            $(this).toggleClass('fa-eye fa-eye-slash');
        });
        
        // Validar força da senha
        $('#new-password').on('input', function() {
            const password = $(this).val();
            const strength = calculatePasswordStrength(password);
            updatePasswordStrengthUI(strength);
        });
        
        // Submeter formulário de edição
        $('#edit-profile-form').submit(function(e) {
            e.preventDefault();
            saveProfileChanges();
        });
        
        // Submeter formulário de alteração de senha
        $('#change-password-form').submit(function(e) {
            e.preventDefault();
            changePassword();
        });
        
        // Submeter formulário de cancelamento de conta
        $('#delete-account-form').submit(function(e) {
            e.preventDefault();
            deleteAccount();
        });
        
        // Fechar modal de confirmação
        $('#btn-close-confirmation').click(function() {
            $('#confirmation-modal').hide();
        });
    }
    
    function saveProfileChanges() {
        const formData = {
            firstName: $('#edit-firstname').val(),
            lastName: $('#edit-lastname').val(),
            phone: $('#edit-phone').val(),
            birthdate: $('#edit-birthdate').val(),
            gender: $('#edit-gender').val(),
            document: $('#edit-document').val()
        };
        
        // Simulação de chamada à API
        console.log('Dados a serem atualizados:', formData);
        
        // Atualizar dados locais (simulação)
        userData.firstName = formData.firstName;
        userData.lastName = formData.lastName;
        userData.fullName = `${formData.firstName} ${formData.lastName}`;
        userData.phone = formData.phone;
        userData.birthdate = formData.birthdate;
        userData.gender = formData.gender;
        userData.document = formData.document;
        
        // Atualizar foto se foi alterada
        const newAvatar = $('#edit-avatar-preview').attr('src');
        if (newAvatar !== userData.avatar) {
            userData.avatar = newAvatar;
        }
        
        // Atualizar UI
        updateProfileUI();
        
        // Mostrar feedback
        $('#confirmation-title').text('Perfil Atualizado!');
        $('#confirmation-message').text('Suas alterações foram salvas com sucesso.');
        $('#edit-profile-modal').hide();
        $('#confirmation-modal').show();
    }
    
    function changePassword() {
        const currentPassword = $('#current-password').val();
        const newPassword = $('#new-password').val();
        const confirmPassword = $('#confirm-password').val();
        
        // Validação básica
        if (newPassword !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        
        // Simulação de chamada à API
        console.log('Alterando senha:', {
            currentPassword: currentPassword,
            newPassword: newPassword
        });
        
        // Mostrar feedback
        $('#confirmation-title').text('Senha Alterada!');
        $('#confirmation-message').text('Sua senha foi alterada com sucesso.');
        $('#change-password-modal').hide();
        $('#confirmation-modal').show();
        
        // Limpar formulário
        $('#change-password-form')[0].reset();
    }
    
    function deleteAccount() {
        const reason = $('#delete-reason').val();
        const otherReason = $('#other-reason').val();
        
        // Simulação de chamada à API
        console.log('Cancelando conta. Motivo:', reason === 'other' ? otherReason : reason);
        
        // Redirecionar após cancelamento (simulação)
        alert('Sua conta foi cancelada com sucesso. Você será redirecionado.');
        // window.location.href = '/logout';
    }
    
        // Funções auxiliares
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('pt-PT', options);
    }
    
    function formatGender(gender) {
        const genders = {
            'male': 'Masculino',
            'female': 'Feminino',
            'other': 'Outro',
            'prefer-not-to-say': 'Prefiro não dizer'
        };
        return genders[gender] || gender;
    }
    
    function calculatePasswordStrength(password) {
        if (!password) return 0;
        
        let strength = 0;
        
        // Comprimento
        if (password.length > 8) strength += 1;
        if (password.length > 12) strength += 1;
        
        // Caracteres diversos
        if (/[A-Z]/.test(password)) strength += 1; // Letras maiúsculas
        if (/[0-9]/.test(password)) strength += 1; // Números
        if (/[^A-Za-z0-9]/.test(password)) strength += 1; // Caracteres especiais
        
        // Normalizar para escala de 0-100
        strength = Math.min(strength, 5); // Máximo de 5 pontos
        return Math.floor((strength / 5) * 100);
    }
    
    function updatePasswordStrengthUI(strength) {
        const $bar = $('.strength-bar');
        const $text = $('.strength-text span');
        
        if (strength < 30) {
            $bar.css({
                'width': `${strength}%`,
                'background-color': 'var(--danger)'
            });
            $text.text('fraca').css('color', 'var(--danger)');
        } else if (strength < 70) {
            $bar.css({
                'width': `${strength}%`,
                'background-color': 'var(--warning)'
            });
            $text.text('média').css('color', 'var(--warning)');
        } else {
            $bar.css({
                'width': `${strength}%`,
                'background-color': 'var(--success)'
            });
            $text.text('forte').css('color', 'var(--success)');
        }
    }
    
    // Simulação de chamadas API
    function fetchUserProfile() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    data: {
                        id: 12345,
                        firstName: "João",
                        lastName: "Macuácua",
                        email: "joao.macuacua@example.com",
                        phone: "+258 84 123 4567",
                        birthdate: "1985-07-15",
                        gender: "male",
                        document: "1234567890123",
                        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
                        balance: 125400,
                        joinedDate: "2022-03-15",
                        address: {
                            country: "Moçambique",
                            state: "Maputo",
                            city: "Maputo",
                            neighborhood: "Bairro X",
                            street: "Av. 25 de Setembro, 1234"
                        }
                    }
                });
            }, 800);
        });
    }
    
    function updateProfileAPI(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("Dados atualizados na API:", data);
                resolve({ success: true });
            }, 500);
        });
    }
    
    function changePasswordAPI(currentPassword, newPassword) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("Senha alterada na API");
                resolve({ success: true });
            }, 500);
        });
    }
    
    function deleteAccountAPI(reason) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("Conta cancelada. Motivo:", reason);
                resolve({ success: true });
            }, 500);
        });
    }
    
    // Tratamento de erros
    function showError(message) {
        $('#confirmation-title').text('Erro!');
        $('#confirmation-message').text(message);
        $('#confirmation-modal').show();
    }
    
    // Inicialização de tooltips
    $('[title]').each(function() {
        $(this).tooltip({
            trigger: 'hover',
            placement: 'top'
        });
    });
    
    // Fechar modal ao clicar fora
    $(window).click(function(e) {
        if ($(e.target).hasClass('modal')) {
            $(e.target).hide();
        }
    });
});


