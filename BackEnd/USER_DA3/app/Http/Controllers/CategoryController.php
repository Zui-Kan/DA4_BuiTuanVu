<?php

namespace App\Http\Controllers;

use App\Models\BaiViet;
use App\Models\HangXe;
use App\Models\LoaiXe;
use App\Models\ModelXe;
use App\Models\QuangCao;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    use TrangThaiTrait;

    /**
     * @OA\get(
     *     path="/api/index/bolocategory",
     *    tags={"index"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */

    public function BoLocCategory(Request $request, $id)
    {
        $minPrice = $request->input('min_price');
        $maxPrice = $request->input('max_price');
        $namSanXuat = $request->input('namsanxuat');
        $nhienlieu = $request->input('nhienlieu');
        $search = $request->input('timkiem');
        $maLoaiXe = $request->input('maloaixe');

        $query = ModelXe::query();
        if ($id !== null) {
            $query->where('ModelXe.MaHang', $id);
        }

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('ModelXe.TenModel', 'like', '%' . $search . '%')
                    ->orWhere('ModelXe.MaModel', 'like', '%' . $search . '%');
            });
        }

        if ($minPrice !== null) {
            $query->where('ModelXe.Gia', '>=', $minPrice);
        }

        if ($maxPrice !== null) {
            $query->where('ModelXe.Gia', '<=', $maxPrice);
        }

        if ($namSanXuat !== null) {
            if (!is_array($namSanXuat)) {
                $namSanXuat = explode(',', $namSanXuat);
            }
            $query->whereIn('ModelXe.NamSanXuat', $namSanXuat);
        }

        if ($nhienlieu !== null) {
            if (!is_array($namSanXuat)) {
                $namSanXuat = explode(',', $nhienlieu);
            }
            $query->whereIn('ModelXe.NhienLieu', $namSanXuat);
        }

        if ($maLoaiXe !== null) {
            if (!is_array($maLoaiXe)) {
                $maLoaiXe = explode(',', $maLoaiXe);
            }
            $query->whereIn('ModelXe.MaLoaiXe', $maLoaiXe);
        }

        $tenhang = HangXe::where('MaHang', $id)->first();

        $result = $query->paginate(10);

        if ($result->isEmpty()) {
            return response()->json([
                'tenhang' => $tenhang->TenHang,
                'data' => [],
                'status_code' => 404,
                'message' => 'Không có thông tin cần tìm.'
            ]);
        }

        return response()->json([
            'tenhang' => $tenhang->TenHang,
            'data' => $result,
            'status_code' => 200,
            'message' => 'ok'
        ]);
    }





    /**
     * @OA\get(
     *     path="/api/category/getloaixe",
     *    tags={"category"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function getLoaiXe()
    {
        $db = LoaiXe::get();
        return $db ? $this->ok($db) : $this->errors(null);
    }
    /**
     * @OA\get(
     *     path="/api/category/getnamsanxuat",
     *    tags={"category"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function getNamSanXuat()
    {
        $db = ModelXe::distinct('NamSanXuat')->orderBy('NamSanXuat', 'desc')->pluck('NamSanXuat');
        return $db ? $this->ok($db) : $this->errors(null);
    }

    public function getNhienLieu()
    {
        $db = ModelXe::distinct('NhienLieu')->orderBy('NhienLieu', 'desc')->pluck('NhienLieu');
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
        $topCars = ModelXe::select('ModelXe.*')
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
        $topCars = ModelXe::select('ModelXe.*', DB::raw('SUM(ChiTietDatHang.SoLuong) AS SoLuongXeDaBan'))
            ->leftJoin('ChiTietDatHang', 'ModelXe.MaModel', '=', 'ChiTietDatHang.MaModel')
            ->groupBy('ModelXe.MaModel')
            ->orderBy('SoLuongXeDaBan', 'DESC')
            ->limit(10)
            ->get();

        return $topCars ? $this->ok($topCars) : $this->errors(null);
    }
}
