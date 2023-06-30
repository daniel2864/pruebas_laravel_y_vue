<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;

 


Route::controller(UserController::class)->group(function(){
    Route::post('login','loginUser');
    Route::post('users/register','registerUser');
});

Route::controller(UserController::class)->group(function(){

    Route::get('user/{id}','getUserDetail');
    Route::post('user/{id}','update');
    Route::delete('user/{id}','delete');
    
    Route::get('users','getAllUser');
    Route::get('logout','userLogout');

})->middleware('auth:api');