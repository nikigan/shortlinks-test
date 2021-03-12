<?php

use App\Http\Controllers\AdsController;
use App\Http\Controllers\LinkController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::get('/ping', function (Request $request) {
    return $request->session()->token();
});

Route::get('/stat', [LinkController::class, 'index']);
Route::get('/{request_link}', [LinkController::class, 'redirect']);
Route::get('/stat/{statistic_link}', [LinkController::class, 'show']);
Route::post('/short_links', [LinkController::class, 'store']);



Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
