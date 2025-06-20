import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { CreateSupervisorDto } from './dto/create-supervisor.dto';
import { AvaliarRelatorioDto } from './dto/avaliar-relatorio.dto';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { RolesGuard } from '../roles/roles.guard';
// import { Roles } from '../roles/roles.decorators';
// import { Role } from '../roles/roles.enum';

@Controller('supervisor')
export class SupervisorController {
  constructor(private readonly supervisorService: SupervisorService) {}

  @Post('/add')
  criarSupervisor(@Body() dto: CreateSupervisorDto): Promise<any> {
    return this.supervisorService.criarSupervisor(dto);
  }

  @Get('/todos')
  listarTodos(): Promise<any[]> {
    return this.supervisorService.listarTodos();
  }

  @Get('/usuario/:id')
  listarPorUsuario(@Param('id') idUsuario: number): Promise<any[]> {
    return this.supervisorService.listarPorUsuario(idUsuario);
  }

  @Post('/avaliar')
  avaliarRelatorio(@Body() dto: AvaliarRelatorioDto): Promise<any> {
    return this.supervisorService.avaliarRelatorio(dto);
  }

  @Get('/avaliacoes')
  listarAvaliacoes(): Promise<any[]> {
    return this.supervisorService.listarAvaliacoes();
  }

  @Get('/avaliacao/:id')
  async buscarAvaliacaoPorId(@Param('id') id: number): Promise<any> {
    const avaliacao = await this.supervisorService.buscarAvaliacaoPorId(id);
    if (!avaliacao) {
      throw new NotFoundException(`Avaliação com ID ${id} não encontrada`);
    }
    return avaliacao;
  }

  @Get('/avaliacoes/relatorio/:id')
  async buscarAvaliacaoPorRelatorio(@Param('id') idRelatorio: number): Promise<any[]> {
    const avaliacoes = await this.supervisorService.buscarAvaliacaoPorRelatorio(idRelatorio);
    if (!avaliacoes || avaliacoes.length === 0) {
      throw new NotFoundException(`Nenhuma avaliação encontrada para o relatório ${idRelatorio}`);
    }
    return avaliacoes;
  }
}
