<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\TestNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $notifications = $user->notifications()->get();    

        $notificationData = [];

        foreach ($notifications as $notification) {
            if ($notification->notifiable instanceof User) {
                $image = $notification->notifiable->profile_image;
            } else {
                $image = "";
            }

            $notificationData[] = [
                'id' => $notification->id,
                'type' => $notification->type,
                'data' => $notification->data,
                'read_at' => $notification->read_at,
                'created_at' => $notification->created_at->format('Y-m-d H:i:s'),
                'user' => [
                    'id' => $notification->notifiable->id,
                    'name' => $notification->notifiable->name,
                    'image' => $image,
                ]
            ];
        }

        return response()->json($notificationData);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */

     /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update()
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        //
    }

    public function markAsRead()
    {
        Log::info("Hello");
        $user = auth()->user();
        foreach ($user->unreadNotifications as $notification) {
            $notification->markAsRead();
        }
    }

    public function test() 
    {
        $user = auth()->user();
        $user->notify(new TestNotification("This is a sample message"));
    }

}
