<?php

use App\Http\Controllers\KhachHangController;
use App\Http\Controllers\LoaiXeController;
use App\Http\Controllers\MauNoiThatController;
use App\Http\Controllers\ModelXeController;
use App\Http\Controllers\NhaCungCapController;
use App\Http\Controllers\NhanVienController;
use App\Http\Controllers\TaiKhoanController;
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
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Không sử dụng được session
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Tài khoản
Route::group(['prefix' => 'taikhoan',], function () {
    Route::get('/get/{id}', [TaiKhoanController::class, 'getTaiKhoan'])->name('taikhoan.getTaiKhoan');
    Route::get('/{total?}', [TaiKhoanController::class, 'index'])->name('taikhoan.index');
    Route::post('/signup', [TaiKhoanController::class, 'signup'])->name('taikhoan.signup');
    Route::post('/login', [TaiKhoanController::class, 'login'])->name('taikhoan.login');
    Route::delete('/delete/{id}', [TaiKhoanController::class, 'delete'])->name('taikhoan.delete');
    Route::delete('/deletes', [TaiKhoanController::class, 'deletes'])->name('taikhoan.deletes');
    Route::post('/save/{id}', [TaiKhoanController::class, 'save'])->name('taikhoan.save');
    Route::post('/search', [TaiKhoanController::class, 'search'])->name('taikhoan.search');
});

//Nhanvien
Route::group(['prefix' => 'nhanvien',], function () {
    Route::get('/get/{id}', [NhanVienController::class, 'getnhanvien'])->name('nhanvien.getnhanvien');
    Route::get('/{total?}', [NhanVienController::class, 'index'])->name('taikhoan.index');
    Route::delete('/delete/{id}', [NhanVienController::class, 'delete'])->name('nhanvien.delete');
    Route::delete('/deletes', [NhanVienController::class, 'deletes'])->name('nhanvien.deletes');
    Route::post('/save/{id}', [NhanVienController::class, 'save'])->name('nhanvien.save');
    Route::post('/search', [NhanVienController::class, 'search'])->name('nhanvien.search');
});

//KhachHang
Route::group(['prefix' => 'khachhang',], function () {
    Route::get('/get/{id}', [KhachHangController::class, 'getkhachhang'])->name('khachhang.getkhachhang');
    Route::get('/{total?}', [KhachHangController::class, 'index'])->name('khachhang.index');
    Route::delete('/delete/{id}', [KhachHangController::class, 'delete'])->name('khachhang.delete');
    Route::delete('/deletes', [KhachHangController::class, 'deletes'])->name('khachhang.deletes');
    Route::post('/save/{id}', [KhachHangController::class, 'save'])->name('khachhang.save');
    Route::post('/search', [KhachHangController::class, 'search'])->name('khachhang.search');
});


//NhaCungCap
Route::group(['prefix' => 'nhacungcap',], function () {
    Route::get('/get/{id}', [NhaCungCapController::class, 'getnhacungcap'])->name('nhacungcap.getnhacungcap');
    Route::get('/{total?}', [NhaCungCapController::class, 'index'])->name('nhacungcap.index');
    Route::delete('/delete/{id}', [NhaCungCapController::class, 'delete'])->name('nhacungcap.delete');
    Route::delete('/deletes', [NhaCungCapController::class, 'deletes'])->name('nhacungcap.deletes');
    Route::post('/save/{id}', [NhaCungCapController::class, 'save'])->name('nhacungcap.save');
    Route::post('/search', [NhaCungCapController::class, 'search'])->name('nhacungcap.search');
});

//LoaiXe
Route::group(['prefix' => 'loaixe',], function () {
    Route::get('/get/{id}', [LoaiXeController::class, 'getloaixe'])->name('loaixe.getloaixe');
    Route::get('/{total?}', [LoaiXeController::class, 'index'])->name('loaixe.index');
    Route::delete('/delete/{id}', [LoaiXeController::class, 'delete'])->name('loaixe.delete');
    Route::delete('/deletes', [LoaiXeController::class, 'deletes'])->name('loaixe.deletes');
    Route::post('/save/{id}', [LoaiXeController::class, 'save'])->name('loaixe.save');
    Route::post('/search', [LoaiXeController::class, 'search'])->name('loaixe.search');
});

//Xe oto
Route::group(['prefix' => 'modelxe',], function () {
    Route::get('/get/{id}', [ModelXeController::class, 'getmodelxe'])->name('modelxe.getmodelxe');
    Route::get('/{total?}', [ModelXeController::class, 'index'])->name('modelxe.index');
    Route::delete('/delete/{id}', [ModelXeController::class, 'delete'])->name('modelxe.delete');
    Route::delete('/deletes', [ModelXeController::class, 'deletes'])->name('modelxe.deletes');
    Route::post('/save/{id}', [ModelXeController::class, 'save'])->name('modelxe.save');
    Route::post('/search', [ModelXeController::class, 'search'])->name('modelxe.search');
});


//Màu nội thất
Route::group(['prefix' => 'maunoithat',], function () {
    Route::get('/get/{id}', [MauNoiThatController::class, 'getmaunoithat'])->name('maunoithat.getmaunoithat');
    Route::get('/{total?}', [MauNoiThatController::class, 'index'])->name('maunoithat.index');
    Route::delete('/delete/{id}', [MauNoiThatController::class, 'delete'])->name('maunoithat.delete');
    Route::delete('/deletes', [MauNoiThatController::class, 'deletes'])->name('maunoithat.deletes');
    Route::post('/save/{id}', [MauNoiThatController::class, 'save'])->name('maunoithat.save');
    Route::post('/search', [MauNoiThatController::class, 'search'])->name('maunoithat.search');
});
