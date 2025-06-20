export class CreateEstagiarioDto {
    tb_id_usuario: number;
    periodo: string;
    tb_supervisor_tb_id_usuario: number;
    estado: 'Em estagio' | 'Concluido';
    remunerado: 'Sim' | 'Nao';
  }
  