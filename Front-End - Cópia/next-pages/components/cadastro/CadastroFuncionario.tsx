'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface Funcionario {
  id_usuario: string;
  nome: string;
  apelido: string;
  email: string;
  contato1: string;
  urlImage?: string;
}

const AdicionarFuncionario = () => {
  const [codigoFuncionario, setCodigoFuncionario] = useState('');
  const [dadosFuncionario, setDadosFuncionario] = useState<Funcionario | null>(null);

  const [cargoFuncionario,setCargoFuncionario] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  const buscarFuncionario = async () => {
    try {
      const response = await fetch(`/api/usuarios?id=${codigoFuncionario}`);
      const data = await response.json();

      if (data && data.id_usuario) {
        setDadosFuncionario(data);
        setErro('');
      } else {
        setErro('Funcionário não encontrado. Tente novamente.');
        setDadosFuncionario(null);
      }
    } catch (error) {
      setErro('Erro ao buscar funcionário.');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!cargoFuncionario) {
      setErro('Por favor, selecione o cargo deste funcionario.');
      return;
    }
    router.push(`/funcionarios`);
  };

  return (
    <div className="">
      <h1 className="text-center mb-4 text-primary">Adicionar Novo Funcionário</h1>

      <div className="card shadow p-4">
        <form className="mb-4">
          <div className="mb-3">
            <label htmlFor="codigoFuncionario" className="form-label">
              Código do Usuario:
            </label>
            <input
              type="text"
              id="codigoFuncionario"
              className="form-control"
              placeholder="Digite o ID do usuário"
              value={codigoFuncionario}
              onChange={(e) => setCodigoFuncionario(e.target.value)}
              required
            />
          </div>

          <button type="button" className="btn btn-primary" onClick={buscarFuncionario}>
            Buscar
          </button>
        </form>

        {erro && <div className="alert alert-danger">{erro}</div>}

        {dadosFuncionario && (
          <div className="card bg-light p-4 border-0 shadow-sm">
            <div className="d-flex align-items-center mb-4">
              <img
                src={dadosFuncionario.urlImage || '/default-avatar.png'}
                alt="Foto do Funcionário"
                className="rounded-circle me-3"
                width={100}
                height={100}
                style={{ objectFit: 'cover', border: '2px solid #007bff' }}
              />
              <div>
                <h4 className="text-primary mb-1">
                  {dadosFuncionario.nome} {dadosFuncionario.apelido}
                </h4>
                <p className="mb-0"><strong>Email:</strong> {dadosFuncionario.email}</p>
                <p className="mb-0"><strong>Contacto:</strong> {dadosFuncionario.contato1}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="cargoFuncionario" className="form-label">
                  Selecione o Cargo do Funcionário:
                </label>
                <select
                  id="cargoFuncionario"
                  className="form-select"
                  value={cargoFuncionario}
                  onChange={(e) => setCargoFuncionario(e.target.value)}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="reitor">Reitor</option>
                  <option value="viceReitor">Vice-Reitor</option>
                  <option value="secretarioGeral">Secretário-Geral</option>
                  <option value="diretorFaculdade">Diretor de Faculdade</option>
                  <option value="chefeDepartamento">Chefe de Departamento</option>
                  <option value="docente">Docente</option>
                  <option value="tecnicoAdministrativo">Técnico Administrativo</option>
                  <option value="assistenteAdministrativo">Assistente Administrativo</option>
                  <option value="bibliotecario">Bibliotecário</option>
                  <option value="coordenadorCurso">Coordenador de Curso</option>
                  <option value="estagiario">Estagiário</option>
                </select>
              </div>


              <button type="submit" className="btn btn-success">
                Iniciar Avaliação
              </button>
            </form>
          </div>
        )}
      </div>

      <style jsx>{`
        .container {
          max-width: 700px;
          background-color: #f8f9fa;
          padding: 20px;
          border-radius: 12px;
        }
        .card {
          background-color: #ffffff;
          border-radius: 12px;
        }
        .form-control, .form-select {
          border-radius: 8px;
        }
        .btn {
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default AdicionarFuncionario;
