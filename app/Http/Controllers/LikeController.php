<?php

namespace App\Http\Controllers;

use App\Model\Like;
use App\Model\Reply;
use Illuminate\Http\Request;

class LikeController extends Controller
{

    public function LikeIt(Reply $reply)
    {
        $reply->like()->create([
            // 'user_id' => auth()->user()->id
            'user_id' => 1
        ]);
    }

    public function UnLikeIt(Reply $reply)
    {
        // $reply->like()->where('user_id', auth()->user()->id )->first()->delete();
        $reply->like()->where('user_id',1)->first()->delete();
    }

}
