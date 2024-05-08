<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class UserPosted extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public $sender;

    public $post_id;

    public $image;

    public function __construct($sender, $post_id)
    {
        $this->image = $sender->profile_image;
        $this->sender = $sender;
        $this->post_id = $post_id;
    }

    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'image' => $this->image,
            'message' => $this->sender->name . " posted." 
        ];
    }

    public function toBroadcast(object $notifiable) 
    {
        return new BroadcastMessage($this->toArray($notifiable));
    }

    public function broadcastType()
    {
        return 'notification';
    }

    public function toDatabase(object $notifiable)
    {
        return [
            "sender_id" => $this->sender->id,
            "message" => "posted.",
            "link" => "/post/" . $this->post_id, 
        ];
    }
}
