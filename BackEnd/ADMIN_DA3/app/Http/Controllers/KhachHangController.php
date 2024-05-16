<?php

namespace App\Http\Controllers;

use App\Models\KhachHang;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;

class KhachHangController extends Controller
{
    use TrangThaiTrait;

    public function index($total = null)
    {
        $db = KhachHang::paginate($total);
        return $db ? $this->ok($db) : $this->errors(null);
    }

    public function search(Request $request)
    {
        $search = $request->input('search');
        $totalPage = $request->input('totalPage');

        $query = KhachHang::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('HoVaTen', 'like', '%' . $search . '%')
                    ->orWhere('SDT', 'like', '%' . $search . '%')
                    ->orWhere('MaKhachHang', 'like', '%' . $search . '%')
                    ->orWhere('Email', 'like', '%' . $search . '%');
            });
        }

        $db = $query->paginate($totalPage ?? 5);
        $kq =  ['ketqua' => $db, 'timkiem' => $query];

        return $db->total() > 0 ? $this->ok($kq) : $this->errors(null);
    }
    public function delete($id)
    {
        $db = KhachHang::where('MaKhachHang', $id)->first()->delete();
        return $db ? $this->ok($db) : $this->errors(null);
    }

    public function deletes(Request $request)
    {
        $ids = $request->input('ids');

        $db = KhachHang::whereIn('MaKhachHang', $ids)->delete();

        return $db ? $this->ok($db) : $this->errors(null);
    }


    public function save(Request $res, $id = null)
    {

        $tk = $id ? KhachHang::where('MaKhachHang', $id)->first() : new KhachHang();
        $tk->MaTaiKhoan = $res->MaTaiKhoan;
        $tk->Email = $res->Email;
        $tk->SDT = $res->SDT;
        $tk->HoVaTen = $res->HoVaTen;
        $tk->CMND = $res->CMND;
        $db = $tk->save();
        return $db ? $this->ok($db) : $this->errors(null);
    }



    public function getkhachhang($id)
    {
        $db = KhachHang::find($id);
        return $db ? $this->ok($db) : $this->errors(null);
    }
}
