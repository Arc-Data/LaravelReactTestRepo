<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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
        $images = $this->images->pluck('url')->toArray();

        return [
            "id"=> $this->id,  
            "title"=> $this->title,
            'description' => $this->description,
            'user' => new PostUserResource($this->whenLoaded('user')),
            'replies' => $this->comments_count,
            'likes' => $this->likes_count,
            'images' => $images,
            'isLiked' => $isLiked,
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}
