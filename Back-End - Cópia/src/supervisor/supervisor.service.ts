import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupervisorRepository } from './supervisor.repository';
import { CreateSupervisorDto } from './dto/create-supervisor.dto';
import { AvaliarRelatorioDto } from './dto/avaliar-relatorio.dto';

@Injectable()
export class SupervisorService {
  constructor(private readonly supervisorRepository: SupervisorRepository) {}

  async criarSupervisor(dto: CreateSupervisorDto): Promise<any> {
    return this.supervisorRepository.inserirSupervisor(dto);
  }

  async listarTodos(): Promise<any[]> {
    return this.supervisorRepository.listarTodosSupervisores();
  }

  async listarPorUsuario(idUsuario: number): Promise<any[]> {
    return this.supervisorRepository.listarSupervisoresPorUsuario(idUsuario);
  }

  async avaliarRelatorio(dto: AvaliarRelatorioDto): Promise<any> {
    return this.supervisorRepository.avaliarRelatorio(dto);
  }

  async listarAvaliacoes(): Promise<any[]> {
    return this.supervisorRepository.listarAvaliacoes();
  }

  async buscarAvaliacaoPorId(id: number): Promise<any> {
    return this.supervisorRepository.buscarAvaliacaoPorId(id);
  }

  async buscarAvaliacaoPorRelatorio(idRelatorio: number): Promise<any[]> {
    return this.supervisorRepository.buscarAvaliacaoPorRelatorio(idRelatorio);
  }
}
