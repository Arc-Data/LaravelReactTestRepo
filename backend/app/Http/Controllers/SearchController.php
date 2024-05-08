<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Http\Resources\PostUserResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->get("query");
        $type = $request->get("type");

        if ($type == "user") {
            $results = User::where('name', 'like', '%' . $query . '%')->paginate(15);
            return PostUserResource::collection($results);
        } else if ($type == "media") {
            $results = Post::select('posts.*')
                ->leftJoin('images', 'posts.id', '=', 'images.imageable_id')
                ->where('images.imageable_type', Post::class)
                ->where('title', 'like', '%' . $query . '%')
                ->orWhere('description', 'like', '%' . $query . '%')
                ->groupBy('posts.id')
                ->with('user')
                ->paginate(8);
            return PostResource::collection($results);
        } else {
            $results = Post::where('title', 'like', '%' . $query . '%')
                ->orWhere('description', 'like', '%' . $query . '%')
                ->with('user')
                ->paginate(8);
            return PostResource::collection($results);
        }
    }
}
