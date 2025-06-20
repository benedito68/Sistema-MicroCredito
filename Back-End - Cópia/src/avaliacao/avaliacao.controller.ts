import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Post('add')
  inserir(@Body() dto: CreateAvaliacaoDto) {
    return this.avaliacaoService.inserir(dto);
  }

  @Get('todos')
  listar() {
    return this.avaliacaoService.listar();
  }

  @Get('por-id/:id')
  buscarPorId(@Param('id') id: number) {
    return this.avaliacaoService.buscarPorId(id);
  }

  @Get('por-relatorio/:idRelatorio')
  buscarPorRelatorio(@Param('idRelatorio') idRelatorio: number) {
    return this.avaliacaoService.buscarPorRelatorio(idRelatorio);
  }

  @Post('atualizar')
  atualizar(@Body() dto: UpdateAvaliacaoDto) {
    return this.avaliacaoService.atualizar(dto);
  }

  @Get('eliminar/:id')
  eliminar(@Param('id') id: number) {
    return this.avaliacaoService.eliminar(id);
  }
}
