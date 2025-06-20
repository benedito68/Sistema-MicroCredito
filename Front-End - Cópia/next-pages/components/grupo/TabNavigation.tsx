import styles from '../../styles/grupos-poupanca.module.css';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: 'my-groups', label: 'Meus Grupos', icon: 'fas fa-users' },
    { id: 'pending-groups', label: 'Pendentes', icon: 'fas fa-clock' },
  ];

  return (
    <div className={styles.groupsTabs}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`${styles.tabBtn} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          <i className={tab.icon}></i> {tab.label}
        </button>
      ))}
    </div>
  );
}