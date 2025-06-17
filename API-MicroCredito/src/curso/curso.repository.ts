// src/usuario/users.repository.ts
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateComentarioDto, CreateConteudoMaateriaDto, CreateCursoDto, CreateMateriasDto, CreateUsuarioCursoDto } from './dto/create-curso.dto';
import { Curso } from './entities/curso.entity';
import { UpdateCursoDto, UpdateMateriasDto } from './dto/update-curso.dto';


@Injectable()
export class CursoRepository extends Repository<Curso> {
    constructor(private dataSource: DataSource) {
        super(Curso, dataSource.createEntityManager());
    }

    //METODOS DE CURSOS
    async adicionarCurso(createCursoDto: CreateCursoDto): Promise<any> {
       //console.log('Dados de Curso da Post: ', createCursoDto);
        
        const { nomeCurso, duracao, preco, idFormador, idCategoria, imagem } = createCursoDto;

        // Monta a chamada do procedimento com os valores do DTO
        const sql = `
        CALL gerirCursos('adicionarCurso', NULL, '${nomeCurso}', '${duracao}', NULL, '${preco}', ${idFormador}, ${idCategoria}, '${imagem}'          
        );`;

        // Executa a query no banco de dados
        const curso = await this.dataSource.query(sql);

        // Retorna o resultado
        return curso[0];
    }


    async updateCurso(id: number, updateCursoDto: UpdateCursoDto): Promise<any> {
        const {
            nomeCurso, duracao, preco, idFormador, idCategoria, ativo, imagem} = updateCursoDto;
        const idC = id;

        const sql = `
        CALL gerirCursos('editarCurso', ${idC}, '${nomeCurso}', '${duracao}', ${ativo}, ${preco}, ${idFormador}, ${idCategoria},${imagem});`;

        const usuario = await this.dataSource.query(sql);

        return usuario[0];
    }

    async listarTodos(): Promise<any> {
        try {
            const query = `CALL gerirCursos('listarTodos', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);`;
            const is = await this.dataSource.query(query, []);

            return is[0];

        } catch (error) {

            console.error('Erro ao listar cursos: ' + error.message);
            throw new InternalServerErrorException('Falha ao listar cursos');
        }
    }


    async listarporidUsuario(id_usuario: number): Promise<any> {
        try {
            const query = `CALL gerirCursos(
            'listarporidUsuario',NULL, NULL, NULL, NULL, NULL, ${id_usuario},NULL, NULL);`;
            const is = await this.dataSource.query(query, []);
            return is[0];
        } catch (error) {
            console.error('Erro ao listar curso por idUsuario: ' + error.message);
            throw new InternalServerErrorException('Falha ao listar ccurso por idUsuario');
        }
    }

    async listarporidCategoria(): Promise<any> {
      //  console.log('Categoria 3');
        
        try {
            const query = `CALL gerirCursos(
            'listarCategorias',NULL, NULL, NULL, NULL, NULL, NULL, NULL,NULL )`;
            const is = await this.dataSource.query(query);
       //     console.log(is[0]);
            
            return is[0];
        } catch (error) {
            console.error('Erro ao listar Categiras do Curso: ' + error.message);
            throw new InternalServerErrorException('Falhas ao listar Categorias do curso');
        }
    }



    //METODOS DE MATERIAS 
    async adicionarMateriasCurso(createMateriasDto: CreateMateriasDto): Promise<any> {
        //POR ENQUANTO NAO SOBE NENHUM ARQUIVO....    
        const { nomeMateria, idCurso, descricao } = createMateriasDto;

        const sql = `
        CALL gerirMateriais('adicionarMaterialCurso', NULL, '${nomeMateria}', ${idCurso}, '${descricao}');
        `;
        
        const materias = await this.dataSource.query(sql);
        return materias[0];
    }


    async updateMateria(id: number, updateMateriasDto: UpdateMateriasDto): Promise<any> {
        const {
            //AINDA NAO SOBE NENHUM ARQUIVO
            nomeMateria, idCurso, descricao
        } = updateMateriasDto;
        const idM = id;
        const sql = `
        CALL gerirMateriais('EditarMaterialCurso',${idM}, '${nomeMateria}', ${idCurso}, '${descricao}');
            `;

        const materias = await this.dataSource.query(sql);

        return materias[0];
    }


