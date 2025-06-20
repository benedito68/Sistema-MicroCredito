import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaArrowLeft, FaArrowRight, FaExclamationTriangle, FaCheckCircle, FaLock, FaPaperPlane } from 'react-icons/fa';

interface GroupData {
  groupName: string;
  groupObjective: string;
  groupArea: string;
  maxMembers: number;
  savingAmount: number;
  cycleDuration: string;
  startDate: string;
  meetingFrequency: string;
  agreeTerms: boolean;
}

const CreateGroup: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('mpesa');
  const [loading, setLoading] = useState<boolean>(false);

  const [group, setGroup] = useState<GroupData>({
    groupName: '',
    groupObjective: '',
    groupArea: '',
    maxMembers: 15,
    savingAmount: 500,
    cycleDuration: '12',
    startDate: '',
    meetingFrequency: 'quinzenal',
    agreeTerms: false,
  });

  const [paymentData, setPaymentData] = useState({
    paymentAmount: 50500,
    phoneNumber: '',
  });

  const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setGroup(prev => ({
      ...prev,
      [name]: name === 'maxMembers' || name === 'savingAmount' ? parseInt(value) : value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setGroup(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: name === 'paymentAmount' ? parseInt(value) : value
    }));
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!group.groupName || !group.groupObjective || !group.groupArea) {
        alert('Por favor, preencha todos os campos obrigatórios no Passo 1');
        return false;
      }
    } else if (step === 2) {
      if (!group.savingAmount || !group.cycleDuration || !group.startDate) {
        alert('Por favor, preencha todos os campos obrigatórios no Passo 2');
        return false;
      }
    }
    return true;
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simular processamento do pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Enviar dados do grupo para a API
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...group,
          paymentData,
          paymentMethod,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar grupo');
      }

      setShowPaymentModal(false);
      setShowConfirmationModal(true);
    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro ao processar seu pagamento. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmationModal(false);
    router.push('/');
  };

  // Obter a data atual no formato YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="create-group-container">
      {/* Botão Voltar */}
      <a href="/grupo-poupanca" className="btn-voltar-link">
        <button className="btn-voltar" title="Voltar">
          <FaArrowLeft />
          <span className="tooltip">Voltar</span>
        </button>
      </a>

{/* Barra de Progresso com Bootstrap */}
<div className="container-fluid px-0">
  <div className="progress-steps d-flex justify-content-between position-relative mb-4">
    {/* Linha de progresso */}
    <div className="position-absolute w-100 bg-secondary" style={{ 
      height: '2px', 
      top: '20px', 
      zIndex: 1 
    }}></div>
    
    {/* Passo 1 */}
    <div className={`step d-flex flex-column align-items-center position-relative z-2 ${currentStep >= 1 ? 'active' : ''}`} 
         style={{ flex: 1 }}>
      <div className={`step-number rounded-circle d-flex align-items-center justify-content-center 
                      ${currentStep >= 1 ? 'bg-primary text-white' : 'bg-white text-secondary border'}`} 
           style={{ 
             width: '40px', 
             height: '40px', 
             border: currentStep >= 1 ? '2px solid #0d6efd' : '2px solid #dee2e6',
             marginBottom: '0.5rem'
           }}>
        1
      </div>
      <div className={`step-label text-center small ${currentStep >= 1 ? 'text-primary fw-medium' : 'text-secondary'}`}>
        Dados do Grupo
      </div>
    </div>
    
    {/* Passo 2 */}
    <div className={`step d-flex flex-column align-items-center position-relative z-2 ${currentStep >= 2 ? 'active' : ''}`} 
         style={{ flex: 1 }}>
      <div className={`step-number rounded-circle d-flex align-items-center justify-content-center 
                      ${currentStep >= 2 ? 'bg-primary text-white' : 'bg-white text-secondary border'}`} 
           style={{ 
             width: '40px', 
             height: '40px', 
             border: currentStep >= 2 ? '2px solid #0d6efd' : '2px solid #dee2e6',
             marginBottom: '0.5rem'
           }}>
        2
      </div>
      <div className={`step-label text-center small ${currentStep >= 2 ? 'text-primary fw-medium' : 'text-secondary'}`}>
        Ciclo de Poupança
      </div>
    </div>
    
    {/* Passo 3 */}
    <div className={`step d-flex flex-column align-items-center position-relative z-2 ${currentStep >= 3 ? 'active' : ''}`} 
         style={{ flex: 1 }}>
      <div className={`step-number rounded-circle d-flex align-items-center justify-content-center 
                      ${currentStep >= 3 ? 'bg-primary text-white' : 'bg-white text-secondary border'}`} 
           style={{ 
             width: '40px', 
             height: '40px', 
             border: currentStep >= 3 ? '2px solid #0d6efd' : '2px solid #dee2e6',
             marginBottom: '0.5rem'
           }}>
        3
      </div>
      <div className={`step-label text-center small ${currentStep >= 3 ? 'text-primary fw-medium' : 'text-secondary'}`}>
        Confirmação
      </div>
    </div>
  </div>
