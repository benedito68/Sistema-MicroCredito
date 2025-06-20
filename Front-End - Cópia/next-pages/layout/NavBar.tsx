import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars,
  faUserCircle,
  faChevronDown,
  faUser,
  faCog,
  faQuestionCircle,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

const NavBar = ({ collapsed, setCollapsed, dropProfile, setDropProfile, email, imagem }: any) => {
  const router = useRouter();
  const { logout } = useUserContext();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const dropdownRouter = () => {
    router.push('/usuarios/perfil');
    setDropProfile(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        router.push('/auth');
        log();
      } else {
        console.error('Erro ao fazer logout');
      }
    } catch (error) {
      console.error('Erro inesperado no logout:', error);
    }
  };

  const log = () => {
    document.cookie = `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="sidebar-toggle"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <h3>Painel Principal</h3>
      </div>
      
      <div className="navbar-right">
        <div className="user-dropdown">
          <button 
            onClick={() => setDropProfile(!dropProfile)}
            className="user-button"
          >
            <img
              src={imagem}
              className="avatar"
              alt="Perfil"
            />
            {!isSmallScreen && (
              <span>{email}</span>
            )}
            <FontAwesomeIcon icon={faChevronDown} className="dropdown-chevron" />
          </button>
          
          <div className={`dropdown-menu ${dropProfile ? 'show' : ''}`}>
            <button className="dropdown-item" onClick={dropdownRouter}>
              <FontAwesomeIcon icon={faUser} className="me-1" /> Meu Perfil
            </button>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item">
              <FontAwesomeIcon icon={faQuestionCircle} className="me-1" /> Central de Apoio
            </button>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} className="me-1" /> Sair
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1.5rem;
          background-color: #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .navbar-left {
          display: flex;
          align-items: center;
        }
        
        .sidebar-toggle {
          background: none;
          border: none;
          font-size: 1.25rem;
          margin-right: 1rem;
          cursor: pointer;
          color: #5a5c69;
        }
        
        .navbar h3 {
          margin: 0;
          color: #2e3a59;
          font-size: 1.1rem;
        }
        
        .navbar-right {
          display: flex;
          align-items: center;
        }
        
        .user-dropdown {
          position: relative;
        }
        
        .user-button {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          transition: background-color 0.2s;
        }
        
        .user-button:hover {
          background-color: #f8f9fa;
        }
        
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          margin-right: 0.5rem;
          object-fit: cover;
        }
        
        .dropdown-chevron {
          margin-left: 0.5rem;
          font-size: 0.75rem;
          transition: transform 0.2s;
        }
        
        .dropdown-menu {
          position: absolute;
          right: 0;
          top: 100%;
          background-color: white;
          border-radius: 4px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          min-width: 200px;
          padding: 0.5rem 0;
          display: none;
          z-index: 1000;
        }
        
        .dropdown-menu.show {
          display: block;
        }
        
        .dropdown-item {
          width: 100%;
          text-align: left;
          padding: 0.5rem 1rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #5a5c69;
          transition: background-color 0.2s;
        }
        
        .dropdown-item:hover {
          background-color: #f8f9fa;
          color: #2e3a59;
        }
        
        .dropdown-divider {
          height: 1px;
          background-color: #eee;
          margin: 0.5rem 0;
        }
      `}</style>
    </header>
  );
};

export default NavBar;