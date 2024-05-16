<?php

namespace App\Http\Controllers;

use App\Models\NhaCungCap;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;

class NhaCungCapController extends Controller
{
    use TrangThaiTrait;

    public function index($total = null)
    {
        $db = NhaCungCap::paginate($total);
               return $db? $this->ok($db) : $this->errors(null);

    }

    public function search(Request $request)
    {
        $search = $request->input('search');
        $totalPage = $request->input('totalPage');

        $query = NhaCungCap::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('MaNhaCungCap', 'like', '%' . $search . '%')
                    ->orWhere('TenNhaCungCap', 'like', '%' . $search . '%')
                    ->orWhere('DiaChi', 'like', '%' . $search . '%')
                    ->orWhere('Email', 'like', '%' . $search . '%')
                    ->orWhere('SoDienThoai', 'like', '%' . $search . '%');
            });
        }

        $db = $query->paginate($totalPage ?? 5);
        $kq =  ['ketqua' => $db, 'timkiem' => $query];

        return $db->total() > 0 ? $this->ok($kq) : $this->errors(null);
    }
    public function delete($id)
    {
        $db = NhaCungCap::where('MaNhaCungCap', $id)->first()->delete();
               return $db? $this->ok($db) : $this->errors(null);

    }

    public function deletes(Request $request)
    {
        $ids = $request->input('ids');

        $db = NhaCungCap::whereIn('MaNhaCungCap', $ids)->delete();
        return $db? $this->ok($db) : $this->errors(null);

    }


    public function save(Request $res, $id = null)
    {
        $tk = $id ?NhaCungCap::where('MaNhaCungCap', $id)->first() : new NhaCungCap();
  
        $tk->TenNhaCungCap = $res->TenNhaCungCap;
        $tk->Email = $res->Email;
        $tk->DiaChi = $res->DiaChi;
        $tk->SoDienThoai = $res->SoDienThoai;
        $db = $tk->save();
               return $db? $this->ok($db) : $this->errors(null);

    }



    public function getNhaCungCap($id)
    {
        $db = NhaCungCap::find($id);
               return $db? $this->ok($db) : $this->errors(null);

    }
}