</div>
      
      {/* Formulário em Etapas */}
      <form id="group-form" className="group-form">
        {/* Passo 1 - Dados do Grupo */}
        <div className={`form-step ${currentStep === 1 ? 'active' : ''}`} data-step="1">
          <h2>Informações Básicas do Grupo</h2>
          <p>Preencha os dados principais do seu grupo de poupança</p>
          
          <div className="form-group">
            <label htmlFor="group-name">Nome do Grupo *</label>
            <input
              type="text"
              id="group-name"
              name="groupName"
              value={group.groupName}
              onChange={handleGroupChange}
              required
              placeholder="Ex: Agricultores Unidos"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="group-objective">Objetivo do Grupo *</label>
            <textarea
              id="group-objective"
              name="groupObjective"
              value={group.groupObjective}
              onChange={handleGroupChange}
              rows={3}
              required
              placeholder="Descreva o principal objetivo deste grupo"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="group-area">Área de Atuação *</label>
            <select
              id="group-area"
              name="groupArea"
              value={group.groupArea}
              onChange={handleGroupChange}
              required
            >
              <option value="">Selecione uma área...</option>
              <option value="agricultura">Agricultura</option>
              <option value="pesca">Pesca</option>
              <option value="artistas">Artistas</option>
              <option value="comercio">Comércio</option>
              <option value="outros">Outros</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="max-members">Capacidade Máxima de Membros *</label>
            <input
              type="number"
              id="max-members"
              name="maxMembers"
              value={group.maxMembers}
              onChange={handleGroupChange}
              min="5"
              max="30"
              required
            />
            <small>Mínimo: 5 membros, Máximo: 30 membros</small>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-next" onClick={nextStep}>
              Próximo <FaArrowRight />
            </button>
          </div>
        </div>
        
        {/* Passo 2 - Ciclo de Poupança */}
        <div className={`form-step ${currentStep === 2 ? 'active' : ''}`} data-step="2">
          <h2>Configuração do Ciclo de Poupança</h2>
          <p>Defina como funcionará o ciclo de contribuições do grupo</p>
          
          <div className="form-group">
            <label htmlFor="saving-amount">Valor da Contribuição Mensal (MT) *</label>
            <input
              type="number"
              id="saving-amount"
              name="savingAmount"
              value={group.savingAmount}
              onChange={handleGroupChange}
              min="100"
              required
            />
            <small>Valor que cada membro deverá contribuir mensalmente</small>
          </div>
          
          <div className="form-group">
            <label htmlFor="cycle-duration">Duração do Ciclo (meses) *</label>
            <select
              id="cycle-duration"
              name="cycleDuration"
              value={group.cycleDuration}
              onChange={handleGroupChange}
              required
            >
              <option value="6">6 meses</option>
              <option value="12">12 meses</option>
              <option value="18">18 meses</option>
              <option value="24">24 meses</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="start-date">Data de Início Prevista *</label>
            <input
              type="date"
              id="start-date"
              name="startDate"
              value={group.startDate}
              onChange={handleGroupChange}
              min={today}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="meeting-frequency">Frequência de Reuniões *</label>
            <select
              id="meeting-frequency"
              name="meetingFrequency"
              value={group.meetingFrequency}
              onChange={handleGroupChange}
              required
            >
              <option value="semanal">Semanal</option>
              <option value="quinzenal">Quinzenal</option>
              <option value="mensal">Mensal</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-prev" onClick={prevStep}>
              <FaArrowLeft /> Anterior
            </button>
            <button type="button" className="btn btn-next" onClick={nextStep}>
              Próximo <FaArrowRight />
            </button>
          </div>
        </div>
        
        {/* Passo 3 - Confirmação e Pagamento */}
        <div className={`form-step ${currentStep === 3 ? 'active' : ''}`} data-step="3">
          <h2>Termos e Condições</h2>
          
          <div className="terms-warning">
            <div className="warning-icon">
              <FaExclamationTriangle />
            </div>
            <div className="warning-content">
              <h3>Atenção!</h3>
              <p>Para criar um grupo de poupança é necessário fazer um depósito de reserva no valor de <strong>50.000 MT</strong>.</p>
              <p>Este valor será utilizado como garantia para o grupo e será devolvido ao final do ciclo, desde que todas as obrigações sejam cumpridas.</p>
            </div>
          </div>
          
          <div className="terms-content">
            <h3>Termos e Condições</h3>
            <div className="terms-text">
              <p>Ao criar um grupo de poupança, você concorda com os seguintes termos:</p>
              <ol>
                <li>Como líder do grupo, você será responsável pela organização das reuniões e pelo cumprimento das regras estabelecidas.</li>
                <li>O depósito de reserva de 50.000 MT é obrigatório e será bloqueado durante todo o ciclo do grupo.</li>
                <li>Em caso de dissolução antecipada do grupo, o depósito poderá ser utilizado para cobrir eventuais dívidas.</li>
                <li>Todos os membros devem concordar com as regras estabelecidas no ato da adesão ao grupo.</li>
                <li>O sistema MicroCred atuará apenas como intermediário, não se responsabilizando por conflitos internos do grupo.</li>
              </ol>
            </div>
            
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="agree-terms"
                name="agreeTerms"
                checked={group.agreeTerms}
                onChange={handleCheckboxChange}
                required
              />
              <label htmlFor="agree-terms">Eu li e concordo com os termos e condições acima *</label>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-prev" onClick={prevStep}>
              <FaArrowLeft /> Anterior
            </button>
            <button
              type="button"
              id="btn-open-payment"
              className="btn btn-primary"
              onClick={() => setShowPaymentModal(true)}
              disabled={!group.agreeTerms}
            >
              Pagar Depósito <FaLock />
            </button>
          </div>
        </div>
      </form>

      {/* Modal de Pagamento */}
      {showPaymentModal && (
        <div className="modal" id="payment-modal">
          <div className="modal-content">
            <span className="close-modal" onClick={() => setShowPaymentModal(false)}>&times;</span>
            <h2>Pagamento do Depósito</h2>
            <p>Complete o pagamento do depósito de reserva para criar seu grupo</p>
            
            <div className="payment-info">
              <div className="payment-detail">
                <span>Valor Requerido:</span>
                <span className="amount">50.000 MT</span>
              </div>
              <div className="payment-detail">
                <span>Taxa de Processamento:</span>
                <span className="amount">500 MT</span>
              </div>
              <div className="payment-detail total">
                <span>Total a Pagar:</span>
                <span className="amount">50.500 MT</span>
              </div>
            </div>
            
            <form id="payment-form" className="payment-form" onSubmit={handlePaymentSubmit}>
              <div className="form-group">
                <label htmlFor="payment-amount">Valor a Pagar (MT) *</label>
                <input
                  type="number"
                  id="payment-amount"
                  name="paymentAmount"
                  value={paymentData.paymentAmount}
                  onChange={handlePaymentChange}
                  min="50500"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone-number">Número de Telefone M-Pesa *</label>
                <div className="phone-input">
                  <span className="prefix">+258</span>
                  <input
                    type="tel"
                    id="phone-number"
                    name="phoneNumber"
                    value={paymentData.phoneNumber}
                    onChange={handlePaymentChange}
                    pattern="[0-9]{9}"
                    placeholder="84 123 4567"
                    required
                  />
                </div>
                <small>Será enviado um pedido de confirmação para este número</small>
              </div>
              
              <div className="payment-methods">
                <div className={`payment-method ${paymentMethod === 'mpesa' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    id="mpesa"
                    name="payment-method"
                    value="mpesa"
                    checked={paymentMethod === 'mpesa'}
                    onChange={() => setPaymentMethod('mpesa')}
                  />
                  <label htmlFor="mpesa">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/M-PESA_LOGO-01.svg/1200px-M-PESA_LOGO-01.svg.png" alt="M-Pesa" />
                  </label>
                </div>
                <div className={`payment-method ${paymentMethod === 'vodacom' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    id="vodacom"
                    name="payment-method"
                    value="vodacom"
                    checked={paymentMethod === 'vodacom'}
                    onChange={() => setPaymentMethod('vodacom')}
                  />
                  <label htmlFor="vodacom">
                    <img src="https://seeklogo.com/images/V/vodacom-logo-3D55C69E2C-seeklogo.com.png" alt="Vodacom M-Pesa" />
                  </label>
                </div>
              </div>
              
              <button type="submit" className="btn btn-payment" disabled={loading}>
                {loading ? 'Processando...' : (
                  <>
                    <FaPaperPlane /> Enviar Pedido de Pagamento
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Confirmação */}
      {showConfirmationModal && (
        <div className="modal" id="confirmation-modal">
          <div className="modal-content small">
            <div className="confirmation-icon">
              <FaCheckCircle />
            </div>
            <h2>Pedido Submetido com Sucesso!</h2>
            <p>Seu pedido de criação de grupo foi recebido e está em processamento.</p>
            <p>Assim que o pagamento for confirmado, você receberá uma notificação e poderá começar a gerenciar seu grupo.</p>
            
            <div className="confirmation-details">
              <p><strong>Número do Pedido:</strong> GRP-{new Date().getFullYear()}-{Math.floor(1000 + Math.random() * 9000)}</p>
              <p><strong>Valor Pago:</strong> 50.500 MT</p>
              <p><strong>Método:</strong> M-Pesa</p>
            </div>
            
            <button type="button" className="btn btn-primary" onClick={handleCloseConfirmation}>
              Voltar ao Início
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .create-group-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          position: relative;
        }

        .btn-voltar-link {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 10;
        }

        .btn-voltar {
          background: #4a6cf7;
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
        }

        .btn-voltar:hover {
          background: #3a5bd9;
        }

        .tooltip {
          position: absolute;
          top: 50%;
          left: 100%;
          transform: translateY(-50%);
          background: #333;
          color: white;
          padding: 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
          margin-left: 0.5rem;
        }

        .btn-voltar:hover .tooltip {
          opacity: 1;
        }

        /* Barra de Progresso */
        .progress-bar {
          display: flex;
          justify-content: space-between;
          margin: 2rem auto 3rem;
          position: relative;
          max-width: 700px;
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
          flex: 1;
        }

        .progress-step.active .step-number {
          background: #4a6cf7;
          color: white;
          border-color: #4a6cf7;
        }

        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          border: 2px solid #e9ecef;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #6c757d;
          margin-bottom: 0.5rem;
        }

        .step-label {
          font-size: 0.9rem;
          color: #6c757d;
          text-align: center;
        }

        .progress-step.active .step-label {
          color: #4a6cf7;
          font-weight: 500;
        }

        .progress-line {
          position: absolute;
          top: 20px;
          left: 0;
          right: 0;
          height: 2px;
          background: #e9ecef;
          z-index: 1;
        }

        /* Formulário */
        .group-form {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .form-step {
          display: none;
        }

        .form-step.active {
          display: block;
        }

        .form-step h2 {
          color: #4a6cf7;
          margin-bottom: 0.5rem;
        }

        .form-step p {
          color: #6c757d;
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #343a40;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #e9ecef;
          border-radius: 6px;
          font-size: 1rem;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #4a6cf7;
          box-shadow: 0 0 0 2px rgba(74, 108, 247, 0.2);
        }

        .form-group small {
          display: block;
          margin-top: 0.25rem;
          font-size: 0.8rem;
          color: #6c757d;
        }

        .checkbox-group {
          display: flex;
          align-items: center;
        }

        .checkbox-group input {
          width: auto;
          margin-right: 0.5rem;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 2rem;
        }

        .btn {
          padding: 0.8rem 1.5rem;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: none;
          transition: all 0.3s ease;
        }

        .btn-next,
        .btn-primary {
          background: #4a6cf7;
          color: white;
        }

        .btn-next:hover,
        .btn-primary:hover {
          background: #3a5bd9;
        }

        .btn-prev {
          background: none;
          border: 1px solid #e9ecef;
          color: #343a40;
          margin-right: 1rem;
        }

        .btn-prev:hover {
          background: #f8f9fa;
        }

        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Termos e Condições */
        .terms-warning {
          display: flex;
          background: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 1rem;
          margin-bottom: 2rem;
          border-radius: 4px;
        }

        .warning-icon {
          font-size: 1.5rem;
          color: #ffc107;
          margin-right: 1rem;
        }

        .warning-content h3 {
          margin-top: 0;
          color: #856404;
        }

        .warning-content p {
          margin-bottom: 0.5rem;
          color: #856404;
        }

        .terms-content {
          margin-bottom: 2rem;
        }

        .terms-content h3 {
          margin-top: 0;
        }

        .terms-text {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 4px;
          margin-bottom: 1rem;
        }

        .terms-text ol {
          padding-left: 1.5rem;
        }

        .terms-text li {
          margin-bottom: 0.5rem;
        }

        /* Modal */
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          max-width: 500px;
          width: 90%;
          position: relative;
        }

        .modal-content.small {
          max-width: 400px;
        }

        .close-modal {
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6c757d;
        }

        .modal h2 {
          margin-top: 0;
          color: #4a6cf7;
        }

        /* Pagamento */
        .payment-info {
          margin: 1.5rem 0;
        }

        .payment-detail {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .payment-detail.total {
          font-weight: bold;
          border-top: 1px solid #e9ecef;
          padding-top: 0.5rem;
          margin-top: 0.5rem;
        }

        .amount {
          color: #4a6cf7;
        }

        .phone-input {
          display: flex;
          align-items: center;
        }

        .prefix {
          padding: 0.8rem;
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-right: none;
          border-radius: 6px 0 0 6px;
        }

        .phone-input input {
          border-radius: 0 6px 6px 0 !important;
        }

        .payment-methods {
          display: flex;
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .payment-method {
          flex: 1;
        }

        .payment-method input {
          display: none;
        }

        .payment-method label {
          display: block;
          border: 2px solid #e9ecef;
          border-radius: 6px;
          padding: 1rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .payment-method.active label {
          border-color: #4a6cf7;
          background: rgba(74, 108, 247, 0.05);
        }

        .payment-method img {
          max-height: 30px;
          max-width: 100%;
        }

        .btn-payment {
          width: 100%;
          justify-content: center;
          background: #28a745;
          color: white;
        }

        .btn-payment:hover {
          background: #218838;
        }

        /* Confirmação */
        .confirmation-icon {
          font-size: 4rem;
          color: #28a745;
          text-align: center;
          margin-bottom: 1rem;
        }

        .confirmation-details {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 4px;
          margin: 1.5rem 0;
        }

        .confirmation-details p {
          margin: 0.5rem 0;
        }

        /* Responsivo */
        @media (max-width: 768px) {
          .progress-bar {
            margin: 3rem auto 2rem;
          }

          .step-label {
            font-size: 0.8rem;
          }

          .group-form {
            padding: 1rem;
          }

          .form-actions {
            flex-direction: column;
          }

          .btn-prev {
            margin-right: 0;
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CreateGroup;