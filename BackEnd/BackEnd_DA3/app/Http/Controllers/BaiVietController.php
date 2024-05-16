<?php

namespace App\Http\Controllers;

use App\Models\BaiViet;
use Illuminate\Http\Request;
use App\Http\Controllers\TrangThaiController;
use App\Traits\TrangThaiTrait;

class BaiVietController extends Controller
{

    use TrangThaiTrait;

    public function search(Request $request)
    {
        $search = $request->input('search');
        $totalPage = $request->input('totalPage');

        $query = BaiViet::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('MaBaiViet', 'like', '%' . $search . '%')
                    ->orWhere('MaChuDe', 'like', '%' . $search . '%')
                    ->orWhere('MaChuDe', 'like', '%' . $search . '%')
                    ->orWhere('TieuDe', 'like', '%' . $search . '%');
            });
        }

        $db = $query->paginate($totalPage ?? 5);

        $kq =  ['ketqua' => $db, 'timkiem' => $search];

        return  $db->total() > 0 ? $this->ok($kq) : $this->errors(null);
    }


    public function index($total = null)
    {
        $db = BaiViet::paginate($total);

        return $db->total() > 0 ? $this->ok($db) : $this->errors(null);
    }

    public function delete($id)
    {
        $db = BaiViet::where('MaBaiViet', $id)->first()->delete();
        return $db ? $this->ok($db) : $this->errors(null);
    }

    public function deletes(Request $request)
    {
        $ids = $request->input('ids');

        $db = BaiViet::whereIn('MaBaiViet', $ids)->delete();

        return $db ? $this->ok($db) : $this->errors(null);
    }


    public function save(Request $res, $id = null)
    {
        $db = $id ? BaiViet::where('MaBaiViet', $id)->first() : new BaiViet();

        $db->MaTaiKhoan = $res->MaTaiKhoan;
        $db->MaChuDe = $res->MaChuDe;
        $db->TieuDe = $res->TieuDe;
        $db->NoiDung = $res->NoiDung;

        $db = $db->save();

        return $db ? $this->ok($db) : $this->errors(null);
    }



    public function getBaiViet($id)
    {
        $db = BaiViet::find($id);
        return $db ? $this->ok($db) : $this->errors(null);

    }


}
