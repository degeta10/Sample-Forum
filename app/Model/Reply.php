<?php

namespace App\Model;

use App\User;
use App\Model\Question;
use App\Model\Like;
use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    protected $fillable = [
        'body',
        'question_id',
        'user_id',
    ];

    protected static function boot(){
        parent::boot();
        static::creating(function($reply){
            $reply->user_id = auth()->user()->id;
        });
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function like()
    {
        return $this->hasMany(Like::class);
    }


}
