<?php

namespace App\Http\Controllers;

use App\Models\ChiTietDatHang;
use App\Models\DatHang;
use App\Models\KhachHang;
use App\Models\YeuCauHuy;
// use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DatHangController extends Controller
{
    // use TrangThaiTrait;
    public function errors($loi)
    {
        return response()->json(
            [
                'data' => null,
                'status_code' => 404,
                'message' => $loi ?? "lỗi rồi!"
            ]
        );
    }

    public function ok($dt)
    {
        return response()->json([
            'data' => $dt,
            'status_code' => 200,
            'message' => 'ok'
        ]);
    }

    // 1 upload file 
    public function uploadFile($request, $fieldName, $path)
    {
        if ($request->hasFile($fieldName)) {
            $file = $request->file($fieldName);
            $file_name = $file->getClientOriginalName();
            $file->move(public_path($path), $file_name);
            return $file_name;
        }
        return null;
    }

    //upload nhiều file
    public function uploadFiles($request, $fieldName, $path)
    {
        $file_names = [];

        if ($request->hasFile($fieldName)) {
            $files = $request->file($fieldName);

            foreach ($files as $file) {
                $file_name = $file->getClientOriginalName();
                $file->move(public_path($path), $file_name);
                $file_names[] = $file_name;
            }
        }

        return $file_names;
    }
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

    public function DatXe(Request $request)
    {
        $dh = new DatHang();

        if (!$request->MaKhachHang) {
            $kh = new KhachHang();
            $kh->HoVaTen = $request->HoVaTen;
            $kh->TaiKhoanID = $request->MaTaiKhoan;
            $kh->Email = $request->Email;
            $kh->CMND = $request->CMND;
            $kh->SDT = $request->SDT;
            $kh->DiaChi = $request->DiaChi;
            $kh->AnhDaiDien = $request->AnhDaiDien;
            $kh->save();
            $dh->MaKhachHang = $kh->MaKhachHang;
        } else {
            $dh->MaKhachHang = $request->MaKhachHang;
        }

        $dh->TrangThai = "Chờ liên hệ xác nhận";
        $dh->TongTien = $request->TongTien;
        $dh->MaNhanVien = null;
        $dh->HinhThucNhan = $request->HinhThucNhan;
        $dh->DiaChiNhanXe = $request->DiaChiNhanXe;

        $dh->save();
        $maDH = $dh->MaDatHang;

        // Lưu các chi tiết đơn hàng
        foreach ($request->ChiTietDatHang as $ctdhRequest) {
            $ctdh = new ChiTietDatHang();
            $ctdh->MaDatHang = $maDH;
            $ctdh->MaModel = $ctdhRequest['MaModel'];
            $ctdh->MaPhienBan = $ctdhRequest['MaPhienBan'];
            $ctdh->MaMauNgoaiThat = $ctdhRequest['MaMauNgoaiThat'];
            $ctdh->MaMauNoiThat = $ctdhRequest['MaMauNoiThat'];
            $ctdh->SoLuong = $ctdhRequest['SoLuong'];
            $ctdh->GiaBan = $ctdhRequest['GiaBan'];
            $ctdh->save();
        }
        return response()->json(['success' => true, 'message' => 'Đặt xe thành công', 'MaDatHang' => $maDH]);
    }


    public function NhanVienXacNhan(Request $request)
    {
        $dh = DatHang::where('MaDatHang', $request->MaDatHang)->first();
        if ($dh) {
            $dh->MaNhanVien = $request->MaNhanvien;
            $dh->TrangThai = "Xác nhận thành công, chờ giao xe";
            $db = $dh->save();
        }

        return $db ? $this->ok($db) : $this->errors(null);
    }

    public function GiaoXe(Request $request)
    {
        $dh = DatHang::where('MaDatHang', $request->MaDatHang)->first();

        if ($dh->HinhThucNhan == "Theo địa chỉ") {
            $dh->TrangThai = "Đang giao xe";
            $db = $dh->save();
        } else {
            $showroomText = (string) $dh->DiaChiNhanXe;
            $dh->TrangThai = "Xe đã về, quý khách vui lòng tới showroom: " . $showroomText;
            $db = $dh->save();
        }
        return $db ? $this->ok($db) : $this->errors(null);
    }



    public function HoanTat(Request $request)
    {
        $dh = DatHang::where('MaDatHang', $request->MaDatHang)->first();
        $dh->TrangThai = "Đơn hàng thành công, cảm ơn quý khách <3";
        $db = $dh->save();

        return $db ? $this->ok($db) : $this->errors(null);
    }

    public function HuyDonHang($id)
    {
        $dl = DatHang::where('MaDatHang', $id)->first();
        if ($dl->TrangThai == "Chờ liên hệ xác nhận") {
            $dl->TrangThai = "Đơn hàng đã được huỷ";
            $db = $dl->save();
            return $db ? $this->ok("Quý khách đã huỷ đơn hàng thành công !") : $this->errors(null);
        } else {
            $this->ChoXacNhanHuyDon($dl);
            return $this->ok("Yêu cầu hủy đơn hàng đã được gửi đến admin để xác nhận.");
        }
    }

    private function ChoXacNhanHuyDon($order)
    {
        DB::table('YeuCauHuy')->insert([
            'MaDatHang' => $order->MaDatHang,
            'NgayYeuCau' => now()
        ]);
    }
    public function search_YeuCauHuy(Request $request)
    {
        $search = $request->input('search');
        $totalPage = $request->input('totalPage');

        $query = YeuCauHuy::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('MaYeuCauHuy', 'like', '%' . $search . '%')
                    ->orWhere('MaDatHang', 'like', '%' . $search . '%');
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



    public function XacNhanYeuCauHuy($id)
    {
        $dl = DatHang::where('MaDatHang', $id)->first();

        if ($dl) {
            $dl->TrangThai = "Đơn hàng đã được huỷ";
            $db = $dl->save();

            if ($db) {
                $yeuCauHuy = YeuCauHuy::where('MaDatHang', $dl->MaDatHang)->first();

                if ($yeuCauHuy) {
                    $yeuCauHuy->delete();
                } else {
                    return $this->errors("Yêu cầu hủy không tồn tại.");
                }
            }
            return $db ? $this->ok($db) : $this->errors(null);
        } else {
            return $this->errors("Đơn hàng không tồn tại.");
        }
    }
}
