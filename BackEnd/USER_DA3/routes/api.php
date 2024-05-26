<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BaiVietController;
use App\Http\Controllers\BinhLuanController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ChuDeBaiVietController;
use App\Http\Controllers\DatHangController;
use App\Http\Controllers\DetailController;
use App\Http\Controllers\HangXeController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\KhachHangController;
use App\Http\Controllers\LoaiXeController;
use App\Http\Controllers\MauNgoaiThatController;
use App\Http\Controllers\MauNoiThatController;
use App\Http\Controllers\ModelXeController;
use App\Http\Controllers\NhaCungCapController;
use App\Http\Controllers\NhanVienController;
use App\Http\Controllers\PhienBanXeController;
use App\Http\Controllers\QuangCaoController;
use App\Http\Controllers\QuangCaopController;
use App\Http\Controllers\TaiKhoanController;
use App\Http\Controllers\ThongSoKyThuatXeController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\SwaggerController;
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
    // 'middleware' => 'auth.jwt',
], function () {
    //tài khoản
    Route::group([
        'prefix' => 'taikhoan'
    ],  function () {
        Route::post('/signup', [UsersController::class, 'signup'])->name('taikhoan.signup');
        Route::get('/gettaikhoanct/{id}', [UsersController::class, 'getTaiKhoanCT'])->name('taikhoan.gettaikhoanct');
        Route::post('/updatectusers/{id}', [UsersController::class, 'updateCTusers'])->name('taikhoan.updatectusers');
        Route::post('/changepassword', [UsersController::class, 'changePassword'])->name('taikhoan.changepassword');
    });


    //Trang index
    Route::group([
        'prefix' => 'index'
    ],  function () {
        Route::get('/hangxe', [IndexController::class, 'HangXeIndex'])->name('index.hangxe');
        Route::get('/modelmoi', [IndexController::class, 'modelmoi'])->name('index.modelmoi');
        Route::get('/tintuc', [IndexController::class, 'TopBaiVietBinhLuan'])->name('index.tintuc');
        Route::get('/quangcaoindex', [IndexController::class, 'quangcaoindex'])->name('index.quangcaoindex');
        Route::get('/topxebanchay', [IndexController::class, 'topxebanchay'])->name('index.topxebanchay');
    });
    Route::group([
        'prefix' => 'category'
    ],  function () {
        Route::post('/boloccategory/{id}', [CategoryController::class, 'BoLocCategory'])->name('category.boloccategory');
        Route::get('/getloaixe', [CategoryController::class, 'getloaixe'])->name('category.getloaixe');
        Route::get('/getnamsanxuat', [CategoryController::class, 'getnamsanxuat'])->name('category.getnamsanxuat');
    });



    Route::group([
        'prefix' => 'detail',
    ], function () {
        Route::get('/getdetail/{id?}', [DetailController::class, 'getdetail'])->name('detail.getdetail');
    });

    //Đặt xe
    Route::group([

        'prefix' => 'datxe',
    ], function () {
        Route::post('/search', [DatHangController::class, 'search'])->name('DatXe.search');
        Route::post('/yeucauhuy', [DatHangController::class, 'search_YeuCauHuy'])->name('DatXe.yeucauhuy');
        Route::post('/dat', [DatHangController::class, 'DatXe'])->name('DatXe.DatXe');
        Route::post('/nhanvienxacnhan', [DatHangController::class, 'NhanVienXacNhan'])->name('DatXe.nhanvienxacnhan');
        Route::post('/giaoxe', [DatHangController::class, 'GiaoXe'])->name('DatXe.giaoxe');
        Route::post('/hoantat', [DatHangController::class, 'HoanTat'])->name('DatXe.hoantat');
        Route::delete('/huydonhang/{id}', [DatHangController::class, 'huydonhang'])->name('DatXe.huydonhang');
        Route::delete('/xacnhanyeucauhuy/{id}', [DatHangController::class, 'XacNhanYeuCauHuy'])->name('DatXe.xacnhanyeucauhuy');
        Route::post('/search_yeucauhuy/{id}', [DatHangController::class, 'search_yeucauhuy'])->name('DatXe.search_yeucauhuy');
    });
});
