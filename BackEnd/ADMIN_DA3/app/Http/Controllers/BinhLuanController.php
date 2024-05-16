<?php

namespace App\Http\Controllers;

use App\Models\BinhLuan;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;

class BinhLuanController extends Controller
{

    use TrangThaiTrait;

    public function search(Request $request)
    {
        $search = $request->input('search');
        $totalPage = $request->input('totalPage');

        $query = BinhLuan::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('MaBinhLuan', 'like', '%' . $search . '%')
                    ->orWhere('MaTaiKhoan', 'like', '%' . $search . '%');
            });
        }

        $db = $query->paginate($totalPage ?? 5);
        $kq =  ['ketqua' => $db, 'timkiem' => $query];

        return $db->total() > 0 ? $this->ok($kq) : $this->errors(null);
    }

    public function index($total = null)
    {
        $db = BinhLuan::paginate($total);
        return $db ? $this->ok($db) : $this->errors(null);
    }



    public function delete($id)
    {
        $db = BinhLuan::where('MaBinhLuan', $id)->first()->delete();
        return $db ? $this->ok($db) : $this->errors(null);
    }

    public function deletes(Request $request)
    {
        $ids = $request->input('ids');

        $db = BinhLuan::whereIn('MaBinhLuan', $ids)->delete();

        return $db ? $this->ok($db) : $this->errors(null);
    }


    public function save(Request $res, $id = null)
    {

        $tk = $id ? BinhLuan::where('MaBinhLuan', $id)->first() :  new BinhLuan();

        $tk->MaBaiViet = $res->MaBaiViet ?? null;
        $tk->MaModel = $res->MaModel ?? null;
        $tk->MaTaiKhoan = $res->MaTaiKhoan;
        $tk->NoiDung = $res->NoiDung;
        $db = $tk->save();
        return $db ? $this->ok($db) : $this->errors(null);
    }



    public function getBinhLuan($id)
    {
        $db = BinhLuan::find($id);
        return $db ? $this->ok($db) : $this->errors(null);
    }
}
