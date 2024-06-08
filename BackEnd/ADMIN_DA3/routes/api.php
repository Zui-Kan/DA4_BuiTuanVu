<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BaiVietController;
use App\Http\Controllers\BinhLuanController;
use App\Http\Controllers\ChuDeBaiVietController;
use App\Http\Controllers\DatHangController;
use App\Http\Controllers\HangXeController;
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
use App\Http\Controllers\TrangThaiController;
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
    //Nhanvien
    Route::group([
        'prefix' => 'nhanvien',
    ], function () {

        Route::get('/get/{id}', [NhanVienController::class, 'getnhanvien'])->name('nhanvien.getnhanvien');
        Route::get('/getbytk/{id}', [NhanVienController::class, 'getNhanVienbyTK']);
        Route::delete('/delete/{id}', [NhanVienController::class, 'delete'])->name('nhanvien.delete');
        Route::delete('/deletes', [NhanVienController::class, 'deletes'])->name('nhanvien.deletes');
        Route::post('/save', [NhanVienController::class, 'save'])->name('nhanvien.save');
        Route::post('/search', [NhanVienController::class, 'search'])->name('nhanvien.search');
        Route::get('/gettaikhoan', [NhanVienController::class, 'getrolenhanvien'])->name('nhanvien.gettaikhoan');
    });

    //tài khoản
    Route::group([
        'prefix' => 'taikhoan'
    ],  function () {
        Route::get('/get/{id}', [UsersController::class, 'getTaiKhoan'])->name('taikhoan.getTaiKhoan');
        Route::get('/{total?}', [UsersController::class, 'index'])->name('taikhoan.index');
        Route::post('/signup', [UsersController::class, 'signup'])->name('taikhoan.signup');
        Route::delete('/delete/{id}', [UsersController::class, 'delete'])->name('taikhoan.delete');
        Route::delete('/deletes', [UsersController::class, 'deletes'])->name('taikhoan.deletes');
        Route::post('/save', [UsersController::class, 'save'])->name('taikhoan.save');
        Route::post('/search', [UsersController::class, 'search'])->name('taikhoan.search');
        Route::get('/gettaikhoanct/{id}', [UsersController::class, 'getTaiKhoanCT'])->name('taikhoan.gettaikhoanct');
        Route::get('/getcttaikhoan/{id?}', [UsersController::class, 'getCTTaiKhoan'])->name('taikhoan.getcttaikhoan');
        Route::post('/updatectusers/{id}', [UsersController::class, 'updateCTusers'])->name('taikhoan.updatectusers');
        Route::post('/changepassword', [UsersController::class, 'changePassword'])->name('taikhoan.changepassword');
    });


    Route::get('/khachhang/gettaikhoan', [KhachHangController::class, 'getRoleKhachHang'])->name('khachhang.getRoleKhachHang');

    //KhachHang
    Route::group([
        'prefix' => 'khachhang',
    ], function () {
        Route::get('/get/{id}', [KhachHangController::class, 'getkhachhang'])->name('khachhang.getkhachhang');
        Route::get('/{total?}', [KhachHangController::class, 'index'])->name('khachhang.index');
        Route::delete('/delete/{id}', [KhachHangController::class, 'delete'])->name('khachhang.delete');
        Route::delete('/deletes', [KhachHangController::class, 'deletes'])->name('khachhang.deletes');

        Route::post('/save/{id?}', [KhachHangController::class, 'save'])->name('khachhang.save');
        Route::post('/search', [KhachHangController::class, 'search'])->name('khachhang.search');
    });


    //NhaCungCap
    Route::group([

        'prefix' => 'nhacungcap',
    ], function () {
        Route::get('/get/{id}', [NhaCungCapController::class, 'getnhacungcap'])->name('nhacungcap.getnhacungcap');
        Route::get('/{total?}', [NhaCungCapController::class, 'index'])->name('nhacungcap.index');
        Route::delete('/delete/{id}', [NhaCungCapController::class, 'delete'])->name('nhacungcap.delete');
        Route::delete('/deletes', [NhaCungCapController::class, 'deletes'])->name('nhacungcap.deletes');
        Route::post('/save/{id?}', [NhaCungCapController::class, 'save'])->name('nhacungcap.save');
        Route::post('/search', [NhaCungCapController::class, 'search'])->name('nhacungcap.search');
    });

    //LoaiXe
    Route::group([

        'prefix' => 'loaixe',
    ], function () {
        Route::get('/get/{id}', [LoaiXeController::class, 'getloaixe'])->name('loaixe.getloaixe');
        Route::get('/{total?}', [LoaiXeController::class, 'index'])->name('loaixe.index');
        Route::delete('/delete/{id}', [LoaiXeController::class, 'delete'])->name('loaixe.delete');
        Route::delete('/deletes', [LoaiXeController::class, 'deletes'])->name('loaixe.deletes');
        Route::post('/save', [LoaiXeController::class, 'save'])->name('loaixe.save');
        Route::post('/search', [LoaiXeController::class, 'search'])->name('loaixe.search');
    });


    //Bình luận
    Route::group([
        'prefix' => 'hangxe',
    ], function () {
        Route::get('/get/{id?}', [HangXeController::class, 'gethangxe'])->name('hangxe.gethangxe');
        Route::get('/{total?}', [HangXeController::class, 'index'])->name('hangxe.index');
        Route::delete('/delete/{id}', [HangXeController::class, 'delete'])->name('hangxe.delete');
        Route::delete('/deletes', [HangXeController::class, 'deletes'])->name('hangxe.deletes');
        Route::post('/save', [HangXeController::class, 'save'])->name('hangxe.save');
        Route::post('/search', [HangXeController::class, 'search'])->name('hangxe.search');
    });
    //Xe oto
    Route::post('/uploadfile', [HangXeController::class, 'uploadFile2'])->name('hangxe.upload');

    Route::group([

        'prefix' => 'modelxe',
    ], function () {
        Route::get('/{total?}', [ModelXeController::class, 'index'])->name('modelxe.index');
        Route::get('/getmodel/{id?}', [ModelXeController::class, 'getModelXe']);
        Route::delete('/delete/{id}', [ModelXeController::class, 'delete'])->name('modelxe.delete');
        Route::delete('/deletes', [ModelXeController::class, 'deletes'])->name('modelxe.deletes');
        Route::post('/save/{id?}', [ModelXeController::class, 'save'])->name('modelxe.save');
        Route::post('/search', [ModelXeController::class, 'search'])->name('modelxe.search');
        Route::post('/filtermodels', [ModelXeController::class, 'filterModels'])->name('modelxe.filterModels');
    });

    Route::get('/selecthangandloai', [ModelXeController::class, 'selectHangandLoai']);


    //Màu nội thất
    Route::group([

        'prefix' => 'maunoithat',
    ], function () {
        Route::get('/get/{id}', [MauNoiThatController::class, 'getmaunoithat'])->name('maunoithat.getmaunoithat');
        Route::get('/{total?}', [MauNoiThatController::class, 'index'])->name('maunoithat.index');
        Route::delete('/delete/{id}', [MauNoiThatController::class, 'delete'])->name('maunoithat.delete');
        Route::delete('/deletes', [MauNoiThatController::class, 'deletes'])->name('maunoithat.deletes');
        Route::post('/save/{id?}', [MauNoiThatController::class, 'save'])->name('maunoithat.save');
        Route::post('/search', [MauNoiThatController::class, 'search'])->name('maunoithat.search');
    });

    //Màu ngoại thất
    Route::group([

        'prefix' => 'maungoaithat',
    ], function () {
        Route::get('/get/{id}', [MauNgoaiThatController::class, 'getmaungoaithat'])->name('maungoaithat.getmaungoaithat');
        Route::get('/{total?}', [MauNgoaiThatController::class, 'index'])->name('maungoaithat.index');
        Route::delete('/delete/{id}', [MauNgoaiThatController::class, 'delete'])->name('maungoaithat.delete');
        Route::delete('/deletes', [MauNgoaiThatController::class, 'deletes'])->name('maungoaithat.deletes');
        Route::post('/save/{id?}', [MauNgoaiThatController::class, 'save'])->name('maungoaithat.save');
        Route::post('/search', [MauNgoaiThatController::class, 'search'])->name('maungoaithat.search');
    });

    //Phiên bản xe
    Route::group([

        'prefix' => 'phienbanxe',
    ], function () {
        Route::get('/get/{id}', [PhienBanXeController::class, 'getphienbanxe'])->name('phienbanxe.getphienbanxe');
        Route::get('/{total?}', [PhienBanXeController::class, 'index'])->name('phienbanxe.index');
        Route::delete('/delete/{id}', [PhienBanXeController::class, 'delete'])->name('phienbanxe.delete');
        Route::delete('/deletes', [PhienBanXeController::class, 'deletes'])->name('phienbanxe.deletes');
        Route::post('/save/{id?}', [PhienBanXeController::class, 'save'])->name('phienbanxe.save');
        Route::post('/search', [PhienBanXeController::class, 'search'])->name('phienbanxe.search');
    });


    //Thông số kỹ thuật
    Route::group([

        'prefix' => 'thongsokythuatxe',
    ], function () {
        Route::get('/get/{id}', [ThongSoKyThuatXeController::class, 'getthongsokythuatxe'])->name('thongsokythuatxe.getthongsokythuatxe');
        Route::get('/{total?}', [ThongSoKyThuatXeController::class, 'index'])->name('thongsokythuatxe.index');
        Route::delete('/delete/{id}', [ThongSoKyThuatXeController::class, 'delete'])->name('thongsokythuatxe.delete');
        Route::delete('/deletes', [ThongSoKyThuatXeController::class, 'deletes'])->name('thongsokythuatxe.deletes');
        Route::post('/save/{id?}', [ThongSoKyThuatXeController::class, 'save'])->name('thongsokythuatxe.save');
        Route::post('/search', [ThongSoKyThuatXeController::class, 'search'])->name('thongsokythuatxe.search');
    });


    //Chủ đề
    Route::group([

        'prefix' => 'chudebaiviet',
    ], function () {
        Route::get('/get/{id}', [ChuDeBaiVietController::class, 'getchudebaiviet'])->name('chudebaiviet.getchude');
        Route::get('/{total?}', [ChuDeBaiVietController::class, 'index'])->name('chudebaiviet.index');
        Route::delete('/delete/{id}', [ChuDeBaiVietController::class, 'delete'])->name('chudebaiviet.delete');
        Route::delete('/deletes', [ChuDeBaiVietController::class, 'deletes'])->name('chudebaiviet.deletes');
        Route::post('/save/{id?}', [ChuDeBaiVietController::class, 'save'])->name('chudebaiviet.save');
        Route::post('/search', [ChuDeBaiVietController::class, 'search'])->name('chudebaiviet.search');
    });

    //Bài viết
    Route::group([

        'prefix' => 'baiviet',
    ], function () {
        Route::get('/get/{id}', [BaiVietController::class, 'getbaiviet'])->name('baiviet.getbaiviet');
        Route::get('/{total?}', [BaiVietController::class, 'index'])->name('baiviet.index');
        Route::delete('/delete/{id}', [BaiVietController::class, 'delete'])->name('baiviet.delete');
        Route::delete('/deletes', [BaiVietController::class, 'deletes'])->name('baiviet.deletes');
        Route::post('/save/{id?}', [BaiVietController::class, 'save'])->name('baiviet.save');
        Route::post('/search', [BaiVietController::class, 'search'])->name('baiviet.search');
    });

    //Bình luận
    Route::group([

        'prefix' => 'binhluan',
    ], function () {
        Route::get('/get/{id}', [BinhLuanController::class, 'getbinhluan'])->name('binhluan.getbinhluan');
        Route::get('/{total?}', [BinhLuanController::class, 'index'])->name('binhluan.index');
        Route::delete('/delete/{id}', [BinhLuanController::class, 'delete'])->name('binhluan.delete');
        Route::delete('/deletes', [BinhLuanController::class, 'deletes'])->name('binhluan.deletes');
        Route::post('/save/{id?}', [BinhLuanController::class, 'save'])->name('binhluan.save');
        Route::post('/search', [BinhLuanController::class, 'search'])->name('binhluan.search');
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


    //Trạng thái
    Route::group([
        'prefix' => 'trangthai',
    ], function () {
        Route::post('/hienthidondahuy', [TrangThaiController::class, 'HienThiTrangThai_0']);
        Route::post('/hienthitrangthainhanvienxacnhan', [TrangThaiController::class, 'HienThiTrangThai_1']);
        Route::post('/hienthidonxulyhoso', [TrangThaiController::class, 'HienThiTrangThai_2']);
        Route::post('/hienthidongiaoxe', [TrangThaiController::class, 'HienThiTrangThai_3']);
        Route::post('/hienthidonthanhcong', [TrangThaiController::class, 'HienThiTrangThai_4']);
        Route::get('/hienthichitietdathangtheoid/{id?}', [TrangThaiController::class, 'HienThiChiTietDatHang']);
        Route::post('/nhanvienxacnhan', [TrangThaiController::class, 'NhanVienNhanDonHang']);
        Route::post('/nhanvienxulyhoso', [TrangThaiController::class, 'NhanVienXuLyHoSo']);
        Route::post('/nhanviengiaoxe', [TrangThaiController::class, 'NhanVienGiaoXe']);
    });


    //Quảng cáo
    Route::group([

        'prefix' => 'quangcao',
    ], function () {
        Route::get('/get/{id}', [QuangCaoController::class, 'getquangcao'])->name('quangcao.getquangcao');
        Route::get('/{total?}', [QuangCaoController::class, 'index'])->name('quangcao.index');
        Route::delete('/delete/{id}', [QuangCaoController::class, 'delete'])->name('quangcao.delete');
        Route::delete('/deletes', [QuangCaoController::class, 'deletes'])->name('quangcao.deletes');
        Route::post('/save/{id?}', [QuangCaoController::class, 'save'])->name('quangcao.save');
        Route::post('/search', [QuangCaoController::class, 'search'])->name('quangcao.search');
    });
});
