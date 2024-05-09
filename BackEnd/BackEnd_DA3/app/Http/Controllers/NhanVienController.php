<?php

namespace App\Http\Controllers;

use App\Models\NhanVien;
use Illuminate\Http\Request;

class NhanVienController extends Controller
{
    public function errors($loi)
    {
        return response()->json([
            'data' => null,
            'status_code' => 404,
            'message' => $loi ?? "lỗi rồi!"
        ]);
    }

    public function index($total = null)
    {
        $db = NhanVien::paginate($total);
        if ($db) {
            return response()->json([
                'data' => $db,
                'status_code' => 200,
                'message' => 'ok'
            ]);
        } else {
            return $this->errors(null);
        }
    }

    public function search(Request $request)
    {
        $search = $request->input('search');
        $totalPage = $request->input('totalPage');

        $query = NhanVien::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('MaTaiKhoan', 'like', '%' . $search . '%')
                    ->orWhere('TenNhanVien', 'like', '%' . $search . '%')
                    ->orWhere('DiaChi', 'like', '%' . $search . '%')
                    ->orWhere('ChucVu', 'like', '%' . $search . '%')
                    ->orWhere('SoDienThoai', 'like', '%' . $search . '%');
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
    public function delete($id)
    {
        $db = NhanVien::where('MaNhanVien', $id)->first()->delete();
        if ($db) {
            return response()->json([
                'data' => $db,
                'status_code' => 200,
                'message' => 'ok'
            ]);
        } else {
            return $this->errors(null);
        }
    }

    public function deletes(Request $request)
    {
        $ids = $request->input('ids');

        $deleted = NhanVien::whereIn('MaNhanVien', $ids)->delete();

        if ($deleted) {
            return response()->json([
                'data' => $deleted,
                'status_code' => 200,
                'message' => 'Đã xoá thành công'
            ]);
        } else {
            return $this->errors(null);
        }
    }


    public function save(Request $res, $id)
    {
        if ($id == 0) {
            $tk = new NhanVien();
        } else {
            $tk = NhanVien::where('MaNhanVien', $id)->first();
        }
        $tk->MaTaiKhoan = $res->MaTaiKhoan;
        $tk->ChucVu = $res->ChucVu;
        $tk->TenNhanVien = $res->TenNhanVien;
        $tk->DiaChi = $res->DiaChi;
        $tk->SoDienThoai = $res->SoDienThoai;
        $tk->Luong = $res->Luong;
        $db = $tk->save();
        if ($db) {
            return response()->json([
                'data' => $db,
                'status_code' => 200,
                'message' => 'ok'
            ]);
        } else {
            return $this->errors(null);
        }
    }



    public function getNhanVien($id)
    {
        $db = NhanVien::find($id);
        if ($db) {
            return response()->json([
                'data' => $db,
                'status_code' => 200,
                'message' => 'ok'
            ]);
        } else {
            return $this->errors(null);
        }
    }
}
