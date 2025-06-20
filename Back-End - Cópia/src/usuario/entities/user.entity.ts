// src/usuario/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { UserRole } from './user-role.entity';

@Entity('tb_usuario')
export class User {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'varchar', length: 255 })
  apelido: string;

  @Column({ type: 'varchar', length: 255 })
  username: string; // Adicionado

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'text' })
  senha: string;

  @Column({ type: 'varchar', length: 15, nullable: true }) 
  contato1: string; 

  @Column({ type: 'varchar', length: 15, nullable: true }) 
  contato2: string; 

  @Column({ type: 'int' })
  ano_de_nascimento: number;

  @Column({ type: 'int' })
  idCidade: number;

  @Column({ type: 'int' })
  urlImage: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'NOW()' })
  data_criacao: Date;

  @Column({ type: 'int' })
  estadoUsuario: string;

  @Column({ type: 'int' })
  eliminado: string;

  @OneToMany(() => UserRole, userRole => userRole.user)
  userRoles: UserRole[];
}
