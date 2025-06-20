import { Injectable } from '@nestjs/common';
import { AvaliacaoRepository } from './avaliacao.repository';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@Injectable()
export class AvaliacaoService {
  constructor(private readonly avaliacaoRepo: AvaliacaoRepository) {}

  inserir(dto: CreateAvaliacaoDto) {
    return this.avaliacaoRepo.inserir(dto);
  }

  listar() {
    return this.avaliacaoRepo.listar();
  }

  buscarPorId(id: number) {
    return this.avaliacaoRepo.buscarPorId(id);
  }

  buscarPorRelatorio(idRelatorio: number) {
    return this.avaliacaoRepo.buscarPorRelatorio(idRelatorio);
  }

  atualizar(dto: UpdateAvaliacaoDto) {
    return this.avaliacaoRepo.atualizar(dto);
  }

  eliminar(id: number) {
    return this.avaliacaoRepo.eliminar(id);
  }
}
