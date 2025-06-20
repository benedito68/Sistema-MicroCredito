import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import NavBar from './NavBar';
import Footer from './Footer';
import { useUserContext } from '@/context/UserContext';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, loading } = useUserContext();
  const [collapsed, setCollapsed] = useState(false);
  const [dropProfile, setDropProfile] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [imagem, setImagem] = useState("");

  useEffect(() => {
    console.log('Dados do Context:', user);
    
    setNome(`${user?.nome} ${user?.apelido} `);
    setEmail(`${user?.email}`);
    setImagem(user?.urlImage || "/default-profile.png");
  }, [user]);

  return (
    <div className="dashboard-container">
      <SideBar 
        user={nome} 
        tipoUsuario={user?.roles} 
        collapsed={collapsed} 
        setCollapsed={setCollapsed} 
      />
      
      <div className={`main-content ${collapsed ? 'collapsed' : ''}`}>
        <NavBar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          dropProfile={dropProfile}
          setDropProfile={setDropProfile}
          email={email}
          imagem={imagem}
        />
        
        <main className="content">
          {children}
        </main>
        
        <Footer />
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f5f7fa;
        }
      `}</style>

      <style jsx>{`
        .dashboard-container {
          display: flex;
          min-height: 100vh;
        }
        
        .main-content {
          flex-grow: 1;
          margin-left: 250px;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          transition: margin-left 0.3s ease;
        }
        
        .main-content.collapsed {
          margin-left: 80px;
        }
        
        .content {
          flex-grow: 1;
          padding: 20px;
          background-color: #f5f7fa;
        }
        
        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
          }
          
          .main-content.collapsed {
            margin-left: 0;
          }
          
          .sidebar:not(.collapsed) {
            z-index: 1000;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;