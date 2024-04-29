<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/api/csrf-token', function () {
    return response()->json([
        'csrfToken' => csrf_token(),
    ]);
});

