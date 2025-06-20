import { useState } from 'react';
import { FaArrowLeft, FaUsers, FaSearch, FaHandHoldingUsd, FaCalendarAlt, FaEye, FaUserPlus, FaTimes, FaKey, FaInfoCircle, FaCheckCircle, FaClock, FaUserTie, FaFileAlt, FaCalendarCheck } from 'react-icons/fa';
import Head from 'next/head';

interface Group {
  id: number;
  name: string;
  category: 'agriculture' | 'fishing' | 'artists' | 'commerce';
  description: string;
  members: string;
  amount: string;
  duration: string;
  nextMeeting: string;
  leader: {
    name: string;
    email: string;
    phone: string;
    photo: string;
  };
  rules: string[];
  pending?: boolean;
}

export default function AdesaoGrupos() {
  const [activeTab, setActiveTab] = useState<'available-groups' | 'join-by-code'>('available-groups');
  const [searchTerm, setSearchTerm] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showValidCodeModal, setShowValidCodeModal] = useState(false);
  const [groups, setGroups] = useState<Group[]>([
    {
      id: 1,
      name: 'Agricultores Unidos',
      category: 'agriculture',
      description: 'Grupo formado por pequenos agricultores da região norte, com o objetivo de poupar para a compra de equipamentos agrícolas e insumos. Juntos, conseguimos melhores preços e condições de pagamento.',
      members: '12/20',
      amount: '500 MT',
      duration: '12',
      nextMeeting: '15/06/2023 - 14:00 (Escola Primária de Nampula)',
      leader: {
        name: 'João Macuácua',
        email: 'joao.macuacua@exemplo.com',
        phone: '+258 84 123 4567',
        photo: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      rules: [
        'Contribuição mensal obrigatória até o dia 5 de cada mês',
        'Presença mínima de 75% nas reuniões',
        'Multa de 100 MT por atraso no pagamento',
        'Decisões tomadas por maioria simples',
        'O líder tem voto de qualidade em caso de empate'
      ]
    },
    {
      id: 2,
      name: 'Pescadores da Baía',
      category: 'fishing',
      description: 'Grupo de pescadores artesanais que se uniram para poupar e adquirir equipamentos de pesca mais eficientes e barco motorizado. Nosso objetivo é aumentar a produtividade e melhorar a qualidade de vida das famílias.',
      members: '8/15',
      amount: '300 MT',
      duration: '18',
      nextMeeting: '20/06/2023 - 10:00 (Associação dos Pescadores)',
      leader: {
        name: 'Carlos Matsinhe',
        email: 'carlos.matsinhe@exemplo.com',
        phone: '+258 82 987 6543',
        photo: 'https://randomuser.me/api/portraits/men/75.jpg'
      },
      rules: [
        'Contribuição mensal até o dia 10',
        'Reuniões mensais obrigatórias',
        'Multa de 50 MT por atraso',
        'Sistema de rodízio para uso dos equipamentos',
        'Proibido faltar mais de 3 reuniões consecutivas'
      ]
    },
    {
      id: 3,
      name: 'Artesãos Moçambicanos',
      category: 'artists',
      description: 'Coletivo de artesãos que trabalham com materiais tradicionais. Nosso objetivo é criar um fundo comum para compra de matérias-primas em grande quantidade e organizar exposições conjuntas.',
      members: '18/25',
      amount: '200 MT',
      duration: '24',
      nextMeeting: '10/06/2023 - 15:00 (Centro Cultural)',
      leader: {
        name: 'Ana Mondlane',
        email: 'ana.mondlane@exemplo.com',
        phone: '+258 86 555 1234',
        photo: 'https://randomuser.me/api/portraits/women/65.jpg'
      },
      rules: [
        'Contribuição mensal flexível (mínimo 200 MT)',
        'Reuniões quinzenais',
        'Cada membro deve contribuir com pelo menos 3 peças por ano para exposições',
        'Lucros das vendas coletivas divididos proporcionalmente',
        'Votação anual para escolha do líder'
      ]
    },
    {
      id: 4,
      name: 'Comércio Local',
      category: 'commerce',
      description: 'Grupo de pequenos comerciantes do mercado central que se uniram para obter melhores condições de compra de mercadorias e criar um fundo de emergência para situações difíceis.',
      members: '10/15',
      amount: '400 MT',
      duration: '12',
      nextMeeting: '12/06/2023 - 16:00 (Mercado Central, Box 24)',
      leader: {
        name: 'Maria Chissano',
        email: 'maria.chissano@exemplo.com',
        phone: '+258 84 777 8888',
        photo: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      rules: [
        'Contribuição fixa de 400 MT/mês',
        'Reuniões mensais no primeiro sábado',
        'Multa de 100 MT por atraso',
        'Empréstimos internos com juros de 5% ao mês',
        'Necessário aviso prévio de 1 mês para saída do grupo'
      ],
      pending: true
    }
  ]);

  const validInviteCodes: Record<string, number> = {
    'GRP-AGRI1': 1,
    'GRP-PESC1': 2,
    'GRP-ART1': 3,
    'GRP-COM1': 4
  };

  const filteredGroups = groups.filter(group => {
    // Filter by search term
    if (searchTerm && !group.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by area
    if (areaFilter && group.category !== areaFilter) {
      return false;
    }
    
    // Filter by size
    if (sizeFilter) {
      const [current, max] = group.members.split('/').map(Number);
      const ratio = current / max;
      
      if (sizeFilter === 'small' && (max < 5 || max > 10)) return false;
      if (sizeFilter === 'medium' && (max < 11 || max > 20)) return false;
      if (sizeFilter === 'large' && (max < 21 || max > 30)) return false;
    }
    
    return true;
  });

  const handleViewDetails = (group: Group) => {
    setSelectedGroup(group);
    setShowDetailsModal(true);
  };

  const handleJoinRequest = (groupId: number) => {
    setGroups(groups.map(group => 
      group.id === groupId ? { ...group, pending: true } : group
    ));
    setShowDetailsModal(false);
    setShowConfirmationModal(true);
  };

  const handleCancelRequest = (groupId: number) => {
    setGroups(groups.map(group => 
      group.id === groupId ? { ...group, pending: false } : group
    ));
    setShowDetailsModal(false);
  };

  const verifyInviteCode = () => {
    const code = inviteCode.trim().toUpperCase();
    
    if (!code) {
      alert('Por favor, insira um código de convite');
      return;
    }
    
    if (validInviteCodes[code]) {
      const groupId = validInviteCodes[code];
      const group = groups.find(g => g.id === groupId);
      if (group) {
        setSelectedGroup(group);
        setShowValidCodeModal(true);
      }
    } else {
      alert('Código inválido. Por favor, verifique o código e tente novamente.');
    }
  };

  const confirmJoinByCode = () => {
    if (selectedGroup) {
      setShowValidCodeModal(false);
      setShowConfirmationModal(true);
      setInviteCode('');
    }
  };

  const closeModal = () => {
    setShowDetailsModal(false);
    setShowConfirmationModal(false);
    setShowValidCodeModal(false);
  };

  return (
    <>
      <Head>
        <title>MicroCred - Adesão a Grupos</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>

      <div className="groups-container">
        <a href="/grupo-poupanca" className="btn-voltar-link">
          <button className="btn-voltar" title="Voltar">
            <FaArrowLeft />
            <span className="tooltip">Voltar</span>
          </button>
        </a>
        
        <div className="groups-header">
          <h1><FaUsers /> Adesão a Grupos de Poupança</h1>
          <p>Junte-se a um grupo existente ou entre com um código de convite</p>
        </div>
        
        {/* Aba de Navegação */}
        <div className="groups-tabs">
          <button 
            className={`tab-btn ${activeTab === 'available-groups' ? 'active' : ''}`}
            onClick={() => setActiveTab('available-groups')}
          >
            Grupos Disponíveis
          </button>
          <button 
            className={`tab-btn ${activeTab === 'join-by-code' ? 'active' : ''}`}
            onClick={() => setActiveTab('join-by-code')}
          >
            Entrar com Código
          </button>
        </div>
        
        {/* Conteúdo das Abas */}
        <div className={`tab-content ${activeTab === 'available-groups' ? 'active' : ''}`} id="available-groups">
          {/* Filtros */}
          <div className="filters">
            <div className="search-box">
              <FaSearch />
              <input 
                type="text" 
                placeholder="Pesquisar grupos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label htmlFor="area-filter">Área:</label>
              <select 
                id="area-filter"
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
              >
                <option value="">Todas</option>
                <option value="agriculture">Agricultura</option>
                <option value="fishing">Pesca</option>
                <option value="artists">Artistas</option>
                <option value="commerce">Comércio</option>
              </select>
            </div>
            <div className="filter-group">
              <label htmlFor="size-filter">Tamanho:</label>
              <select 
                id="size-filter"
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="small">Pequeno (5-10)</option>
                <option value="medium">Médio (11-20)</option>
                <option value="large">Grande (21-30)</option>
              </select>
            </div>
          </div>
          
          {/* Lista de Grupos */}
          <div className="groups-list">
            {filteredGroups.map(group => (
              <div key={group.id} className="group-card">
                <div className="group-header">
                  <h3>{group.name}</h3>
                  <span className={`group-badge ${group.category}`}>
                    {group.category === 'agriculture' ? 'Agricultura' :
                     group.category === 'fishing' ? 'Pesca' :
                     group.category === 'artists' ? 'Artistas' : 'Comércio'}
                  </span>
                  {group.pending && <span className="pending-badge">Pedido Pendente</span>}
                </div>
                <div className="group-details">
                  <div className="detail-item">
                    <FaUsers />
                    <span>{group.members} membros</span>
                  </div>
                  <div className="detail-item">
                    <FaHandHoldingUsd />
                    <span>{group.amount}/mês</span>
                  </div>
                  <div className="detail-item">
                    <FaCalendarAlt />
                    <span>{group.duration} meses</span>
                  </div>
                </div>
                <div className="group-actions">
                  <button 
                    className="btn btn-outline btn-view-details"
                    onClick={() => handleViewDetails(group)}
                  >
                    <FaEye /> Ver Detalhes
                  </button>
                  {group.pending ? (
                    <button 
                      className="btn btn-danger btn-cancel"
                      onClick={() => handleCancelRequest(group.id)}
                    >
                      <FaTimes /> Cancelar Pedido
                    </button>
                  ) : (
                    <button 
                      className="btn btn-primary btn-join"
                      onClick={() => handleJoinRequest(group.id)}
                    >
                      <FaUserPlus /> Solicitar Adesão
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Tab Entrar com Código */}
        <div className={`tab-content ${activeTab === 'join-by-code' ? 'active' : ''}`} id="join-by-code">
          <div className="join-by-code-container">
            <div className="code-instructions">
              <h3><FaKey /> Entrar com Código de Convite</h3>
              <p>Se você recebeu um código de convite para um grupo privado, insira-o abaixo para solicitar sua adesão.</p>
            </div>
            
            <div className="code-form">
              <div className="form-group">
                <label htmlFor="invite-code">Código de Convite</label>
                <input 
                  type="text" 
                  id="invite-code" 
                  placeholder="Ex: GRP-XY7Z9P"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" onClick={verifyInviteCode}>
                <FaCheckCircle /> Verificar Código
              </button>
            </div>
            
            <div className="code-help">
              <p><FaInfoCircle /> O código deve ter sido fornecido pelo líder do grupo. Caso não tenha, entre em contato com o líder.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de Detalhes do Grupo */}
      {showDetailsModal && selectedGroup && (
        <div className="modal" style={{ display: 'flex' }} onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close-modal" onClick={closeModal}>&times;</span>
            <div className="modal-header">
              <h2 id="modal-group-name">{selectedGroup.name}</h2>
              <span className={`group-badge ${selectedGroup.category}`}>
                {selectedGroup.category === 'agriculture' ? 'Agricultura' :
                 selectedGroup.category === 'fishing' ? 'Pesca' :
                 selectedGroup.category === 'artists' ? 'Artistas' : 'Comércio'}
              </span>
            </div>
            
            <div className="modal-body">
              <div className="group-description">
                <h3><FaInfoCircle /> Descrição</h3>
                <p id="modal-group-description">{selectedGroup.description}</p>
              </div>
              
              <div className="group-stats">
                <div className="stat-item">
                  <div className="stat-value" id="modal-group-members">{selectedGroup.members}</div>
                  <div className="stat-label">Membros</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value" id="modal-group-amount">{selectedGroup.amount}</div>
                  <div className="stat-label">Mensal</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value" id="modal-group-duration">{selectedGroup.duration}</div>
                  <div className="stat-label">Meses</div>
                </div>
              </div>
              
              <div className="group-additional-info">
                <h3><FaCalendarCheck /> Próxima Reunião</h3>
                <p id="modal-next-meeting">{selectedGroup.nextMeeting}</p>
                
                <h3><FaUserTie /> Líder do Grupo</h3>
                <div className="leader-info" id="modal-group-leader">
                  <img src={selectedGroup.leader.photo} alt="Líder" />
                  <div>
                    <p className="leader-name">{selectedGroup.leader.name}</p>
                    <p className="leader-contact">{selectedGroup.leader.email}</p>
                    <p className="leader-phone">{selectedGroup.leader.phone}</p>
                  </div>
                </div>
                
                <h3><FaFileAlt /> Regras do Grupo</h3>
                <ul className="group-rules" id="modal-group-rules">
                  {selectedGroup.rules.map((rule, index) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={closeModal}>
                Fechar
              </button>
              {selectedGroup.pending ? (
                <button className="btn btn-outline" disabled>
                  <FaClock /> Pedido Pendente
                </button>
              ) : (
                <button 
                  className="btn btn-primary"
                  onClick={() => handleJoinRequest(selectedGroup.id)}
                >
                  <FaUserPlus /> Solicitar Adesão
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de Confirmação de Adesão */}
      {showConfirmationModal && selectedGroup && (
        <div className="modal" style={{ display: 'flex' }} onClick={closeModal}>
          <div className="modal-content small" onClick={e => e.stopPropagation()}>
            <div className="confirmation-icon success">
              <FaCheckCircle />
            </div>
            <h2>Pedido de Adesão Enviado!</h2>
            <p>Seu pedido para ingressar no grupo <strong id="joined-group-name">{selectedGroup.name}</strong> foi enviado com sucesso.</p>
            <p>O líder do grupo será notificado e você receberá uma resposta em breve.</p>
            <button className="btn btn-primary" onClick={closeModal}>
              OK
            </button>
          </div>
        </div>
      )}
      
      {/* Modal de Código Válido */}
      {showValidCodeModal && selectedGroup && (
        <div className="modal" style={{ display: 'flex' }} onClick={closeModal}>
          <div className="modal-content small" onClick={e => e.stopPropagation()}>
            <div className="confirmation-icon success">
              <FaCheckCircle />
            </div>
            <h2>Código Válido!</h2>
            <p>Você está sendo adicionado ao grupo <strong id="invited-group-name">{selectedGroup.name}</strong>.</p>
            <div className="group-info">
              <p><strong>Contribuição:</strong> <span id="invited-group-amount">{selectedGroup.amount}/mês</span></p>
              <p><strong>Duração:</strong> <span id="invited-group-duration">{selectedGroup.duration} meses</span></p>
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={closeModal}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={confirmJoinByCode}>
                Confirmar Adesão
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Container Principal */
        .groups-container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
          position: relative;
        }

        /* Botão Voltar */
        .btn-voltar {
          position: absolute;
          top: 1rem;
          left: 1rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #dc3545;
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .btn-voltar-link {
          display: inline-block;
          text-decoration: none;
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 10;
        }

        .btn-voltar:hover {
          background-color: #c82333;
          transform: scale(1.1);
        }

        .btn-voltar:hover .tooltip {
          visibility: visible;
          opacity: 1;
          transform: translateX(0);
        }

        .btn-voltar .tooltip {
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translateY(-50%) translateX(-10px);
          background-color: #343a40;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 0.9rem;
          white-space: nowrap;
          visibility: hidden;
          opacity: 0;
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .btn-voltar .tooltip::before {
          content: '';
          position: absolute;
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          border-width: 5px;
          border-style: solid;
          border-color: transparent #343a40 transparent transparent;
        }

        /* Cabeçalho */
        .groups-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .groups-header h1 {
          color: #343a40;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
        }

        .groups-header h1 svg {
          color: #4a6cf7;
        }

        .groups-header p {
          color: #6c757d;
          font-size: 1.1rem;
        }

        /* Abas de Navegação */
        .groups-tabs {
          display: flex;
          border-bottom: 1px solid #e9ecef;
          margin-bottom: 1.5rem;
        }

        .tab-btn {
          padding: 0.8rem 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          color: #6c757d;
          position: relative;
          transition: all 0.3s ease;
        }

        .tab-btn.active {
          color: #4a6cf7;
          font-weight: 600;
        }

        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #4a6cf7;
        }

        .tab-content {
          display: none;
        }

        .tab-content.active {
          display: block;
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Filtros */
        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
          align-items: center;
        }

        .search-box {
          flex: 1;
          min-width: 250px;
          position: relative;
        }

        .search-box svg {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #6c757d;
        }

        .search-box input {
          width: 100%;
          padding: 0.8rem 1rem 0.8rem 2.5rem;
          border: 1px solid #e9ecef;
          border-radius: 6px;
          font-size: 1rem;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filter-group label {
          font-size: 0.9rem;
          color: #6c757d;
        }

        .filter-group select {
          padding: 0.7rem;
          border: 1px solid #e9ecef;
          border-radius: 6px;
          font-size: 0.9rem;
        }

        /* Lista de Grupos */
        .groups-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .group-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          border: 1px solid #e9ecef;
        }

        .group-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .group-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
          position: relative;
        }

        .group-header h3 {
          font-size: 1.2rem;
          color: #343a40;
          margin-right: 1rem;
        }

        .group-badge {
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
          white-space: nowrap;
        }

        .group-badge.agriculture {
          background-color: rgba(40, 167, 69, 0.1);
          color: #28a745;
        }

        .group-badge.fishing {
          background-color: rgba(23, 162, 184, 0.1);
          color: #17a2b8;
        }

        .group-badge.artists {
          background-color: rgba(111, 66, 193, 0.1);
          color: #6f42c1;
        }

        .group-badge.commerce {
          background-color: rgba(253, 126, 20, 0.1);
          color: #fd7e14;
        }

        .pending-badge {
          position: absolute;
          top: -10px;
          right: -10px;
          background-color: #ffc107;
          color: white;
          font-size: 0.7rem;
          padding: 0.3rem 0.6rem;
          border-radius: 20px;
          font-weight: 500;
        }

        .group-details {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .detail-item svg {
          font-size: 1.2rem;
          color: #4a6cf7;
          margin-bottom: 0.3rem;
        }

        .detail-item span {
          font-size: 0.9rem;
          color: #343a40;
        }

        .group-actions {
          display: flex;
          gap: 0.8rem;
        }

        .btn {
          padding: 0.7rem 1rem;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: none;
        }

        .btn svg {
          font-size: 0.9rem;
        }

        .btn-primary {
          background-color: #4a6cf7;
          color: white;
          flex: 1;
          justify-content: center;
        }

        .btn-primary:hover {
          background-color: #3a5bd9;
        }

        .btn-outline {
          background: none;
          border: 1px solid #e9ecef;
          color: #343a40;
          flex: 1;
          justify-content: center;
        }

        .btn-outline:hover {
          background-color: #e9ecef;
        }

        .btn-danger {
          background-color: #dc3545;
          color: white;
          flex: 1;
          justify-content: center;
        }

        .btn-danger:hover {
          background-color: #c82333;
        }

        /* Tab Entrar com Código */
        .join-by-code-container {
          max-width: 500px;
          margin: 0 auto;
          background: white;
          border-radius: 8px;
          padding: 2rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .code-instructions {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .code-instructions h3 {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          color: #343a40;
          margin-bottom: 0.5rem;
        }

        .code-instructions h3 svg {
          color: #4a6cf7;
        }

        .code-instructions p {
          color: #6c757d;
          font-size: 0.95rem;
        }

        .code-form {
          margin-bottom: 1.5rem;
        }

        .code-form .form-group {
          margin-bottom: 1rem;
        }

        .code-form label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #343a40;
        }

        .code-form input {
          width: 100%;
          padding: 0.8rem 1rem;
          border: 1px solid #e9ecef;
          border-radius: 6px;
          font-size: 1rem;
        }

        .code-form button {
          width: 100%;
          padding: 0.8rem;
        }

        .code-help {
          background-color: #f8f9fa;
          border-radius: 6px;
          padding: 1rem;
          font-size: 0.9rem;
          color: #6c757d;
          display: flex;
          gap: 0.8rem;
        }

        .code-help svg {
          color: #4a6cf7;
          font-size: 1.1rem;
          margin-top: 0.2rem;
        }

        /* Modal de Detalhes do Grupo */
        .modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 100;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background: white;
          border-radius: 10px;
          padding: 2rem;
          width: 90%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: modalFadeIn 0.3s ease;
        }

        .modal-content.small {
          max-width: 500px;
          text-align: center;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .close-modal {
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6c757d;
          background: none;
          border: none;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .modal-header h2 {
          color: #343a40;
        }

        .modal-body {
          margin-bottom: 1.5rem;
        }

        .group-description {
          margin-bottom: 2rem;
        }

        .group-description h3 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #343a40;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }

        .group-description h3 svg {
          color: #4a6cf7;
        }

        .group-description p {
          color: #6c757d;
          line-height: 1.6;
        }

        .group-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin: 2rem 0;
          padding: 1.5rem 0;
          border-top: 1px solid #e9ecef;
          border-bottom: 1px solid #e9ecef;
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 600;
          color: #4a6cf7;
          margin-bottom: 0.3rem;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #6c757d;
        }

        .group-additional-info h3 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #343a40;
          margin: 1.5rem 0 0.5rem;
          font-size: 1.1rem;
        }

        .group-additional-info h3 svg {
          color: #4a6cf7;
        }

        .group-additional-info p {
          color: #6c757d;
          margin-bottom: 1rem;
        }

        .leader-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .leader-info img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }

        .leader-name {
          font-weight: 500;
          color: #343a40;
          margin-bottom: 0.2rem;
        }

        .leader-contact, .leader-phone {
          font-size: 0.9rem;
          color: #6c757d;
        }

        .group-rules {
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .group-rules li {
          margin-bottom: 0.5rem;
          color: #6c757d;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 0.8rem;
        }

        /* Modal de Confirmação */
        .confirmation-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .confirmation-icon.success {
          color: #28a745;
        }

        .group-info {
          text-align: left;
          background-color: #f8f9fa;
          border-radius: 6px;
          padding: 1rem;
          margin: 1.5rem 0;
          font-size: 0.9rem;
        }

        .group-info p {
          margin-bottom: 0.5rem;
        }

        .group-info p:last-child {
          margin-bottom: 0;
        }

        .modal-actions {
          display: flex;
          justify-content: center;
          gap: 0.8rem;
          margin-top: 1.5rem;
        }

        /* Responsividade */
        @media (max-width: 768px) {
          .groups-list {
            grid-template-columns: 1fr;
          }
          
          .modal-content {
            padding: 1.5rem;
          }
          
          .group-stats {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .modal-footer {
            flex-direction: column;
          }
          
          .modal-footer .btn {
            width: 100%;
          }
        }

        @media (max-width: 576px) {
          .groups-tabs {
            flex-direction: column;
          }
          
          .tab-btn {
            width: 100%;
            text-align: center;
            padding: 0.8rem;
          }
          
          .filters {
            flex-direction: column;
            align-items: stretch;
          }
          
          .search-box {
            min-width: auto;
          }
          
          .filter-group {
            flex-direction: column;
            align-items: stretch;
          }
          
          .group-actions {
            flex-direction: column;
          }
          
          .modal-actions {
            flex-direction: column;
          }
          
          .modal-actions .btn {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}