document.addEventListener('DOMContentLoaded', function() {
    // Toggle do dropdown do usuário
    const userButton = document.querySelector('.user-button');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    userButton.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.style.opacity = dropdownMenu.style.opacity === '1' ? '0' : '1';
        dropdownMenu.style.visibility = dropdownMenu.style.visibility === 'visible' ? 'hidden' : 'visible';
        dropdownMenu.style.transform = dropdownMenu.style.transform === 'translateY(0px)' ? 'translateY(-10px)' : 'translateY(0px)';
    });
    
    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function() {
        dropdownMenu.style.opacity = '0';
        dropdownMenu.style.visibility = 'hidden';
        dropdownMenu.style.transform = 'translateY(-10px)';
    });
    
    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if(confirm('Tem certeza que deseja terminar a sessão?')) {
            // Redirecionar para a página de login
            window.location.href = "/index";
        }
    });
    

    // Gráfico de poupança
    const ctx = document.getElementById('savings-chart').getContext('2d');
    const savingsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Poupança (MT)',
                data: [1200, 1900, 1700, 2100, 2500, 3150],
                backgroundColor: 'rgba(74, 108, 247, 0.1)',
                borderColor: 'rgba(74, 108, 247, 1)',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
    
    // Toggle da sidebar em mobile
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        
        if(sidebar.classList.contains('collapsed')) {
            sidebar.style.width = 'var(--sidebar-collapsed-width)';
            document.querySelector('.main-content').style.marginLeft = 'var(--sidebar-collapsed-width)';
            
            // Esconder textos
            document.querySelectorAll('.sidebar-nav li a span').forEach(el => {
                el.style.display = 'none';
            });
            
            // Centralizar ícones
            document.querySelectorAll('.sidebar-nav li a').forEach(el => {
                el.style.justifyContent = 'center';
                el.style.padding = '0.8rem 0';
            });
            
            document.querySelector('.sidebar-header h2').style.display = 'none';
            document.querySelector('.sidebar-footer p').style.display = 'none';
        } else {
            sidebar.style.width = 'var(--sidebar-width)';
            document.querySelector('.main-content').style.marginLeft = 'var(--sidebar-width)';
            
            // Mostrar textos
            document.querySelectorAll('.sidebar-nav li a span').forEach(el => {
                el.style.display = 'inline';
            });
            
            // Restaurar alinhamento
            document.querySelectorAll('.sidebar-nav li a').forEach(el => {
                el.style.justifyContent = 'flex-start';
                el.style.padding = '0.8rem 1.5rem';
            });
            
            document.querySelector('.sidebar-header h2').style.display = 'block';
            document.querySelector('.sidebar-footer p').style.display = 'block';
        }
    });
});