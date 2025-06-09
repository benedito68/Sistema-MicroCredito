<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MicroCred - Criar Conta</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        :root {
            --primary: #4a6cf7;
            --primary-light: #e6e9ff;
            --success: #28a745;
            --success-light: #e6f7eb;
            --danger: #dc3545;
            --danger-light: #fce8ea;
            --dark: #343a40;
            --light: #f8f9fa;
            --gray: #6c757d;
            --gray-light: #e9ecef;
            --transition: all 0.3s ease;
        }

        body {
            background-color: #f5f7fa;
            color: var(--dark);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        .signup-container {
            background: white;
            border-radius: 10px;
            width: 100%;
            max-width: 600px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .signup-header {
            background-color: var(--primary);
            color: white;
            padding: 1.5rem;
            text-align: center;
        }

        .signup-header h1 {
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
        }

        .signup-progress {
            display: flex;
            justify-content: center;
            padding: 1.5rem;
            background-color: var(--primary-light);
        }

        .progress-step {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            width: 100px;
        }

        .progress-step:not(:last-child)::after {
            content: '';
            position: absolute;
            top: 20px;
            left: 60px;
            width: 80px;
            height: 2px;
            background-color: var(--gray-light);
        }

        .step-number {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: white;
            border: 2px solid var(--gray-light);
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            margin-bottom: 0.5rem;
            color: var(--gray);
        }

        .step-label {
            font-size: 0.9rem;
            color: var(--gray);
            text-align: center;
        }

        .progress-step.active .step-number {
            border-color: var(--primary);
            background-color: var(--primary);
            color: white;
        }

        .progress-step.active .step-label {
            color: var(--primary);
            font-weight: 500;
        }

        .progress-step.completed .step-number {
            border-color: var(--success);
            background-color: var(--success);
            color: white;
        }

        .progress-step.completed .step-label {
            color: var(--success);
        }

        .progress-step.completed:not(:last-child)::after {
            background-color: var(--success);
        }

        .signup-body {
            padding: 2rem;
        }

        .signup-form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .form-step {
            display: none;
            animation: fadeIn 0.5s ease;
        }

        .form-step.active {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .form-group {
            margin-bottom: 1.2rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: var(--dark);
        }

        .form-group input, 
        .form-group select {
            width: 100%;
            padding: 0.8rem 1rem;
            border: 1px solid var(--gray-light);
            border-radius: 6px;
            font-size: 1rem;
            transition: var(--transition);
        }

        .form-group input:focus, 
        .form-group select:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px var(--primary-light);
        }

        .form-row {
            display: flex;
            gap: 1rem;
        }

        .form-row .form-group {
            flex: 1;
        }

        .form-footer {
            display: flex;
            justify-content: space-between;
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--gray-light);
        }

        .btn {
            padding: 0.8rem 1.5rem;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: var(--transition);
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            border: none;
        }

        .btn i {
            font-size: 0.9rem;
        }

        .btn-primary {
            background-color: var(--primary);
            color: white;
        }

        .btn-primary:hover {
            background-color: #3a5bd9;
        }

        .btn-outline {
            background: none;
            border: 1px solid var(--gray-light);
            color: var(--dark);
        }

        .btn-outline:hover {
            background-color: var(--gray-light);
        }

        .btn[disabled] {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .terms-group {
            display: flex;
            align-items: flex-start;
            gap: 0.8rem;
            margin-top: 1.5rem;
        }

        .terms-group input {
            margin-top: 0.2rem;
        }

        .terms-group label {
            font-size: 0.9rem;
            color: var(--gray);
        }

        .terms-group label a {
            color: var(--primary);
            text-decoration: none;
        }

        .terms-group label a:hover {
            text-decoration: underline;
        }

        .add-city-container {
            display: flex;
            gap: 0.5rem;
            margin-top: 0.5rem;
        }

        .add-city-input {
            flex: 1;
        }

        .add-city-btn {
            padding: 0.8rem;
        }

        /* Modal de sucesso */
        .success-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            justify-content: center;
            align-items: center;
        }

        .success-content {
            background-color: white;
            border-radius: 10px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            text-align: center;
            animation: modalFadeIn 0.3s ease;
        }

        @keyframes modalFadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .success-icon {
            font-size: 4rem;
            color: var(--success);
            margin-bottom: 1.5rem;
        }

        .success-message {
            margin-bottom: 1.5rem;
        }

        .success-message h2 {
            margin-bottom: 0.5rem;
            color: var(--dark);
        }

        .success-message p {
            color: var(--gray);
        }

        /* Responsividade */
        @media (max-width: 768px) {
            .signup-container {
                margin: 1rem;
            }

            .form-row {
                flex-direction: column;
                gap: 0;
            }
        }

        @media (max-width: 576px) {
            .signup-header h1 {
                font-size: 1.5rem;
            }

            .progress-step {
                width: 80px;
            }

            .progress-step:not(:last-child)::after {
                left: 50px;
                width: 60px;
            }

            .step-label {
                font-size: 0.8rem;
            }
        }
    </style>
</head>
<body>
    <div class="signup-container">
        <div class="signup-header">
            <h1><i class="fas fa-user-plus"></i> Criar Conta</h1>
            <p>Junte-se à nossa comunidade em 3 simples passos</p>
        </div>

        <div class="signup-progress">
            <div class="progress-step active" id="step-1">
                <div class="step-number">1</div>
                <div class="step-label">Informações Pessoais</div>
            </div>
            <div class="progress-step" id="step-2">
                <div class="step-number">2</div>
                <div class="step-label">Localização</div>
            </div>
            <div class="progress-step" id="step-3">
                <div class="step-number">3</div>
                <div class="step-label">Segurança</div>
            </div>
        </div>

        <div class="signup-body">
            <form class="signup-form" id="signup-form">
                <!-- Passo 1: Informações Pessoais -->
                <div class="form-step active" id="form-step-1">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="first-name">Nome </label>
                            <input type="text" id="first-name" required>
                        </div>
                        <div class="form-group">
                            <label for="last-name">Apelido </label>
                            <input type="text" id="last-name" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="email">Email </label>
                        <input type="email" id="email" required>
                    </div>

                    <div class="form-group">
                        <label for="phone">Contacto Telefónico *</label>
                        <input type="tel" id="phone" placeholder="84 123 4567" required>
                    </div>

                    <div class="form-footer">
                        <div></div> <!-- Espaço vazio para alinhar o botão à direita -->
                        <button type="button" class="btn btn-primary" id="next-1">Próximo <i class="fas fa-arrow-right"></i></button>
                    </div>
                </div>

                <!-- Passo 2: Localização -->
                <div class="form-step" id="form-step-2">
                    <div class="form-group">
                        <label for="province">Província *</label>
                        <select id="province" required>
                            <option value="">Selecione sua província</option>
                            <option value="maputo">Maputo Cidade</option>
                            <option value="maputo-provincia">Maputo Província</option>
                            <option value="gaza">Gaza</option>
                            <option value="inhambane">Inhambane</option>
                            <option value="sofala">Sofala</option>
                            <option value="manica">Manica</option>
                            <option value="tete">Tete</option>
                            <option value="zambezia">Zambézia</option>
                            <option value="nampula">Nampula</option>
                            <option value="cabo-delgado">Cabo Delgado</option>
                            <option value="niassa">Niassa</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="city">Cidade/Distrito *</label>
                        <select id="city" required>
                            <option value="">Selecione sua cidade</option>
                            <!-- As opções serão preenchidas dinamicamente com JavaScript -->
                        </select>
                    </div>

                    <div class="add-city-container" id="add-city-container" style="display: none;">
                        <input type="text" id="new-city" class="add-city-input" placeholder="Digite o nome da cidade">
                        <button type="button" class="btn btn-outline add-city-btn" id="add-city-btn"><i class="fas fa-plus"></i></button>
                    </div>

                    <div class="form-footer">
                        <button type="button" class="btn btn-outline" id="back-2"><i class="fas fa-arrow-left"></i> Anterior</button>
                        <button type="button" class="btn btn-primary" id="next-2">Próximo <i class="fas fa-arrow-right"></i></button>
                    </div>
                </div>

                <!-- Passo 3: Segurança -->
                <div class="form-step" id="form-step-3">
                    <div class="form-group">
                        <label for="password">Senha *</label>
                        <input type="password" id="password" minlength="6" required>
                    </div>

                    <div class="form-group">
                        <label for="confirm-password">Confirmar Senha *</label>
                        <input type="password" id="confirm-password" required>
                        <small id="password-error" style="color: var(--danger); display: none;">As senhas não coincidem!</small>
                    </div>

                    <div class="terms-group">
                        <input type="checkbox" id="terms" required>
                        <label for="terms">Concordo com os <a href="#">Termos de Serviço</a> e <a href="#">Política de Privacidade</a> *</label>
                    </div>

                    <div class="form-footer">
                        <button type="button" class="btn btn-outline" id="back-3"><i class="fas fa-arrow-left"></i> Anterior</button>
                        <button type="submit" class="btn btn-primary" id="submit-form">Criar Conta</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal de Sucesso -->
    <div class="success-modal" id="success-modal">
        <div class="success-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="success-message">
                <h2>Cadastro Efectuado com Sucesso!</h2>
                <p>Bem-vindo à nossa comunidade. Sua conta foi criada com sucesso e você já pode acessar todos os recursos da plataforma.</p>
            </div>
            <button class="btn btn-primary" id="success-btn">Continuar para o Login</button>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Dados de cidades por província (simplificado)
            const citiesByProvince = {
                'maputo': ['Maputo', 'KaMpfumo', 'KaMavota', 'KaMubukwana', 'KaTembe', 'KaNyaka'],
                'maputo-provincia': ['Matola', 'Boane', 'Magude', 'Manhiça', 'Marracuene', 'Moamba', 'Namaacha'],
                'gaza': ['Xai-Xai', 'Bilene', 'Chibuto', 'Chicualacuala', 'Chigubo', 'Chókwè', 'Guijá', 'Mabalane', 'Manjacaze', 'Massangena', 'Massingir', 'Limpopo'],
                'inhambane': ['Inhambane', 'Funhalouro', 'Govuro', 'Homoíne', 'Jangamo', 'Mabote', 'Massinga', 'Morrumbene', 'Panda', 'Vilanculos', 'Zavala'],
                // Adicione outras províncias conforme necessário
            };

            // Elementos do DOM
            const form = document.getElementById('signup-form');
            const steps = [1, 2, 3];
            const currentStep = { value: 1 };
            const provinceSelect = document.getElementById('province');
            const citySelect = document.getElementById('city');
            const addCityContainer = document.getElementById('add-city-container');
            const newCityInput = document.getElementById('new-city');
            const addCityBtn = document.getElementById('add-city-btn');
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirm-password');
            const passwordError = document.getElementById('password-error');
            const successModal = document.getElementById('success-modal');

            // Função para atualizar o progresso
            function updateProgress(step) {
                steps.forEach(s => {
                    const stepElement = document.getElementById(`step-${s}`);
                    const formStep = document.getElementById(`form-step-${s}`);

                    if (s < step) {
                        stepElement.classList.remove('active');
                        stepElement.classList.add('completed');
                        formStep.classList.remove('active');
                    } else if (s === step) {
                        stepElement.classList.add('active');
                        stepElement.classList.remove('completed');
                        formStep.classList.add('active');
                    } else {
                        stepElement.classList.remove('active', 'completed');
                        formStep.classList.remove('active');
                    }
                });
            }

            // Evento para o botão Próximo do Passo 1
            document.getElementById('next-1').addEventListener('click', function() {
                // Validação simples
                const firstName = document.getElementById('first-name').value;
                const lastName = document.getElementById('last-name').value;
                const email = document.getElementById('email').value;
                const phone = document.getElementById('phone').value;

                if (firstName && lastName && email && phone) {
                    currentStep.value = 2;
                    updateProgress(currentStep.value);
                } else {
                    alert('Por favor, preencha todos os campos obrigatórios.');
                }
            });

            // Evento para o botão Anterior do Passo 2
            document.getElementById('back-2').addEventListener('click', function() {
                currentStep.value = 1;
                updateProgress(currentStep.value);
            });

            // Evento para o botão Próximo do Passo 2
            document.getElementById('next-2').addEventListener('click', function() {
                const province = provinceSelect.value;
                const city = citySelect.value;

                if (province && city) {
                    currentStep.value = 3;
                    updateProgress(currentStep.value);
                } else {
                    alert('Por favor, selecione sua província e cidade.');
                }
            });

            // Evento para o botão Anterior do Passo 3
            document.getElementById('back-3').addEventListener('click', function() {
                currentStep.value = 2;
                updateProgress(currentStep.value);
            });

            // Evento para mudança de província
            provinceSelect.addEventListener('change', function() {
                const selectedProvince = this.value;
                citySelect.innerHTML = '<option value="">Selecione sua cidade</option>';
                
                if (selectedProvince && citiesByProvince[selectedProvince]) {
                    citiesByProvince[selectedProvince].forEach(city => {
                        const option = document.createElement('option');
                        option.value = city.toLowerCase().replace(' ', '-');
                        option.textContent = city;
                        citySelect.appendChild(option);
                    });
                    
                    // Adiciona opção para adicionar nova cidade
                    const addOption = document.createElement('option');
                    addOption.value = 'other';
                    addOption.textContent = 'Outra (especificar)';
                    citySelect.appendChild(addOption);
                }
                
                addCityContainer.style.display = 'none';
            });

            // Evento para mudança de cidade
            citySelect.addEventListener('change', function() {
                if (this.value === 'other') {
                    addCityContainer.style.display = 'flex';
                } else {
                    addCityContainer.style.display = 'none';
                }
            });

            // Evento para adicionar nova cidade
            addCityBtn.addEventListener('click', function() {
                const newCity = newCityInput.value.trim();
                if (newCity) {
                    const option = document.createElement('option');
                    option.value = newCity.toLowerCase().replace(' ', '-');
                    option.textContent = newCity;
                    option.selected = true;
                    
                    // Remove a opção "Outra" se existir
                    const otherOption = citySelect.querySelector('option[value="other"]');
                    if (otherOption) {
                        citySelect.removeChild(otherOption);
                    }
                    
                    citySelect.appendChild(option);
                    addCityContainer.style.display = 'none';
                    newCityInput.value = '';
                }
            });

            // Validação de senha
            confirmPasswordInput.addEventListener('input', function() {
                if (passwordInput.value !== confirmPasswordInput.value) {
                    passwordError.style.display = 'block';
                    confirmPasswordInput.style.borderColor = 'var(--danger)';
                } else {
                    passwordError.style.display = 'none';
                    confirmPasswordInput.style.borderColor = 'var(--gray-light)';
                }
            });

            // Envio do formulário
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validação final
                const password = passwordInput.value;
                const confirmPassword = confirmPasswordInput.value;
                const termsChecked = document.getElementById('terms').checked;
                
                if (password !== confirmPassword) {
                    alert('As senhas não coincidem!');
                    return;
                }
                
                if (!termsChecked) {
                    alert('Você deve aceitar os termos e políticas para continuar.');
                    return;
                }
                
                // Simular envio do formulário (substituir por AJAX em produção)
                setTimeout(() => {
                    successModal.style.display = 'flex';
                }, 1000);
            });

            // Botão do modal de sucesso
            document.getElementById('success-btn').addEventListener('click', function() {
                // Redirecionar para a página de login
                window.location.href = "{{ route('login') }}";
            });
        });
    </script>
</body>
</html>