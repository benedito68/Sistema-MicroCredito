<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EncryptUserPasswords extends Command
{
    protected $signature = 'users:encrypt-passwords';
    protected $description = 'Criptografar todas as senhas de usuários que ainda estão em texto plano';

    public function handle()
    {
        // Busca todos os utilizadores
        $users = DB::table('utilizador')->get();

        foreach ($users as $user) {
            // Verifica se a senha já está criptografada (bcrypt começa com "$2y$")
            if (!str_starts_with($user->password, '$2y$')) {
                $hashedPassword = Hash::make($user->password);

                // Atualiza a senha criptografada no banco
                DB::table('utilizador')
                    ->where('id', $user->id)
                    ->update(['password' => $hashedPassword]);

                $this->info("Senha do usuário ID {$user->id} criptografada com sucesso.");
            } else {
                $this->info("Senha do usuário ID {$user->id} já está criptografada.");
            }
        }

        $this->info('Processo concluído.');
    }
}
