import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  readonly roles: string;  // Nome do papel

  @IsString()
  readonly data_criada: Date;  // Data de criação
}
