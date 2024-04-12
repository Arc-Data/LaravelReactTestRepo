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
        return [
            "id"=> $this->id,
            "title" => $this->title,
            "description" => $this->description,
            "user" => new PostUserResource($this->user),
            "created_at" => $this->created_at->toIso8601String(),
            "comments" => CommentResource::collection($this->comments),
        ];
    }
}
