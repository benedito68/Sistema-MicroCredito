// src/roles/roles.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { UserRole } from '../usuario/entities/user-role.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Role, UserRole])],
  exports: [TypeOrmModule],
})
export class RolesModule {}
