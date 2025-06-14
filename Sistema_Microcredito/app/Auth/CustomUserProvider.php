<?php

namespace App\Auth;

use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Contracts\Auth\Authenticatable;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

use Illuminate\Support\Facades\DB;

class CustomUserProvider implements UserProvider
{
    public function retrieveById($identifier)
    {
        $user = DB::select("CALL gerirContaUsuario(?, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)", ['listarPorId', $identifier]);
        return $this->getGenericUser($user[0] ?? null);
    }

    public function retrieveByToken($identifier, $token) { return null; }
    public function updateRememberToken(Authenticatable $user, $token) {}

   public function retrieveByCredentials(array $credentials)
{
    $user = DB::select("CALL gerirContaUsuario(?, NULL, NULL, NULL, ?, NULL, NULL, NULL, NULL, NULL, NULL, NULL)", [
        'autenticar',
        $credentials['email']
    ]);

    // Verifica se retornou resultado e pega o primeiro item
    $user = $user[0] ?? null;

    if ($user === null) {
        return null; // Nenhum usuário encontrado
    }

    logger('Usuário encontrado:', (array)$user); // Log opcional para debug

    return $this->getGenericUser($user);
}

    public function validateCredentials(Authenticatable $user, array $credentials)
    {
       return Hash::check($credentials['password'], $user->getAuthPassword());
       
    }

    protected function getGenericUser($user)
    {
        if (!$user) return null;

      //dd($user);
        return new \App\Models\User([
            'id' => $user->id,
            'nome' => $user->nome,
            'email' => $user->email,
            'password' => $user->password,
            'perfil' => $user->perfil
        ]);
    }

    public function rehashPasswordIfRequired(Authenticatable $user, array $credentials, bool $force = false): bool
{
    return false;
}

}


