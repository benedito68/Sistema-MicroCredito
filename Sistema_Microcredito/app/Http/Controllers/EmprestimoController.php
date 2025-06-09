<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EmprestimoController extends Controller
{
    public function meusEmprestimos()
    {
        return view('meus-emprestimos');
    }

    public function solicitar()
    {
        return view('solicitar-emprestimo');
    }
}
