import styles from '../../styles/grupos-poupanca.module.css';

interface GroupTableProps {
  data: any[];
  columns: { key: string; label: string }[];
}

export default function GroupTable({ data, columns }: GroupTableProps) {
  const renderCell = (row: any, column: { key: string; label: string }) => {
    switch (column.key) {
      case 'photo':
        return <img src={row.photo} alt={row.name} className={styles.groupPhoto} />;
      
      case 'status':
        return (
          <span className={`${styles.badge} ${row.status === 'active' ? styles.badgeSuccess : styles.badgeWarning}`}>
            {row.status === 'active' ? 'Ativo' : 'Pendente'}
          </span>
        );
      
      case 'actions':
        return (
          <button 
            className={`${styles.btnAction} ${styles.btnPrimary}`}
            onClick={() => console.log('Ver grupo:', row.id)}
          >
            <i className="fas fa-eye"></i> Ver
          </button>
        );
      
      case 'minValue':
      case 'totalBalance':
        return `${row[column.key]} MT`;
      
      default:
        return row[column.key];
    }
  };

  return (
    <div className={styles.tableResponsive}>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              {columns.map(column => (
                <td key={`${row.id}-${column.key}`}>
                  {renderCell(row, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}