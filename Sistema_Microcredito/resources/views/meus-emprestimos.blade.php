<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MicroCred - Meus Empréstimos</title>
          <link rel="stylesheet" href="{{ asset('css/meus-emprestimos.css') }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/jquery.dataTables.min.css">
</head>
<body>
    <div class="my-loans-container">
                <!-- Botão Voltar -->
        <a href="dashboard.html" class="btn-voltar-link">
            <button class="btn-voltar" id="btn-voltar" title="Voltar">
                <i class="fas fa-arrow-left"></i>
                <span class="tooltip">Voltar</span>
            </button>
        </a>
        <!-- Cabeçalho -->
        <div class="loans-header">
            <div class="header-left">
                <h1><i class="fas fa-file-invoice-dollar"></i> Meus Empréstimos</h1>
                <p>Histórico e gestão dos seus empréstimos ativos</p>
            </div>
            <div class="header-right">
                <div class="loan-stats">
                    <span>Total em aberto:</span>
                    <span class="amount">28.500 MT</span>
                </div>
            </div>
        </div>
        
        <!-- Filtros -->
        <div class="loans-filters">
            <div class="filter-group">
                <label for="loan-status">Status:</label>
                <select id="loan-status">
                    <option value="all">Todos</option>
                    <option value="active">Ativos</option>
                    <option value="paid">Quitados</option>
                    <option value="late">Em atraso</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="loan-period">Período:</label>
                <select id="loan-period">
                    <option value="all">Todos</option>
                    <option value="year">Últimos 12 meses</option>
                    <option value="6months">Últimos 6 meses</option>
                    <option value="3months">Últimos 3 meses</option>
                </select>
            </div>
        </div>
        
        <!-- Lista de Empréstimos -->
        <div class="table-responsive">
            <table id="loans-table" class="data-table">
                <thead>
                    <tr>
                        <th>ID Empréstimo</th>
                        <th>Grupo</th>
                        <th>Valor Total</th>
                        <th>Parcelas</th>
                        <th>Pagas</th>
                        <th>Próxima Parcela</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#EMP-2023-00752</td>
                        <td>Poupança Comunitária A</td>
                        <td>15.000 MT</td>
                        <td>12</td>
                        <td>5</td>
                        <td>1.250 MT (15/07/2023)</td>
                        <td><span class="badge badge-success">Em dia</span></td>
                        <td>
                            <button class="btn-action btn-primary view-loan-btn" data-loan-id="EMP-2023-00752">
                                <i class="fas fa-eye"></i> Detalhes
                            </button>
                            <button class="btn-action btn-success pay-installment-btn" data-loan-id="EMP-2023-00752">
                                <i class="fas fa-money-bill-wave"></i> Pagar
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>#EMP-2023-00589</td>
                        <td>Poupança Comunitária B</td>
                        <td>10.000 MT</td>
                        <td>10</td>
                        <td>8</td>
                        <td>1.000 MT (05/07/2023)</td>
                        <td><span class="badge badge-warning">Parc. pendente</span></td>
                        <td>
                            <button class="btn-action btn-primary view-loan-btn" data-loan-id="EMP-2023-00589">
                                <i class="fas fa-eye"></i> Detalhes
                            </button>
                            <button class="btn-action btn-success pay-installment-btn" data-loan-id="EMP-2023-00589">
                                <i class="fas fa-money-bill-wave"></i> Pagar
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>#EMP-2022-01234</td>
                        <td>Poupança Comunitária C</td>
                        <td>20.000 MT</td>
                        <td>18</td>
                        <td>18</td>
                        <td>-</td>
                        <td><span class="badge badge-info">Quitado</span></td>
                        <td>
                            <button class="btn-action btn-primary view-loan-btn" data-loan-id="EMP-2022-01234">
                                <i class="fas fa-eye"></i> Detalhes
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>#EMP-2023-00321</td>
                        <td>Poupança Comunitária A</td>
                        <td>8.000 MT</td>
                        <td>8</td>
                        <td>2</td>
                        <td>1.000 MT (20/06/2023)</td>
                        <td><span class="badge badge-danger">Em atraso</span></td>
                        <td>
                            <button class="btn-action btn-primary view-loan-btn" data-loan-id="EMP-2023-00321">
                                <i class="fas fa-eye"></i> Detalhes
                            </button>
                            <button class="btn-action btn-success pay-installment-btn" data-loan-id="EMP-2023-00321">
                                <i class="fas fa-money-bill-wave"></i> Pagar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Modal Pagar Parcela -->
    <div class="modal" id="pay-installment-modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2><i class="fas fa-money-bill-wave"></i> Pagar Parcela</h2>
            
            <div class="loan-info">
                <p><strong>Empréstimo:</strong> <span id="modal-loan-id">#EMP-2023-00752</span></p>
                <p><strong>Valor da Parcela:</strong> <span id="modal-installment-value">1.250 MT</span></p>
                <p><strong>Data de Vencimento:</strong> <span id="modal-due-date">15/07/2023</span></p>
                <p><strong>Parcela:</strong> <span id="modal-installment-number">6/12</span></p>
            </div>
            
            <form id="payment-form">
                <div class="form-group">
                    <label for="payment-amount">Valor do Pagamento *</label>
                    <div class="input-with-symbol">
                        <span>MT</span>
                        <input type="number" id="payment-amount" min="0" step="1" required>
                    </div>
                    <p class="form-hint">Valor mínimo: <span id="min-payment-amount">1.250</span> MT</p>
                </div>
                
                <div class="form-group">
                    <label for="payment-method">Método de Pagamento *</label>
                    <select id="payment-method" required>
                        <option value="">Selecione...</option>
                        <option value="mpesa">M-Pesa</option>
                        <option value="e-mola">e-Mola</option>
                        <option value="bank">Transferência Bancária</option>
                        <option value="cash">Dinheiro (presencial)</option>
                    </select>
                </div>
                
                <div class="form-group" id="mpesa-fields" style="display: none;">
                    <label for="mpesa-phone">Número de Telefone M-Pesa *</label>
                    <input type="tel" id="mpesa-phone" placeholder="84 123 4567">
                </div>
                
                <div class="form-group">
                    <label for="payment-notes">Observações (opcional)</label>
                    <textarea id="payment-notes" rows="2" placeholder="Ex: Pagamento parcela junho"></textarea>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn btn-outline close-payment-modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Confirmar Pagamento</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal Confirmação de Pagamento -->
    <div class="modal" id="payment-success-modal">
        <div class="modal-content small">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2 id="payment-success-title">Pagamento Realizado com Sucesso!</h2>
            <div class="success-details">
                <p><strong>Empréstimo:</strong> <span id="success-loan-id">#EMP-2023-00752</span></p>
                <p><strong>Valor:</strong> <span id="success-amount">1.250 MT</span></p>
                <p><strong>Método:</strong> <span id="success-method">M-Pesa</span></p>
                <p><strong>Data:</strong> <span id="success-date">15/06/2023</span></p>
                <p><strong>Nº Transação:</strong> <span id="success-transaction">MP789456123</span></p>
                <p id="loan-status-message"><strong>Status:</strong> <span id="success-status">6/12 parcelas pagas</span></p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" id="btn-close-payment-success">Fechar</button>
            </div>
        </div>
    </div>

    <!-- Modal Falha no Pagamento -->
    <div class="modal" id="payment-error-modal">
        <div class="modal-content small">
            <div class="error-icon">
                <i class="fas fa-times-circle"></i>
            </div>
            <h2>Pagamento Não Realizado</h2>
            <div class="error-message">
                <p id="error-details">O valor informado é menor que o valor da parcela. Por favor, ajuste o valor para pelo menos <strong>1.250 MT</strong> e tente novamente.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" id="btn-close-payment-error">Voltar</button>
                <button class="btn btn-primary" id="btn-retry-payment">Tentar Novamente</button>
            </div>
        </div>
    </div>

    <!-- Modal Detalhes do Empréstimo -->
    <div class="modal" id="loan-details-modal">
        <div class="modal-content large">
            <span class="close-modal">&times;</span>
            <div class="modal-header">
                <h2>Detalhes do Empréstimo <span class="loan-id">#EMP-2023-00752</span></h2>
                <span class="badge badge-success">Em dia</span>
            </div>
            
            <div class="modal-body">
                <div class="loan-parties">
                    <div class="party-card">
                        <h3><i class="fas fa-users"></i> Grupo</h3>
                        <div class="party-info">
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="João Macuácua">
                            <div>
                                <h4>Poupança Comunitária A</h4>
                                <p><strong>Líder:</strong> João Macuácua</p>
                                <p><strong>Contacto:</strong> +258 82 987 6543</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="party-card">
                        <h3><i class="fas fa-user-tie"></i> Seu Negócio</h3>
                        <div class="party-info">
                            <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="Luísa Fernandes">
                            <div>
                                <h4>Mercearia Familiar</h4>
                                <p><strong>Localização:</strong> Maputo, Bairro X</p>
                                <p><strong>Contacto:</strong> +258 84 123 4567</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="loan-terms">
                    <h3><i class="fas fa-file-contract"></i> Termos do Empréstimo</h3>
                    <div class="terms-grid">
                        <div class="term-item">
                            <span class="term-label">Valor Emprestado</span>
                            <span class="term-value">15.000 MT</span>
                        </div>
                        <div class="term-item">
                            <span class="term-label">Taxa de Juros</span>
                            <span class="term-value">5% ao mês</span>
                        </div>
                        <div class="term-item">
                            <span class="term-label">Parcelas</span>
                            <span class="term-value">12 x 1.250 MT</span>
                        </div>
                        <div class="term-item">
                            <span class="term-label">Data de Início</span>
                            <span class="term-value">15/02/2023</span>
                        </div>
                        <div class="term-item">
                            <span class="term-label">Parcelas Pagas</span>
                            <span class="term-value">5/12</span>
                        </div>
                        <div class="term-item">
                            <span class="term-label">Total Pago</span>
                            <span class="term-value">6.250 MT</span>
                        </div>
                        <div class="term-item">
                            <span class="term-label">Próximo Vencimento</span>
                            <span class="term-value">15/07/2023</span>
                        </div>
                        <div class="term-item">
                            <span class="term-label">Saldo Devedor</span>
                            <span class="term-value">8.750 MT</span>
                        </div>
                    </div>
                </div>
                
                <div class="payment-history">
                    <h3><i class="fas fa-history"></i> Histórico de Pagamentos</h3>
                    <table class="payment-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Data</th>
                                <th>Valor</th>
                                <th>Método</th>
                                <th>Status</th>
                                <th>Comprovante</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>15/02/2023</td>
                                <td>1.250 MT</td>
                                <td>M-Pesa</td>
                                <td><span class="badge badge-success">Pago</span></td>
                                <td><a href="#" class="btn-link">Ver</a></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>15/03/2023</td>
                                <td>1.250 MT</td>
                                <td>M-Pesa</td>
                                <td><span class="badge badge-success">Pago</span></td>
                                <td><a href="#" class="btn-link">Ver</a></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>15/04/2023</td>
                                <td>1.250 MT</td>
                                <td>Dinheiro</td>
                                <td><span class="badge badge-success">Pago</span></td>
                                <td><a href="#" class="btn-link">Ver</a></td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>15/05/2023</td>
                                <td>1.250 MT</td>
                                <td>M-Pesa</td>
                                <td><span class="badge badge-success">Pago</span></td>
                                <td><a href="#" class="btn-link">Ver</a></td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>15/06/2023</td>
                                <td>1.250 MT</td>
                                <td>M-Pesa</td>
                                <td><span class="badge badge-success">Pago</span></td>
                                <td><a href="#" class="btn-link">Ver</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="btn btn-outline">Imprimir Contrato</button>
                <button class="btn btn-primary pay-installment-btn" data-loan-id="EMP-2023-00752">
                    <i class="fas fa-money-bill-wave"></i> Pagar Próxima Parcela
                </button>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script src="util/meus-emprestimos.js"></script>
        <script src="{{ asset('js/meus-emprestimos.js') }}"></script>
</body>
</html>