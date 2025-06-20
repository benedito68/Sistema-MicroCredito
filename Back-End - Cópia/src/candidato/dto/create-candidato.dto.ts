export class CriarCandidatoDto {
  id: number; // ID do usuário
  idV: number; // ID da vaga (não é usado no INSERT diretamente mas precisa ser enviado)
  area: string;
  estado: string;
}
