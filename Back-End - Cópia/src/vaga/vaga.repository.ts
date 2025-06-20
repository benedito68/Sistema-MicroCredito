import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateVagaDto } from './dto/create-vaga.dto';
import { UpdateVagaDto } from './dto/update-vaga.dto';

@Injectable()
export class VagaRepository {
  constructor(private dataSource: DataSource) {}

  async inserirVaga(dto: CreateVagaDto): Promise<any> {
    const { area_vaga, Requisitos, prazo, cidade_idCidade, estado } = dto;
    try {
      const result = await this.dataSource.query(
        `CALL gerirVagas('inserir', NULL, ?, ?, ?, ?, ?)`,
        [area_vaga, Requisitos, prazo, cidade_idCidade, estado]
      );
      return result[0][0];
    } catch (error) {
      throw new InternalServerErrorException('Erro ao inserir vaga: ' + error.message);
    }
  }

  async listarVagas(): Promise<any[]> {
    try {
      const result = await this.dataSource.query(
        `CALL gerirVagas('listar', NULL, NULL, NULL, NULL, NULL, NULL)`
      );
      return result[0];
    } catch (error) {
      throw new InternalServerErrorException('Erro ao listar vagas: ' + error.message);
    }
  }

  async buscarVagaPorId(idVaga: number): Promise<any> {
    try {
      const result = await this.dataSource.query(
        `CALL gerirVagas('buscarPorId', ?, NULL, NULL, NULL, NULL, NULL)`,
        [idVaga]
      );
      return result[0][0];
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar vaga por ID: ' + error.message);
    }
  }

  async buscarVagasPorCidade(cidade_idCidade: number): Promise<any[]> {
    try {
      const result = await this.dataSource.query(
        `CALL gerirVagas('buscarPorCidade', NULL, NULL, NULL, NULL, ?, NULL)`,
        [cidade_idCidade]
      );
      return result[0];
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar vagas por cidade: ' + error.message);
    }
  }

  async atualizarVaga(dto: UpdateVagaDto): Promise<any> {
    const { idVaga, area_vaga, Requisitos, prazo, cidade_idCidade, estado } = dto;
    try {
      const result = await this.dataSource.query(
        `CALL gerirVagas('atualizar', ?, ?, ?, ?, ?, ?)`,
        [idVaga, area_vaga, Requisitos, prazo, cidade_idCidade, estado]
      );
      return result[0][0];
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar vaga: ' + error.message);
    }
  }

  async eliminarVaga(idVaga: number): Promise<any> {
    try {
      const result = await this.dataSource.query(
        `CALL gerirVagas('eliminar', ?, NULL, NULL, NULL, NULL, NULL)`,
        [idVaga]
      );
      return result[0][0];
    } catch (error) {
      throw new InternalServerErrorException('Erro ao eliminar vaga: ' + error.message);
    }
  }
}
