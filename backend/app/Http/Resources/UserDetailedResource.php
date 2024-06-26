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
        $blocking = false;
        $blocked = false;

        $isFollowing = $currentUser->isFollowing($user);
        $notify = $isFollowing ? $currentUser->isNotified($user) : false; 

        if ($currentUser instanceof User) {
            $blocking = $currentUser->isBlocking($user);
            $blocked = $user->isBlocking($currentUser);
        }
        $blockingStatus = $currentUser->blockingStatus($user);

        return [
            "id"=> $this->id,
            "name"=> $this->name,
            "email"=> $this->email,
            "about"=> $this->about,
            "birthdate"=> $this->birthdate,
            "profile_image" => $this->profile_image,
            "is_following" => $isFollowing,
            "blocking" => $blocking,
            "blocked" => $blocked,
            "notify" => $notify,
            "followers" => $this->followers()->count(),
            "followings" => $this->followings()->count(),
            "posts" => $this->posts()->count(),
            "banner" => $this->banner,
        ];
    }
}
