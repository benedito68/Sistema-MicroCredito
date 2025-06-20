// src/usuario/entities/user-role.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity('tb_usuario_roles')
export class UserRole {
  @PrimaryGeneratedColumn()
  tb_usuario_roles: number;

  @ManyToOne(() => User, user => user.userRoles)
  @JoinColumn({ name: 'id_usuario' })
  user: User;

  @ManyToOne(() => Role, role => role.userRoles)
  @JoinColumn({ name: 'id_roles' })
  role: Role;

  @CreateDateColumn({ type: 'datetime', default: () => 'NOW()' })
  data_criada: Date;
}
