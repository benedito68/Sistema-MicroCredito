import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  apelido: string;

  @IsNotEmpty()
  @IsString()
  username: string; // Adicionado

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  senha: string;

  @IsNotEmpty()
  @IsString()
  contato1: string;

  @IsNotEmpty()
  @IsString()
  contato2: string;

  @IsNotEmpty()
  ano_de_nascimento: Date;

  @IsNotEmpty()
  idCidade: number; // Adicionado

  @IsNotEmpty()
  @IsString()
  urlImage: string; // Adicionado
}