    async deleteMateria(id: number): Promise<any> {
        const idM = id;
        const sql = `
        CALL gerirMateriais('EliminarMaterialCurso',${idM}, NULL, NULL, NULL, NULL, NULL);
            `;

        // Executa a consulta
        const materias = await this.dataSource.query(sql);
        // Retorna o resultado
        return materias[0];
    }

    async listarMateriasCurso(idCurso: number): Promise<any> {
        try {
            const query = `
            CALL gerirMateriais('ListarMaterialCurso',NULL, NULL, ${idCurso}, NULL);
            `;
            const materias = await this.dataSource.query(query);
            return materias[0];
        } catch (error) {
            console.error('Erro ao listar curso por idUsuario: ' + error.message);
            throw new InternalServerErrorException('Falha ao listar ccurso por idUsuario');
        }
    }

    async findCursobyId(idCurso: number): Promise<any> {
        try {
            const query = `
            CALL gerirCursos('listarporidCurso', ${idCurso}, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
            `;
            const materias = await this.dataSource.query(query);
            return materias[0][0];
        } catch (error) {
            console.error('Erro ao listar curso por idUsuario: ' + error.message);
            throw new InternalServerErrorException('Falha ao encontrar curso por idCurso');
        }
    }


    //USUARIOS INSCRITOS NO CURSO
    //METODOS DE CURSOS
    async adicionarUsuarioCurso(createUsuarioCursoDto: CreateUsuarioCursoDto): Promise<any> {
        const { idUsuario, idCurso } = createUsuarioCursoDto;
        // Monta a chamada do procedimento com os valores do DTO
        const sql = `CALL gerirCursosUsuario('AdicionarCursoUsuario',${idUsuario}, ${idCurso});`;
        // Executa a query no banco de dados
        const curso = await this.dataSource.query(sql);
        // Retorna o resultado
        return curso[0];
    }

    async AtivarCursoUsuario(idUsuario: number, idCurso: number): Promise<any> {
        const idU = idUsuario;
        const idC = idCurso;
        const sql = `CALL gerirCursosUsuario('AtivarCurso',${idC}, ${idU});`;
        const materias = await this.dataSource.query(sql);
        return materias[0];
    }

    async atualizarEsatdoCurso(idUsuario: number, idCurso: number): Promise<any> {
        const idU = idUsuario;
        const idC = idCurso;
        const sql = `CALL gerirCursosUsuario('AlterarEstado',${idC}, ${idU});`;
        const materias = await this.dataSource.query(sql);
        return materias[0];
    }


    async listarCursosdeUsuario(idUsuario: number): Promise<any> {
        try {
            const query = `
            CALL gerirCursosUsuario('ListarCursodeUsuario',${idUsuario},NULL);
            `;
            const cursos = await this.dataSource.query(query);
            return cursos[0];
        } catch (error) {
            console.error('Erro ao listar curso por idUsuario: ' + error.message);
            throw new InternalServerErrorException('Falha ao listar ccurso por idUsuario');
        }
    }

    async listarUsuarioCurso(idCurso: number): Promise<any> {
        try {
            const query = `
            CALL gerirCursosUsuario('ListarUsuarionoCurso',NULL, ${idCurso});
            `;
            const cursos = await this.dataSource.query(query);
            return cursos[0];
        } catch (error) {
            console.error('Erro ao listar curso por idUsuario: ' + error.message);
            throw new InternalServerErrorException('Falha ao listar ccurso por idUsuario');
        }
    }


