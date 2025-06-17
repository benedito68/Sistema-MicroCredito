<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        if (!Auth::check()) {
    return redirect()->route('login')->with('error', 'Você precisa logar primeiro!');
}


        return view('dashboard');
    }
}

