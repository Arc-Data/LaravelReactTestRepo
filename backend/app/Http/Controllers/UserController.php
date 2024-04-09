<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Http\Resources\PostUserResource;
use App\Http\Resources\UserDetailedResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index() 
    {
        $users = User::all();
        return UserResource::collection($users);
    }

    public function show(Request $request, $username)
    {
        $user = User::where("name", $username)->first();
        return UserDetailedResource::make($user);
    }

    public function getUserPosts(Request $request, User $user)
    {
        $posts = $user->posts()
            ->latest()
            ->paginate(10);
        
        return PostResource::collection($posts);
    }
}
