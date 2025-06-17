// src/usuario/users.service.ts
import { Injectable, BadRequestException , UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';  // Certifique-se de que o caminho está correto
import { RegisterAuthDto } from '../auth/dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
    private readonly dataSource: DataSource,
  ) {}

  //CORRIGIR -- this.saltRounds
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.criarUsuario( createUserDto);
    return user;
  }
  

  async updateUser(id: number, createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.updateUser(id,createUserDto);
  }
  
  

  async deleteUser(id: number): Promise<any> {
    return await this.userRepository.deleteUser(id);
  }
  
  

  async addRoles(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.adicionarRolesUsuario(createUserDto);
    return user;
  }
  
  

  async ativarRoles(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.ativarRolesUsuario(createUserDto);
    return user;
  }
  
  

  async desativarRoles(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.desativarRolesUsuario(createUserDto);
    return user;
  }


  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['userRoles', 'userRoles.role'],
    });
  }
  

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['userRoles', 'userRoles.role'], 
    });
  }

  async findById(id_usuario: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id_usuario },
      relations: ['userRoles', 'userRoles.role'], 
    });
  }

  async findUserWithRoles(userId: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id_usuario: userId },
      relations: ['userRoles', 'userRoles.role'],
    });
  }

  async GerarToken( createUserDto: CreateUserDto): Promise <string>{
    return await this.userRepository.GerarToken(createUserDto);
  }

  async GerarCodigo( createUserDto: CreateUserDto): Promise <string>{
    return await this.userRepository.GerarCodigo(createUserDto);
  }

  async ValidarToken( token:string): Promise <string>{
    return await this.userRepository.ValidarToken( token);
  }

  async ValidarCodigo( codigo:number, email:string): Promise <any>{
    return await this.userRepository.ValidarCodigo( codigo, email);
  }

  async recuperarSenha(createUserDto: CreateUserDto) : Promise<string>  { 
    return await this.userRepository.RecuperarSenha(createUserDto); 
    }

    async AlterarSenha(createUserDto: CreateUserDto) : Promise<string>  { 
      return await this.userRepository.AlterarSenha(createUserDto); 
      }

    // Método para buscar todos os pré-registros
    async findCidades(): Promise<any> {
      return await this.userRepository.listarCidades();
    }

    async findRolesbyId(id_usuario: number): Promise<any> {
      return await this.userRepository.findRolesbyId(id_usuario);
    }
    

    async listarTodos(): Promise<any> {
      return await this.userRepository.listarTodos();
    }

    async listarporId(id_usuario: number): Promise<User> {
      return await this.userRepository.listarporId(id_usuario);
    }
  }
