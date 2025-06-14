<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    // Exibir tela de login
    public function showLogin()
    {
        return view('index');
    }

public function index()
{
    $user = Auth::user();
    return view('dashboard', compact('user'));
}


public function login(Request $request)
{
    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        return redirect()->intended('dashboard');
    } else {
        return back()->withErrors(['email' => 'Credenciais inválidas!']);
    }
}


    // Exibir tela de solicitar conta
    public function showSolicitarConta()
    {
        return view('solicitar-conta');
    }

    // Registrar nova conta
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:100',
            'apelido' => 'nullable|string|max:100',
            'email' => 'required|email|unique:utilizador,email',
            'telefone' => 'nullable|string|max:20',
            'provincia' => 'nullable|string|max:100',
            'distrito' => 'nullable|string|max:100',
            'senha' => 'required|string|min:6|confirmed'
        ]);

        DB::table('utilizador')->insert([
            'nome' => $request->nome,
            'apelido' => $request->apelido,
            'email' => $request->email,
            'telefone' => $request->telefone,
            'provincia' => $request->provincia,
            'distrito' => $request->distrito,
            'password' => ( $request->senha), 
            'perfil' => 'Empreendedor',
            'saldo' => 0.00,
            'data_registo' => now()
        ]);

        return redirect('/')->with('success', 'Conta criada com sucesso! Faça login.');
    }

    // Logout real
    public function logout()
    {
        session()->flush();
        return redirect('/');
    }
}