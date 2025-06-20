import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CurriculoService } from './curriculo.service';
import { CreateCurriculoDto } from './dto/create-curriculo.dto';
import { UpdateCurriculoDto } from './dto/update-curriculo.dto';

@Controller('curriculo')
export class CurriculoController {
  constructor(private readonly curriculoService: CurriculoService) {}

  @Post('/add')
  criar(@Body() dto: CreateCurriculoDto): Promise<any> {
    return this.curriculoService.criar(dto);
  }

  @Get('/todos')
  listar(): Promise<any[]> {
    return this.curriculoService.listar();
  }

  @Get('/:id')
  async buscarPorId(@Param('id') id: number): Promise<any> {
    const curriculo = await this.curriculoService.buscarPorId(id);
    if (!curriculo) {
      throw new NotFoundException(`Currículo com ID ${id} não encontrado`);
    }
    return curriculo;
  }

  @Post('/atualizar')
  atualizar(@Body() dto: UpdateCurriculoDto): Promise<any> {
    return this.curriculoService.atualizar(dto);
  }

  @Get('/eliminar/:id')
  eliminar(@Param('id') id: number): Promise<any> {
    return this.curriculoService.eliminar(id);
  }
}
