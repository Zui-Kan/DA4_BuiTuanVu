<?php

namespace App\Http\Controllers;

use App\Models\NhaCungCap;
use Illuminate\Http\Request;

class NhaCungCapController extends Controller
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
        $db = NhaCungCap::paginate($total);
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
        $db = NhaCungCap::where('MaNhaCungCap', $id)->first()->delete();
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

        $deleted = NhaCungCap::whereIn('MaNhaCungCap', $ids)->delete();

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
        if ($id == 0) {
            $tk = new NhaCungCap();

        } else {
            $tk = NhaCungCap::where('MaNhaCungCap', $id)->first();
        }
        $tk->TenNhaCungCap = $res->TenNhaCungCap;
        $tk->Email = $res->Email;
        $tk->DiaChi = $res->DiaChi;
        $tk->SoDienThoai = $res->SoDienThoai;
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



    public function getNhaCungCap($id)
    {
        $db = NhaCungCap::find($id);
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
