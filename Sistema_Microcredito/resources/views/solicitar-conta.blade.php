
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MicroCred - Criar Conta</title>
       <link rel="stylesheet" href="{{ asset('css/solicitar-conta.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
   
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
            <form method="POST" action="{{ route('solicitar-conta.store') }}" class="signup-form" id="signup-form">
                @csrf
                
                <!-- Passo 1: Informações Pessoais -->
                <div class="form-step active" id="form-step-1">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="nome">Nome *</label>
                            <input type="text" id="nome" name="nome" required>
                        </div>
                        <div class="form-group">
                            <label for="apelido">Apelido *</label>
                            <input type="text" id="apelido" name="apelido" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" required>
                    </div>

                    <div class="form-group">
                        <label for="telefone">Contacto Telefónico *</label>
                        <input type="tel" id="telefone" name="telefone" placeholder="84 123 4567" required>
                    </div>

                    <div class="form-footer">
                        <div></div>
                        <button type="button" class="btn btn-primary" id="next-1">Próximo <i class="fas fa-arrow-right"></i></button>
                    </div>
                </div>

                <!-- Passo 2: Localização -->
                <div class="form-step" id="form-step-2">
                    <div class="form-group">
                        <label for="provincia">Província *</label>
                        <select id="provincia" name="provincia" required>
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
                        <label for="distrito">Cidade/Distrito *</label>
                        <select id="distrito" name="Distrito" required>
                            <option value="">Selecione sua cidade</option>
                        </select>
                    </div>

                    <div class="add-city-container" id="add-city-container">
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
                        <label for="senha">Senha *</label>
                        <input type="password" id="senha" name="senha" minlength="6" required>
                    </div>

                    <div class="form-group">
                        <label for="senha_confirmation">Confirmar Senha *</label>
                        <input type="password" id="senha_confirmation" name="senha_confirmation" required>
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

            <a href="index.html" class="back-link">← Voltar ao Início</a>
        </div>
    </div>

    <!-- Modal de Sucesso -->
    <div class="success-modal" id="success-modal">
        <div class="success-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="success-message">
                <h2>Cadastro Efetuado com Sucesso!</h2>
                <p>Bem-vindo à nossa comunidade. Sua conta foi criada com sucesso e você já pode acessar todos os recursos da plataforma.</p>
            </div>
            <button class="btn btn-primary" id="success-btn">Continuar para o Login</button>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Dados de cidades por província
            const citiesByProvince = {
                'maputo': ['Maputo', 'KaMpfumo', 'KaMavota', 'KaMubukwana', 'KaTembe', 'KaNyaka'],
                'maputo-provincia': ['Matola', 'Boane', 'Magude', 'Manhiça', 'Marracuene', 'Moamba', 'Namaacha'],
                'gaza': ['Xai-Xai', 'Bilene', 'Chibuto', 'Chicualacuala', 'Chigubo', 'Chókwè', 'Guijá', 'Mabalane', 'Manjacaze', 'Massangena', 'Massingir', 'Limpopo'],
                'inhambane': ['Inhambane', 'Funhalouro', 'Govuro', 'Homoíne', 'Jangamo', 'Mabote', 'Massinga', 'Morrumbene', 'Panda', 'Vilanculos', 'Zavala'],
                'sofala': ['Beira', 'Búzi', 'Caia', 'Chemba', 'Cheringoma', 'Chibabava', 'Dondo', 'Gorongosa', 'Machanga', 'Maríngue', 'Muanza', 'Nhamatanda'],
                'manica': ['Chimoio', 'Bárue', 'Gondola', 'Guro', 'Machaze', 'Macossa', 'Manica', 'Mossurize', 'Sussundenga', 'Tambara', 'Vanduzi'],
                'tete': ['Tete', 'Angónia', 'Cahora Bassa', 'Changara', 'Chifunde', 'Chiuta', 'Dôa', 'Magoé', 'Marara', 'Moatize', 'Mutarara', 'Tsangano', 'Zumbo'],
                'zambezia': ['Quelimane', 'Alto Molócuè', 'Chinde', 'Derre', 'Gilé', 'Gurùè', 'Ile', 'Inhassunge', 'Lugela', 'Maganja da Costa', 'Milange', 'Mocuba', 'Mocubela', 'Molumbo', 'Mopeia', 'Morrumbala', 'Namacurra', 'Namarrói', 'Nicoadala', 'Pebane'],
                'nampula': ['Nampula', 'Angoche', 'Eráti', 'Ilha de Moçambique', 'Lalaua', 'Larde', 'Liúpo', 'Malema', 'Meconta', 'Mecubúri', 'Memba', 'Mogincual', 'Mogovolas', 'Moma', 'Monapo', 'Mossuril', 'Muecate', 'Murrupula', 'Nacala-a-Velha', 'Nacala Porto', 'Nacarôa', 'Ribaué'],
                'cabo-delgado': ['Pemba', 'Ancuabe', 'Balama', 'Chiúre', 'Ibo', 'Macomia', 'Mecúfi', 'Meluco', 'Metuge', 'Mocímboa da Praia', 'Montepuez', 'Mueda', 'Muidumbe', 'Namuno', 'Nangade', 'Palma', 'Quissanga'],
                'niassa': ['Lichinga', 'Chimbonila', 'Cuamba', 'Lago', 'Lichinga', 'Majune', 'Mandimba', 'Marrupa', 'Maúa', 'Mavago', 'Mecanhelas', 'Metarica', 'Muembe', 'N\'gauma', 'Nipepe', 'Sanga']
            };

            // Elementos do DOM
            const form = document.getElementById('signup-form');
            const steps = [1, 2, 3];
            const currentStep = { value: 1 };
            const provinceSelect = document.getElementById('provincia');
            const citySelect = document.getElementById('distrito');
            const addCityContainer = document.getElementById('add-city-container');
            const newCityInput = document.getElementById('new-city');
            const addCityBtn = document.getElementById('add-city-btn');
            const passwordInput = document.getElementById('senha');
            const confirmPasswordInput = document.getElementById('senha_confirmation');
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

            // Validação do passo 1
            document.getElementById('next-1').addEventListener('click', function() {
                const nome = document.getElementById('nome').value.trim();
                const apelido = document.getElementById('apelido').value.trim();
                const email = document.getElementById('email').value.trim();
                const telefone = document.getElementById('telefone').value.trim();

                if (nome && apelido && email && telefone) {
                    currentStep.value = 2;
                    updateProgress(currentStep.value);
                } else {
                    alert('Por favor, preencha todos os campos obrigatórios.');
                }
            });

            // Navegação entre passos
            document.getElementById('back-2').addEventListener('click', function() {
                currentStep.value = 1;
                updateProgress(currentStep.value);
            });

            document.getElementById('next-2').addEventListener('click', function() {
                const provincia = provinceSelect.value;
                const distrito = citySelect.value;

                if (provincia && distrito) {
                    currentStep.value = 3;
                    updateProgress(currentStep.value);
                } else {
                    alert('Por favor, selecione sua província e cidade.');
                }
            });

            document.getElementById('back-3').addEventListener('click', function() {
                currentStep.value = 2;
                updateProgress(currentStep.value);
            });

            // Atualizar cidades baseado na província
            provinceSelect.addEventListener('change', function() {
                const selectedProvince = this.value;
                citySelect.innerHTML = '<option value="">Selecione sua cidade</option>';
                
                if (selectedProvince && citiesByProvince[selectedProvince]) {
                    citiesByProvince[selectedProvince].forEach(city => {
                        const option = document.createElement('option');
                        option.value = city;
                        option.textContent = city;
                        citySelect.appendChild(option);
                    });
                    
                    // Adiciona opção para nova cidade
                    const addOption = document.createElement('option');
                    addOption.value = 'other';
                    addOption.textContent = 'Outra (especificar)';
                    citySelect.appendChild(addOption);
                }
                
                addCityContainer.style.display = 'none';
            });

            // Mostrar campo para nova cidade
            citySelect.addEventListener('change', function() {
                if (this.value === 'other') {
                    addCityContainer.style.display = 'flex';
                } else {
                    addCityContainer.style.display = 'none';
                }
            });

            // Adicionar nova cidade
            addCityBtn.addEventListener('click', function() {
                const newCity = newCityInput.value.trim();
                if (newCity) {
                    const option = document.createElement('option');
                    option.value = newCity;
                    option.textContent = newCity;
                    option.selected = true;
                    
                    // Remove a opção "Outra"
                    const otherOption = citySelect.querySelector('option[value="other"]');
                    if (otherOption) {
                        citySelect.removeChild(otherOption);
                    }
                    
                    citySelect.appendChild(option);
                    addCityContainer.style.display = 'none';
                    newCityInput.value = '';
                }
            });

            // Validação de senhas
            confirmPasswordInput.addEventListener('input', function() {
                if (passwordInput.value !== confirmPasswordInput.value) {
                    passwordError.style.display = 'block';
                    confirmPasswordInput.style.borderColor = 'var(--danger)';
                } else {
                    passwordError.style.display = 'none';
                    confirmPasswordInput.style.borderColor = 'var(--gray-light)';
                }
            });

            // Envio do formulário (mantém funcionalidade Laravel)
            form.addEventListener('submit', function(e) {
                const senha = passwordInput.value;
                const senhaConfirmation = confirmPasswordInput.value;
                const termsChecked = document.getElementById('terms').checked;
                
                if (senha !== senhaConfirmation) {
                    e.preventDefault();
                    alert('As senhas não coincidem!');
                    return;
                }
                
                if (!termsChecked) {
                    e.preventDefault();
                    alert('Você deve aceitar os termos e políticas para continuar.');
                    return;
                }
                
                // Se chegou até aqui, permite o envio do formulário para o Laravel
                // O formulário será enviado normalmente para {{ route('solicitar-conta.store') }}
            });

            // Modal de sucesso (pode ser usado se necessário)
            document.getElementById('success-btn').addEventListener('click', function() {
                window.location.href = 'index.html';
            });
        });
    </script>
</body>
</html>