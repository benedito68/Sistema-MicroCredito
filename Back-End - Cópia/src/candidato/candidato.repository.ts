import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class CandidatoRepository {
  constructor(private dataSource: DataSource) { }

  async gerirCandidatos(
    acao: string,
    id: number | null,
    idV: number | null,
    ar: string | null,
    es: string | null,
  ) {
    const query = `CALL gerirCandidatos(?, ?, ?, ?, ?)`;
    const params = [acao, id, idV, ar, es];
    const [result] = await this.dataSource.query(query, params);
    return result;
  }

  async gerirEstagiario(
    acao: string,
    id: number | null,
    Per: string | null,
    idS: number | null,
    es: string | null,
    Rem: string | null,
  ) {
    const query = `CALL gerirEstagiario(?, ?, ?, ?, ?, ?)`;
    const params = [acao, id, Per, idS, es, Rem];
    const [result] = await this.dataSource.query(query, params);
    return result;
  }
}
