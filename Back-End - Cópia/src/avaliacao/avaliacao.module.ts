import { Module } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoController } from './avaliacao.controller';
import { AvaliacaoRepository } from './avaliacao.repository';


@Module({
  controllers: [AvaliacaoController],
  providers: [AvaliacaoService, AvaliacaoRepository],
})
export class AvaliacaoModule {}
