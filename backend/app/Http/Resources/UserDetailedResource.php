<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class UserDetailedResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $currentUser = auth()->user();
        $user = User::where("id", $this->id)->first();

        return [
            "id"=> $this->id,
            "name"=> $this->name,
            "email"=> $this->email,
            "about"=> $this->about,
            "birthdate"=> $this->birthdate,
            "profile_image" => $this->profile_image,
            "is_following" => $currentUser->isFollowing($user),
            "followers" => $this->followers()->count(),
            "followings" => $this->followings()->count(),
            "posts" => $this->posts()->count(),
            "banner" => $this->banner,
        ];
    }
}
