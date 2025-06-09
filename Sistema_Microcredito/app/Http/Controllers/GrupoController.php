<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GrupoController extends Controller
{
    public function gruposPoupanca()
    {
        return view('grupos-poupanca');
    }

    public function adesao()
    {
        return view('adesao-grupos');
    }

    public function criar()
    {
        return view('criar-grupo');
    }
}
