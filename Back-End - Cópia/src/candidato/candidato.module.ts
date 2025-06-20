import { Module } from '@nestjs/common';
import { CandidatoService } from './candidato.service';
import { CandidatoController } from './candidato.controller';
import { CandidatoRepository } from './candidato.repository';

@Module({
  imports: [],
  controllers: [CandidatoController],
  providers: [CandidatoService, CandidatoRepository],
})
export class CandidatoModule {}
