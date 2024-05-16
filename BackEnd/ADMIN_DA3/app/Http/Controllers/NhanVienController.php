<?php

namespace App\Http\Controllers;

use App\Models\NhanVien;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;

class NhanVienController extends Controller
{
    use TrangThaiTrait;

    public function index($total = null)
    {
        $db = NhanVien::paginate($total);
        return $db ? $this->ok($db) : $this->errors(null);
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
        $kq =  ['ketqua' => $db, 'timkiem' => $query];

        return $db->total() > 0 ? $this->ok($kq) : $this->errors(null);
    }
    public function delete($id)
    {
        $db = NhanVien::where('MaNhanVien', $id)->first()->delete();
        return $db ? $this->ok($db) : $this->errors(null);
    }

    public function deletes(Request $request)
    {
        $ids = $request->input('ids');

        $db = NhanVien::whereIn('MaNhanVien', $ids)->delete();

        return $db ? $this->ok($db) : $this->errors(null);

    }


    public function save(Request $res, $id= null)
    {   
        $tk = $id ? NhanVien::where('MaNhanVien', $id)->first() : new NhanVien();

        $tk->MaTaiKhoan = $res->MaTaiKhoan;
        $tk->ChucVu = $res->ChucVu;
        $tk->TenNhanVien = $res->TenNhanVien;
        $tk->DiaChi = $res->DiaChi;
        $tk->SoDienThoai = $res->SoDienThoai;
        $tk->Luong = $res->Luong;
        $db = $tk->save();
        return $db ? $this->ok($db) : $this->errors(null);
    }



    public function getNhanVien($id)
    {
        $db = NhanVien::find($id);
        return $db ? $this->ok($db) : $this->errors(null);
    }
}
