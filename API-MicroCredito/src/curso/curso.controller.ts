import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CreateComentarioDto, CreateConteudoMaateriaDto, CreateCursoDto, CreateMateriasDto, CreateUsuarioCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto, UpdateMateriasDto } from './dto/update-curso.dto';

@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) { }

  @Post('addCurso')
  create(@Body() createCursoDto: CreateCursoDto) {
    console.log('Curso 1');
    return this.cursoService.create(createCursoDto);
  }

  @Post('addMateria')
  addMateria(@Body() createMateriasDto: CreateMateriasDto) {
    return this.cursoService.addMateria(createMateriasDto);
  }

  @Post('addConteudo')
  addConteudo(@Body() createConteudoMaateriaDto: CreateConteudoMaateriaDto) {
    console.log('Conteudo 1: Controller');

    return this.cursoService.addConteudo(createConteudoMaateriaDto);
  }

  @Post('addUsuarioCurso')
  addCursoUsuario(@Body() createUsuarioCursoDto: CreateUsuarioCursoDto) {
    return this.cursoService.addUsuarioCurso(createUsuarioCursoDto);
  }


  @Get('/Todos')
  findAll() {
    return this.cursoService.findAll();
  }

  @Get('/:id')
  findCursobyId(@Param('id') id: number) {
    return this.cursoService.findCursobyId(id);
  }

  @Get('/categoria/todas')
  findCursosCategoria() {
    // console.log('Categoria');

    return this.cursoService.listarporIdCategoria();
  }

  @Get('/Usuario/:id')
  findCursosUsuario(@Param('id') id: number) {
    return this.cursoService.listarporIdUsuario(id);
  }

  @Get('/Materias/:id')
  findMateriasCurso(@Param('id') id: number) {
    return this.cursoService.listarMateriasCurso(id);
  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles(Role.ESTUDANTE)
  @Get('/CursoUsuario/:id')
  findCursoUsuario(@Param('id') id: number) {
    return this.cursoService.listarCursoUsuario(id);
  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles(Role.FORMADOR)
  @Get('/UsuarioCurso/:id')
  findUsuarioCurso(@Param('id') id: number) {
    return this.cursoService.listarUsuarioCurso(id);
  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles(Role.FORMADOR)
  @Get('/ConteudoMateria/:id')
  findConteudoMateria(@Param('id') id: number) {
    return this.cursoService.listarConteudoMateria(id);
  }

  @Put('/editCurso/:id')
  update(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursoService.updateCurso(+id, updateCursoDto);
  }

  @Put('/editMateria/:id')
  updateMateria(@Param('id') id: string, @Body() updateMateriasDto: UpdateMateriasDto) {
    return this.cursoService.updateMaterias(+id, updateMateriasDto);
  }

  @Put('/ativarCurso/:idUsuario/:idCurso')
  ativarCursoUsuario(@Param('idUsuario') idUsuario: string, @Param('idCurso') idCurso: string) {
    return this.cursoService.ativarCursoUsuario(+idCurso, +idUsuario);
  }

  @Put('/atualizarEstadoCurso/:idUsuario/:idCurso')
  atualizarEstadoCursoUsuario(@Param('idUsuario') idUsuario: string, @Param('idCurso') idCurso: string) {
    return this.cursoService.atualizarEstadoCursoUsuario(+idCurso, +idUsuario);
  }

  @Delete('/Materia/:id')
  remove(@Param('id') id: string) {
    return this.cursoService.deleteMateria(+id);
  }

  //COMENTARIO SOBRE O CURSO
  // Adicionar Comentário
  @Post('/:id/comentarios')
  adicionarComentario(
    @Param('id') idCurso: number,
    @Body() createComentarioDto: CreateComentarioDto,
  ) {
    return this.cursoService.adicionarComentario({
      ...createComentarioDto,
      idCurso,
    });
  }

  // Listar Comentários do Curso
  @Get('/:id/comentarios')
  listarComentariosCurso(@Param('id') idCurso: number) {
    return this.cursoService.listarComentariosCurso(idCurso);
  }

  // Listar Comentário por ID
  @Get('/comentarios/:idComentario')
  listarComentarioPorId(@Param('idComentario') idComentario: number) {
    return this.cursoService.listarComentarioPorId(idComentario);
  }

  // Editar Comentário
  @Put('/comentarios/:idComentario')
  editarComentario(
    @Param('idComentario') idComentario: number,
    @Body('descricao') descricao: string,
  ) {
    return this.cursoService.editarComentario(idComentario, descricao);
  }

  // Eliminar Comentário
  @Delete('/comentarios/:idComentario')
  eliminarComentario(@Param('idComentario') idComentario: number) {
    return this.cursoService.eliminarComentario(idComentario);
  }

  @Put('conteudo/editar')
  editarConteudo(
    @Body('idMaterial') idMaterial: number,
    @Body('titulo') titulo: string,
    @Body('descricao') descricao: string,
    @Body('url') url: string,
    @Body('tipo') tipo: string
  ) {
    return this.cursoService.editarConteudo(idMaterial, titulo, descricao, url, tipo);
  }

  @Delete('conteudo/excluir/:idMaterial/:tipo')
  excluirConteudo(@Param('idMaterial') idMaterial: number, @Param('tipo') tipo: string) {
    return this.cursoService.excluirConteudo(idMaterial, tipo);
  }
}
