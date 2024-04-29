<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['customer_id', 'book_id','point', 'status'];


    // Relationship with Customer
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'customer_id');
    }

    // Relationship with Book
    public function book()

    {
        return $this->belongsTo('App\Models\Book', 'book_id');
    }
}
