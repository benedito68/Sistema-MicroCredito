import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { VagaService } from './vaga.service';
import { CreateVagaDto } from './dto/create-vaga.dto';
import { UpdateVagaDto } from './dto/update-vaga.dto';

@Controller('vaga')
export class VagaController {
  constructor(private readonly vagaService: VagaService) {}

  @Post('/add')
  criar(@Body() dto: CreateVagaDto): Promise<any> {
    return this.vagaService.criar(dto);
  }

  @Get('/todas')
  listar(): Promise<any[]> {
    return this.vagaService.listar();
  }

  @Get('/:id')
  async buscarPorId(@Param('id') id: number): Promise<any> {
    const vaga = await this.vagaService.buscarPorId(id);
    if (!vaga) {
      throw new NotFoundException(`Vaga com ID ${id} não encontrada`);
    }
    return vaga;
  }

  @Get('/cidade/:id')
  buscarPorCidade(@Param('id') idCidade: number): Promise<any[]> {
    return this.vagaService.buscarPorCidade(idCidade);
  }

  @Post('/atualizar')
  atualizar(@Body() dto: UpdateVagaDto): Promise<any> {
    return this.vagaService.atualizar(dto);
  }

  @Get('/eliminar/:id')
  eliminar(@Param('id') id: number): Promise<any> {
    return this.vagaService.eliminar(id);
  }
}
