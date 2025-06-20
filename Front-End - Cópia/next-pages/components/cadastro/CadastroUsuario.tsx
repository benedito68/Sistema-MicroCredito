import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Link from "next/link";



const validationSchema = Yup.object({
  nome: Yup.string().required("Nome é obrigatório"),
  apelido: Yup.string().required("Apelido é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  contato1: Yup.string().required("Contato 1 é obrigatório"),
  contato2: Yup.string().required("Contato 2 é obrigatório"),
  nascimento: Yup.date().required("Data de nascimento é obrigatória"),
  idCidade: Yup.number().required("Cidade é obrigatória"),
});

interface Cidades {
  idCidade: number;
  nomeCidade: string;
  idProvincia: number;
  nomeProvincia: string;
}

interface Cargo {
  id_cargo: number;
  nome_cargo: string;
  descricao: number;
}


interface Departamento {
  idDepartamento: number,
  nomeDepertamento:string
}

const CadastroForm = () => {
  const [dataCidade, setDataCidade] = useState<Cidades[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Página atual do formulário
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const totalPages = 5;
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [desejaAdicionarCargo, setDesejaAdicionarCargo] = useState(false);
  const [cargoSelecionado, setCargoSelecionado] = useState('');
  const [departamentoSelecionado, setDepartamentoSelecionado] = useState('');
  const [categoriaProfissional, setCategoriaProfissional] = useState('');
  const [vinculo, setVinculo] = useState('');
  const [cargaHorariaNormal, setCargaHorariaNormal] = useState(false);
  const [horaEntrada, setHoraEntrada] = useState('');
  const [horaSaida, setHoraSaida] = useState('');

  // Suponha que você tenha carregado os dados assim:


  const categorias = [
    { id: 'cat-001', nome: 'Ensino Medio' },
    { id: 'cat-002', nome: 'Ensino Tecnico' },
    { id: 'cat-003', nome: 'Bacherlato' },
    { id: 'cat-004', nome: 'Licenciatura' },
    { id: 'cat-005', nome: 'Mestrado' },
    { id: 'cat-006', nome: 'Doutorado' },
    { id: 'cat-007', nome: 'PHD' },
  ];



  const toggleMessageModal = () => setModalMessageOpen(!modalMessageOpen);

  const showMessage = (message: string) => {
    setMessageContent(message);
    setModalMessageOpen(true);
  };


  const calcularCargaHoraria = (entrada: string, saida: string): number => {
    const [hEntrada, mEntrada] = entrada.split(':').map(Number);
    const [hSaida, mSaida] = saida.split(':').map(Number);

    const entradaMinutos = hEntrada * 60 + mEntrada;
    const saidaMinutos = hSaida * 60 + mSaida;

    const diferencaMinutos = saidaMinutos - entradaMinutos;

    // Convertendo para horas com decimais
    return diferencaMinutos / 60;
  };



  const fetchData = async () => {
    try {
      const response = await fetch("/api/cidades");
      if (!response.ok) {
        throw new Error("Erro ao buscar dados.");
      }
      const result = await response.json();
      setDataCidade(result);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };
  const fetchCargos = async () => {
    try {
      const response = await fetch("/api/cargos");
      const result = await response.json();
      setCargos(result);
    } catch (error) {
      console.error("Erro ao buscar cargos:", error);
    }
  };

    const fetchDepartamento = async () => {
    try {
      const response = await fetch("/api/departamento");
      const result = await response.json();
      setDepartamentos(result);
    } catch (error) {
      console.error("Erro ao buscar cargos:", error);
    }
  };

  useEffect(() => {
    fetchCargos();
    fetchDepartamento();
    fetchData();
  }, []);



  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      nome: "",
      apelido: "",
      email: "",
      contato1: "",
      contato2: "",
      nascimento: "",
      senha: "",
      idCidade: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const payload = {
        nome: values.nome,
        apelido: values.apelido,
        username: `${values.nome} ${values.apelido}`,
        password: "UCM@2025",
        email: values.email,
        contato1: values.contato1,
        contato2: values.contato2,
        anoDeNascimento: new Date(values.nascimento).toISOString().split("T")[0],
        idCidade: parseInt(values.idCidade, 10),
        urlImage: "../img/ucm/superviso2.jpg",
        estadoUsuario: 1,
        departamentoId: departamentoSelecionado || null,
        carteiraProfissional: categoriaProfissional || null,
        vinculo: vinculo || null,
        idCargo: cargoSelecionado || null,
        cargaHoraria: cargaHorariaNormal ? calcularCargaHoraria(horaEntrada, horaSaida) : null,
        horaEntrada: cargaHorariaNormal ? horaEntrada : null,
        horaSaida: cargaHorariaNormal ? horaSaida : null,
      };


      try {
        const response = await fetch("/api/usuarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          alert("Falha ao cadastrar usuário");
          throw new Error("Erro ao cadastrar usuário");
        }

        showMessage('A conta do usuario foi cadastrada com sucesso! ATIVE PARA COMECAR');
        router.push(`/funcionarios`);
      } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
      }
    },
  });

  // const totalPages = 3; // Número de páginas no formulário

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className=" d-flex flex-column" style={{
      fontFamily: "-moz-initial",
      fontSize: "14px",
      // backgroundImage: "url('../img/ucm/images.jpg')", // caminho da imagem
      // backgroundSize: "cover",
      //  backgroundPosition: "center",
      //  backgroundRepeat: "no-repeat",
      //   minHeight: "100vh",
    }}>
      <div className="container">
        <div
          className="col-sm-12 col-md-10 col-lg-8 d-table"
          style={{ width: "100%", marginLeft: "0", height: "100%" }}
        >

          <div className="d-table-cell align-middle">
            <div className="text-center mt-4">
              <h1 className="h2" style={{ color: "blue" }}>Cadastro de novo Funcionario</h1>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="m-sm-4">
                  <form>
                    {currentPage === 1 && (
                      <>
                        <div className="mb-3">
                          <label className="form-label">Nome</label>
                          <input
                            className="form-control form-control-lg"
                            type="text"
                            name="nome"
                            placeholder="Digite o seu nome"
                            value={formik.values.nome}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.nome && formik.errors.nome && <div className="text-danger">{formik.errors.nome}</div>}
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Apelido</label>
                          <input
                            className="form-control form-control-lg"
                            type="text"
                            name="apelido"
                            placeholder="Digite o seu apelido"
                            value={formik.values.apelido}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.apelido && formik.errors.apelido && <div className="text-danger">{formik.errors.apelido}</div>}
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input
                            className="form-control form-control-lg"
                            type="text"
                            name="email"
                            placeholder="Digite o seu email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.email && formik.errors.email && <div className="text-danger">{formik.errors.email}</div>}
                        </div>
                      </>
                    )}

                    {currentPage === 2 && (
                      <>
                        <div className="mb-3">
                          <label className="form-label">Contato 1</label>
                          <input
                            className="form-control form-control-lg"
                            type="text"
                            name="contato1"
                            placeholder="Digite o seu número principal"
                            value={formik.values.contato1}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.contato1 && formik.errors.contato1 && <div className="text-danger">{formik.errors.contato1}</div>}
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Contato 2</label>
                          <input
                            className="form-control form-control-lg"
                            type="text"
                            name="contato2"
                            placeholder="Digite o seu número secundário"
                            value={formik.values.contato2}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.contato2 && formik.errors.contato2 && <div className="text-danger">{formik.errors.contato2}</div>}
                        </div>

                        <div className="mb-3">
                          <label className="form-label">Data de Nascimento</label>
                          <input
                            className="form-control form-control-lg"
                            type="date"
                            name="nascimento"
                            value={formik.values.nascimento}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.nascimento && formik.errors.nascimento && <div className="text-danger">{formik.errors.nascimento}</div>}
                        </div>
                      </>
                    )}

                    {currentPage === 3 && (
                      <>
                        <div className="mb-3">
                          <Label for="idCidade">Cidade</Label>
                          <Input
                            type="select"
                            name="idCidade"
                            id="idCidade"
                            value={formik.values.idCidade}
                            onChange={(e) => formik.setFieldValue("idCidade", parseInt(e.target.value, 10))}
                            onBlur={formik.handleBlur}
                          >
                            <option value="">Selecione...</option>
                            {dataCidade.map((cidade) => (
                              <option key={cidade.idCidade} value={cidade.idCidade}>
                                Cidade: {cidade.nomeCidade}, Provincia: {cidade.nomeProvincia}
                              </option>
                            ))}
                          </Input>
                          {formik.touched.idCidade && formik.errors.idCidade && <div className="text-danger">{formik.errors.idCidade}</div>}
                        </div>
                      </>
                    )}


                    {currentPage === 4 && (
                      <>
                        {/* Cargo */}
                        <div className="mb-3">
                          <label className="form-label">Selecione o cargo do funcionário</label>
                          <select
                            className="form-control"
                            value={cargoSelecionado}
                            onChange={(e) => setCargoSelecionado(e.target.value)}
                          >
                            <option value="">Selecione um cargo...</option>
                            {cargos.map((cargo) => (
                              <option key={cargo.id_cargo} value={cargo.id_cargo}>{cargo.nome_cargo}</option>
                            ))}
                          </select>
                        </div>

                        {/* Departamento ou Unidade */}
                        <div className="mb-3">
                          <label className="form-label">Departamento ou Unidade</label>
                          <select
                            className="form-control"
                            value={departamentoSelecionado}
                            onChange={(e) => setDepartamentoSelecionado(e.target.value)}
                          >
                            <option value="">Selecione um departamento...</option>
                            {departamentos.map((dep) => (
                              <option key={dep.idDepartamento} value={dep.idDepartamento}>{dep.nomeDepertamento}</option>
                            ))}
                          </select>
                        </div>

                        {/* Categoria Profissional */}
                        <div className="mb-3">
                          <label className="form-label">Grau Academico</label>
                          <select
                            className="form-control"
                            value={categoriaProfissional}
                            onChange={(e) => setCategoriaProfissional(e.target.value)}
                          >
                            <option value="">Selecione uma grau...</option>
                            {categorias.map((cat) => (
                              <option key={cat.id} value={cat.nome}>{cat.nome}</option>
                            ))}
                          </select>
                        </div>

                        {/* Vínculo */}
                        <div className="mb-3">
                          <label className="form-label">Vínculo</label>
                          <select
                            className="form-control"
                            value={vinculo}
                            onChange={(e) => setVinculo(e.target.value)}
                          >
                            <option value="">Selecione um vínculo...</option>
                            <option value="efetivo">Efetivo</option>
                            <option value="contratado">Contratado</option>
                            <option value="temporario">Temporário</option>
                            <option value="estagiario">Estagiário</option>
                            <option value="outro">Outro</option>
                          </select>
                        </div>

                        {/* Carga Horária Normal */}
                        <div className="mb-3">
                          <label className="form-label">A carga horária é normal?</label>
                          <div>
                            <button
                              type="button"
                              className={`btn me-2 ${cargaHorariaNormal === true ? 'btn-primary' : 'btn-outline-primary'}`}
                              onClick={() => setCargaHorariaNormal(true)}
                            >
                              Sim
                            </button>
                            <button
                              type="button"
                              className={`btn ${cargaHorariaNormal === false ? 'btn-primary' : 'btn-outline-secondary'}`}
                              onClick={() => setCargaHorariaNormal(false)}
                            >
                              Não
                            </button>
                          </div>
                        </div>

                        {/* Horários de Entrada e Saída */}
                        {cargaHorariaNormal && (
                          <>
                            <div className="mb-3">
                              <label className="form-label">Hora de Entrada</label>
                              <input
                                type="time"
                                className="form-control"
                                value={horaEntrada}
                                onChange={(e) => setHoraEntrada(e.target.value)}
                              />
                            </div>

                            <div className="mb-3">
                              <label className="form-label">Hora de Saída</label>
                              <input
                                type="time"
                                className="form-control"
                                value={horaSaida}
                                onChange={(e) => setHoraSaida(e.target.value)}
                              />
                            </div>
                          </>
                        )}
                      </>
                    )}




                    {currentPage === 5 && (
                      <>
                        <h5 className="mb-3">Confirme seus dados antes de enviar</h5>
                        <ul className="list-group mb-3">
                          <li className="list-group-item">Nome completo: {formik.values.nome} {formik.values.apelido}</li>
                          <li className="list-group-item">Email: {formik.values.email}</li>
                          <li className="list-group-item">Contato 1: {formik.values.contato1}</li>
                          <li className="list-group-item">Contato 2: {formik.values.contato2}</li>
                          <li className="list-group-item">Nascimento: {formik.values.nascimento}</li>
                          <li className="list-group-item">Cidade ID: {formik.values.idCidade}</li>
                          {desejaAdicionarCargo && (
                            <li className="list-group-item">Cargo Selecionado: {cargoSelecionado}</li>
                          )}
                        </ul>
                      </>
                    )}
                  </form>
                  <div className="d-flex justify-content-between">
                    {currentPage > 1 && (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={prevPage}
                      >
                        Anterior
                      </button>
                    )}
                    {currentPage < totalPages ? (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={nextPage}
                      >
                        Próximo
                      </button>
                    ) : (
                      <button onClick={() => { formik.handleSubmit() }} className="btn btn-success">
                        Cadastrar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link href="/" style={{ color: "white", fontSize: "30px" }}>Voltar</Link>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={modalMessageOpen} toggle={toggleMessageModal}>
        <ModalHeader toggle={toggleMessageModal}>Mensagem</ModalHeader>
        <ModalBody>{messageContent}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleMessageModal}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CadastroForm;