        //METODOS DE MATERIAS 
        async adicionarConteudoMateria(createConteudoMaateriaDto: CreateConteudoMaateriaDto): Promise<any> {
            console.log('Conteudo 3: Repostirorio');
            
            try {
                            //POR ENQUANTO NAO SOBE NENHUM ARQUIVO....    
            const { titulo, descricao, url, idMateria, tipo } = createConteudoMaateriaDto;
            console.log('Dados vindo do Front: ', createConteudoMaateriaDto);
            
    
            const sql = `
            CALL gerirConteudosMaterias('adicionarConteudo', ${idMateria}, '${titulo}', '${descricao}', '${url}','${tipo}');
            `;
            console.log('Comado SQL: ', sql);
                
            
            await this.dataSource.query(sql);
            
            return {Status: 'Conteudo da materia adicionado com sucesso'};
            } catch (error) {
                console.log('Erro Conteudo: ', error);              
            }

        }

    async listarConteudoMateria(idMateria: number): Promise<any> {
        try {
            const query = `
            CALL gerirConteudosMaterias('listarTodos', ${idMateria}, NULL, NULL, NULL, NULL)
            `;
            const cursos = await this.dataSource.query(query);
            return cursos[0];
        } catch (error) {
            console.error('Erro ao listar curso por idUsuario: ' + error.message);
            throw new InternalServerErrorException('Falha ao listar ccurso por idUsuario');
        }
    }

    // Adicionar Comentário
    async adicionarComentario(createComentarioDto: CreateComentarioDto): Promise<any> {
        try {
            const { descricao, idUsuario, idCurso } = createComentarioDto;
            const sql = `CALL gerirComentarios('adicionarComentario', NULL, '${descricao}', ${idUsuario}, ${idCurso})`;
            await this.dataSource.query(sql);
            return { Status: 'Comentário adicionado com sucesso' };
        } catch (error) {
            console.error('Erro ao adicionar comentário: ', error);
            throw new InternalServerErrorException('Falha ao adicionar comentário');
        }
    }

    // Listar Comentários de um Curso
    async listarComentariosCurso(idCurso: number): Promise<any> {
        try {
            const sql = `CALL gerirComentarios('listarComentariosCurso', NULL, NULL, NULL, ${idCurso})`;
            const comentarios = await this.dataSource.query(sql);
            return comentarios[0];
        } catch (error) {
            console.error('Erro ao listar comentários do curso: ', error);
            throw new InternalServerErrorException('Falha ao listar comentários do curso');
        }
    }

    // Listar Comentário por ID
    async listarComentarioPorId(idComentario: number): Promise<any> {
        try {
            const sql = `CALL gerirComentarios('listarComentarioPorId', ${idComentario}, NULL, NULL, NULL)`;
            const comentario = await this.dataSource.query(sql);
            return comentario[0];
        } catch (error) {
            console.error('Erro ao listar comentário por ID: ', error);
            throw new InternalServerErrorException('Falha ao listar comentário');
        }
    }

    // Editar Comentário
    async editarComentario(idComentario: number, descricao: string): Promise<any> {
        try {
            const sql = `CALL gerirComentarios('editarComentario', ${idComentario}, '${descricao}', NULL, NULL)`;
            await this.dataSource.query(sql);
            return { Status: 'Comentário editado com sucesso' };
        } catch (error) {
            console.error('Erro ao editar comentário: ', error);
            throw new InternalServerErrorException('Falha ao editar comentário');
        }
    }

    // Eliminar Comentário
    async eliminarComentario(idComentario: number): Promise<any> {
        try {
            const sql = `CALL gerirComentarios('eliminarComentario', ${idComentario}, NULL, NULL, NULL)`;
            await this.dataSource.query(sql);
            return { Status: 'Comentário eliminado com sucesso' };
        } catch (error) {
            console.error('Erro ao eliminar comentário: ', error);
            throw new InternalServerErrorException('Falha ao eliminar comentário');
        }
    }

    async editarConteudo(idMaterial: number, titulo: string, descricao: string, url: string, tipo: string) {
        return this.dataSource.query(
          `CALL gerirConteudosMaterias('editarConteudo', ?, ?, ?, ?, ?)`,
          [idMaterial, titulo, descricao, url, tipo],
        );
      }
    
      async excluirConteudo(idMaterial: number, tipo: string) {
        return this.dataSource.query(
          `CALL gerirConteudosMaterias('excluirConteudo', ?, '', '', '', ?)`,
          [idMaterial, tipo],
        );
      }
}


