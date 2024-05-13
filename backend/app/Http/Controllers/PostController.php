<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Image;
use App\Notifications\UserPosted;
use Illuminate\Support\Facades\Log;
use App\Models\Like;
use App\Models\Post;
use App\Notifications\PostReply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request  $request)
    {
        $currentUser = auth()->user();

        $type = $request->get('type');
        
        if ($type == "all") {
            $blockedUserIds = $currentUser->blockedUsers()->pluck('users.id');
            $posts = Post::whereNotIn('user_id', $blockedUserIds)
                ->with('user')
                ->withCount(['comments', 'likes'])
                ->latest()
                ->paginate(10);
            return PostResource::collection($posts);
        } else {
            $user = auth()->user();
            $followedUserIds = $user->followings()->pluck('followed_id');
            $followedUserIds[] = $user->id;

            $posts = Post::whereIn('user_id', $followedUserIds)
                        ->with('user')
                        ->withCount(['comments', 'likes'])
                        ->latest()
                        ->paginate(10);
            return PostResource::collection($posts);
        }

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

        $validatedData = $request->validate([
            "title" => 'required|string|max:100',
            'description' => 'required|string',     
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg'      
        ]);

        $validatedData['title'] = strip_tags($validatedData['title']);
        $validatedData['description'] = strip_tags($validatedData['description']);
        $uploadedImages = $request->file('images');
    
        $post = new Post($validatedData);
        $post->user()->associate($user);
        $post->save();
    
    
        if ($uploadedImages !== null) {
            foreach ($uploadedImages as $image) {
                $imageName = $this->generateUniqueFilename($image->getClientOriginalName());
                $image->storeAs('public/post/', $imageName);
                $newImage = new Image([
                    'url' => asset('storage/post/' . $imageName),
                ]);

                $post->images()->save($newImage);
            }
        }

        $post->refresh();
        foreach($user->followers as $follower) {
            if ($follower->pivot->notify) {
                $follower->notify(new UserPosted($user, $post->id));
            } 
        }

        return response()->json([
            'message' => 'Post created.'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        if (!$post) {
            abort(404, 'Post not found');
        }

        $post->load('user');
        $post->loadCount(['likes', 'comments']);
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
        $validatedData = $request->validate([
            "title" => 'required|string|max:100',
            'description' => 'required|string'           
        ]);

        
        $validatedData['title'] = strip_tags($validatedData['title']);
        $validatedData['description'] = strip_tags(nl2br($validatedData['description']), '<br>');
        
        $post->update($validatedData);

        return response()->json(['message' => 'Post updated.'], 201);
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
        return response()->json(['message' => "Post deleted."]);
    }

    public function like(Post $post) 
    {
        $user = auth()->user();

        $isLiked = $post->likes()->where('user_id', $user->id)->exists();

        if ($isLiked) {
            $post->likes()->where('user_id', $user->id)->delete();
            $message = "Post unliked";
        }
        else {
            $post->likes()->create(['user_id' => $user->id]);
            $message = "Post liked";
        }

        return response()->json(['message' => $message]);
    }

    private function generateUniqueFilename($originalFilename)
    {
        $extension = pathinfo($originalFilename, PATHINFO_EXTENSION);
        $filename = pathinfo($originalFilename, PATHINFO_FILENAME);
        $timestamp = time();
        $uniqueFilename = $filename . '_' . $timestamp .'.'. $extension;
        return $uniqueFilename;
    }
}
