<?php

namespace App\Http\Controllers;

use App\Models\ModelXe;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;

class ModelXeController extends Controller
{
    use TrangThaiTrait;

    public function index($total = null)
    {
        $db = ModelXe::paginate($total);
        return $db ? $this->ok($db) : $this->errors(null);
    }

    public function search(Request $request)
    {
        $search = $request->input('search');
        $totalPage = $request->input('totalPage');

        $query = ModelXe::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('TenModel', 'like', '%' . $search . '%')
                    ->orWhere('MaHang', 'like', '%' . $search . '%')
                    ->orWhere('Gia', 'like', '%' . $search . '%')
                    ->orWhere('NamSanXuat', 'like', '%' . $search . '%');
            });
        }

        $db = $query->paginate($totalPage ?? 5);
        $kq =  ['ketqua' => $db, 'timkiem' => $query];

        return $db->total() > 0 ? $this->ok($kq) : $this->errors(null);
    }
    public function delete($id)
    {
        $db = ModelXe::where('MaModel', $id)->first()->delete();
        return $db ? $this->ok($db) : $this->errors(null);
    }

    public function deletes(Request $request)
    {
        $ids = $request->input('ids');

        $db = ModelXe::whereIn('MaModel', $ids)->delete();

        return $db ? $this->ok($db) : $this->errors(null);
    }


    public function save(Request $res, $id=null)
    {
        $file_name = $this->uploadFile($res, 'image_upload', 'uploads');


        $file_names = $this->uploadFiles($res, 'image_uploads', 'uploads');

        $tk = $id ? ModelXe::where('MaModel', $id)->first() : new ModelXe();


        $tk->TenModel = $res->TenModel;
        $tk->MaHang = $res->MaHang;
        $tk->MaLoaiXe = $res->MaLoaiXe;
        $tk->NamSanXuat = $res->NamSanXuat;
        $tk->Gia = $res->Gia;
        $tk->MoTa = $res->MoTa;

        if ($file_name !== null) {
            $tk->HinhAnhXe = $file_name;
        }
        if (!empty($file_names)) {
            $tk->DSHinhAnhXe = json_encode($file_names);
        }

        $db = $tk->save();
        return $db ? $this->ok($db) : $this->errors(null);
    }



    public function getModelXe($id)
    {
        $db = ModelXe::find($id);
        return $db ? $this->ok($db) : $this->errors(null);
    }
}
