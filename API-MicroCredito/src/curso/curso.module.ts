import { forwardRef, Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoController } from './curso.controller';
import { CursoRepository } from './curso.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/usuario/entities/user.entity';
import { UserRole } from 'src/usuario/entities/user-role.entity';

@Module({
   imports: [
      TypeOrmModule.forFeature([User, UserRole]),
      forwardRef(() => AuthModule), // Usando forwardRef para resolver dependência circular
    ],
  controllers: [CursoController],
  providers: [CursoService, CursoRepository], 
})
export class CursoModule {}
