// src/usuario/users.controller.ts
import { Controller, Post, Get, Body, Param, UseGuards, NotFoundException, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorators';
import { Role } from '../roles/roles.enum';
import { CreateUserDto } from './dto/create-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  //CORRIGIR
  @Post('/add/User')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  //COORIGIR
  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles(Role.ADMIN)
  @Post('/add/roles')
  addRoles(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.addRoles(createUserDto);
  }

  // Método para atualizar um usuário pelo ID
  @Put('/:id')
  async updateUser(@Param('id') id: number, @Body() createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.updateUser(id, createUserDto);
  }

  //CORRIGIR
  // Método para deletar um usuário pelo ID
  @Delete('/:id')
  async deleteUser(@Param('id') id: number): Promise<any> {
    try {
      // console.log('Removido');
      return await this.usersService.deleteUser(id);
    } catch (error) {
      return `Falha ao eliminar o usuario ${error}`
    }
  }

  //CORRIGIR
  //UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles(Role.ADMIN)
  @Put('/roles/ativar')
  async ativarRUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.ativarRoles(createUserDto);
  }
  //CORRIGIR
  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles(Role.ADMIN)
  @Put('/roles/desativar')
  async desativarRUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.desativarRoles(createUserDto);
  }


  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    // Remover a senha de todos os usuários e incluir roles
    return users.map(({ senha, userRoles, ...userWithoutPassword }) => ({
      ...userWithoutPassword,
      roles: userRoles.map(userRole => userRole.role.roles),
    }));
  }

  //@UseGuards(JwtAuthGuard)
  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      // Remover a senha do usuário antes de retornar
      const { senha, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    throw new NotFoundException(`Usuário com email ${email} não encontrado`);
  }

  @Get(':id')
  async findById(@Param('id') id_usuario: number) {
    const user = await this.usersService.findById(id_usuario);
    if (user) {
      // Remover a senha do usuário antes de retornar
      const { senha, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    throw new NotFoundException(`Usuário com email ${id_usuario} não encontrado`);
  }

  @Get('/0/cidade')
  findCidade() {
    return this.usersService.findCidades();
  }

  @Get('/roles/:id')
  findRolesbyId(@Param('id') id_usuario: number) {
    return this.usersService.findRolesbyId(id_usuario);
  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles(Role.ADMIN)
  @Get('/todos/usuarios')
  listarTodos() {
    return this.usersService.listarTodos();
  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles(Role.ADMIN)
  @Get('/buscar/:id')
  async listarporId(@Param('id') id_usuario: number) {
    return await this.usersService.listarporId(id_usuario);

  }

  @Post('GerarToken')
  async GerarToken(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.GerarToken(createUserDto);
  }

  @Post('GerarCodigo')
  async GerarCodigo(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.GerarCodigo(createUserDto);
  }

  @Get('ValidarToken/:token')
  async ValidarToken(@Param('token') token: string) {
    return await this.usersService.ValidarToken(token);
  }

  @Get('ValidarCodigo/:codigo/:email')
  async ValidarCodigo(@Param('codigo') codigo: number, @Param('email') email: string) {
    return await this.usersService.ValidarCodigo(codigo, email);
  }

  @Post('RedefinirSenha')
  async recuperarSenha(@Body() createUserDto: CreateUserDto): Promise<string> {
    return await this.usersService.recuperarSenha(createUserDto);
  }

  @Post('AlterarSenha')
  async AlterarSenha(@Body() createUserDto: CreateUserDto): Promise<string> {
    return await this.usersService.AlterarSenha(createUserDto);
  }
}
