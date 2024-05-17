<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BaiVietController;
use App\Http\Controllers\ChuDeBaiVietController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('profile',  [AuthController::class, 'profile']);
});

// Chủ đề
Route::group([
    'middleware' => ['api', 'auth.jwt'],
    'prefix' => 'chudebaiviet'

], function () {
    Route::get('/get/{id}', [ChuDeBaiVietController::class, 'getchudebaiviet'])->name('chudebaiviet.getchude');
    Route::get('/{total?}', [ChuDeBaiVietController::class, 'index'])->name('chudebaiviet.index');
    Route::delete('/delete/{id}', [ChuDeBaiVietController::class, 'delete'])->name('chudebaiviet.delete');
    Route::delete('/deletes', [ChuDeBaiVietController::class, 'deletes'])->name('chudebaiviet.deletes');
    Route::post('/save/{id?}', [ChuDeBaiVietController::class, 'save'])->name('chudebaiviet.save');
    Route::post('/search', [ChuDeBaiVietController::class, 'search'])->name('chudebaiviet.search');
});

// Bài viết
Route::group([
    'middleware' => 'api', // Không cần xác thực token
    'prefix' => 'baiviet'
], function () {
    Route::get('/get/{id}', [BaiVietController::class, 'getbaiviet'])->name('baiviet.getbaiviet');
    Route::get('/{total?}', [BaiVietController::class, 'index'])->name('baiviet.index');
    Route::delete('/delete/{id}', [BaiVietController::class, 'delete'])->name('baiviet.delete');
    Route::delete('/deletes', [BaiVietController::class, 'deletes'])->name('baiviet.deletes');
    Route::post('/save/{id?}', [BaiVietController::class, 'save'])->name('baiviet.save');
    Route::post('/search', [BaiVietController::class, 'search'])->name('baiviet.search');
});
Route::get('/test', function () {
    return response()->json(['message' => 'This route does not require token.']);
});