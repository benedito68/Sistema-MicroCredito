import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandHoldingUsd,
  faTachometerAlt,
  faFileInvoiceDollar,
  faUsers,
  faUserCog,
  faBriefcase,
  faClipboard,
  faStar,
  faEdit,
  faChartBar,
  faHome,
  faFilePlus,
  faBook,
  faFileAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons';

const sidebarLinks = {
  estagiario: [
    { label: 'Dashboard', href: '/', icon: faHome },
    { label: 'Ver Vagas', href: '/vaga', icon: faBriefcase },
    { label: 'Minhas Candidaturas', href: '/vaga/minhas-candidaturas', icon: faClipboard },
    { label: 'Relatorios de Estagios', href: '/estagiario/relatorios', icon: faClipboard },
    { label: 'Avaliação do Supervisor', href: '/estagiario/avaliacoes', icon: faStar },
  ],
  supervisor: [
    { label: 'Dashboard', href: '/', icon: faHome },
    { label: 'Avaliar Estagiários', href: '/supervisor/avaliacoes', icon: faEdit },
    { label: 'Ver Relatórios', href: '/supervisor/relatorios', icon: faChartBar },
  ],
  admin: [
    { label: 'Dashboard', href: '/', icon: faHome },
    { label: 'Gerir Usuários', href: '/usuarios', icon: faUsers },
    { label: 'Gerir Vagas', href: '/admin/gerenciar-vagas', icon: faFilePlus },
    { label: 'Gerir Supervisores', href: '/admin/gerenciar-supervisores', icon: faBook },
    { label: 'Gerir Estágios', href: '/admin/gerenciar-estagiarios', icon: faFileAlt },
    { label: 'Gerir Candidatos', href: '/admin/gerenciar-candidatos', icon: faUser },
  ],
  cliente: [
    { label: 'Painel Principal', href: '/dashboard', icon: faTachometerAlt },
    { label: 'Meus Empréstimos', href: '/meus-emprestimos', icon: faFileInvoiceDollar },
    { label: 'Grupos de Poupança', href: '/grupos-poupanca', icon: faUsers },
    { label: 'Meu Perfil', href: '/perfil-usuario', icon: faUserCog },
  ]
};

const SideBar = ({ collapsed, user, tipoUsuario = [], setCollapsed }: any) => {
  const tipos = Array.isArray(tipoUsuario) ? tipoUsuario : [tipoUsuario];

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-content">
        <Link href="/" className="sidebar-brand">
          <div className="sidebar-header">
            <FontAwesomeIcon icon={faHandHoldingUsd} className="sidebar-logo" />
            <h2>MicroCred</h2>
          </div>
          {user && (
            <p className="user-name">{user}</p>
          )}
        </Link>

        <nav className="sidebar-nav">
          <ul>
            {tipos.map((tipo, index) => (
              sidebarLinks[tipo] && (
                <div key={index}>
                  <li className="sidebar-section">{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</li>
                  {sidebarLinks[tipo].map((item, itemIndex) => (
                    <li key={itemIndex} className="sidebar-item">
                      <Link
                        href={item.href}
                        className="sidebar-link"
                        onClick={() => setCollapsed(false)}
                      >
                        <FontAwesomeIcon icon={item.icon} className="sidebar-icon" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </div>
              )
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <p>Versão 1.0.0</p>
        </div>
      </div>

      <style jsx>{`
        .sidebar {
          width: 250px;
          min-height: 100vh;
          background:rgb(44, 122, 200);
          color: white;
          transition: all 0.3s;
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
        }
        
        .sidebar.collapsed {
          width: 80px;
          overflow: hidden;
        }
        
        .sidebar-content {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
        
        .sidebar-brand {
          padding: 1.5rem 1rem;
          text-align: center;
          color: white;
          text-decoration: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
        }
        
        .sidebar-logo {
          font-size: 1.8rem;
          margin-right: 10px;
        }
        
        .sidebar-brand h2 {
          margin: 0;
          font-size: 1.2rem;
          display: inline;
        }
        
        .user-name {
          margin: 0.5rem 0 0;
          font-size: 0.9rem;
          color: #ecf0f1;
          text-align: center;
        }
        
        .sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
  scrollbar-width: none; /* Para Firefox */
  -ms-overflow-style: none; /* Para IE e Edge */
}

.sidebar-nav::-webkit-scrollbar {
  display: none; /* Para Chrome, Safari e Opera */
}
        
        .sidebar-nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .sidebar-section {
          padding: 0.75rem 1.5rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          color: #bdc3c7;
          font-weight: bold;
          letter-spacing: 1px;
        }
        
        .sidebar-item {
          margin: 0.25rem 0;
        }
        
        .sidebar-link {
          display: flex;
          align-items: center;
          padding: 0.75rem 1.5rem;
          color: #ecf0f1;
          text-decoration: none;
          transition: all 0.2s;
        }
        
        .sidebar-link:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }
        
        .sidebar-icon {
          width: 20px;
          margin-right: 10px;
          text-align: center;
          font-size: 1.1rem;
        }
        
        .sidebar.collapsed .sidebar-icon {
          margin-right: 0;
          font-size: 1.3rem;
        }
        
        .sidebar.collapsed .sidebar-brand h2,
        .sidebar.collapsed .user-name,
        .sidebar.collapsed .sidebar-section,
        .sidebar.collapsed .sidebar-link span {
          display: none;
        }
        
        .sidebar.collapsed .sidebar-link {
          justify-content: center;
          padding: 1rem 0;
        }
        
        .sidebar-footer {
          padding: 1rem;
          text-align: center;
          font-size: 0.75rem;
          color: #7f8c8d;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .sidebar.collapsed .sidebar-footer {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SideBar;