<?php

namespace App\Http\Controllers;

use App\Models\PhienBanXe;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;

class PhienBanXeController extends Controller
{

    use TrangThaiTrait;

    public function search(Request $request)
    {
        $search = $request->input('search');
        $totalPage = $request->input('totalPage');

        $query = PhienBanXe::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('MaPhienBan', 'like', '%' . $search . '%')
                    ->orWhere('MaModel', 'like', '%' . $search . '%')
                    ->orWhere('TenPhienBan', 'like', '%' . $search . '%');
            });
        }

        $db = $query->paginate($totalPage ?? 5);
        $kq =  ['ketqua' => $db, 'timkiem' => $query];

        return $db->total() > 0 ? $this->ok($kq) : $this->errors(null);
    }

    public function index($total = null)
    {
        $db = PhienBanXe::paginate($total);
        return $db ? $this->ok($db) : $this->errors(null);
    }



    public function delete($id)
    {
        $db = PhienBanXe::where('MaPhienBan', $id)->first()->delete();
        return $db ? $this->ok($db) : $this->errors(null);
    }

    public function deletes(Request $request)
    {
        $ids = $request->input('ids');

        $db = PhienBanXe::whereIn('MaPhienBan', $ids)->delete();
        return $db ? $this->ok($db) : $this->errors(null);
    }


    public function save(Request $res, $id = null)
    {
        $tk = $id ? PhienBanXe::where('MaPhienBan', $id)->first() : new PhienBanXe();


        $tk->MaModel = $res->MaModel;
        $tk->TenPhienBan = $res->TenPhienBan;
        $db = $tk->save();
        return $db ? $this->ok($db) : $this->errors(null);
    }



    public function getPhienBanXe($id)
    {
        $db = PhienBanXe::find($id);
        return $db ? $this->ok($db) : $this->errors(null);
    }
}
