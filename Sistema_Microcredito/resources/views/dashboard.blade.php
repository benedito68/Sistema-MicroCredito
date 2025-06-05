<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MicroCred - Dashboard</title>
    
    <!-- CSS Local -->
    <link rel="stylesheet" href="{{ asset('css/dashboard.css') }}">

    <!-- Font Awesome e Chart.js -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.css">
</head>
<body>
    <div class="dashboard-container">
        <!-- Sidebar -->
        <div class="sidebar">
            <div class="sidebar-header">
                <i class="fas fa-hand-holding-usd"></i>
                <h2>MicroCred</h2>
            </div>
            
            <nav class="sidebar-nav">
                <ul>
                    <li class="active">
                        <a href="{{ route('dashboard') }}">
                            <i class="fas fa-tachometer-alt"></i>
                            <span>Painel Principal</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('meus-emprestimos') }}">
                            <i class="fas fa-file-invoice-dollar"></i>
                            <span>Meus Empréstimos</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('grupos-poupanca') }}">
                            <i class="fas fa-users"></i>
                            <span>Grupos de Poupança</span>
                        </a>
                    </li>
                    <li>
                        <a href="{{ route('perfil-usuario') }}">
                            <i class="fas fa-user-cog"></i>
                            <span>Meu Perfil</span>
                        </a>
                    </li>
                </ul>
            </nav>
            
            <div class="sidebar-footer">
                <p>Versão 1.0.0</p>
            </div>
        </div>
        
        <!-- Main Content -->
        <div class="main-content">
            <!-- Navbar -->
            <header class="navbar">
                <div class="navbar-left">
                    <i class="fas fa-bars sidebar-toggle"></i>
                    <h3>Painel Principal</h3>
                </div>
                
                <div class="navbar-right">
                    <div class="user-dropdown">
                        <button class="user-button">
                            <i class="fas fa-user-circle"></i>
                            <span id="username-display">Maria Silva</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                        <div class="dropdown-menu">
                            <a href="{{ route('perfil-usuario') }}"><i class="fas fa-user"></i> Meu Perfil</a>
                            <a href="#"><i class="fas fa-cog"></i> Configurações</a>
                            <div class="divider"></div>
                            <a href="#" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Terminar Sessão</a>
                        </div>
                    </div>
                </div>
            </header>
            
            <!-- Dashboard Content -->
            <main class="content">
                <!-- Cards de Resumo -->
                <!-- (sem alterações aqui, mantém o conteúdo original dos cards) -->

                <!-- Ações Rápidas -->
                <div class="quick-actions">
                    <h3>Ações Rápidas</h3>
                    <div class="actions-grid">
                        <!-- Solicitar Empréstimo -->
                        <div class="action-card">
                            <div class="action-icon bg-primary">
                                <i class="fas fa-file-invoice-dollar"></i>
                            </div>
                            <h4>Solicitar Empréstimo</h4>
                            <p>Peça um novo empréstimo para suas necessidades financeiras</p>
                            <button class="btn-action">
                                <a href="{{ route('solicitar-emprestimo') }}" style="color: white; text-decoration: none; display: inline-block; width: 100%; height: 100%;">Solicitar</a>
                            </button>
                        </div>

                        <!-- Adesão a Grupo -->
                        <div class="action-card">
                            <div class="action-icon bg-success">
                                <i class="fas fa-user-plus"></i>
                            </div>
                            <h4>Adesão a Grupo</h4>
                            <p>Junte-se a um grupo de poupança existente</p>
                            <button class="btn-action">
                                <a href="{{ route('adesao-grupos') }}" style="color: white; text-decoration: none; display: inline-block; width: 100%; height: 100%;">Procurar Grupos</a>
                            </button>
                        </div>

                        <!-- Criar Grupo -->
                        <div class="action-card">
                            <div class="action-icon bg-info">
                                <i class="fas fa-users-cog"></i>
                            </div>
                            <h4>Criar Grupo</h4>
                            <p>Forme seu próprio grupo de poupança</p>
                            <button class="btn-action">
                                <a href="{{ route('criar-grupo') }}" style="color: white; text-decoration: none; display: inline-block; width: 100%; height: 100%;">Criar Grupo</a>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Gráficos e Atividades Recentes -->
                <!-- (mantém o conteúdo original dos gráficos e atividades) -->

            </main>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"></script>
    <script src="{{ asset('js/dashboard.js') }}"></script>
</body>
</html>
