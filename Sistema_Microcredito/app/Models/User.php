<?php

namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;

class User extends Model implements AuthenticatableContract
{
    use Authenticatable;

    protected $fillable = ['id', 'nome', 'email', 'password', 'perfil'];
    public $timestamps = false;

    // Sobrescrever nome da tabela se necessário
    protected $table = 'utilizador'; // Caso você use Eloquent também.
}

