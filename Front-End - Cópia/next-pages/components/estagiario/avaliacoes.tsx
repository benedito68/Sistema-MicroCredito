import { useRouter } from 'next/router';

export default function Avaliacoes() {
  const router = useRouter();

  const avaliacaoMock = {
    supervisor: 'Dr. António',
    nota: 'Excelente',
    comentario: 'Demonstrou muita dedicação e vontade de aprender.',
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9 p-5">
          <h3>Avaliação do Supervisor</h3>
          <p><strong>Supervisor:</strong> {avaliacaoMock.supervisor}</p>
          <p><strong>Nota:</strong> {avaliacaoMock.nota}</p>
          <p><strong>Comentário:</strong> {avaliacaoMock.comentario}</p>
          <button className="btn btn-secondary mt-4" onClick={() => router.push('/estagiario/dashbord')}>Voltar ao Dashboard</button>
        </div>
      </div>
    </div>
  );
}
