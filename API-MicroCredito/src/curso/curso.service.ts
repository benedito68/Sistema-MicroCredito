import { Injectable } from '@nestjs/common';
import { CreateComentarioDto, CreateConteudoMaateriaDto, CreateCursoDto, CreateMateriasDto, CreateUsuarioCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto, UpdateMateriasDto } from './dto/update-curso.dto';
import { CursoRepository } from './curso.repository';

@Injectable()
export class CursoService {
  constructor(private readonly cursoRepository: CursoRepository) { }

  //METODOS POST
  async create(createCursoDto: CreateCursoDto): Promise<any> {
    console.log('Curso 2');
    
    const curso = await this.cursoRepository.adicionarCurso(createCursoDto);
    return curso;
  }

  async addMateria(createMateriasDto: CreateMateriasDto): Promise<any> {
    const materias = await this.cursoRepository.adicionarMateriasCurso(createMateriasDto);
    return materias;
  }

  async addConteudo(createConteudoMaateriaDto: CreateConteudoMaateriaDto): Promise<any> {
    console.log('Conteudo 2: Sevice');
    
    const materias = await this.cursoRepository.adicionarConteudoMateria(createConteudoMaateriaDto);
    return materias;
  }

  async addUsuarioCurso(createUsuarioCursoDto: CreateUsuarioCursoDto): Promise<any> {
    const cursoU = await this.cursoRepository.adicionarUsuarioCurso(createUsuarioCursoDto);
    return cursoU;
  }

  //METODOS GET
  async findAll(): Promise<any> {
    return await this.cursoRepository.listarTodos();
  }

  async listarporIdUsuario(id_usuario: number): Promise<any> {
    return await this.cursoRepository.listarporidUsuario(id_usuario);
  }

  async findCursobyId(idCurso: number): Promise<any> {
    return await this.cursoRepository.findCursobyId(idCurso);
  }

  async listarMateriasCurso(idMaterias: number): Promise<any> {
    return await this.cursoRepository.listarMateriasCurso(idMaterias);
  }

  async listarporIdCategoria(): Promise<any> {
   // console.log('Categoria 2');
    
    return await this.cursoRepository.listarporidCategoria();
  }

  async listarCursoUsuario(idUsuario: number): Promise<any> {
    return await this.cursoRepository.listarCursosdeUsuario(idUsuario);
  }

  async listarUsuarioCurso(idCurso: number): Promise<any> {
    return await this.cursoRepository.listarUsuarioCurso(idCurso);
  }

  async listarConteudoMateria(idMateria: number): Promise<any> {
    return await this.cursoRepository.listarConteudoMateria(idMateria);
  }

  //METDOS PUT
  async updateCurso(id: number, updteCursoDto: UpdateCursoDto): Promise<any> {
    return this.cursoRepository.updateCurso(id,updteCursoDto);
  }

  async updateMaterias(id: number, updteMateriasDto: UpdateMateriasDto): Promise<any> {
    return this.cursoRepository.updateMateria(id,updteMateriasDto);
  }

  async ativarCursoUsuario(idUsuario: number, idCurso: number): Promise<any> {
    return this.cursoRepository.AtivarCursoUsuario(idUsuario,idCurso);
  }

  async atualizarEstadoCursoUsuario(idUsuario: number, idCurso: number): Promise<any> {
    return this.cursoRepository.atualizarEsatdoCurso(idUsuario,idCurso);
  }

  //METODOS DELETE
  async deleteMateria(id: number): Promise<any> {
    return this.cursoRepository.deleteMateria(id);
  }

    // Adicionar Comentário
    async adicionarComentario(createComentarioDto: CreateComentarioDto): Promise<any> {
      return await this.cursoRepository.adicionarComentario(createComentarioDto);
    }
  
    // Listar Comentários de um Curso
    async listarComentariosCurso(idCurso: number): Promise<any> {
      return await this.cursoRepository.listarComentariosCurso(idCurso);
    }
  
    // Listar Comentário por ID
    async listarComentarioPorId(idComentario: number): Promise<any> {
      return await this.cursoRepository.listarComentarioPorId(idComentario);
    }
  
    // Editar Comentário
    async editarComentario(idComentario: number, descricao: string): Promise<any> {
      return await this.cursoRepository.editarComentario(idComentario, descricao);
    }
  
    // Eliminar Comentário
    async eliminarComentario(idComentario: number): Promise<any> {
      return await this.cursoRepository.eliminarComentario(idComentario);
    }

    async editarConteudo(idMaterial: number, titulo: string, descricao: string, url: string, tipo: string) {
      return this.cursoRepository.editarConteudo(idMaterial, titulo, descricao, url, tipo);
    }
  
    async excluirConteudo(idMaterial: number, tipo: string) {
      return this.cursoRepository.excluirConteudo(idMaterial, tipo);
    }

}
