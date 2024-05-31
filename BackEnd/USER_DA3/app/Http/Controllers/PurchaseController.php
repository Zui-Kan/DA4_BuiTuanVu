<?php

namespace App\Http\Controllers;

use App\Models\ChiTietDatHang;
use App\Models\DatHang;
use App\Models\KhachHang;
use App\Models\MauNoiThat;
use App\Models\TrangThaiDatHang;
use App\Models\YeuCauHuy;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PurchaseController extends Controller
{
    use TrangThaiTrait;

    /**
     * @OA\post(
     *     path="/api/datxe/search",
     *    tags={"datxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function search(Request $request)
    {
        $search = $request->input('search');
        $totalPage = $request->input('totalPage');
        $query = DatHang::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('MaLoaiXe', 'like', '%' . $search . '%')
                    ->orWhere('TenLoaiXe', 'like', '%' . $search . '%');
            });
        }

        $db = $query->paginate($totalPage ?? 5);
        if ($db) {
            return response()->json([
                'data' => ['ketqua' => $db, 'timkiem' => $query],
                'status_code' => 200,
                'message' => 'ok'
            ]);
        } else {
            return $this->errors(null);
        }
    }

    /**
     * @OA\post(
     *     path="/api/datxe/dat",
     *    tags={"datxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */

    public function getAllPurchase($id)
    {
        // Lấy danh sách khách hàng dựa vào mã tài khoản
        $listkh = KhachHang::where("TaiKhoanID", $id)->get();

        // Mảng để lưu trữ chi tiết đơn đặt hàng
        $result = [];

        // Duyệt qua từng khách hàng
        foreach ($listkh as $kh) {
            // Lấy danh sách đơn đặt hàng của từng khách hàng, mỗi trang có 10 đơn hàng
            $dhList = DatHang::where("MaKhachHang", $kh->MaKhachHang)
                ->orderBy('NgayTao', 'desc') 
                ->paginate(20);

            // Duyệt qua từng đơn đặt hàng
            foreach ($dhList as $order) {
                // Lấy trạng thái đặt hàng dựa vào mã đặt hàng
                $tt = TrangThaiDatHang::where("MaDatHang", $order->MaDatHang)->latest('NgayTao')->first();

                // Lấy chi tiết đơn đặt hàng
                $ctdhList = ChiTietDatHang::where('MaDatHang', $order->MaDatHang)->get();

                // Mảng để lưu trữ chi tiết của từng đơn đặt hàng
                $details = [];

                // Duyệt qua từng chi tiết đơn đặt hàng
                foreach ($ctdhList as $detail) {
                    // Lấy thông tin chi tiết dựa vào mã màu nội thất
                    $detailInfo = MauNoiThat::select(
                        'ModelXe.TenModel',
                        'ModelXe.HinhAnhXe',
                        'PhienBanXe.TenPhienBan',
                        'MauNgoaiThat.TenMauNgoaiThat',
                        'MauNoiThat.TenMauNoiThat'
                    )
                        ->join('MauNgoaiThat', 'MauNoiThat.MaMauNgoaiThat', '=', 'MauNgoaiThat.MaMauNgoaiThat')
                        ->join('PhienBanXe', 'MauNgoaiThat.MaPhienBan', '=', 'PhienBanXe.MaPhienBan')
                        ->join('ModelXe', 'PhienBanXe.MaModel', '=', 'ModelXe.MaModel')
                        ->where('MauNoiThat.MaMauNoiThat', $detail->MaMauNoiThat)
                        ->first();

                    // Thêm thông tin chi tiết vào mảng details
                    if ($detailInfo) {
                        $details[] = array_merge(
                            $detail->toArray(),
                            $detailInfo->toArray(),
                        );
                    }
                }

                // Thêm thông tin đơn đặt hàng và các chi tiết vào mảng result
                $result[] = [
                    'dathang' => $order,
                    'trangthai' => $tt,
                    'chitietdathang' => $details
                ];
            }
        }

        // Trả về dữ liệu hoặc lỗi nếu không có dữ liệu
        return !empty($result) ? $this->ok($result) : $this->errors(null);
    }


    public function getpurchase($id)
    {
        // Paginate các đơn đặt hàng, mỗi trang có 10 đơn hàng
        $dh = DatHang::where("MaDatHang", $id)->first();

        // Duyệt qua từng đơn đặt hàng
        $kh = KhachHang::where("MaKhachHang", $dh->MaKhachHang)->first();
        // Lấy trạng thái đặt hàng dựa vào mã đặt hàng
        $tt = TrangThaiDatHang::where("MaDatHang", $dh->MaDatHang)->get();
        $tt = TrangThaiDatHang::where("MaDatHang", $dh->MaDatHang)
            ->orderBy('NgayTao', 'desc')
            ->get();

        // Lấy chi tiết đơn đặt hàng
        $ctdhList = ChiTietDatHang::where('MaDatHang', $dh->MaDatHang)->get();

        // Mảng để lưu trữ chi tiết của từng đơn đặt hàng
        $details = [];

        // Duyệt qua từng chi tiết đơn đặt hàng
        foreach ($ctdhList as $detail) {
            // Lấy thông tin chi tiết dựa vào mã màu nội thất
            $detailInfo = MauNoiThat::select(
                'ModelXe.TenModel',
                'ModelXe.HinhAnhXe',
                'PhienBanXe.TenPhienBan',
                'MauNgoaiThat.TenMauNgoaiThat',
                'MauNoiThat.TenMauNoiThat'
            )
                ->join('MauNgoaiThat', 'MauNoiThat.MaMauNgoaiThat', '=', 'MauNgoaiThat.MaMauNgoaiThat')
                ->join('PhienBanXe', 'MauNgoaiThat.MaPhienBan', '=', 'PhienBanXe.MaPhienBan')
                ->join('ModelXe', 'PhienBanXe.MaModel', '=', 'ModelXe.MaModel')
                ->where('MauNoiThat.MaMauNoiThat', $detail->MaMauNoiThat)
                ->first();


            // Thêm thông tin chi tiết vào mảng details
            if ($detailInfo) {
                $details[] = array_merge(
                    $detail->toArray(),
                    $detailInfo->toArray(),
                );
            }
        }

        // Thêm thông tin đơn đặt hàng và các chi tiết vào mảng result
        $result = [
            'khachhang' => $kh,
            'dathang' => $dh,
            'trangthai' => $tt,
            'chitietdathang' => $details
        ];


        // Trả về dữ liệu hoặc lỗi nếu không có dữ liệu
        return !empty($result) ? $this->ok($result) : $this->errors(null);
    }
}
