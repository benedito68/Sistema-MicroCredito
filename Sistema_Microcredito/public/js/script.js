document.addEventListener('DOMContentLoaded', function() {
    alert('Bem-vindo ao sistema de login! O botao Funciona');
    // Toggle para mostrar/esconder senha
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    console.log('Dados de password:', password);
    
    togglePassword.addEventListener('click', function() {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
    });
    
    // Validação do formulário
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        console.log('Dados de Usuario:', username, password);
        
        
        // Validação simples (substitua por sua lógica real)
        if (username.trim() === '' || password.trim() === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        
        // Simulação de login bem-sucedido
        console.log('Tentativa de login:', { username, password });
        
        // Redirecionamento (substitua pelo seu destino real)
        window.location.href = "/dashboard";

        
        // Mostrar mensagem de sucesso (remova no ambiente real)
        alert('Login bem-sucedido! Redirecionando...');
    });
});