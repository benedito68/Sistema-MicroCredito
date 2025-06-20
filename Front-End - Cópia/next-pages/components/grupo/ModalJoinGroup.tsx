import { useState } from 'react';
import styles from '../../styles/grupos-poupanca.module.css';

interface ModalJoinGroupProps {
  show: boolean;
  onClose: () => void;
  onJoin: (groupId: number) => void;
  availableGroups: any[];
}

export default function ModalJoinGroup({ show, onClose, onJoin, availableGroups }: ModalJoinGroupProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<any>(null);

  const filteredGroups = availableGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleGroupSelect = (group: any) => {
    setSelectedGroup(group);
  };

  const handleJoin = () => {
    if (selectedGroup) {
      onJoin(selectedGroup.id);
    }
  };

  if (!show) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.closeModal} onClick={onClose}>&times;</span>
        <h2><i className="fas fa-sign-in-alt"></i> Aderir a Grupo</h2>

        <div className={styles.searchBoxModal}>
          <input 
            type="text" 
            placeholder="Pesquisar grupo..." 
            value={searchTerm}
            onChange={handleSearch}
          />
          <i className="fas fa-search"></i>
        </div>

        <div className={styles.groupsToJoinList}>
          {searchTerm.length < 3 ? (
            <div className={styles.noResults}>
              <i className="fas fa-search"></i>
              <p>Digite pelo menos 3 caracteres para pesquisar</p>
            </div>
          ) : filteredGroups.length === 0 ? (
            <div className={styles.noResults}>
              <i className="fas fa-exclamation-circle"></i>
              <p>Nenhum grupo encontrado com o termo "{searchTerm}"</p>
            </div>
          ) : (
            filteredGroups.map(group => (
              <div 
                key={group.id}
                className={`${styles.groupToJoin} ${selectedGroup?.id === group.id ? styles.selected : ''}`}
                onClick={() => handleGroupSelect(group)}
              >
                <img src={group.photo} alt={group.name} />
                <div className={styles.groupToJoinInfo}>
                  <h3>{group.name}</h3>
                  <p>Líder: {group.leader}</p>
                  <p>{group.members} membros • {group.minValue} MT/mês</p>
                  <p>{group.location}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {selectedGroup && (
          <div className={styles.modalFooter}>
            <button 
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={handleJoin}
              disabled={!selectedGroup}
            >
              <i className="fas fa-sign-in-alt"></i> Solicitar Adesão
            </button>
          </div>
        )}
      </div>
    </div>
  );
}