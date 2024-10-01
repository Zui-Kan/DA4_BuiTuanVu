
<?php
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group([
    'prefix' => 'auth'
], function ($router) {

    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('profile',  [AuthController::class, 'profile']);
});


Route::group([
    'prefix' => 'user'
], function () {
    require base_path('routes/user.php'); // Load các route từ user.php
});

// Định nghĩa route với tiền tố /admin cho các route trong admin.php
Route::group([
    'prefix' => 'admin'
], function () {
    require base_path('routes/admin.php'); // Load các route từ admin.php
});