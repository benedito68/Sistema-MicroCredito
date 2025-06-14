<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\EmprestimoController;
use App\Http\Controllers\GrupoController;

// Tela de Login
Route::get('/', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.perform');

// Tela de Solicitar conta
Route::get('/solicitar-conta', [AuthController::class, 'showSolicitarConta'])->name('solicitar-conta');
Route::post('/solicitar-conta', [AuthController::class, 'store'])->name('solicitar-conta.store');


// Dashboard protegida(Apenas se logado)
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard')->middleware('auth');



// Perfil de usuário
Route::get('/perfil-usuario', [UsuarioController::class, 'perfil'])->name('perfil-usuario');


// Empréstimos
Route::get('/meus-emprestimos', [EmprestimoController::class, 'meusEmprestimos'])->name('meus-emprestimos');
Route::get('/solicitar-emprestimo', [EmprestimoController::class, 'solicitar'])->name('solicitar-emprestimo');
Route::post('/solicitar-emprestimo', [EmprestimoController::class, 'store'])->name('solicitar-emprestimo.store');


// Grupos
Route::get('/grupos-poupanca', [GrupoController::class, 'gruposPoupanca'])->name('grupos-poupanca');
Route::get('/adesao-grupos', [GrupoController::class, 'adesao'])->name('adesao-grupos');
Route::get('/criar-grupo', [GrupoController::class, 'criar'])->name('criar-grupo');

// Logout
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');