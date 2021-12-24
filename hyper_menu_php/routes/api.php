<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ThemeController;
use App\Http\Controllers\ImageController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/themes',[ThemeController::class,'index']);
Route::post('register',[AuthController::class,"register"]);
Route::post('login',[AuthController::class,"login"]);
Route::get('/page/show',[PageController::class,'index']);
Route::get('/menu/{id}', [MenuController::class,'show']);
Route::post('/image',[ImageController::class,"store"]);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::resource('/menu', MenuController::class);
    Route::resource('/page', PageController::class);
    Route::get('logout',[AuthController::class,"logout"]);
});
