// src/usuario/users.repository.ts
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  //Buscar o usuario apenas com email
  async findByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } });

  }
  // chamada do procedimento q busca o usuario por email e seus roles
  async findByEmailUsingProcedure(email: string): Promise<User> {
    try {
      let sql = `CALL user_procedure('userPorEmail', 0, '', '', '${email}');`;
      let usuario = await this.dataSource.query(sql);

      // Verificar se o usuário foi encontrado
      if (!usuario || !usuario[0] || !usuario[0][0]) {
        throw new InternalServerErrorException('Usuário não encontrado');
      }

      let jc = usuario[0][0];

      // Verificar se o id está definido antes de acessá-lo
      if (!jc.id) {
        throw new InternalServerErrorException('Propriedade "id" não está definida');
      }

      let u = await this.dataSource.query('CALL list_roles_procedure(?)', [jc.id]);

      // Verificar se os papeis foram encontrados
      if (!u || !u[0]) {
        throw new InternalServerErrorException('Nenhum papel encontrado para o usuário');
      }

      let papeis = Array();
      u[0].forEach(element => {
        papeis.push(element.roles);
      });

      jc.roles = papeis;
      return jc;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar usuário por email: ' + error.message);
    }
  }


  async RecuperarSenha(createUserDto: CreateUserDto): Promise<string> {
    const salt = await bcrypt.genSalt();

    const { email, password } = createUserDto;
    //console.log('Dados do Created: ' + email , password);

    const queryEmail = `CALL GerirSenhaUsuario('user_procedure', NULL, '${email}' , NULL, NULL)`;
    const em = await this.dataSource.query(queryEmail);
    //console.log('Dados: ', em[0][0].id_usuario);



    const seU = `CALL GerirSenhaUsuario('obterUltimaSenha', ${em[0][0].id_usuario}, NULL, NULL, NULL )`;
    const senhaU = await this.dataSource.query(seU);
    //console.log('Senha e Id: ',senhaU[0][0].senha , em[0][0].id_usuario);

    const tkU = `CALL GerirSenhaUsuario('ObterTokenUsuario', ${em[0][0].id_usuario}, NULL, NULL, NULL )`;
    const tokenU = await this.dataSource.query(tkU);
    //  console.log('Token: ',tokenU[0][0].token);
    // console.log('Estado Usado 1: ',tokenU[0][0].usado);

    if (await bcrypt.compare(password, senhaU[0][0].senha)) {
      throw new InternalServerErrorException('Esta senha ja foi usado. Defina outra senha');
    }

    const hashednewPassword = await bcrypt.hash(password, salt);
    //  console.log('Hash de password: ' + hashednewPassword);

    const us = await this.dataSource.query(`CALL GerirSenhaUsuario('UsarToken', NULL, NULL, '${tokenU[0][0].token}', NULL)`);
    //  console.log('Estado Usado 2: ',us[0][0]);
    const query = `CALL GerirSenhaUsuario('AlterarSenha', ${em[0][0].id_usuario}, NULL, '${tokenU[0][0].token}' , '${hashednewPassword}')`;
    const result = await this.dataSource.query(query);

    return result[0][0];
  }


  async AlterarSenha(createUserDto: CreateUserDto): Promise<string> {
    const salt = await bcrypt.genSalt();

    const { idUsuario, password, oldPassword } = createUserDto;
    const seU = `CALL GerirSenhaUsuario('obterUltimaSenha', ${idUsuario}, NULL, NULL, NULL )`;
    const senhaU = await this.dataSource.query(seU);
    //console.log('Senha e Id: ',senhaU[0][0].senha , em[0][0].id_usuario);

    if (await bcrypt.compare(oldPassword, senhaU[0][0].senha)) {
      if (await bcrypt.compare(password, senhaU[0][0].senha)) {
        throw new InternalServerErrorException('Esta senha ja foi usado. Defina outra senha');
      }
  
      const hashednewPassword = await bcrypt.hash(password, salt);
      const query = `CALL GerirSenhaUsuario('MudarSenha', ${idUsuario}, NULL, NULL, '${hashednewPassword}');`;
      const result = await this.dataSource.query(query);
      return result[0][0]; 
    }else{
      throw new InternalServerErrorException('A senha antiga esta incorrecta, por favor digite a senha correcta');
    }
    
  }

  // Usar uuidv4 para criar ID de usuário com números somente
  generateUniqueIdUser(): string {
    const uuid = uuidv4(); // Gera um UUID padrão
    const numericId = uuid.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    const shortenedId = numericId.slice(0, 5); // Limita o tamanho para 12 dígitos (ou outro tamanho desejado)
    //  console.log(shortenedId);
    return shortenedId;
  }

  // Usar uuidv4 para criar ID de usuário com números somente
  generateCode(): string {
    const uuid = uuidv4(); // Gera um UUID padrão
    const numericId = uuid.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    const shortenedId = numericId.slice(0, 6); // Limita o tamanho para 12 dígitos (ou outro tamanho desejado)
    //  console.log(shortenedId);
    return shortenedId;
  }

  //Usar o uuidv6
  generateUniqueCode(): string {
    const id = uuidv4() + uuidv4() + uuidv4()
    //  console.log(id.substring(0, 100));

    return id.substring(0, 100);
  }


  //Gera um token e armazenar na tabela recuperaca
  async GerarToken(createUserDto: CreateUserDto): Promise<string> {
    try {
      const { email } = createUserDto;
      //  console.log('Dados Retornados: ', email);
      const query = `CALL GerirSenhaUsuario('user_procedure', NULL, '${email}' , NULL, NULL)`;
      const em = await this.dataSource.query(query);
      const token = this.generateUniqueCode();

      //  console.log('Token: ', token);


      const gtoken = `CALL GerirSenhaUsuario('GerarToken', ?, NULL, ?, NULL )`;
      const vtoken = await this.dataSource.query(gtoken, [em[0][0].id_usuario, token]);
      return vtoken[0][0];
    } catch (error) {
      throw new NotFoundException('Nao foi possivel localizar um usuario com este email');
    }
  }


  //Gera um token e armazenar na tabela recuperaca
  async GerarCodigo(createUserDto: CreateUserDto): Promise<string> {
    try {
      const { email } = createUserDto;
      // console.log('Dados Retornados: ', email);
      //const query = `CALL GerirSenhaUsuario('user_procedure', NULL, '${email}' , NULL, NULL)`;
      //const em = await this.dataSource.query(query);
      const codigo = this.generateCode();
      //   console.log('Codigo: ', codigo);

      const gtoken = `CALL GerirSenhaUsuario('GerarCodigo', NULL, ?, ?, NULL);`;
      const vtoken = await this.dataSource.query(gtoken, [email, codigo]);
      return vtoken[0][0];
    } catch (error) {
      throw new NotFoundException('Nao foi possivel localizar um usuario com este email');
    }
  }


  //Obtem o token e verificar na tabela recuperacao se existe e se pode ser usado
  async ValidarCodigo(codigo: number, email: string): Promise<any> {
    const horaAtual = moment();

    try {
      const tkU = `CALL GerirSenhaUsuario('ObterCodigo', NULL, ?, ?, NULL)`;
      const tokenU = await this.dataSource.query(tkU, [email, codigo]);

      //verficar token     
      if (codigo != tokenU[0][0].codigo) {
        throw new InternalServerErrorException('codigo de verificacao incorrecto');
      }

      const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
      //    console.log(currentTime);

      const diferencaEmMinutos = horaAtual.diff(tokenU[0][0].dataCriada, 'minutes');
      //  console.log('Tempo do Codigo de Ver: ' + diferencaEmMinutos);
      //   console.log('Codigo: ' , tokenU[0][0].codigo);


      if (diferencaEmMinutos > 10) {
        throw new InternalServerErrorException('Codigo expirado. Gerar novo codigo de verificacao');
      }

      await this.dataSource.query(`CALL gerirUsuarios(
      'AtualizarEstado', 
      NULL, 
      NULL, 
      NULL, 
      '${email}', 
      NULL, 
      NULL, 
      NULL, 
      NULL, 
      NULL, 
      NULL, 
      NULL, 
      NULL
      );`);
      return { Status: 'Codigo Valido' };

    } catch (error) {
      throw new InternalServerErrorException('Falha ao verificar a conta: ' + error.message);
    }
  }

  //Obtem o token e verificar na tabela recuperacao se existe e se pode ser usado
  async ValidarToken(token: string): Promise<string> {
    const horaAtual = moment();

    try {
      console.log('Manutencao Validacao');
      
      const tkU = `CALL GerirSenhaUsuario('obterToken', NULL, NULL, ?, NULL)`;
      const tokenU = await this.dataSource.query(tkU, [token]);

      //verficar token     
      if (token != tokenU[0][0].token) {
        throw new InternalServerErrorException('Token de redefinicao de senha incorrecto');
      }

      const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
      //console.log(currentTime);

      const diferencaEmMinutos = horaAtual.diff(tokenU[0][0].dataGerada, 'minutes');
      //  console.log('Tempo do Token: ' + diferencaEmMinutos);
      //  console.log('Token: ' , tokenU[0][0].token, 'Usado: ' , tokenU[0][0].usado);


      if (diferencaEmMinutos > 10) {
        throw new InternalServerErrorException('Token expirado. Gerar novo token de verificacao');
      }

      if (tokenU[0][0].usado == 1) {
        throw new InternalServerErrorException('Este token ja foi usado');
      }

      const result = await this.dataSource.query(`CALL GerirSenhaUsuario('AtualizarEstadoRecuperacao', NULL, NULL, ?, NULL)`, [token])

      return result[0][0];

    } catch (error) {
      throw new InternalServerErrorException('Falha ao redefinir a senha: ' + error.message);
    }
  }


  //Procedimnetos que precisam ser corrigidos e feitos

  async criarUsuario(createUserDto: CreateUserDto): Promise<any> {
    console.log('MANUTENCAO: ', createUserDto);
    
    //console.log('Senha: ', createUserDto.password);
    const uid = this.generateUniqueIdUser();
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    console.log('Senha Criptografada: ', hashedPassword);
    
    createUserDto.idUsuario = uid;

    const {
      nome, apelido, username, email, contato1,
      contato2, anoDeNascimento, idCidade, urlImage, estadoUsuario, idUsuario,
    } = createUserDto;

    // Monta a chamada do procedimento com os valores do DTO
    const sql = `
    CALL gerirUsuarios(
      'inserir', '${nome}', 
      '${apelido}', 
      '${username}', 
      '${email}', 
      '${hashedPassword}', 
      '${contato1 || ''}', 
      '${contato2 || ''}', 
      '${anoDeNascimento}', 
      ${idCidade}, 
      '${urlImage || ''}', 
      ${estadoUsuario !== undefined ? estadoUsuario : 'NULL'}, 
      ${idUsuario || 'NULL'}
    );
  `;

    // Executa a query no banco de dados
    const usuario = await this.dataSource.query(sql);

    // Retorna o resultado
    return { dado: usuario[0] };
  }



  async updateUser(idUsuario: number, createUserDto: CreateUserDto): Promise<any> {
    const {
      nome,
      apelido,
      username,
      email,
      
      contato1,
      contato2,
      anoDeNascimento,
      idCidade,
      urlImage,
      estadoUsuario,
    } = createUserDto;


    // Monta o SQL para chamar o procedimento de edição
    const sql = `
    CALL gerirUsuarios(
      'editar',
      '${nome}',
      '${apelido}',
      '${username}',
      '${email}',
      'NULL',
      '${contato1 || ''}',
      '${contato2 || ''}',
      '${anoDeNascimento}',
      ${idCidade},
      '${urlImage || ''}',
      ${estadoUsuario !== undefined ? estadoUsuario : 'NULL'},
      ${idUsuario}
    );
  `;

    // Executa a consulta
    const usuario = await this.dataSource.query(sql);

    // Retorna o resultado
    return usuario[0];
  }


  async deleteUser(id: number): Promise<any> {
    try {
      let sql = `CALL gerirUsuarios('excluir', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ${id})`;
      let usuario = await this.dataSource.query(sql);
      console.log('Usuario eliminado: ', usuario[0]);
      return { dado: usuario[0][0] }
    } catch (error) {
      console.error('Falha ao eliminar usuario: ', error);
    }
  }

  // Função para adicionar uma nova role a um usuário
  async adicionarRolesUsuario(createUserDto: CreateUserDto): Promise<any> {
    // Obtém o ID da role correspondente ao nome fornecido
    const sql1 = `CALL gerirPermissoes('roles', null, null, '${createUserDto.roles}')`;
    const idRolesResult = await this.dataSource.query(sql1);

    // Verifica se o ID da role foi encontrado
    if (!idRolesResult[0] || idRolesResult[0].length === 0) {
      throw new Error(`Role '${createUserDto.roles}' não encontrada.`);
    }

    const idRoles = idRolesResult[0][0].id_roles;
    console.log('Id da roles: ', idRoles);


    // Associa a role ao usuário
    const sql2 = `CALL gerirPermissoes('adicionarRoles', ${createUserDto.idUsuario}, ${idRoles}, null)`;
    const roles = await this.dataSource.query(sql2);

    return { dado: roles[0][0] };
  }

  // Função para ativar uma role já associada a um usuário
  async ativarRolesUsuario(createUserDto: CreateUserDto): Promise<any> {
    // Obtém o ID da role correspondente ao nome fornecido
    const sql1 = `CALL gerirPermissoes('roles', null, null, '${createUserDto.roles}')`;
    const idRolesResult = await this.dataSource.query(sql1);

    // Verifica se o ID da role foi encontrado
    if (!idRolesResult[0] || idRolesResult[0].length === 0) {
      throw new Error(`Role '${createUserDto.roles}' não encontrada.`);
    }

    const idRoles = idRolesResult[0][0].id_roles;

    // Ativa a role para o usuário
    const sql2 = `CALL gerirPermissoes('ativarRoles', ${createUserDto.idUsuario}, ${idRoles}, null)`;
    const roles = await this.dataSource.query(sql2);

    return { dado: roles[0][0] };
  }

  // Função para desativar uma role de um usuário
  async desativarRolesUsuario(createUserDto: CreateUserDto): Promise<any> {
    // Obtém o ID da role correspondente ao nome fornecido
    const sql1 = `CALL gerirPermissoes('roles', null, null, '${createUserDto.roles}')`;
    const idRolesResult = await this.dataSource.query(sql1);

    // Verifica se o ID da role foi encontrado
    if (!idRolesResult[0] || idRolesResult[0].length === 0) {
      throw new Error(`Role '${createUserDto.roles}' não encontrada.`);
    }

    const idRoles = idRolesResult[0][0].id_roles;

    // Desativa a role para o usuário
    const sql2 = `CALL gerirPermissoes('desativarRoles', ${createUserDto.idUsuario}, ${idRoles}, null)`;
    const roles = await this.dataSource.query(sql2);

    return { dado: roles[0][0] };
  }

  async listarCidades(): Promise<any> {
    try {
      const query = `CALL gerirLocalizacao('listarCidades', NULL, NULL, NULL, NULL, NULL, NULL);`;
      const is = await this.dataSource.query(query, []);

      console.log(is[0]);
      return is[0];

    } catch (error) {

      console.error('Falha ao Listar Cidades: ' + error.message);
      throw new InternalServerErrorException('Falha ao listar pré-inscrição');
    }
  }

  async listarTodos(): Promise<any> {
    try {
      const query = `CALL gerirUsuarios(
    'listarTodos', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);`;
      const is = await this.dataSource.query(query, []);

      //console.log(is[0]);
      return is[0];

    } catch (error) {

      console.error('Erro ao listar pré-inscrição: ' + error.message);
      throw new InternalServerErrorException('Falha ao listar pré-inscrição');
    }
  }

  async listarporId(id_usuario: number): Promise<any> {
    try {
      const query = `CALL gerirUsuarios(
    'listarPorId', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 
    NULL, NULL, NULL, NULL, ${id_usuario})`;
      const is = await this.dataSource.query(query, []);

      //console.log(is[0]);
      return is[0][0];

    } catch (error) {

      console.error('Erro ao listar pré-inscrição: ' + error.message);
      throw new InternalServerErrorException('Falha ao listar pré-inscrição');
    }
  }


  async findRolesbyId(id_usuario: number): Promise<any> {
    try {
      const query = `CALL gerirPermissoes('listarRolesUsuarioporId', ${id_usuario}, NULL, NULL)`;
      const is = await this.dataSource.query(query, []);

      //console.log(is[0]);
      return is[0];

    } catch (error) {

      console.error('Erro ao listar pré-inscrição: ' + error.message);
      throw new InternalServerErrorException('Falha ao listar pré-inscrição');
    }
  }

}


