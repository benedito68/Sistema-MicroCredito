import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateCurriculoDto } from './dto/create-curriculo.dto';
import { UpdateCurriculoDto } from './dto/update-curriculo.dto';

@Injectable()
export class CurriculoRepository {
  constructor(private dataSource: DataSource) {}

  async inserirCurriculo(dto: CreateCurriculoDto): Promise<any> {
    const { tb_candidato_usuario, Titulo, anexo, idVaga } = dto;
    try {
      const result = await this.dataSource.query(
        `CALL gerirCurriculo('inserir', NULL, ?, ?, ?, ?)`,
        [tb_candidato_usuario, Titulo, anexo, idVaga]
      );
      return result[0][0];
    } catch (error) {
      throw new InternalServerErrorException('Erro ao inserir currículo: ' + error.message);
    }
  }

  async listarCurriculos(): Promise<any[]> {
    try {
      const result = await this.dataSource.query(
        `CALL gerirCurriculo('listar', NULL, NULL, NULL, NULL, NULL)`
      );
      return result[0];
    } catch (error) {
      throw new InternalServerErrorException('Erro ao listar currículos: ' + error.message);
    }
  }

  async buscarCurriculoPorId(idCurriculo: number): Promise<any> {
    try {
      const result = await this.dataSource.query(
        `CALL gerirCurriculo('buscarPorIdCandidato', NULL, ?, NULL, NULL, NULL)`,
        [idCurriculo]
      );
      return result[0];
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar currículo por ID: ' + error.message);
    }
  }

  async atualizarCurriculo(dto: UpdateCurriculoDto): Promise<any> {
    const { idCurriculo, tb_candidato_usuario, Titulo, anexo, idVaga } = dto;
    try {
      const result = await this.dataSource.query(
        `CALL gerirCurriculo('atualizar', ?, ?, ?, ?, ?)`,
        [idCurriculo, tb_candidato_usuario, Titulo, anexo, idVaga]
      );
      return result[0][0];
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar currículo: ' + error.message);
    }
  }

  async eliminarCurriculo(idCurriculo: number): Promise<any> {
    try {
      const result = await this.dataSource.query(
        `CALL gerirCurriculo('eliminar', ?, NULL, NULL, NULL, NULL)`,
        [idCurriculo]
      );
      return result[0][0];
    } catch (error) {
      throw new InternalServerErrorException('Erro ao eliminar currículo: ' + error.message);
    }
  }
}
