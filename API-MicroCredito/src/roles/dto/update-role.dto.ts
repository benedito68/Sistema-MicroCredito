import { IsString, IsOptional } from 'class-validator';

export class UpdateRoleDto {
  @IsOptional()
  @IsString()
  readonly roles?: string;  // Nome do papel

  @IsOptional()
  @IsString()
  readonly data_criada?: Date;  // Data de criação
}
