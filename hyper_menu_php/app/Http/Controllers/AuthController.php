<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthController extends Controller
{
    
    public function register(Request $request)
    {
        $attr = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed'
        ]);

        $user = User::create([
            'name' => $attr['name'],
            'password' => bcrypt($attr['password']),
            'email' => $attr['email']
        ]);

        return response()->json([
            'token' => $user->createToken('hyper_menu')->plainTextToken
          ]);
    }

    public function login(Request $request)
    {
        $attr = $request->validate([
            'email' => 'required|string|email|',
            'password' => 'required|string|min:6'
        ]);

        if (!Auth::attempt($attr)) 
            return response()->json(["errors"=>["password"=>"Credentials not match"]], 401);
        

        $user = User::where('email', $request['email'])->firstOrFail();

        return response()->json([
            'token' => $user->createToken('hyper_menu')->plainTextToken
          ]);
    }

    public function logout() {
        auth()->user()->tokens()->delete();
        }
}
