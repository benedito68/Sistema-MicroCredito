import { Module } from '@nestjs/common';
import { CurriculoRepository } from './curriculo.repository';
import { CurriculoService } from './curriculo.service';
import { CurriculoController } from './curriculo.controller';

@Module({
  controllers: [CurriculoController],
  providers: [CurriculoRepository, CurriculoService],
})
export class CurriculoModule {}
