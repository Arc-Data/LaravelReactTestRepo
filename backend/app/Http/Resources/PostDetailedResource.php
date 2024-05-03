<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostDetailedResource extends JsonResource
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
        $images = $this->images()->pluck('url')->toArray();

        return [
            "id"=> $this->id,
            "title" => $this->title,
            "description" => $this->description,
            "likes" => $this->likes()->count(),
            "images" => $images,
            "user" => new PostUserResource($this->user),
            "replies" => $this->comments()->count(),
            "isLiked" => $isLiked,
            "created_at" => $this->created_at->toIso8601String(),
        ];
    }
}
