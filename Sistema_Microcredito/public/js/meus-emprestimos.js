document.addEventListener('DOMContentLoaded', function() {
    // Inicialização da tabela DataTables
    $('#loans-table').DataTable({
        responsive: true,
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.11.5/i18n/pt-PT.json'
        },
        order: [[0, 'desc']] // Ordenar por ID de empréstimo mais recente
    });

    // Dados de exemplo para os empréstimos
    const loansData = {
        'EMP-2023-00752': {
            group: 'Poupança Comunitária A',
            totalAmount: '15.000 MT',
            installments: 12,
            paidInstallments: 5,
            nextInstallment: '1.250 MT (15/07/2023)',
            status: 'Em dia',
            statusClass: 'badge-success',
            installmentValue: 1250,
            dueDate: '15/07/2023',
            installmentText: '6/12',
            business: 'Mercearia Familiar',
            location: 'Maputo, Bairro X',
            phone: '+258 84 123 4567',
            leader: 'João Macuácua',
            leaderPhone: '+258 82 987 6543',
            startDate: '15/02/2023',
            interestRate: '5% ao mês',
            totalPaid: '6.250 MT',
            remainingBalance: '8.750 MT',
            payments: [
                { number: 1, date: '15/02/2023', amount: '1.250 MT', method: 'M-Pesa', status: 'Pago' },
                { number: 2, date: '15/03/2023', amount: '1.250 MT', method: 'M-Pesa', status: 'Pago' },
                { number: 3, date: '15/04/2023', amount: '1.250 MT', method: 'Dinheiro', status: 'Pago' },
                { number: 4, date: '15/05/2023', amount: '1.250 MT', method: 'M-Pesa', status: 'Pago' },
                { number: 5, date: '15/06/2023', amount: '1.250 MT', method: 'M-Pesa', status: 'Pago' }
            ]
        },
        'EMP-2023-00589': {
            installmentValue: 1000,
            dueDate: '05/07/2023',
            installmentText: '9/10'
        },
        'EMP-2023-00321': {
            installmentValue: 1000,
            dueDate: '20/06/2023',
            installmentText: '3/8'
        }
    };

    // Controle dos modais
    const payInstallmentModal = document.getElementById('pay-installment-modal');
    const paymentSuccessModal = document.getElementById('payment-success-modal');
    const paymentErrorModal = document.getElementById('payment-error-modal');
    const loanDetailsModal = document.getElementById('loan-details-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Abrir modal de pagamento de parcela
    const payButtons = document.querySelectorAll('.pay-installment-btn');
    payButtons.forEach(button => {
        button.addEventListener('click', function() {
            const loanId = this.getAttribute('data-loan-id');
            const loan = loansData[loanId];
            
            if (loan) {
                // Preencher informações no modal
                document.getElementById('modal-loan-id').textContent = `#${loanId}`;
                document.getElementById('modal-installment-value').textContent = `${loan.installmentValue} MT`;
                document.getElementById('modal-due-date').textContent = loan.dueDate ;               
                document.getElementById('modal-installment-number').textContent = loan.installmentText;
                document.getElementById('payment-amount').value = loan.installmentValue;
                document.getElementById('min-payment-amount').textContent = loan.installmentValue;
                
                // Mostrar modal
                payInstallmentModal.style.display = 'block';
            }
        });
    });

    // Abrir modal de detalhes do empréstimo
    const viewButtons = document.querySelectorAll('.view-loan-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const loanId = this.getAttribute('data-loan-id');
            const loan = loansData[loanId];
            
            if (loan) {
                // Preencher informações no modal de detalhes
                document.querySelector('#loan-details-modal .loan-id').textContent = `#${loanId}`;
                document.querySelector('#loan-details-modal .badge').className = `badge ${loan.statusClass}`;
                document.querySelector('#loan-details-modal .badge').textContent = loan.status;
                
                // Preencher informações do grupo e negócio
                document.querySelector('#loan-details-modal .party-info h4').textContent = loan.group;
                document.querySelector('#loan-details-modal .party-info p:nth-of-type(1)').innerHTML = `<strong>Líder:</strong> ${loan.leader}`;
                document.querySelector('#loan-details-modal .party-info p:nth-of-type(2)').innerHTML = `<strong>Contacto:</strong> ${loan.leaderPhone}`;
                
                document.querySelectorAll('#loan-details-modal .party-info')[1].querySelector('h4').textContent = loan.business;
                document.querySelectorAll('#loan-details-modal .party-info')[1].querySelector('p:nth-of-type(1)').innerHTML = `<strong>Localização:</strong> ${loan.location}`;
                document.querySelectorAll('#loan-details-modal .party-info')[1].querySelector('p:nth-of-type(2)').innerHTML = `<strong>Contacto:</strong> ${loan.phone}`;
                
                // Preencher termos do empréstimo
                document.querySelectorAll('#loan-details-modal .term-value')[0].textContent = loan.totalAmount;
                document.querySelectorAll('#loan-details-modal .term-value')[1].textContent = loan.interestRate;
                document.querySelectorAll('#loan-details-modal .term-value')[2].textContent = `${loan.installments} x ${loan.installmentValue} MT`;
                document.querySelectorAll('#loan-details-modal .term-value')[3].textContent = loan.startDate;
                document.querySelectorAll('#loan-details-modal .term-value')[4].textContent = `${loan.paidInstallments}/${loan.installments}`;
                document.querySelectorAll('#loan-details-modal .term-value')[5].textContent = loan.totalPaid;
                document.querySelectorAll('#loan-details-modal .term-value')[6].textContent = loan.nextInstallment.split(' (')[0];
                document.querySelectorAll('#loan-details-modal .term-value')[7].textContent = loan.remainingBalance;
                
                // Preencher histórico de pagamentos
                const paymentTable = document.querySelector('#loan-details-modal .payment-table tbody');
                paymentTable.innerHTML = '';
                
                loan.payments.forEach(payment => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${payment.number}</td>
                        <td>${payment.date}</td>
                        <td>${payment.amount}</td>
                        <td>${payment.method}</td>
                        <td><span class="badge badge-success">${payment.status}</span></td>
                        <td><a href="#" class="btn-link">Ver</a></td>
                    `;
                    paymentTable.appendChild(row);
                });
                
                // Mostrar modal
                loanDetailsModal.style.display = 'block';
            }
        });
    });

    // Fechar modais
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            payInstallmentModal.style.display = 'none';
            paymentSuccessModal.style.display = 'none';
            paymentErrorModal.style.display = 'none';
            loanDetailsModal.style.display = 'none';
        });
    });

    // Fechar modais ao clicar fora
    window.addEventListener('click', function(event) {
        if (event.target === payInstallmentModal) {
            payInstallmentModal.style.display = 'none';
        }
        if (event.target === paymentSuccessModal) {
            paymentSuccessModal.style.display = 'none';
        }
        if (event.target === paymentErrorModal) {
            paymentErrorModal.style.display = 'none';
        }
        if (event.target === loanDetailsModal) {
            loanDetailsModal.style.display = 'none';
        }
    });

    // Mostrar/ocultar campos específicos do método de pagamento
    const paymentMethod = document.getElementById('payment-method');
    paymentMethod.addEventListener('change', function() {
        const mpesaFields = document.getElementById('mpesa-fields');
        if (this.value === 'mpesa') {
            mpesaFields.style.display = 'block';
        } else {
            mpesaFields.style.display = 'none';
        }
    });

    // Submissão do formulário de pagamento
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const loanId = document.getElementById('modal-loan-id').textContent;
        const amount = parseFloat(document.getElementById('payment-amount').value);
        const method = document.getElementById('payment-method').value;
        const minAmount = parseFloat(document.getElementById('min-payment-amount').textContent);
        
        // Validação simples
        if (amount < minAmount) {
            document.getElementById('error-details').innerHTML = 
                `O valor informado é menor que o valor da parcela. Por favor, ajuste o valor para pelo menos <strong>${minAmount} MT</strong> e tente novamente.`;
            paymentErrorModal.style.display = 'block';
            payInstallmentModal.style.display = 'none';
            return;
        }
        
        if (method === '') {
            document.getElementById('error-details').textContent = 'Por favor, selecione um método de pagamento.';
            paymentErrorModal.style.display = 'block';
            payInstallmentModal.style.display = 'none';
            return;
        }
        
        if (method === 'mpesa' && document.getElementById('mpesa-phone').value === '') {
            document.getElementById('error-details').textContent = 'Por favor, informe o número de telefone para pagamento via M-Pesa.';
            paymentErrorModal.style.display = 'block';
            payInstallmentModal.style.display = 'none';
            return;
        }
        
        // Simular pagamento bem-sucedido
        const transactionId = 'MP' + Math.floor(Math.random() * 1000000000);
        const today = new Date();
        const formattedDate = today.toLocaleDateString('pt-BR');
        
        // Preencher modal de sucesso
        document.getElementById('success-loan-id').textContent = loanId;
        document.getElementById('success-amount').textContent = amount + ' MT';
        document.getElementById('success-method').textContent = 
            method === 'mpesa' ? 'M-Pesa' : 
            method === 'e-mola' ? 'e-Mola' : 
            method === 'bank' ? 'Transferência Bancária' : 'Dinheiro';
        document.getElementById('success-date').textContent = formattedDate;
        document.getElementById('success-transaction').textContent = transactionId;
        
        // Fechar modal de pagamento e mostrar modal de sucesso
        payInstallmentModal.style.display = 'none';
        paymentSuccessModal.style.display = 'block';
    });

    // Botão de tentar novamente no modal de erro
    document.getElementById('btn-retry-payment').addEventListener('click', function() {
        paymentErrorModal.style.display = 'none';
        payInstallmentModal.style.display = 'block';
    });

    // Botão de fechar no modal de sucesso
    document.getElementById('btn-close-payment-success').addEventListener('click', function() {
        paymentSuccessModal.style.display = 'none';
        // Recarregar a página para atualizar os dados (simulação)
        location.reload();
    });

    // Botão de fechar no modal de erro
    document.getElementById('btn-close-payment-error').addEventListener('click', function() {
        paymentErrorModal.style.display = 'none';
    });

    // Filtros
    document.getElementById('loan-status').addEventListener('change', function() {
        const status = this.value;
        const table = $('#loans-table').DataTable();
        
        if (status === 'all') {
            table.search('').columns().search('').draw();
        } else {
            let searchTerm = '';
            if (status === 'active') {
                searchTerm = 'Em dia|Parc. pendente';
            } else if (status === 'paid') {
                searchTerm = 'Quitado';
            } else if (status === 'late') {
                searchTerm = 'Em atraso';
            }
            
            table.columns(6).search(searchTerm, true, false).draw();
        }
    });

    document.getElementById('loan-period').addEventListener('change', function() {
        // Implementação simplificada - na prática, você precisaria filtrar por datas
        const period = this.value;
        const table = $('#loans-table').DataTable();
        
        if (period === 'all') {
            table.search('').columns().search('').draw();
        } else {
            // Esta é uma implementação simplificada
            // Em uma aplicação real, você precisaria filtrar por datas
            table.search('2023').draw(); // Filtra apenas empréstimos de 2023
        }
    });
});

// Mostrar/ocultar motivo "Outro" quando selecionado
$('#reject-reason').change(function() {
    if ($(this).val() === 'other') {
        $('#other-reason-group').show();
        $('#other-reason').prop('required', true);
    } else {
        $('#other-reason-group').hide();
        $('#other-reason').prop('required', false);
    }
});

// Abrir modal de aceitação
$(document).on('click', '.accept-request', function() {
    $('#accept-request-modal').show();
});

// Abrir modal de recusa
$(document).on('click', '.reject-request', function() {
    $('#reject-request-modal').show();
});

// Confirmar aceitação
$('#btn-confirm-accept').click(function() {
    $('#accept-request-modal').hide();
    $('#accept-success-modal').show();
    
    // Aqui você adicionaria a lógica AJAX para enviar a aceitação ao servidor
});

// Confirmar recusa
$('#btn-confirm-reject').click(function() {
    if ($('#reject-reason').val() === '') {
        alert('Por favor, selecione um motivo para a recusa');
        return;
    }
    
    if ($('#reject-reason').val() === 'other' && $('#other-reason').val() === '') {
        alert('Por favor, descreva o motivo da recusa');
        return;
    }
    
    $('#reject-request-modal').hide();
    $('#reject-success-modal').show();
    
    // Aqui você adicionaria a lógica AJAX para enviar a recusa ao servidor
});

// Fechar modais
$('#btn-cancel-accept, #btn-close-accept-success').click(function() {
    $('#accept-request-modal, #accept-success-modal').hide();
});

$('#btn-cancel-reject, #btn-close-reject-success').click(function() {
    $('#reject-request-modal, #reject-success-modal').hide();
});