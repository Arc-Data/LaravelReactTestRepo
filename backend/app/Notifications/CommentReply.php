<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CommentReply extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public $sender;
    public $post_id;

    public function __construct($sender, $post_id)
    {
        $this->sender = $sender;
        $this->post_id = $post_id;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    public function toArray($notifiable) 
    {
        return [
            'message' => $this->sender->name . " replied to your comment."
        ];
    }

    public function toBroadCast($notifiable)  
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
            "message" => "replied to your comment.",
            "link" => "/post/" . $this->post_id, 
        ];
    }

}
