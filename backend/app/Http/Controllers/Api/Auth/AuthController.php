<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\RegistrationRequest;
use App\Http\Requests\LoginRequest;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = JWTAuth::fromUser($user);
            
            return $this->responseWithToken($token);
        } else {
            return $this->response()->json([
                'status' => 'failed',
                'message' => 'Invalid login credentials'
            ], 500);
        }
    }

    public function register(RegistrationRequest $request)
    {   
        $user = User::create($request->validated());
    
        if ($user) {
            // $token = auth()->login($user);
            $token = JWTAuth::fromUser($user);
            return $this->responseWithToken($token);
        } else {
            return response()->json([
                'status'=> 'failed',
                'message' => 'An error occured while trying to create user', 
            ], 500);
        }
    }

    public function responseWithToken($token) 
    {
        return response()->json([
            'status' => 'success',
            'access_token' => $token,
            'type' => 'bearer',
        ]);
    }


}
