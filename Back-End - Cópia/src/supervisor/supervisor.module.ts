import { Module } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { SupervisorController } from './supervisor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupervisorRepository } from './supervisor.repository';  // Certifique-se de que o caminho está correto
import { Supervisor } from './entities/supervisor.entity';  // Certifique-se de que a entidade está importada corretamente

@Module({
  imports: [TypeOrmModule.forFeature([Supervisor, SupervisorRepository])],  // Registrar o repositório
  providers: [SupervisorService, SupervisorRepository],  // Adicionar o repositório aos provedores
  controllers: [SupervisorController],
})
export class SupervisorModule {}
