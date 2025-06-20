import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/UserContext';
import Chart from 'chart.js/auto';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faWallet, 
  faPiggyBank, 
  faHandHoldingUsd, 
  faUsers, 
  faFileInvoiceDollar, 
  faUserPlus, 
  faUsersCog,
  faUserCircle,
  faChevronDown,
  faUser,
  faCog,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

// Configuração do Font Awesome para evitar estilos duplicados
config.autoAddCss = false;

// Adiciona os ícones à biblioteca
library.add(
  faWallet, 
  faPiggyBank, 
  faHandHoldingUsd, 
  faUsers, 
  faFileInvoiceDollar, 
  faUserPlus, 
  faUsersCog,
  faUserCircle,
  faChevronDown,
  faUser,
  faCog,
  faSignOutAlt
);

const Dashboard = () => {
  const router = useRouter();
  const { user, loading, logout } = useUserContext();
  const savingsChartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Dados para os cards de resumo
  const summaryCards = [
    {
      title: 'Saldo Disponível',
      value: '5.280,00 MT',
      icon: faWallet,
      bg: 'bg-primary'
    },
    {
      title: 'Poupança Total',
      value: '3.150,00 MT',
      icon: faPiggyBank,
      bg: 'bg-success'
    },
    {
      title: 'Empréstimos Ativos',
      value: '2',
      icon: faHandHoldingUsd,
      bg: 'bg-warning'
    },
    {
      title: 'Grupos Ativos',
      value: '3',
      icon: faUsers,
      bg: 'bg-danger'
    }
  ];

  // Dados para ações rápidas
  const quickActions = [
    {
      title: 'Solicitar Empréstimo',
      description: 'Peça um novo empréstimo para suas necessidades financeiras',
      icon: faFileInvoiceDollar,
      bg: 'bg-primary',
      link: '/solicitar-emprestimo'
    },
    {
      title: 'Adesão a Grupo',
      description: 'Junte-se a um grupo de poupança existente',
      icon: faUserPlus,
      bg: 'bg-success',
      link: '/adesao-grupos'
    },
    {
      title: 'Criar Grupo',
      description: 'Forme seu próprio grupo de poupança',
      icon: faUsersCog,
      bg: 'bg-info',
      link: '/grupo-poupanca/criar-novo'
    }
  ];

  // Dados para atividades recentes
  const recentActivities = [
    {
      type: 'loan',
      icon: faFileInvoiceDollar,
      description: 'Pagamento de empréstimo realizado',
      details: 'Hoje, 10:45 AM - 500 MT'
    },
    {
      type: 'savings',
      icon: faPiggyBank,
      description: 'Depósito no grupo "Comércio Local"',
      details: 'Ontem, 2:30 PM - 300 MT'
    },
    {
      type: 'group',
      icon: faUsers,
      description: 'Você foi aceito no grupo "Agricultores Unidos"',
      details: '2 dias atrás'
    },
    {
      type: 'loan',
      icon: faHandHoldingUsd,
      description: 'Solicitação de empréstimo aprovada',
      details: '3 dias atrás - 2.500 MT'
    }
  ];

  // Dados para o gráfico de poupança
  const savingsData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Poupança (MT)',
        data: [500, 800, 600, 900, 1200, 1500],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.1
      }
    ]
  };

  useEffect(() => {
    // Inicializar gráfico quando o componente montar
    if (savingsChartRef.current) {
      // Destruir gráfico anterior se existir
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      const ctx = savingsChartRef.current.getContext('2d');
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: savingsData,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }

    // Limpar gráfico quando o componente desmontar
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <main className="content">
      {/* Cards de Resumo */}
      <div className="summary-cards">
        {summaryCards.map((card, index) => (
          <div key={index} className="card">
            <div className={`card-icon ${card.bg}`}>
              <FontAwesomeIcon icon={card.icon} />
            </div>
            <div className="card-info">
              <h4>{card.title}</h4>
              <p>{card.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Ações Rápidas */}
      <div className="quick-actions">
        <h3>Ações Rápidas</h3>
        <div className="actions-grid">
          {quickActions.map((action, index) => (
            <div key={index} className="action-card">
              <div className={`action-icon ${action.bg}`}>
                <FontAwesomeIcon icon={action.icon} />
              </div>
              <h4>{action.title}</h4>
              <p>{action.description}</p>
              <button className="btn-action">
                <Link href={action.link} className="text-white no-underline">
                  {action.title.includes('Solicitar') ? 'Solicitar' : 
                   action.title.includes('Adesão') ? 'Procurar Grupos' : 'Criar Grupo'}
                </Link>
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Gráficos e Atividades Recentes */}
      <div className="dashboard-row">
        <div className="chart-container">
          <h3>Minha Poupança (últimos 6 meses)</h3>
          <canvas id="savings-chart" ref={savingsChartRef}></canvas>
        </div>
        
        <div className="recent-activity">
          <h3>Atividades Recentes</h3>
          <ul className="activity-list">
            {recentActivities.map((activity, index) => (
              <li key={index}>
                <div className={`activity-icon ${activity.type}`}>
                  <FontAwesomeIcon icon={activity.icon} />
                </div>
                <div className="activity-info">
                  <p>{activity.description}</p>
                  <small>{activity.details}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        .content {
          padding: 20px;
          background-color: #f5f7fa;
        }
        
        .summary-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        
        .card {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 10px;
          padding: 15px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .card-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          color: white;
          font-size: 20px;
        }
        
        .bg-primary { background-color: #4e73df; }
        .bg-success { background-color: #1cc88a; }
        .bg-warning { background-color: #f6c23e; }
        .bg-danger { background-color: #e74a3b; }
        .bg-info { background-color: #36b9cc; }
        
        .card-info h4 {
          margin: 0;
          font-size: 14px;
          color: #5a5c69;
        }
        
        .card-info p {
          margin: 5px 0 0;
          font-size: 20px;
          font-weight: bold;
          color: #2e3a59;
        }
        
        .quick-actions {
          margin-bottom: 30px;
        }
        
        .quick-actions h3 {
          color: #2e3a59;
          margin-bottom: 20px;
        }
        
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        
        .action-card {
          background: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        
        .action-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          color: white;
          font-size: 24px;
        }
        
        .action-card h4 {
          margin: 0 0 10px;
          color: #2e3a59;
        }
        
        .action-card p {
          margin: 0 0 15px;
          color: #5a5c69;
          font-size: 14px;
        }
        
        .btn-action {
          background-color: #4e73df;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 8px 15px;
          cursor: pointer;
          width: 100%;
          transition: background-color 0.3s;
        }
        
        .btn-action:hover {
          background-color: #3a5bc7;
        }
        
        .dashboard-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        @media (max-width: 768px) {
          .dashboard-row {
            grid-template-columns: 1fr;
          }
        }
        
        .chart-container {
          background: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .chart-container h3 {
          margin-top: 0;
          color: #2e3a59;
        }
        
        .recent-activity {
          background: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .recent-activity h3 {
          margin-top: 0;
          color: #2e3a59;
        }
        
        .activity-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .activity-list li {
          display: flex;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }
        
        .activity-list li:last-child {
          border-bottom: none;
        }
        
        .activity-icon {
          font-size: 18px;
          margin-right: 15px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .loan { background-color: #4e73df; }
        .savings { background-color: #1cc88a; }
        .group { background-color: #f6c23e; }
        
        .activity-info p {
          margin: 0;
          color: #2e3a59;
          font-size: 14px;
        }
        
        .activity-info small {
          color: #858796;
          font-size: 12px;
        }
        
        .no-underline {
          text-decoration: none;
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </main>
  );
};

export default Dashboard;