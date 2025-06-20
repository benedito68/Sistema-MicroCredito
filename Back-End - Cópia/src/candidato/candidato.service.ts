import { Injectable } from '@nestjs/common';
import { CandidatoRepository } from './candidato.repository';
import { CriarCandidatoDto } from './dto/create-candidato.dto';
import { AtualizarCandidatoDto } from './dto/update-candidato.dto';

@Injectable()
export class CandidatoService {
  constructor(
    private readonly candidatoRepository: CandidatoRepository,  // Removido o @InjectRepository
  ) {}

  async criarCandidato(dados: CriarCandidatoDto) {
    return this.candidatoRepository.gerirCandidatos('inserir', dados.id, dados.idV, dados.area, dados.estado);
  }

  async listarCandidatos() {
    return this.candidatoRepository.gerirCandidatos('listar', null, null, null, null);
  }

  async buscarCandidatoPorId(id: number) {
    return this.candidatoRepository.gerirCandidatos('buscarPorId', id, null, null, null);
  }

  async atualizarCandidato(id: number, dados: AtualizarCandidatoDto) {
    return this.candidatoRepository.gerirCandidatos('atualizar', id, null, dados.area, null);
  }

  async aprovarCandidato(id: number, idV: number,Per: string,Rem: string,idS: number, es: string) {
    await this.candidatoRepository.gerirCandidatos('AprovarCandidato', id, idV, null, null);
    await this.candidatoRepository.gerirEstagiario('inserir', id, Per,idS, es, Rem);
    return {Satus: "Candidato Aprovado com sucesso!"}
  }

  async reprovarCandidato(id: number, idV: number) {
    return this.candidatoRepository.gerirCandidatos('ReprovarCandidato', id, idV, null, null);
  }

  async eliminarCandidato(id: number) {
    return this.candidatoRepository.gerirCandidatos('eliminar', id, null, null, null);
  }
}
