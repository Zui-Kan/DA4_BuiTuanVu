<?php

namespace App\Http\Controllers;

use App\Models\MauNoiThat;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;

class MauNoiThatController extends Controller
{
use TrangThaiTrait;

    public function index($total = null)
    {
        $db = MauNoiThat::paginate($total);
               return $db? $this->ok($db) : $this->errors(null);

    }

    public function search(Request $request)
    {
        $search = $request->input('search');
        $totalPage = $request->input('totalPage');

        $query = MauNoiThat::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('MaMauNoiThat', 'like', '%' . $search . '%')
                    ->orWhere('TenMauNoiThat', 'like', '%' . $search . '%');
            });
        }

        $db = $query->paginate($totalPage ?? 5);
        $kq =  ['ketqua' => $db, 'timkiem' => $query];

        return $db->total() > 0 ? $this->ok($kq) : $this->errors(null);
    }
    public function delete($id)
    {
        $db = MauNoiThat::where('MaMauNoiThat', $id)->first()->delete();
               return $db? $this->ok($db) : $this->errors(null);

    }

    public function deletes(Request $request)
    {
        $ids = $request->input('ids');

        $db = MauNoiThat::whereIn('MaMauNoiThat', $ids)->delete();

        return $db ? $this->ok($db) : $this->errors(null);

    }


    public function save(Request $res, $id = null)
    {
        $file_name = $this->uploadFile($res, 'image_upload', 'uploads');

        $tk = $id ? MauNoiThat::where('MaMauNoiThat', $id)->first() :  new MauNoiThat();

        $tk->MaMauNgoaiThat = $res->MaMauNgoaiThat;
        $tk->TenMauNoiThat = $res->TenMauNoiThat;


        if ($file_name !== null) {
            $tk->HinhAnhMau = $file_name;
        }

        $db = $tk->save();
               return $db? $this->ok($db) : $this->errors(null);

    }



    public function getMauNoiThat($id)
    {
        $db = MauNoiThat::find($id);
               return $db? $this->ok($db) : $this->errors(null);

    }
}
