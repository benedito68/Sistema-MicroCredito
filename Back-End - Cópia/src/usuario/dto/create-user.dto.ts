export class CreateUserDto {
    idUsuario: string; // Correspondente a `id_usuario`
    nome: string; // Correspondente a `nome`
    apelido: string; // Correspondente a `apelido`
    username: string; // Correspondente a `username`
    email: string; // Correspondente a `email`
    password: string; // Correspondente a `senha`
    newPassword: string; // Correspondente a `senha`
    anoDeNascimento: Date; // Correspondente a `ano_de_nascimento`
    idCidade: number; // Correspondente a `idCidade`
    contato1?: string; // Correspondente a `contato1` (opcional)
    contato2?: string; // Correspondente a `contato2` (opcional)
    urlImage?: string; // Correspondente a `urlImage` (opcional)
    estadoUsuario?: boolean; // Correspondente a `estadoUsuario` (opcional)
    eliminado?: boolean; // Correspondente a `estadoUsuario` (opcional)
    tipoRoles: number; // Relacionado a `id_roles` em `tb_usuario_roles`
    roles: string; // Relacionado ao campo `roles` em `tb_roles`
    oldPassword: string;
}

