import { Injectable } from '@nestjs/common';
import { EstagiarioRepository } from './estagiario.repository';
import { CreateEstagiarioDto } from './dto/create-estagiario.dto';
import { UpdateEstagiarioDto } from './dto/update-estagiario.dto';

@Injectable()
export class EstagiarioService {
  constructor(private readonly repository: EstagiarioRepository) {}

  criar(dto: CreateEstagiarioDto) {
    return this.repository.inserir(dto);
  }

  listarTodos() {
    return this.repository.listarTodos();
  }

  listarPorUsuario(id: number) {
    return this.repository.listarPorUsuario(id);
  }

    listarRelatorioPorUsuario(id: number) {
    return this.repository.listarRelatorioPorUsuario(id);
  }

  atualizar(dto: UpdateEstagiarioDto) {
    return this.repository.atualizar(dto);
  }

  remover(id: number) {
    return this.repository.remover(id);
  }
}
