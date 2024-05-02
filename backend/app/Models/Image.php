<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        "url"
    ];
    protected $guarded = [];

    public function imageable()
    {
        return $this->morphTo();
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
