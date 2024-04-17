<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = auth()->user();
        $isLiked = $user ? $this->likes->contains('user_id', $user->id) : false;
        Log::info($this->likes->contains('user_id', $user->id));

        return [
            "id" => $this->id,
            "content" => $this->content,
            "user" => new PostUserResource($this->user),
            "post" => $this->post_id,
            "created_at" => $this->created_at,
            "isLiked" => $isLiked,
            "likes" => $this->likes()->count(),
            "parent_comment" => $this->whenLoaded("parent_comment", function () {
                return new CommentResource($this->parentComment);
            }),
            "replies" => CommentResource::collection($this->whenLoaded("replies")),
        ];
    }
}
