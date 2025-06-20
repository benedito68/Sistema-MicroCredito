// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './usuario/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { RolesModule } from './roles/roles.module';
import { RolesGuard } from './roles/roles.guard';
import { APP_GUARD } from '@nestjs/core';

import { SupervisorModule } from './supervisor/supervisor.module';
import { CandidatoModule } from './candidato/candidato.module';
import { VagaModule } from './vaga/vaga.module';
import { CurriculoModule } from './curriculo/curriculo.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { EstagiarioModule } from './estagiario/estagiario.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    RolesModule,
    SupervisorModule,
    CandidatoModule,
    VagaModule,
    CurriculoModule,
    
    AvaliacaoModule,
    
    EstagiarioModule

  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
