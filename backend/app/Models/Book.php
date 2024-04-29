<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = ['title', 'writer', 'cover_image', 'tag','price'];

    public function orders()
    {
        return $this->hasMany('App\Models\Order', 'book_id');
    }
}
