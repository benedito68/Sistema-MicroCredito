// src/roles/roles.guard.ts

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorators';
import { Role } from './roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user) {
      console.log(`User roles: ${user.roles}`); // Exibe as roles do usuário ao verificar as permissões
    }

    if (!user || !requiredRoles.some(role => user.roles?.includes(role))) {
      throw new ForbiddenException('Você não tem as funções necessárias');
    }
    return true;
  }
}
