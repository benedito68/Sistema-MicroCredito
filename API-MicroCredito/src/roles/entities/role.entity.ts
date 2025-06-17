// src/roles/entities/role.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { UserRole } from '../../usuario/entities/user-role.entity';

@Entity('tb_roles')
export class Role {
  @PrimaryGeneratedColumn()
  id_roles: number;

  @Column()
  roles: string; // Nome correto da coluna

  @CreateDateColumn({ type: 'datetime', default: () => 'NOW()' })
  data_criada: Date;

  @OneToMany(() => UserRole, userRole => userRole.role)
  userRoles: UserRole[];
}
