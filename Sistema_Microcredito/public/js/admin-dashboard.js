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
    
    // Notificações
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationDropdown = document.querySelector('.notification-dropdown');
    
    notificationBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        notificationDropdown.style.opacity = notificationDropdown.style.opacity === '1' ? '0' : '1';
        notificationDropdown.style.visibility = notificationDropdown.style.visibility === 'visible' ? 'hidden' : 'visible';
        notificationDropdown.style.transform = notificationDropdown.style.transform === 'translateY(0px)' ? 'translateY(-10px)' : 'translateY(0px)';
    });
    
    // Marcar todas como lidas
    const markAllRead = document.querySelector('.mark-all-read');
    const unreadNotifications = document.querySelectorAll('.notification-item.unread');
    const notificationBadges = document.querySelectorAll('.notification-badge, .notification-count');
    
    markAllRead.addEventListener('click', function(e) {
        e.preventDefault();
        unreadNotifications.forEach(item => {
            item.classList.remove('unread');
        });
        
        notificationBadges.forEach(badge => {
            badge.style.display = 'none';
        });
    });
    
    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if(confirm('Tem certeza que deseja terminar a sessão?')) {
            // Redirecionar para a página de login
            window.location.href = 'index.html';
        }
    });
    
    // DataTable para usuários
    $('#users-table').DataTable({
        responsive: true,
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/pt-PT.json'
        },
        dom: '<"top"f>rt<"bottom"lip><"clear">',
        pageLength: 10
    });
    
    // Botões de ação na tabela
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', function() {
            document.getElementById('edit-user-modal').style.display = 'flex';
        });
    });
    
    document.querySelectorAll('.btn-deactivate').forEach(btn => {
        btn.addEventListener('click', function() {
            const userName = this.closest('tr').querySelector('.user-info span').textContent;
            if(confirm(`Desativar o usuário ${userName}?`)) {
                // Lógica para desativar usuário
                this.closest('tr').querySelector('.badge-success').className = 'badge badge-danger';
                this.closest('tr').querySelector('.badge-success').textContent = 'Inativo';
                this.innerHTML = '<i class="fas fa-user-check"></i>';
                this.classList.remove('btn-deactivate');
                this.classList.add('btn-activate');
            }
        });
    });
    
    document.querySelectorAll('.btn-activate').forEach(btn => {
        btn.addEventListener('click', function() {
            const userName = this.closest('tr').querySelector('.user-info span').textContent;
            if(confirm(`Ativar o usuário ${userName}?`)) {
                // Lógica para ativar usuário
                this.closest('tr').querySelector('.badge-danger').className = 'badge badge-success';
                this.closest('tr').querySelector('.badge-danger').textContent = 'Ativo';
                this.innerHTML = '<i class="fas fa-user-slash"></i>';
                this.classList.remove('btn-activate');
                this.classList.add('btn-deactivate');
            }
        });
    });
    
    document.querySelectorAll('.btn-approve').forEach(btn => {
        btn.addEventListener('click', function() {
            const userName = this.closest('tr').querySelector('.user-info span').textContent;
            if(confirm(`Aprovar o usuário ${userName}?`)) {
                // Lógica para aprovar usuário
                this.closest('tr').querySelector('.badge-warning').className = 'badge badge-success';
                this.closest('tr').querySelector('.badge-warning').textContent = 'Ativo';
                const actionsCell = this.closest('td');
                actionsCell.innerHTML = `
                    <button class="btn-action btn-edit"><i class="fas fa-edit"></i></button>
                    <button class="btn-action btn-deactivate"><i class="fas fa-user-slash"></i></button>
                `;
            }
        });
    });
    
    document.querySelectorAll('.btn-reject').forEach(btn => {
        btn.addEventListener('click', function() {
            const userName = this.closest('tr').querySelector('.user-info span').textContent;
            if(confirm(`Rejeitar o usuário ${userName}?`)) {
                // Lógica para rejeitar usuário
                this.closest('tr').remove();
            }
        });
    });
    
    // Fechar modal
    const closeModal = document.querySelector('.close-modal');
    closeModal.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
    });
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(e) {
        if(e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Formulário de edição de usuário
    const editUserForm = document.getElementById('edit-user-form');
    editUserForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Alterações salvas com sucesso!');
        document.getElementById('edit-user-modal').style.display = 'none';
    });
    
    // Botão cancelar no modal
    const cancelBtn = document.querySelector('.form-actions .btn-outline');
    cancelBtn.addEventListener('click', function() {
        document.getElementById('edit-user-modal').style.display = 'none';
    });
    
    // Aprovar/recusar grupos
    document.querySelectorAll('.request-actions .btn-success').forEach(btn => {
        btn.addEventListener('click', function() {
            const groupName = this.closest('.request-card').querySelector('h4').textContent;
            if(confirm(`Aprovar o grupo ${groupName}?`)) {
                const card = this.closest('.request-card');
                card.querySelector('.badge-pending').className = 'badge badge-approved';
                card.querySelector('.badge-pending').textContent = 'Aprovado';
                const actions = card.querySelector('.request-actions');
                actions.innerHTML = `
                    <button class="btn btn-outline btn-sm">
                        <i class="fas fa-eye"></i> Ver Grupo
                    </button>
                    <button class="btn btn-danger btn-sm">
                        <i class="fas fa-trash"></i> Remover
                    </button>
                `;
            }
        });
    });
    
    document.querySelectorAll('.request-actions .btn-danger').forEach(btn => {
        btn.addEventListener('click', function() {
            const groupName = this.closest('.request-card').querySelector('h4').textContent;
            if(confirm(`Recusar o grupo ${groupName}?`)) {
                this.closest('.request-card').remove();
            }
        });
    });
    
    // Toggle da sidebar em mobile
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.admin-sidebar');
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        
        if(sidebar.classList.contains('collapsed')) {
            sidebar.style.width = 'var(--sidebar-collapsed-width)';
            document.querySelector('.admin-main').style.marginLeft = 'var(--sidebar-collapsed-width)';
            
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
            document.querySelector('.admin-main').style.marginLeft = 'var(--sidebar-width)';
            
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
    
    // Gráfico de usuários ativos (exemplo)
    const ctx = document.createElement('canvas');
    ctx.id = 'users-chart';
    document.querySelector('.management-section').insertAdjacentElement('afterend', ctx);
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Novos Usuários',
                data: [45, 60, 75, 50, 85, 120],
                backgroundColor: 'rgba(74, 108, 247, 0.7)',
                borderColor: 'rgba(74, 108, 247, 1)',
                borderWidth: 1
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
});