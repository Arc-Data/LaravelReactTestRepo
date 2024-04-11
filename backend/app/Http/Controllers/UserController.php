<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Http\Resources\PostUserResource;
use App\Http\Resources\UserDetailedResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;

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

    public function update(Request $request)
    {
        $user = auth()->user();

        Log::info('Request data: ' . json_encode($request->all()));
        
        $validatedData = $request->validate([
            'name' => [
                'string',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'about' => 'nullable|string|max:200',
            'profile_image' => 'nullable|file|mimes:svg,png,jpg,jpeg|max:2048', 
            'banner' => 'nullable|file|mimes:svg,png,jpg,jpeg|max:2048', 
            'birthdate' => 'date|before_or_equal:today', 
        ]);

        if ($request->filled('name')) {
            $user->name = strip_tags($validatedData['name']);
        }

        if ($request->filled('about')) {
            $user->about = strip_tags($validatedData['about']);
        }

        if ($request->filled('birthdate')) {
            $user->birthdate = Carbon::parse($validatedData['birthdate'])->format('Y-m-d');
        }

        if ($request->hasFile('profile_image')) {
            $file = $request->file('profile_image');
            $fileName = $file->getClientOriginalName();
            $file->storeAs('public/profile', $fileName);
            $user->profile_image = asset('storage/profile/' . $fileName);
        }

        if ($request->hasFile('banner')) {
            $file = $request->file('banner');
            $fileName = $file->getClientOriginalName();
            $file->storeAs('public/banner', $fileName);
            $user->banner = asset('storage/banner/' . $fileName);
        }

        $user->save();

        auth()->invalidate(true);
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'token' => $token,
            'user' => UserDetailedResource::make($user),
        ]);
    }

}
