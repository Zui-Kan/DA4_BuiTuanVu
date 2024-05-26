<?php

namespace App\Http\Controllers;

use App\Models\BaiViet;
use App\Models\HangXe;
use App\Models\ModelXe;
use App\Models\QuangCao;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IndexController extends Controller
{
    use TrangThaiTrait;

    /**
     * @OA\post(
     *     path="/api/index/hangxe",
     *    tags={"index"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */

    public function HangXeIndex()
    {
        $db = HangXe::all();
        return $db ? $this->ok($db) : $this->errors(null);
    }

    /**
     * @OA\post(
     *     path="/api/index/modelmoi",
     *    tags={"index"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */

    public function ModelMoi()
    {
        $topCars = ModelXe::select('ModelXe.*', 'ThongSoKyThuatXe.*')
            ->leftJoin('ThongSoKyThuatXe', 'ModelXe.MaModel', '=', 'ThongSoKyThuatXe.MaModel')
            ->orderBy('ModelXe.NgayTao', 'DESC')
            ->limit(8)
            ->get();

        return $topCars ? $this->ok($topCars) : $this->errors(null);
    }



    /**
     * @OA\post(
     *     path="/api/index/quangcaoindex",
     *    tags={"index"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */


    public function QuangCaoIndex()
    {
        $db = QuangCao::where("TrangHienThi", "Index")->get();
        return $db ? $this->ok($db) : $this->errors(null);
    }

    /**
     * @OA\post(
     *     path="/api/index/tintuc",
     *    tags={"index"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function TopBaiVietBinhLuan()
    {
        $topBaiViet = BaiViet::select('BaiViet.*', DB::raw('count(BinhLuan.MaBinhLuan) as SoLuongBinhLuan'))
            ->join('BinhLuan', 'BaiViet.MaBaiViet', '=', 'BinhLuan.MaBaiViet')
            ->where("BaiViet.TrangHienThi", "Index")
            ->groupBy('BaiViet.MaBaiViet')
            ->orderBy('SoLuongBinhLuan', 'DESC')
            ->limit(3)
            ->get();

        return $topBaiViet ? $this->ok($topBaiViet) : $this->errors(null);
    }

    /**
     * @OA\post(
     *     path="/api/index/topxebanchay",
     *    tags={"index"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function TopXeBanChay()
    {
        $topCars = ModelXe::select('ModelXe.*', 'ThongSoKyThuatXe.*', DB::raw('SUM(ChiTietDatHang.SoLuong) AS SoLuongXeDaBan'))
            ->leftJoin('ChiTietDatHang', 'ModelXe.MaModel', '=', 'ChiTietDatHang.MaModel')
            ->leftJoin('ThongSoKyThuatXe', 'ModelXe.MaModel', '=', 'ThongSoKyThuatXe.MaModel')
            ->groupBy('ModelXe.MaModel', 'ThongSoKyThuatXe.MaThongSo')
            ->orderBy('SoLuongXeDaBan', 'DESC')
            ->limit(10)
            ->get();

        return $topCars ? $this->ok($topCars) : $this->errors(null);
    }
}
