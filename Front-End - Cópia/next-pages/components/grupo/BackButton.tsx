import Link from 'next/link';
import styles from '../../styles/grupos-poupanca.module.css';

export default function BackButton() {
  return (
    <Link href="/dashboard" className={styles.btnVoltarLink}>
      <button className={styles.btnVoltar} title="Voltar">
        <i className="fas fa-arrow-left"></i>
        <span className={styles.tooltip}>Voltar</span>
      </button>
    </Link>
  );
}