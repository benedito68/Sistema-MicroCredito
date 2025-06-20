import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@Injectable()
export class AvaliacaoRepository {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async inserir(dto: CreateAvaliacaoDto) {
    try {
      const [resultado] = await this.connection.query(
        'CALL avaliarRelatorio(?, NULL, ?, ?, ?)',
        ['inserir', dto.classificacao, dto.idRelatorio, dto.descricao],
      );
      return resultado[0];
    } catch (err) {
      throw new InternalServerErrorException('Erro ao inserir avaliação: ' + err.message);
    }
  }

  async listar() {
    return this.connection.query('CALL avaliarRelatorio(?, NULL, NULL, NULL, NULL)', ['listar']);
  }

  async buscarPorId(id: number) {
    return this.connection.query('CALL avaliarRelatorio(?, ?, NULL, NULL, NULL)', ['buscarPorId', id]);
  }

  async buscarPorRelatorio(idRelatorio: number) {
    return this.connection.query('CALL avaliarRelatorio(?, NULL, NULL, ?, NULL)', ['buscarPorRelatorio', idRelatorio]);
  }

  async atualizar(dto: UpdateAvaliacaoDto) {
    return this.connection.query(
      'CALL avaliarRelatorio(?, ?, ?, NULL, ?)',
      ['atualizar', dto.idAvaliacao, dto.classificacao, dto.descricao],
    );
  }

  async eliminar(id: number) {
    return this.connection.query(
      'CALL avaliarRelatorio(?, ?, NULL, NULL, NULL)',
      ['eliminar', id],
    );
  }
}
