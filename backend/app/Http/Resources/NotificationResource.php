<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $sender = User::find($this->data['sender_id']);
        $message = $sender->name . " " . $this->data['message'];

        return [
            "id" => $this->id,
            "message" => $message,
            "type" => $this->type,
            "sender" => new PostUserResource($sender),
            "link" => $this->data['link'],
            "read_at" => $this->read_at,
            "created_at" => $this->created_at->format("Y-m-d H:i:s"),
        ];
    }
}
