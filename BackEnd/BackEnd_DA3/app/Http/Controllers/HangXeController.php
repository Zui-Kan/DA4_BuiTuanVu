<?php

namespace App\Http\Controllers;

use App\Models\HangXe;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;

class HangXeController extends Controller
{
    use TrangThaiTrait;

    public function search(Request $request)
    {
        $search = $request->input('search');
        $totalPage = $request->input('totalPage');

        $query = HangXe::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('MaHang', 'like', '%' . $search . '%')

                    ->orWhere('TenHang', 'like', '%' . $search . '%');
            });
        }

        $db = $query->paginate($totalPage ?? 5);

        $kq =  ['ketqua' => $db, 'timkiem' => $query];

        return $db->total() > 0 ? $this->ok($kq) : $this->errors(null);
    }

    public function index($total = null)
    {
        $db = HangXe::paginate($total);
                return $db->total() > 0 ? $this->ok($db) : $this->errors(null);

    }



    public function delete($id)
    {
        $db = HangXe::where('MaHangXe', $id)->first()->delete();
              return $db? $this->ok($db) : $this->errors(null);

    }

    public function deletes(Request $request)
    {
        $ids = $request->input('ids');

        $db = HangXe::whereIn('MaHangXe', $ids)->delete();

        return $db? $this->ok($db) : $this->errors(null);

    }


    public function save(Request $res, $id = null)
    {
        $file_name = null;

        if ($res->has('image_upload')) {
            $file = $res->image_upload;
            $file_name = $file->getClientoriginalName();
            $file->move(public_path('uploads'), $file_name);
        }

        $tk = $id ?  HangXe::where('MaHangXe', $id)->first() : new HangXe();

        $tk->TenHang = $res->TenHang;

        if ($file_name !== null) {
            $tk->HinhAnhHangXe = $file_name;
        }
        $db = $tk->save();
              return $db? $this->ok($db) : $this->errors(null);

    }



    public function getHangXe($id)
    {
        $db = HangXe::find($id);
              return $db? $this->ok($db) : $this->errors(null);

    }
}
