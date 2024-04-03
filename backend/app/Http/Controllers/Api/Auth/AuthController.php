<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\RegistrationRequest;
use App\Http\Requests\LoginRequest;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        
        if (filter_var($credentials["email_or_username"], FILTER_VALIDATE_EMAIL)) {
            $token = JWTAuth::attempt([
                'email' => $credentials['email_or_username'],
                'password' => $credentials['password'],
            ]);
        } else {
            $token = JWTAuth::attempt([
                'name' => $credentials['email_or_username'],
                'password' => $credentials['password'],
            ]);
        }

        if (!$token) {
            return response()->json([
                "status" => "failed",
                "message" => "An error occured while logging in"
            ], 401);
        }

        return $this->responseWithToken($token);
    }

    public function register(RegistrationRequest $request)
    {   
        $user = User::create([
            "name"=> $request->name,
            "email"=> $request->email,
            "password"=> Hash::make($request->password),
        ]);
    
        if (!$user) {
            // $token = auth()->login($user);
            return response()->json([
                'status'=> 'failed',
                'message' => 'An error occured while trying to create user', 
            ], 500);
        } 

        $token = JWTAuth::fromUser($user);
        return $this->responseWithToken($token);
    }

    public function refresh()
    {
        $token = JWTAuth::parseToken()->refresh();
        return $this->responseWithToken($token);
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
