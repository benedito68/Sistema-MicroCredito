import { Module } from '@nestjs/common';
import { VagaRepository } from './vaga.repository';
import { VagaService } from './vaga.service';
import { VagaController } from './vaga.controller';

@Module({
  controllers: [VagaController],
  providers: [VagaRepository, VagaService],
})
export class VagaModule {}
