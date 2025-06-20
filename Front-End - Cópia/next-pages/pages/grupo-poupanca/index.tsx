import { useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/grupos-poupanca.module.css';
import BackButton from '@/components/grupo/BackButton';
import TabNavigation from '@/components/grupo/TabNavigation';
import GroupTable from '@/components/grupo/GroupTable';
import ModalCreateGroup from '@/components/grupo/ModalCreateGroup';
import ModalJoinGroup from '@/components/grupo/ModalJoinGroup';
import { Layout } from '@/layout';
import { usuario_logado } from '@/components/lib/autenticar';

export default function SavingsGroups() {
  const [activeTab, setActiveTab] = useState('my-groups');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  // Dados dos grupos
  const myGroups = [
    {
      id: 1,
      name: "Poupança Comunitária Bairro X",
      photo: "https://via.placeholder.com/80/4a6cf7/FFFFFF?text=G1",
      leader: "João Macuácua",
      members: 12,
      minValue: 1000,
      totalBalance: 125400,
      status: "active",
      joinedDate: "15/03/2023"
    },
    {
      id: 2,
      name: "Poupança dos Amigos",
      photo: "https://via.placeholder.com/80/28a745/FFFFFF?text=G2",
      leader: "Maria Silva",
      members: 8,
      minValue: 500,
      totalBalance: 42000,
      status: "active",
      joinedDate: "10/05/2023"
    }
  ];

  const pendingGroups = [
    {
      id: 3,
      name: "Poupança dos Colegas de Trabalho",
      photo: "https://via.placeholder.com/80/ffc107/FFFFFF?text=G3",
      leader: "Carlos Mendes",
      members: 15,
      minValue: 1500,
      requestDate: "05/06/2023",
      status: "pending"
    }
  ];

  const availableGroups = [
    {
      id: 4,
      name: "Poupança dos Vizinhos",
      photo: "https://via.placeholder.com/80/17a2b8/FFFFFF?text=G4",
      leader: "Ana Pereira",
      members: 10,
      minValue: 800,
      type: "Comunitário",
      location: "Bairro Y, Maputo"
    },
    {
      id: 5,
      name: "Poupança dos Colegas de Escola",
      photo: "https://via.placeholder.com/80/dc3545/FFFFFF?text=G5",
      leader: "Pedro Ndlovu",
      members: 7,
      minValue: 600,
      type: "Educacional",
      location: "Matola"
    }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleCreateGroup = (groupData: any) => {
    console.log('Grupo criado:', groupData);
    setShowCreateModal(false);
    // Aqui você pode adicionar a lógica para atualizar a lista de grupos
  };

  const handleJoinGroup = (groupId: number) => {
    console.log('Solicitação para entrar no grupo:', groupId);
    setShowJoinModal(false);
    // Aqui você pode adicionar a lógica para atualizar a lista de grupos pendentes
  };

  return (
    <>
      <Head>
        <title>MicroCred - Meus Grupos de Poupança</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
      </Head>

      <div className={styles.savingsGroupsContainer}>
        {/* Cabeçalho */}
        <div className={styles.groupsHeader}>
          
          
          <div className={styles.headerLeft}>
            <h1><i className="fas fa-piggy-bank"></i> Meus Grupos de Poupança</h1>
            <p>Gerencie seus grupos de poupança comunitária</p>
          </div>
          
          <div className={styles.headerRight}>
            <button 
              className={`${styles.btn} ${styles.btnPrimary}`} 
              onClick={() => setShowJoinModal(true)}
            >
              <i className="fas fa-sign-in-alt"></i> Aderir a Grupo
            </button>
            
            <button 
              className={`${styles.btn} ${styles.btnSuccess}`} 
              onClick={() => setShowCreateModal(true)}
            >
              <i className="fas fa-plus-circle"></i> Criar Grupo
            </button>
          </div>
        </div>

        {/* Abas de Navegação */}
        <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Conteúdo das Abas */}
        <div className={`${styles.tabContent} ${activeTab === 'my-groups' ? styles.active : ''}`} id="my-groups">
          <div className={styles.sectionHeader}>
            <h2>Grupos que Participo</h2>
            <div className={styles.searchBox}>
              <input type="text" placeholder="Pesquisar grupo..." />
              <i className="fas fa-search"></i>
            </div>
          </div>

          <GroupTable 
            data={myGroups} 
            columns={[
              { key: 'photo', label: 'Foto' },
              { key: 'name', label: 'Nome do Grupo' },
              { key: 'leader', label: 'Líder' },
              { key: 'members', label: 'Membros' },
              { key: 'minValue', label: 'Valor Mínimo' },
              { key: 'totalBalance', label: 'Saldo Total' },
              { key: 'status', label: 'Status' },
              { key: 'actions', label: 'Ações' }
            ]}
          />
        </div>

        <div className={`${styles.tabContent} ${activeTab === 'pending-groups' ? styles.active : ''}`} id="pending-groups">
          <div className={styles.sectionHeader}>
            <h2>Solicitações Pendentes</h2>
            <div className={styles.searchBox}>
              <input type="text" placeholder="Pesquisar grupo..." />
              <i className="fas fa-search"></i>
            </div>
          </div>

          <GroupTable 
            data={pendingGroups} 
            columns={[
              { key: 'photo', label: 'Foto' },
              { key: 'name', label: 'Nome do Grupo' },
              { key: 'leader', label: 'Líder' },
              { key: 'members', label: 'Membros' },
              { key: 'minValue', label: 'Valor Mínimo' },
              { key: 'requestDate', label: 'Data Solicitação' },
              { key: 'status', label: 'Status' },
              { key: 'actions', label: 'Ações' }
            ]}
          />
        </div>

        <div className={`${styles.tabContent} ${activeTab === 'available-groups' ? styles.active : ''}`} id="available-groups">
          <div className={styles.sectionHeader}>
            <h2>Grupos Disponíveis</h2>
            <div className={styles.searchBox}>
              <input type="text" placeholder="Pesquisar grupo..." />
              <i className="fas fa-search"></i>
            </div>
          </div>

          <GroupTable 
            data={availableGroups} 
            columns={[
              { key: 'photo', label: 'Foto' },
              { key: 'name', label: 'Nome do Grupo' },
              { key: 'leader', label: 'Líder' },
              { key: 'members', label: 'Membros' },
              { key: 'minValue', label: 'Valor Mínimo' },
              { key: 'type', label: 'Tipo' },
              { key: 'location', label: 'Localização' },
              { key: 'actions', label: 'Ações' }
            ]}
          />
        </div>
      </div>

      {/* Modais */}
      <ModalCreateGroup 
        show={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
        onSubmit={handleCreateGroup} 
      />
      
      <ModalJoinGroup 
        show={showJoinModal} 
        onClose={() => setShowJoinModal(false)} 
        onJoin={handleJoinGroup}
        availableGroups={availableGroups}
      />
    </>
  );
}



// Define o layout para esta página
SavingsGroups.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

// Obtém os dados do usuário no lado do servidor
export const getServerSideProps = async (context: any) => {
  const result = await usuario_logado(context);

  if (result.redirect) {
    return result; // Redireciona se necessário
  }

  //console.log('Dados obtidos do usuário visto na Props:', result.props?.user); // Para debug

  return {
    props: {
      user: result.props?.user || null, // Garante que user seja definido
    },
  };
};
