<?php

namespace App\Http\Controllers\User;
use App\Http\Controllers\Controller; 

use App\Models\BinhLuan;
use App\Models\ChuDeBaiViet;
use App\Models\HangXe;
use App\Models\LoaiXe;
use App\Models\MauNgoaiThat;
use App\Models\MauNoiThat;
use App\Models\ModelXe;
use App\Models\PhienBanXe;
use App\Models\ThongSoKyThuatXe;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HeaderController extends Controller
{
    use TrangThaiTrait;
    /**
     * @OA\Get(
     *     path="/api/taikhoan/gettaikhoanct/{id}",
     *    tags={"taikhoan"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function getTaiKhoanCT($id)
    {
        $db = DB::table('users')
            ->join('ctusers', 'users.id', '=', 'ctusers.TaiKhoanID')
            ->where('users.id', $id)
            ->select('users.*', 'ctusers.*')
            ->first();

        return $db ? $this->ok($db) : $this->errors(null);
    }


    /**
     * @OA\Get(
     *     path="/api/hangxe/get/{id}",
     *    tags={"hangxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */

    public function getMenu()
    {
        $hx = HangXe::paginate(10);

        $topCars = ModelXe::select('ModelXe.*', DB::raw('SUM(ChiTietDatHang.SoLuong) AS SoLuongXeDaBan'))
            ->leftJoin('ChiTietDatHang', 'ModelXe.MaModel', '=', 'ChiTietDatHang.MaModel')
            ->groupBy('ModelXe.MaModel')
            ->orderBy('SoLuongXeDaBan', 'DESC')
            ->limit(10)
            ->get();
        $lx = LoaiXe::paginate(10);

        $topic = ChuDeBaiViet::paginate(10);

        $db = ["hangxe" => $hx, "topxe" => $topCars, "loaixe" => $lx, "chude" => $topic,];
        return $db ? $this->ok($db) : $this->errors(null);
    }
}
