<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::latest()->paginate(10);
        return PostResource::collection($posts);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = auth()->user();
        Log::info("Authenticated User : ".$user);

        $validatedData = $request->validate([
            "title" => 'required|string|max:100',
            'description' => 'required|string'           
        ]);

        $validatedData['title'] = strip_tags($validatedData['title']);
        $validatedData['description'] = strip_tags($validatedData['description']);

        $post = new Post($validatedData);
        $post->user()->associate($user);
        $post->save();

        return new PostResource($post);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        Log::info('Hello');
        $user = auth()->user();
        Log::info('Authenticated User: '.$user);
        return new PostResource($post);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        if ($post->user_id !== auth()->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        
        $post->delete();
        return response()->json(['message' => "Post deleted successfully"]);
    }
}
