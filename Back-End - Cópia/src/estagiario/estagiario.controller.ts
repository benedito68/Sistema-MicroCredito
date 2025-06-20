import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { EstagiarioService } from './estagiario.service';
import { CreateEstagiarioDto } from './dto/create-estagiario.dto';
import { UpdateEstagiarioDto } from './dto/update-estagiario.dto';

@Controller('estagiario')
export class EstagiarioController {
  constructor(private readonly service: EstagiarioService) {}

  @Post('/add')
  criar(@Body() dto: CreateEstagiarioDto) {
    return this.service.criar(dto);
  }

  @Get('/todos')
  listarTodos() {
    return this.service.listarTodos();
  }

  @Get('/usuario/:id')
  listarPorUsuario(@Param('id') id: number) {
    return this.service.listarPorUsuario(id);
  }

  @Get('/relatorio/:id')
  listarRelatorioPorUsuario(@Param('id') id: number) {
    return this.service.listarRelatorioPorUsuario(id);

  }

  @Put('/atualizar')
  atualizar(@Body() dto: UpdateEstagiarioDto) {
    return this.service.atualizar(dto);
  }

  @Delete('/remover/:id')
  remover(@Param('id') id: number) {
    return this.service.remover(id);
  }
}
