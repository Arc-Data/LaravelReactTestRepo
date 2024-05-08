<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $guarded = [];
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'about',
        'profile_image',
        'birthdate',
        'banner',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'user' => [
                'id' => $this->id,
                'username' => $this->name,
                'email'=> $this->email,
                'profile_image' => $this->profile_image,
            ]
        ];
    }

    public function posts() 
    {
        return $this->hasMany(Post::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function likedPosts()
    {
        return $this->belongsToMany(Post::class, 'likes');
    }

    public function receivesBroadcastNotificationsOn()
    {
        return 'App.User.' . $this->id;
    }

    public function isFollowing(User $user)
    {
        return $this->followings()->where('followed_id', $user->id)->exists();
    }

    public function isNotified(User $user)
    {
        return $this->folowings()->where('followed_id', $user->id)->value('notify');
    }

    public function followers()
    {
        return $this->belongsToMany(User::class, 'user_follows', 'followed_id', 'follower_id')->withPivot('notify');
    }

    public function followings()
    {
        return $this->belongsToMany(User::class, 'user_follows', 'follower_id', 'followed_id')->withPivot('notify');
    }

public function follow(User $user)
    {
        $this->followings()->attach($user);
    }

    public function unfollow(User $user)
    {
        $this->followings()->detach($user);
    }
}
