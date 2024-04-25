<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use App\Http\Resources\PostUserResource;
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
        $notifications = $user->notifications()->paginate(10);  
        return NotificationResource::collection($notifications);
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

    public function hasUnreadNotifications()
    {
        $user = auth()->user();
        return response()->json([
            "unread" => $user->unreadNotifications()->exists()
        ]);
    }

}
