<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Http\Resources\PostUserResource;
use Illuminate\Support\Facades\DB;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->get("query");
        $type = $request->get("type");
        $currentUserId = auth()->id();

        $blockedUserIds = DB::table('user_blocks')
        ->where('blocker_id', $currentUserId)
        ->pluck('blocked_id')
        ->merge(
            DB::table('user_blocks')
                ->where('blocked_id', $currentUserId)
                ->pluck('blocker_id')
        )
        ->unique();

        if ($type == "user") {
            $results = User::whereNotIn('id', $blockedUserIds)
                ->where('name', 'like', '%' . $query . '%')
                ->paginate(15);
            return PostUserResource::collection($results);
        } else if ($type == "media") {
            $results = Post::select('posts.*')
                ->leftJoin('images', 'posts.id', '=', 'images.imageable_id')
                ->where('images.imageable_type', Post::class)
                ->where(function ($queryBuilder) use ($query) {
                    $queryBuilder->where('title', 'like', '%' . $query . '%')
                        ->orWhere('description', 'like', '%' . $query . '%');
                })
                ->whereNotIn('posts.user_id', $blockedUserIds)
                ->groupBy('posts.id')
                ->with('user')
                ->paginate(8);
            return PostResource::collection($results);
        } else {
            $results = Post::where(function ($queryBuilder) use ($query) {
                $queryBuilder->where('title', 'like', '%' . $query . '%')
                    ->orWhere('description', 'like', '%' . $query . '%');
            })
                ->whereNotIn('user_id', $blockedUserIds)
                ->with('user')
                ->paginate(8);
            return PostResource::collection($results);
        }
    }
}
