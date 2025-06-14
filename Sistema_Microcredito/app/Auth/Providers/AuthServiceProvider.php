<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;
use App\Auth\CustomUserProvider;

class AuthServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // Registrar o provider customizado
        Auth::provider('custom', function ($app, array $config) {
            return new CustomUserProvider();
        });
    }
}
