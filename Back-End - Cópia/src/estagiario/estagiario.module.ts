import { Module } from '@nestjs/common';
import { EstagiarioService } from './estagiario.service';
import { EstagiarioController } from './estagiario.controller';
import { EstagiarioRepository } from './estagiario.repository';

@Module({
  controllers: [EstagiarioController],
  providers: [EstagiarioService, EstagiarioRepository],
})
export class EstagiarioModule {}
