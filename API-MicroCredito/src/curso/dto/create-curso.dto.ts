export class CreateCursoDto {
    idCurso: string;
    nomeCurso: string;
    duracao: string;
    ativo: string;
    imagem:string;
    preco: string;
    idFormador: number;
    idCategoria: string;
}


export class CreateMateriasDto {
    idMateria: number;
    nomeMateria: string;
    idCurso: number;
    descricao: number;
}

export class CreateConteudoMaateriaDto {
    titulo: string;
    descricao: string;
    url: string;
    idMateria: number;
    tipo: string;
}

export class CreateUsuarioCursoDto {
    idCurso: number;
    idUsuario: number;
}

export class CreateComentarioDto {
    descricao: string;
    idUsuario: number;
    idCurso: number;
}
