import { useState } from 'react';
import styles from '../styles/grupos-poupanca.module.css';

interface ModalCreateGroupProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (groupData: any) => void;
}

export default function ModalCreateGroup({ show, onClose, onSubmit }: ModalCreateGroupProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    minValue: 1000,
    type: '',
    location: '',
    photo: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, photo: e.target.files?.[0] || null }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!show) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.closeModal} onClick={onClose}>&times;</span>
        <h2><i className="fas fa-plus-circle"></i> Criar Novo Grupo</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="group-name">Nome do Grupo *</label>
            <input 
              type="text" 
              id="group-name" 
              name="name"
              placeholder="Ex: Poupança Comunitária Bairro X" 
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="group-description">Descrição *</label>
            <textarea 
              id="group-description" 
              name="description"
              rows={3} 
              placeholder="Descreva os objetivos do grupo"
              required
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="min-value">Valor Mínimo Mensal *</label>
              <div className={styles.inputWithSymbol}>
                <span>MT</span>
                <input 
                  type="number" 
                  id="min-value" 
                  name="minValue"
                  min="500" 
                  step="100" 
                  value={formData.minValue}
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="group-type">Tipo de Grupo *</label>
              <select 
                id="group-type" 
                name="type"
                required
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">Selecione...</option>
                <option value="community">Comunitário</option>
                <option value="professional">Profissional</option>
                <option value="family">Familiar</option>
                <option value="religious">Religioso</option>
              </select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="group-location">Localização (opcional)</label>
            <input 
              type="text" 
              id="group-location" 
              name="location"
              placeholder="Ex: Bairro, Cidade"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="group-photo">Foto do Grupo (opcional)</label>
            <input 
              type="file" 
              id="group-photo" 
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className={styles.formActions}>
            <button type="button" className={`${styles.btn} ${styles.btnOutline}`} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={`${styles.btn} ${styles.btnSuccess}`}>
              Criar Grupo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}