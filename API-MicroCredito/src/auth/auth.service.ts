// src/auth/auth.service.ts
import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../usuario/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, senha: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && await bcrypt.compare(senha, user.senha) && user.estadoUsuario == '1' && user.eliminado == '0') {
      const { senha, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Email ou senha incorretos');
  }

  async login(user: any) {
    const roles = user.userRoles ? user.userRoles.map(userRole => userRole.role.roles) : [];
    //console.log('User:', { ...user, roles }); // Imprimir as roles do usuarios

    const payload = { 
      email: user.email, 
      sub: user.id_usuario, 
      nome: user.nome, 
      apelido: user.apelido,  
      urlImage: user.urlImage,
      roles: roles }; 
    //console.log('Dados U: ', payload);
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
