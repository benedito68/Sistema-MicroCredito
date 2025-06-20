import { Controller, Post, Get, Body, Param, NotFoundException } from '@nestjs/common';
import { CandidatoService } from './candidato.service';
import { CriarCandidatoDto } from './dto/create-candidato.dto';
import { AtualizarCandidatoDto } from './dto/update-candidato.dto';

@Controller('candidato')
export class CandidatoController {
  constructor(private readonly candidatoService: CandidatoService) {}

  @Post('/add')
  criar(@Body() dto: CriarCandidatoDto) {
    return this.candidatoService.criarCandidato(dto);
  }

  @Get('/todos')
  listar() {
    return this.candidatoService.listarCandidatos();
  }

  @Get('/:id')
  async buscarPorId(@Param('id') id: number) {
    const candidato = await this.candidatoService.buscarCandidatoPorId(id);
    if (!candidato) {
      throw new NotFoundException(`Candidato com ID ${id} não encontrado`);
    }
    return candidato;
  }

  //@Post('/atualizar/:id')
  //async atualizar(@Param('id') id: number, @Body() dto: AtualizarCandidatoDto) {
    // Certifique-se de que os dados estão sendo passados corretamente
    //const resultado = await this.candidatoService.atualizarCandidato(id, dto);
    //return {
      //message: 'Candidato atualizado com sucesso.',
      //data: resultado,
    //};
  //}

  @Get('/aprovar/:idUsuario/:idVaga')
  aprovar(@Param('idUsuario') idUsuario: number,@Param('idVaga') idVaga: number, @Body('Periodo') Periodo: string, @Body('Remunerado') Remunerado: string, @Body('idSupervisor') idSupervisor: number, @Body('estado') estado: string) {
    return this.candidatoService.aprovarCandidato(idUsuario, idVaga, Periodo, Remunerado, idSupervisor,estado);
  }

  @Get('/reprovar/:idUsuario/:idVaga')
  reprovar(@Param('idUsuario') idUsuario: number, @Param('idVaga') idVaga: number) {
    return this.candidatoService.reprovarCandidato(idUsuario, idVaga);
  }

  @Get('/eliminar/:id')
  async eliminar(@Param('id') id: number) {
    const result = await this.candidatoService.eliminarCandidato(id);
    if (!result) {
      throw new NotFoundException(`Candidato com ID ${id} não encontrado`);
    }
    return result;
  }
}
