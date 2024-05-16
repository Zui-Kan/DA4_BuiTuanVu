<?php

namespace App\Http\Controllers;

use App\Models\ChuDeBaiViet;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;

class ChuDeBaiVietController extends Controller
{

    use TrangThaiTrait;

    public function search(Request $request)
    {
        $search = $request->input('search');
        $totalPage = $request->input('totalPage');

        $query = ChuDeBaiViet::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('MaChuDe', 'like', '%' . $search . '%')
                    ->orWhere('TenChuDu', 'like', '%' . $search . '%');
            });
        }

        $db = $query->paginate($totalPage ?? 5);
        $kq =  ['ketqua' => $db, 'timkiem' => $query];

        return $db->total() > 0 ? $this->ok($kq) : $this->errors(null);
    }

    public function index($total = null)
    {
        $db = ChuDeBaiViet::paginate($total);
        return $db->total() > 0 ? $this->ok($db) : $this->errors(null);
    }



    public function delete($id)
    {
        $db = ChuDeBaiViet::where('MaChuDe', $id)->first()->delete();
        return $db ? $this->ok($db) : $this->errors(null);
    }

    public function deletes(Request $request)
    {
        $ids = $request->input('ids');

        $db = ChuDeBaiViet::whereIn('MaChuDe', $ids)->delete();

        return $db ? $this->ok($db) : $this->errors(null);
    }


    public function save(Request $res, $id = null)
    {


        $tk = $id ? ChuDeBaiViet::where('MaChuDe', $id)->first() : new ChuDeBaiViet();
 

        $tk->TenChuDu = $res->TenChuDu;
        $tk->GhiChu = $res->GhiChu;
        $file_name = $this->uploadFile($res, 'image_upload', 'uploads');

        if ($file_name !== null) {
            $tk->HinhAnhChuDe = $file_name;
        }

        $db = $tk->save();

        return $db ? $this->ok($db) : $this->errors(null);
    }



    public function getChuDeBaiViet($id)
    {
        $db = ChuDeBaiViet::find($id);
        return $db ? $this->ok($db) : $this->errors(null);
    }
}
