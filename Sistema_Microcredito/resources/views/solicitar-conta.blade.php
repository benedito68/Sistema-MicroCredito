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
    <div class="form-container">
        <form method="POST" action="{{ route('solicitar-conta.store') }}" id="solicitarContaForm">
            @csrf

            <!-- Etapa 1: Informações Pessoais -->
            <div class="form-step active">
                <h2>Informações Pessoais</h2>
                <input type="text" name="nome" placeholder="Nome" required>
                <input type="text" name="apelido" placeholder="Apelido">
                <input type="email" name="email" placeholder="Email" required>
                <input type="text" name="telefone" placeholder="Telefone">
                <button type="button" onclick="nextStep()">Próximo</button>
            </div>

            <!-- Etapa 2: Localização -->
            <div class="form-step">
                <h2>Localização</h2>
                <input type="text" name="provincia" placeholder="Província" required>
                <input type="text" name="Distrito" placeholder="Distrito" required>
                <button type="button" onclick="prevStep()">Voltar</button>
                <button type="button" onclick="nextStep()">Próximo</button>
            </div>

            <!-- Etapa 3: Segurança -->
            <div class="form-step">
                <h2>Segurança</h2>
                <input type="password" name="senha" placeholder="Senha" required>
                <input type="password" name="senha_confirmation" placeholder="Confirme a Senha" required>
                <button type="button" onclick="prevStep()">Voltar</button>
                <button type="submit">Criar Conta</button>
            </div>
        </form>
    </div>

    <script>
        let currentStep = 0;
        const steps = document.querySelectorAll('.form-step');

        function showStep(step) {
            steps.forEach((s, index) => s.style.display = index === step ? 'block' : 'none');
        }

        function nextStep() {
            if (currentStep < steps.length - 1) {
                currentStep++;
                showStep(currentStep);
            }
        }

        function prevStep() {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        }

        // Exibir o primeiro passo
        showStep(currentStep);
    </script>
</body>
</html>
