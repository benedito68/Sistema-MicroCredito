import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { CreateEstagiarioDto } from './dto/create-estagiario.dto';
import { UpdateEstagiarioDto } from './dto/update-estagiario.dto';

@Injectable()
export class EstagiarioRepository {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async inserir(dto: CreateEstagiarioDto) {
    try {
      const { tb_id_usuario, periodo, tb_supervisor_tb_id_usuario, estado, remunerado } = dto;
      const result = await this.connection.query(
        'CALL gerirEstagiario(?, ?, ?, ?, ?, ?)',
        ['inserir', tb_id_usuario, periodo, tb_supervisor_tb_id_usuario, estado, remunerado],
      );
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao inserir estagiário: ' + error.message,
      );
    }
  }

  async listarTodos() {
    try {
      const result = await this.connection.query(
        'CALL gerirEstagiario(?, NULL, NULL, NULL, NULL, NULL)',
        ['listarTodos'],
      );
      return result[1]; // A segunda tabela é a com os dados do join
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao listar estagiários: ' + error.message,
      );
    }
  }

  async listarPorUsuario(id: number) {
    try {
      const result = await this.connection.query(
        'CALL gerirEstagiario(?, ?, NULL, NULL, NULL, NULL)',
        ['listarPorUsuario', id],
      );
      return result[0];
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar estagiário por usuário: ' + error.message,
      );
    }
  }

  
  async listarRelatorioPorUsuario(id: number) {
    try {
      const result = await this.connection.query(
        `CALL gerirRelatorio(?, NULL, NULL, NULL, NULL, ?);`,
        ['buscarPorEstagiario', id],
      );
      return result[0];
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao buscar estagiário por usuário: ' + error.message,
      );
    }
  }

  async atualizar(dto: UpdateEstagiarioDto) {
    try {
      const { tb_id_usuario, periodo, tb_supervisor_tb_id_usuario, estado, remunerado } = dto;
      const result = await this.connection.query(
        'CALL gerirEstagiario(?, ?, ?, ?, ?, ?)',
        ['atualizar', tb_id_usuario, periodo, tb_supervisor_tb_id_usuario, estado, remunerado],
      );
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar estagiário: ' + error.message,
      );
    }
  }

  async remover(id: number) {
    try {
      const result = await this.connection.query(
        'CALL gerirEstagiario(?, ?, NULL, NULL, NULL, NULL)',
        ['remover', id],
      );
      return result;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao remover estagiário: ' + error.message,
      );
    }
  }
}
