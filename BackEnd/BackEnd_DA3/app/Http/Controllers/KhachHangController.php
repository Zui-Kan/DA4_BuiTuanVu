<?php

namespace App\Http\Controllers;

use App\Models\KhachHang;
use Illuminate\Http\Request;

class KhachHangController extends Controller
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
        $db = KhachHang::paginate($total);
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

        $query = KhachHang::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('HoVaTen', 'like', '%' . $search . '%')
                    ->orWhere('SDT', 'like', '%' . $search . '%')
                    ->orWhere('MaKhachHang', 'like', '%' . $search . '%')
                    ->orWhere('Email', 'like', '%' . $search . '%');
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
        $db = KhachHang::where('MaKhachHang', $id)->first()->delete();
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

        $deleted = KhachHang::whereIn('MaKhachHang', $ids)->delete();

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
            $tk = new KhachHang();
        } else {
            $tk = KhachHang::where('MaKhachHang', $id)->first();
        }
        $tk->MaTaiKhoan = $res->MaTaiKhoan;
        $tk->Email = $res->Email;
        $tk->SDT = $res->SDT;
        $tk->HoVaTen = $res->HoVaTen;
        $tk->CMND = $res->CMND;
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



    public function getkhachhang($id)
    {
        $db = KhachHang::find($id);
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
