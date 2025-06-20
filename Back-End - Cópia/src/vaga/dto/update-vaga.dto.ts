export class UpdateVagaDto {
    idVaga: number;
    area_vaga: string;
    Requisitos: string;
    prazo: number;
    cidade_idCidade: number;
    estado: 'Aberto' | 'Fechado';
  }
  