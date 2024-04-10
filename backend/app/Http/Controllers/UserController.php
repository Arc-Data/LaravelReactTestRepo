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
        
        $validatedData =  $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'profile_image' => 'nullable|file|mimes:svg,png,jpg,jpeg|max:2048', // Adjust max file size as needed (in KB)
            'about' => 'nullable|string|max:200',
            'birthdate' => 'required|date|before_or_equal:today', // Ensure birthdate is not in the future
            'banner' => 'nullable|file|mimes:svg,png,jpg,jpeg|max:2048', // Adjust max file size as needed (in KB)
        ]);

        $validatedData['name'] = strip_tags($validatedData['name']);

        if (isset($validatedData['about'])) {
            $validatedData['about'] = strip_tags($validatedData['about']);
        }

        $validatedData['birthdate'] = Carbon::parse($validatedData['birthdate'])->format('Y-m-d');

        $user->name = $validatedData['name'];
        $user->about = $validatedData['about'];
        $user->birthdate = $validatedData['birthdate'];

        foreach (['profile_image', 'banner'] as $field) {
            if ($request->hasFile($field)) {
                $file = $request->file($field);
                $fileName = $file->getClientOriginalName();
                $file->storeAs('user_files', $fileName);
                $user->$field = $fileName;
            }
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
