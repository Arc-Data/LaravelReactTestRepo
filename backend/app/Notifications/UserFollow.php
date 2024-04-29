<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UserFollow extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public $sender;
    public $image;

    public function __construct($sender)
    {
        $this->image = $sender->profile_image;
        $this->sender = $sender;
    }

    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'image' => $this->image,
            'message' => $this->sender->name . " followed you."
        ];
    }

    public function toBroadcast(object $notifiable)
    {
        return new BroadcastMessage($this->toArray($notifiable));
    }

    public function toDatabase(object $notifiable)
    {
        return [
            "sender_id" => $this->sender->id,
            "message" => "followed you.",
            "link" => "/profile/" . $this->sender->id,
        ];
    }
}
