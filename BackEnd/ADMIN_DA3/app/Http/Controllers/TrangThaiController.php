<?php

namespace App\Http\Controllers;

use App\Models\ChiTietDatHang;
use App\Models\DatHang;
use App\Models\KhachHang;
use App\Models\MauNoiThat;
use App\Models\TrangThaiDatHang;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;

class TrangThaiController extends Controller
{

    use TrangThaiTrait;
    /**
     * @OA\post(
     *     path="/api/thongsokythuatxe/search",
     *    tags={"thongsokythuatxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */

    public function HienThiTrangThai_1(Request $request)
    {
        $search = $request->input('search');
        $page = $request->input('page');
        $totalPage = $request->input('pageSize');

        $query = DatHang::select('dathang.*', 'trangthaidathang.TrangThai', 'trangthaidathang.CoTrangThai', 'trangthaidathang.MaTrangThai')
            ->join('trangthaidathang', 'trangthaidathang.MaDatHang', '=', 'dathang.MaDatHang')
            ->where('trangthaidathang.CoTrangThai', 1)
            ->where('trangthaidathang.TrangThai', 'Chờ liên hệ xác nhận');

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('dathang.MaDatHang', 'like', '%' . $search . '%')
                    ->orWhere('dathang.MaKhachHang', 'like', '%' . $search . '%')
                    ->orWhere('dathang.DiaChiNhanXe', 'like', '%' . $search . '%');
            });
        }

        $db = $query->paginate($totalPage ?? ($page ?? 1));

        return  $db ? $this->ok($db) : $this->errors(null);
    }

    public function HienThiChiTietDatHang($id)
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


    public function NhanVienNhanDonHang(Request $res)
    {
        $madatHang = $res->MaDatHang;

        $db = DatHang::where("MaDatHang", $madatHang)->first();
        $db->MaNhanVien = $res->MaNhanVien;
        $db->save();

        $oldTrangThai = TrangThaiDatHang::where("MaTrangThai", $res->MaTrangThai)->first();
        $oldTrangThai->CoTrangThai = 2;
        $oldTrangThai->save();

        $newTrangThai = new TrangThaiDatHang();
        $newTrangThai->MaDatHang = $madatHang;
        $newTrangThai->TrangThai = "Nhân viên xác nhận đơn hàng, đang tiến hành thủ tục";
        $newTrangThai->CoTrangThai = 1;

        return  $newTrangThai->save() ? $this->ok($newTrangThai) : $this->errors(null);
    }
}
