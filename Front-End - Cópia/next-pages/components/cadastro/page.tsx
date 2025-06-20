import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaArrowRight, FaArrowLeft, FaCheckCircle, FaUserPlus, FaCalendarAlt, FaUser, FaPhone, FaImage } from 'react-icons/fa';

interface Cidade {
  idCidade: number;
  nomeCidade: string;
  idProvincia: number;
  nomeProvincia: string;
}

interface UserData {
  idUsuario: string;
  nome: string;
  apelido: string;
  username: string;
  email: string;
  password: string;
  anoDeNascimento: string;
  idCidade: number;
  contato1: string;
  contato2: string;
  urlImage: string;
  estadoUsuario: boolean;
  eliminado: boolean;
}

const Cadastro: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [user, setUser] = useState<UserData>({
    idUsuario: "",
    nome: "",
    apelido: "",
    username: "",
    email: "",
    password: "",
    anoDeNascimento: "",
    idCidade: 0,
    contato1: "",
    contato2: "",
    urlImage: "",
    estadoUsuario: true,
    eliminado: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCidades = async () => {
      try {
        const response = await fetch('/api/cidades');
        const data = await response.json();
        setCidades(data);
      } catch (error) {
        console.error('Erro ao carregar cidades:', error);
      }
    };
    
    fetchCidades();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Criar preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Falha no upload da imagem');
      }
      
      const data = await response.json();
      return data.filePath; // Ex: 'img/nome-do-arquivo.jpg'
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      throw error;
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!user.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!user.apelido.trim()) newErrors.apelido = "Apelido é obrigatório";
    if (!user.username.trim()) newErrors.username = "Username é obrigatório";
    if (!user.email.trim()) newErrors.email = "Email é obrigatório";
    if (!user.contato1.trim()) newErrors.contato1 = "Contato é obrigatório";
    if (!user.anoDeNascimento) newErrors.anoDeNascimento = "Ano de nascimento é obrigatório";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (user.idCidade <= 0) newErrors.idCidade = "Selecione uma cidade";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!user.password.trim()) newErrors.password = "Senha é obrigatória";
    if (user.password.length < 6) newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    if (user.password !== confirmPassword) {
      setPasswordError("As senhas não coincidem!");
      return false;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) setCurrentStep(2);
    else if (currentStep === 2 && validateStep2()) setCurrentStep(3);
  };

  const prevStep = () => setCurrentStep(currentStep - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setLoading(true);
    try {
      let imagePath = '';
      
      // Se houver imagem selecionada, faz o upload
      if (imageFile) {
        imagePath = await uploadImage(imageFile);
      }

      const novoUsuario = {
        ...user,
        idUsuario: "U" + Date.now(),
        tipoRoles: 2, // Definindo como Estagiário por padrão
        roles: "Estagiario",
        urlImage: imagePath, // Armazena apenas o caminho
      };

      const response = await fetch("/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoUsuario),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }

      setShowSuccessModal(true);
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      alert("Erro ao cadastrar usuário: " + (error.message || "Erro desconhecido"));
    } finally {
      setLoading(false);
    }
  };

  // ... (restante do componente permanece igual)
  return (
    <div className="container">
      {/* Cabeçalho */}
      <div className="header">
        <h1><FaUserPlus /> Criar Conta</h1>
      </div>

      {/* Progresso */}
      <div className="progress-steps">
        {[1, 2, 3].map(step => (
          <div 
            key={step}
            className={`step ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
          >
            <div className="step-number">{step}</div>
            <div className="step-label">
              {step === 1 ? 'Informações Pessoais' : step === 2 ? 'Localização' : 'Segurança'}
            </div>
          </div>
        ))}
      </div>

      {/* Formulário */}
      <div className="form-container">
        {currentStep === 1 && (
          <div className="form-step">
            <div className="form-row">
              <div className="form-group">
                <label>Nome *</label>
                <input
                  type="text"
                  name="nome"
                  value={user.nome}
                  onChange={handleChange}
                  className={errors.nome ? 'error' : ''}
                />
                {errors.nome && <span className="error-message">{errors.nome}</span>}
              </div>
              <div className="form-group">
                <label>Apelido *</label>
                <input
                  type="text"
                  name="apelido"
                  value={user.apelido}
                  onChange={handleChange}
                  className={errors.apelido ? 'error' : ''}
                />
                {errors.apelido && <span className="error-message">{errors.apelido}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Username *</label>
                <div className="input-with-icon">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    className={errors.username ? 'error' : ''}
                  />
                </div>
                {errors.username && <span className="error-message">{errors.username}</span>}
              </div>
              <div className="form-group">
                <label>Ano de Nascimento *</label>
                <div className="input-with-icon">
                  <FaCalendarAlt className="input-icon" />
                  <input
                    type="date"
                    name="anoDeNascimento"
                    value={user.anoDeNascimento}
                    onChange={handleChange}
                    min="1900"
                    max={new Date().getFullYear()}
                    className={errors.anoDeNascimento ? 'error' : ''}
                  />
                </div>
                {errors.anoDeNascimento && <span className="error-message">{errors.anoDeNascimento}</span>}
              </div>
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Contacto Principal *</label>
                <div className="input-with-icon">
                  <FaPhone className="input-icon" />
                  <input
                    type="tel"
                    name="contato1"
                    value={user.contato1}
                    onChange={handleChange}
                    placeholder="841234567"
                    className={errors.contato1 ? 'error' : ''}
                  />
                </div>
                {errors.contato1 && <span className="error-message">{errors.contato1}</span>}
              </div>
              <div className="form-group">
                <label>Contacto Alternativo</label>
                <div className="input-with-icon">
                  <FaPhone className="input-icon" />
                  <input
                    type="tel"
                    name="contato2"
                    value={user.contato2}
                    onChange={handleChange}
                    placeholder="861234567"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Foto de Perfil</label>
              <div className="image-upload-container">
                {previewImage ? (
                  <div className="image-preview">
                    <img src={previewImage} alt="Preview" />
                    <button 
                      type="button" 
                      className="change-image-btn"
                      onClick={() => {
                        setPreviewImage(null);
                        setImageFile(null);
                      }}
                    >
                      Alterar Imagem
                    </button>
                  </div>
                ) : (
                  <label className="upload-label">
                    <FaImage className="upload-icon" />
                    <span>Selecionar Imagem</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn next-btn" onClick={nextStep}>
                Próximo <FaArrowRight />
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="form-step">
            <div className="form-group">
              <label>Cidade *</label>
              <select
                name="idCidade"
                value={user.idCidade}
                onChange={handleChange}
                className={errors.idCidade ? 'error' : ''}
              >
                <option value={0}>Selecione sua cidade</option>
                {cidades.map(cidade => (
                  <option key={cidade.idCidade} value={cidade.idCidade}>
                    {cidade.nomeCidade}, {cidade.nomeProvincia}
                  </option>
                ))}
              </select>
              {errors.idCidade && <span className="error-message">{errors.idCidade}</span>}
            </div>

            <div className="form-actions">
              <button type="button" className="btn back-btn" onClick={prevStep}>
                <FaArrowLeft /> Anterior
              </button>
              <button type="button" className="btn next-btn" onClick={nextStep}>
                Próximo <FaArrowRight />
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="form-step">
            <div className="form-group">
              <label>Senha *</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label>Confirmar Senha *</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {passwordError && <span className="error-message">{passwordError}</span>}
            </div>

            <div className="form-actions">
              <button type="button" className="btn back-btn" onClick={prevStep}>
                <FaArrowLeft /> Anterior
              </button>
              <button 
                type="submit" 
                className="btn submit-btn" 
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Cadastrando...' : 'Criar Conta'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Rodapé */}
      <div className="footer">
        <a href="/" className="back-link">← Voltar ao início</a>
      </div>

      {/* Modal de Sucesso */}
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-icon">
              <FaCheckCircle />
            </div>
            <h2>Cadastro Efectuado com Sucesso!</h2>
            <p>Sua conta foi criada com sucesso.</p>
            <button className="btn modal-btn" onClick={() => router.push('/')}>
              Continuar
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .header h1 {
          color: #4a6cf7;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .progress-steps {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2rem;
          position: relative;
        }

        .progress-steps::before {
          content: '';
          position: absolute;
          top: 20px;
          left: 0;
          right: 0;
          height: 2px;
          background: #e9ecef;
          z-index: 1;
        }

        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
          width: 33%;
        }

        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          border: 2px solid #e9ecef;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #6c757d;
          margin-bottom: 0.5rem;
        }

        .step.active .step-number {
          border-color: #4a6cf7;
          background: #4a6cf7;
          color: white;
        }

        .step.completed .step-number {
          border-color: #28a745;
          background: #28a745;
          color: white;
        }

        .step-label {
          font-size: 0.9rem;
          color: #6c757d;
          text-align: center;
        }

        .step.active .step-label,
        .step.completed .step-label {
          color: #4a6cf7;
          font-weight: 500;
        }

        .form-container {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .form-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .form-group {
          flex: 1;
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #343a40;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #e9ecef;
          border-radius: 6px;
          font-size: 1rem;
        }

        .input-with-icon {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #6c757d;
        }

        .input-with-icon input {
          padding-left: 35px;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #4a6cf7;
          box-shadow: 0 0 0 2px rgba(74, 108, 247, 0.2);
        }

        .error {
          border-color: #dc3545 !important;
        }

        .error-message {
          color: #dc3545;
          font-size: 0.875rem;
          margin-top: 0.25rem;
          display: block;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 2rem;
        }

        .btn {
          padding: 0.8rem 1.5rem;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border: none;
          transition: all 0.3s ease;
        }

        .next-btn,
        .submit-btn {
          background: #4a6cf7;
          color: white;
        }

        .next-btn:hover,
        .submit-btn:hover {
          background: #3a5bd9;
        }

        .next-btn:disabled,
        .submit-btn:disabled {
          background: #cccccc;
          cursor: not-allowed;
        }

        .back-btn {
          background: none;
          border: 1px solid #e9ecef;
          color: #343a40;
          margin-right: 1rem;
        }

        .back-btn:hover {
          background: #f8f9fa;
        }

        .footer {
          text-align: center;
          margin-top: 2rem;
        }

        .back-link {
          color: #4a6cf7;
          text-decoration: none;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
        }

        .back-link:hover {
          text-decoration: underline;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          text-align: center;
          max-width: 500px;
          width: 90%;
        }

        .modal-icon {
          font-size: 4rem;
          color: #28a745;
          margin-bottom: 1rem;
        }

        .modal h2 {
          margin-bottom: 0.5rem;
          color: #343a40;
        }

        .modal p {
          color: #6c757d;
          margin-bottom: 1.5rem;
        }

        .modal-btn {
          background: #4a6cf7;
          color: white;
          width: 100%;
          justify-content: center;
        }

        .image-upload-container {
          border: 2px dashed #e9ecef;
          border-radius: 8px;
          padding: 1.5rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .image-upload-container:hover {
          border-color: #4a6cf7;
        }

        .upload-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .upload-icon {
          font-size: 2rem;
          color: #6c757d;
          margin-bottom: 0.5rem;
        }

        .image-preview {
          position: relative;
        }

        .image-preview img {
          max-width: 100%;
          max-height: 200px;
          border-radius: 8px;
        }

        .change-image-btn {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .form-row {
            flex-direction: column;
            gap: 0;
          }
          
          .container {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Cadastro;