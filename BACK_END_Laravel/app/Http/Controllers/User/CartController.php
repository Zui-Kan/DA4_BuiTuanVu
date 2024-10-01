<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller; 
use App\Models\BaiViet;
use App\Models\HangXe;
use App\Models\LoaiXe;
use App\Models\MauNgoaiThat;
use App\Models\MauNoiThat;
use App\Models\ModelXe;
use App\Models\PhienBanXe;
use App\Models\QuangCao;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    use TrangThaiTrait;

    public function getDetailCart($id)
    {
        $db = MauNoiThat::select(
            'ModelXe.*',
            'PhienBanXe.*',
            'MauNgoaiThat.*',
            'MauNoiThat.*',
        )
            ->join('MauNgoaiThat', 'MauNoiThat.MaMauNgoaiThat', '=', 'MauNgoaiThat.MaMauNgoaiThat')
            ->join('PhienBanXe', 'MauNgoaiThat.MaPhienBan', '=', 'PhienBanXe.MaPhienBan')
            ->join('ModelXe', 'PhienBanXe.MaModel', '=', 'ModelXe.MaModel')
            ->where('MauNoiThat.MaMauNoiThat', $id)
            ->first();

        return $db ? $this->ok($db) : $this->errors(null);
    }
}
