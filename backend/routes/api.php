<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['prefix' => ''], function () {
    Route::get('/books', [BookController::class, 'index']);
    Route::post('/books', [BookController::class, 'store']);
    Route::get('/books/{id}', [BookController::class, 'show']);
    Route::put('/books/{id}', [BookController::class, 'update']);
    Route::delete('/books/{id}', [BookController::class, 'destroy']);
});
Route::group(['prefix' => 'customers'], function () {
    Route::post('signup', [CustomerController::class, 'register']);
    Route::post('login', [CustomerController::class, 'login']);
    Route::post('logout', [CustomerController::class, 'logout']);

});
Route::middleware('auth:api')->group(function () {

Route::group(['prefix' => 'orders'], function () {
    Route::get('list', [OrderController::class, 'getOrders']);
    Route::get('/{id}', [OrderController::class, 'show']);
Route::post('', [OrderController::class, 'store']);
Route::get('', [OrderController::class, 'index']);
Route::post('add', [OrderController::class, 'addOrder']);

Route::put('/{id}', [OrderController::class, 'update']);
Route::patch('/{id}', [OrderController::class, 'update']);
Route::delete('/{id}', [OrderController::class, 'destroy']);
});
});
