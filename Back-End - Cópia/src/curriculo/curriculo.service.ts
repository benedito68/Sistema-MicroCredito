import { Injectable, NotFoundException } from '@nestjs/common';
import { CurriculoRepository } from './curriculo.repository';
import { CreateCurriculoDto } from './dto/create-curriculo.dto';
import { UpdateCurriculoDto } from './dto/update-curriculo.dto';

@Injectable()
export class CurriculoService {
  constructor(private readonly curriculoRepository: CurriculoRepository) {}

  // Criar um novo currículo
  async criar(dto: CreateCurriculoDto): Promise<any> {
    return this.curriculoRepository.inserirCurriculo(dto);
  }

  // Listar todos os currículos
  async listar(): Promise<any[]> {
    return this.curriculoRepository.listarCurriculos();
  }

  // Buscar um currículo pelo ID
  async buscarPorId(id: number): Promise<any> {
    const curriculo = await this.curriculoRepository.buscarCurriculoPorId(id);
    if (!curriculo) {
      throw new NotFoundException(`Currículo com ID ${id} não encontrado`);
    }
    return curriculo;
  }

  // Atualizar um currículo
  async atualizar(dto: UpdateCurriculoDto): Promise<any> {
    return this.curriculoRepository.atualizarCurriculo(dto);
  }

  // Eliminar um currículo
  async eliminar(id: number): Promise<any> {
    const result = await this.curriculoRepository.eliminarCurriculo(id);
    if (!result) {
      throw new NotFoundException(`Currículo com ID ${id} não encontrado`);
    }
    return result;
  }
}
