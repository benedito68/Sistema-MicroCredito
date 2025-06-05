<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Microcréditos - Login</title>
        <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <div class="login-container">
        <div class="login-left">
            <div class="logo">
                <i class="fas fa-hand-holding-usd"></i>
                <h1>MicroCred</h1>
            </div>
            <h2>Gestão de Microcréditos</h2>
            <p>Solução completa para gerenciamento de pequenos empréstimos e financiamentos</p>
            <div class="illustration">
                <img src="https://cdn-icons-png.flaticon.com/512/3132/3132693.png" alt="Finanças ilustração">
            </div>
        </div>
        
        <div class="login-right">
            <form class="login-form" id="loginForm">
                <h2>Bem-vindo de volta</h2>
                <p>Por favor, insira suas credenciais para acessar o sistema</p>
                
                <div class="form-group">
                    <label for="username">Usuário</label>
                    <div class="input-with-icon">
                        <i class="fas fa-user"></i>
                        <input type="text" id="username" name="username" placeholder="Digite seu usuário" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="password">Senha</label>
                    <div class="input-with-icon">
                        <i class="fas fa-lock"></i>
                        <input type="password" id="password" name="password" placeholder="Digite sua senha" required>
                        <i class="fas fa-eye toggle-password" id="togglePassword"></i>
                    </div>
                </div>
                
                <div class="form-options">
                    <div class="remember-me">
                        <input type="checkbox" id="remember" name="remember">
                        <label for="remember">Lembrar-me</label>
                    </div>
                    <a href="#" class="forgot-password">Esqueceu a senha?</a>
                </div>
                
                <button type="submit" class="login-button">Entrar</button>
                
                <div class="register-link">
                    <p>Não tem uma conta? <a href="/solicitar-conta">Solicite acesso</a></p>
                </div>
            </form>
        </div>
    </div>

 
    <script src="{{ asset('js/script.js') }}"></script>
</body>
</html>