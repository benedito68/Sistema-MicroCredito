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
                <img src="imagem/descarregar-removebg-preview.png" alt="Finanças ilustração">
            </div>
        </div>

        <div class="login-right">
            @if ($errors->any())
                <div class="alert alert-danger" style="color:red;">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            @if(session('success'))
                <div class="alert alert-success" style="color:green;">
                    {{ session('success') }}
                </div>
            @endif

            <form class="login-form" method="POST" action="{{ route('login.perform') }}">
                @csrf
                <h2>Bem-vindo de volta</h2>
                <p>Por favor, insira suas credenciais para acessar o sistema</p>

                <div class="form-group">
                    <label for="email">Email</label>
                    <div class="input-with-icon">
                        <i class="fas fa-envelope"></i>
                        <input type="email" name="email" placeholder="Digite seu email" required>
                    </div>
                </div>

                <div class="form-group">
                    <label for="password">Senha</label>
                    <div class="input-with-icon">
                        <i class="fas fa-lock"></i>
                        <input type="password" name="password" placeholder="Digite sua senha" required>
                    </div>
                </div>

                <button type="submit" class="login-button">Entrar</button>

                <div class="register-link">
                    <p>Não tem uma conta? <a href="{{ route('solicitar-conta') }}"> Criar conta </a></p>
                </div>
            </form>
        </div>
    </div>


</body>
</html>



