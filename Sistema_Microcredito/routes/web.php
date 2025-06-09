<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\EmprestimoController;
use App\Http\Controllers\GrupoController;

// Login
Route::get('/', [AuthController::class, 'showLogin'])->name('login');

// Solicitar conta
Route::get('/solicitar-conta', [AuthController::class, 'showSolicitarConta'])->name('solicitar-conta');

// Dashboard
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

// Perfil de usuário
Route::get('/perfil-usuario', [UsuarioController::class, 'perfil'])->name('perfil-usuario');

// Empréstimos
Route::get('/meus-emprestimos', [EmprestimoController::class, 'meusEmprestimos'])->name('meus-emprestimos');
Route::get('/solicitar-emprestimo', [EmprestimoController::class, 'solicitar'])->name('solicitar-emprestimo');

// Grupos
Route::get('/grupos-poupanca', [GrupoController::class, 'gruposPoupanca'])->name('grupos-poupanca');
Route::get('/adesao-grupos', [GrupoController::class, 'adesao'])->name('adesao-grupos');
Route::get('/criar-grupo', [GrupoController::class, 'criar'])->name('criar-grupo');
