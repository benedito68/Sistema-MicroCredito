import { PartialType } from '@nestjs/swagger';
import { CreateCursoDto, CreateMateriasDto, CreateUsuarioCursoDto } from './create-curso.dto';

export class UpdateCursoDto extends PartialType(CreateCursoDto) {}
export class UpdateMateriasDto extends PartialType(CreateMateriasDto) {}
export class UpdateUsuarioCursoDto extends PartialType(CreateUsuarioCursoDto) {}