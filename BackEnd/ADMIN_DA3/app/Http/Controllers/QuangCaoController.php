<?php

namespace App\Http\Controllers;

use App\Models\QuangCao;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;

class QuangCaoController extends Controller
{
    use TrangThaiTrait;

    public function index($total = null)
    {
        $db = QuangCao::paginate($total);
        return $db ? $this->ok($db) : $this->errors(null);
    }

    public function search(Request $request)
    {
        $search = $request->input('search');
        $totalPage = $request->input('totalPage');

        $query = QuangCao::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('MaQuangCao', 'like', '%' . $search . '%')
                    ->orWhere('TieuDe', 'like', '%' . $search . '%');
            });
        }

        $db = $query->paginate($totalPage ?? 5);
        $kq =  ['ketqua' => $db, 'timkiem' => $query];

        return $db->total() > 0 ? $this->ok($kq) : $this->errors(null);
    }

    public function delete($id)
    {
        $db = QuangCao::where('MaQuangCao', $id)->first()->delete();
        return $db ? $this->ok($db) : $this->errors(null);
    }

    public function deletes(Request $request)
    {
        $ids = $request->input('ids');

        $db = QuangCao::whereIn('MaQuangCao', $ids)->delete();
        return $db ? $this->ok($db) : $this->errors(null);
    }


    public function save(Request $res, $id = null)
    {
        $tk = $id ? QuangCao::where('MaQuangCao', $id)->first() : new QuangCao();

        $tk->HinhAnh = $res->HinhAnh;
        $tk->DSHinhAnh = $res->DSHinhAnh;
        $tk->Link = $res->Link;
        $tk->TieuDe = $res->TieuDe;
        $db = $tk->save();
        return $db ? $this->ok($db) : $this->errors(null);
    }



    public function getQuangCao($id)
    {
        $db = QuangCao::find($id);
        return $db ? $this->ok($db) : $this->errors(null);
    }
}
