import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateSupervisorDto } from './dto/create-supervisor.dto';
import { AvaliarRelatorioDto } from './dto/avaliar-relatorio.dto';

@Injectable()
export class SupervisorRepository {
  constructor(private dataSource: DataSource) {}

  async inserirSupervisor(dto: CreateSupervisorDto): Promise<any> {
    const { idUsuario, area } = dto;
    try {
      const result = await this.dataSource.query(
        `CALL gerirSupervisor('inserir', ?, ?)`,
        [idUsuario, area]
      );
      
      return result[0][0];
    } catch (error) {
      throw new InternalServerErrorException('Erro ao inserir supervisor: ' + error.message);
    }
  }

  async listarTodosSupervisores(): Promise<any[]> {
    try {
      const result = await this.dataSource.query(
        `CALL gerirSupervisor('listarTodos', NULL, NULL)`
      );
      return result[0];
    } catch (error) {
      throw new InternalServerErrorException('Erro ao listar supervisores: ' + error.message);
    }
  }

  async listarSupervisoresPorUsuario(idUsuario: number): Promise<any[]> {
    try {
      const result = await this.dataSource.query(
        `CALL gerirSupervisor('listarPorUsuario', ?, NULL)`,
        [idUsuario]
      );
      return result[0];
    } catch (error) {
      throw new InternalServerErrorException('Erro ao listar supervisores por usuário: ' + error.message);
    }
  }

  async avaliarRelatorio(dto: AvaliarRelatorioDto): Promise<any> {
    const { status, idRelatorio, comentario } = dto;
    try {
      const result = await this.dataSource.query(
        `CALL avaliarRelatorio('inserir', NULL, ?, ?, ?)`,
        [status, idRelatorio, comentario]
      );
      return result[0][0];
    } catch (error) {
      throw new InternalServerErrorException('Erro ao avaliar relatório: ' + error.message);
    }
  }

  async listarAvaliacoes(): Promise<any[]> {
    try {
      const result = await this.dataSource.query(
        `CALL avaliarRelatorio('listar', NULL, NULL, NULL, NULL)`
      );
      return result[0];
    } catch (error) {
      throw new InternalServerErrorException('Erro ao listar avaliações: ' + error.message);
    }
  }

  async buscarAvaliacaoPorId(id: number): Promise<any> {
    try {
      const result = await this.dataSource.query(
        `CALL avaliarRelatorio('buscarPorId', ?, NULL, NULL, NULL)`,
        [id]
      );
      if (!result[0][0]) throw new NotFoundException('Avaliação não encontrada');
      return result[0][0];
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar avaliação por ID: ' + error.message);
    }
  }

  async buscarAvaliacaoPorRelatorio(idRelatorio: number): Promise<any[]> {
    try {
      const result = await this.dataSource.query(
        `CALL avaliarRelatorio('buscarPorRelatorio', NULL, NULL, ?, NULL)`,
        [idRelatorio]
      );
      return result[0];
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar avaliação por relatório: ' + error.message);
    }
  }
}
