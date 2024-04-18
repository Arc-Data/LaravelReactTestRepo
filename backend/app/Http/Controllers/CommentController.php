<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Post $post)
    {
        return CommentResource::collection($post->comments);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Post $post)
    {
        $user = auth()->user();
        $content = $request->getContent();

        $comment = new Comment();
        $comment->content = $content;

        $comment->post()->associate($post);
        $comment->user()->associate($user);
        $comment->save();
        
        return response()->json([
            "comment" => new CommentResource($comment),
            "message" => "Comment added"
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
    }

    public function like(Comment $comment) 
    {
        $user = auth()->user();

        $isLiked = $comment->likes()->where("user_id", $user->id)->exists();

        if ($isLiked) {
            $comment->likes()->where('user_id', $user->id)->delete();
            $message = "Comment unliked";
        } else {
            $comment->likes()->create(['user_id' => $user->id]);
            $message = "Comment liked";
        }

        return response()->json(['message' => $message]);
    }

    public function reply(Comment $comment, Request $request)
{
        $user = auth()->user();
        $content = $request->getContent();
        $post = $comment->post;

        $reply = new Comment();
        $reply->post()->associate($post);
        $reply->user()->associate($user);
        $reply->content = $content;
        $reply->parentComment()->associate($comment);
        $reply->save();

        return response()->json([
            "message" => "Reply added",
            "comment" => new CommentResource($reply)
        ]);
    }
}
