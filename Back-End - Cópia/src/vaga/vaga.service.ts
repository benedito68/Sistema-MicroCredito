import { Injectable, NotFoundException } from '@nestjs/common';
import { VagaRepository } from './vaga.repository';
import { CreateVagaDto } from './dto/create-vaga.dto';
import { UpdateVagaDto } from './dto/update-vaga.dto';

@Injectable()
export class VagaService {
  constructor(private readonly vagaRepository: VagaRepository) {}

  async criar(dto: CreateVagaDto): Promise<any> {
    return this.vagaRepository.inserirVaga(dto);
  }

  async listar(): Promise<any[]> {
    return this.vagaRepository.listarVagas();
  }

  async buscarPorId(id: number): Promise<any> {
    const vaga = await this.vagaRepository.buscarVagaPorId(id);
    if (!vaga) {
      throw new NotFoundException(`Vaga com ID ${id} não encontrada`);
    }
    return vaga;
  }

  async buscarPorCidade(idCidade: number): Promise<any[]> {
    const vagas = await this.vagaRepository.buscarVagasPorCidade(idCidade);
    if (!vagas || vagas.length === 0) {
      throw new NotFoundException(`Nenhuma vaga encontrada para a cidade ${idCidade}`);
    }
    return vagas;
  }

  async atualizar(dto: UpdateVagaDto): Promise<any> {
    return this.vagaRepository.atualizarVaga(dto);
  }

  async eliminar(id: number): Promise<any> {
    const result = await this.vagaRepository.eliminarVaga(id);
    if (!result) {
      throw new NotFoundException(`Vaga com ID ${id} não encontrada`);
    }
    return result;
  }
}
