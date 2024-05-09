<?php

namespace App\Http\Controllers;

use App\Models\ModelXe;
use Illuminate\Http\Request;

class ModelXeController extends Controller
{
    public function errors($loi)
    {
        return response()->json([
            'data' => null,
            'status_code' => 404,
            'message' => $loi ?? "lỗi rồi!"
        ]);
    }

    public function index($total = null)
    {
        $db = ModelXe::paginate($total);
        if ($db) {
            return response()->json([
                'data' => $db,
                'status_code' => 200,
                'message' => 'ok'
            ]);
        } else {
            return $this->errors(null);
        }
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
        if ($db) {
            return response()->json([
                'data' => ['ketqua' => $db, 'timkiem' => $query],
                'status_code' => 200,
                'message' => 'ok'
            ]);
        } else {
            return $this->errors(null);
        }
    }
    public function delete($id)
    {
        $db = ModelXe::where('MaModel', $id)->first()->delete();
        if ($db) {
            return response()->json([
                'data' => $db,
                'status_code' => 200,
                'message' => 'ok'
            ]);
        } else {
            return $this->errors(null);
        }
    }

    public function deletes(Request $request)
    {
        $ids = $request->input('ids');

        $deleted = ModelXe::whereIn('MaModel', $ids)->delete();

        if ($deleted) {
            return response()->json([
                'data' => $deleted,
                'status_code' => 200,
                'message' => 'Đã xoá thành công'
            ]);
        } else {
            return $this->errors(null);
        }
    }


    public function save(Request $res, $id)
    {
        $file_name = null;

        if ($res->has('image_upload')) {
            $file = $res->image_upload;
            $file_name = $file->getClientoriginalName();
            $file->move(public_path('uploads'), $file_name);
        }

        $file_names = [];
        if ($res->hasFile('image_uploads')) {
            $files = $res->file('image_uploads');
            
            foreach ($files as $file) {
                $file_name = $file->getClientOriginalName();
                $file->move(public_path('uploads'), $file_name);
                $file_names[] = $file_name;
            }
        }

        if ($id == 0) {
            $tk = new ModelXe();
        } else {
            $tk = ModelXe::where('MaModel', $id)->first();
        }

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
        if ($db) {
            return response()->json([
                'data' => $db,
                'status_code' => 200,
                'message' => 'ok'
            ]);
        } else {
            return $this->errors(null);
        }
    }



    public function getModelXe($id)
    {
        $db = ModelXe::find($id);
        if ($db) {
            return response()->json([
                'data' => $db,
                'status_code' => 200,
                'message' => 'ok'
            ]);
        } else {
            return $this->errors(null);
        }
    }
}
