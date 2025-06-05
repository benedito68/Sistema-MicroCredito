<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index');
})->name('login');

//solictar conta
Route::get('/solicitar-conta', function () {
    return view('solicitar-conta');
})->name('solicitar-conta');


// Página principal do dashboard
Route::get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

// Outras páginas
Route::get('/meus-emprestimos', function () {
    return view('meus-emprestimos');
})->name('meus-emprestimos');

Route::get('/grupos-poupanca', function () {
    return view('grupos-poupanca');
})->name('grupos-poupanca');

Route::get('/perfil-usuario', function () {
    return view('perfil-usuario');
})->name('perfil-usuario');

Route::get('/solicitar-emprestimo', function () {
    return view('solicitar-emprestimo');
})->name('solicitar-emprestimo');

Route::get('/adesao-grupos', function () {
    return view('adesao-grupos');
})->name('adesao-grupos');

Route::get('/criar-grupo', function () {
    return view('criar-grupo');
})->name('criar-grupo');
