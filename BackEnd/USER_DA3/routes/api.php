<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\DetailController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\PurchaseController;
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
    'middleware' => 'auth.jwt',
], function () {

    Route::group([
        'prefix' => 'detail',
    ], function () {
        Route::post('/save_binhluan', [DetailController::class, 'save_binhluan'])->name('detail.save_binhluan');
        Route::delete('/delete_binhluan/{id}', [DetailController::class, 'delete_binhluan'])->name('detail.delete_binhluan');
    });
    Route::group([
        'prefix' => 'taikhoan'
    ],  function () {
        Route::get('/gettaikhoanct/{id}', [UsersController::class, 'getTaiKhoanCT'])->name('taikhoan.gettaikhoanct');
        Route::post('/updatectusers/{id}', [UsersController::class, 'updateCTusers'])->name('taikhoan.updatectusers');
        Route::post('/changepassword', [UsersController::class, 'changePassword'])->name('taikhoan.changepassword');
    });

    Route::group([
        'prefix' => 'checkout',
    ], function () {
        Route::post('/datxe', [CheckoutController::class, 'DatXe'])->name('checkout.dat');
        Route::get('/ordersuccess/{id?}', [CheckoutController::class, 'ordersuccess'])->name('checkout.ordersuccess');


        Route::post('/search', [CheckoutController::class, 'search'])->name('checkout.search');
        Route::post('/yeucauhuy', [CheckoutController::class, 'search_YeuCauHuy'])->name('checkout.yeucauhuy');
        Route::get('/getkhachhangbycheckout/{id?}', [CheckoutController::class, 'getkhachhangbycheckout'])->name('checkout.getkhachhangbycheckout');
        Route::post('/nhanvienxacnhan', [CheckoutController::class, 'NhanVienXacNhan'])->name('checkout.nhanvienxacnhan');
        Route::post('/giaoxe', [CheckoutController::class, 'GiaoXe'])->name('checkout.giaoxe');
        Route::post('/hoantat', [CheckoutController::class, 'HoanTat'])->name('checkout.hoantat');
        Route::delete('/huydonhang/{id}', [CheckoutController::class, 'huydonhang'])->name('checkout.huydonhang');
        Route::delete('/xacnhanyeucauhuy/{id}', [CheckoutController::class, 'XacNhanYeuCauHuy'])->name('checkout.xacnhanyeucauhuy');
        Route::post('/search_yeucauhuy/{id}', [CheckoutController::class, 'search_yeucauhuy'])->name('checkout.search_yeucauhuy');
    });

    Route::group([
        'prefix' => 'purchase'
    ],  function () {
        Route::get('/getallpurchase/{id?}', [PurchaseController::class, 'getallpurchase'])->name('purchase.getallpurchase');
        Route::get('/getpurchase/{id?}', [PurchaseController::class, 'getpurchase'])->name('purchase.getpurchase');
    });
});


Route::group([
    // 'middleware' => 'auth.jwt',
], function () {
    //tài khoản
    Route::group([
        'prefix' => 'taikhoan'
    ],  function () {
        Route::post('/signup', [UsersController::class, 'signup'])->name('taikhoan.signup');
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
        Route::get('/getnhienlieu', [CategoryController::class, 'getnhienlieu'])->name('category.getnhienlieu');
    });


    Route::group([
        'prefix' => 'detail',
    ], function () {
        Route::get('/getdetail/{id?}', [DetailController::class, 'getdetail'])->name('detail.getdetail');
        Route::get('/hienthingoaithat/{id?}', [DetailController::class, 'hienthingoaithat'])->name('detail.hienthingoaithat');
        Route::get('/hienthinoithat/{id?}', [DetailController::class, 'hienthinoithat'])->name('detail.hienthinoithat');
    });

    Route::group([
        'prefix' => 'cart',
    ], function () {
        Route::get('/getDetailCart/{id?}', [CartController::class, 'getDetailCart'])->name('detail.getDetailCart');
    });

    //Đặt xe

});
