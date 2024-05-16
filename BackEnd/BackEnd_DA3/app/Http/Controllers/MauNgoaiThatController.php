<?php

namespace App\Http\Controllers;

use App\Models\MauNgoaiThat;
use Illuminate\Http\Request;

class MauNgoaiThatController extends Controller
{
    public function errors($loi)
    {
        return response()->json([
            'data' => null,
            'status_code' => 404,
            'message' => $loi ?? "lỗi rồi!"
        ]);
    }

    public function search(Request $request)
    {
        $search = $request->input('search');
        $totalPage = $request->input('totalPage');

        $query = MauNgoaiThat::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('MaMauNgoaiThat', 'like', '%' . $search . '%')
                    ->orWhere('MaPhienBan', 'like', '%' . $search . '%')
                    ->orWhere('TenMauNgoaiThat', 'like', '%' . $search . '%');
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

    public function index($total = null)
    {
        $db = MauNgoaiThat::paginate($total);
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



    public function delete($id)
    {
        $db = MauNgoaiThat::where('MaMauNgoaiThat', $id)->first()->delete();
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

        $deleted = MauNgoaiThat::whereIn('MaMauNgoaiThat', $ids)->delete();

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


    public function save(Request $res, $id = null)
    {

        $file_name = $this->uploadFile($res, 'image_upload', 'uploads');

        $tk = $id ? MauNgoaiThat::where('MaMauNgoaiThat', $id)->first() : new MauNgoaiThat();

        $tk->MaPhienBan = $res->MaPhienBan;
        $tk->TenMauNgoaiThat = $res->TenMauNgoaiThat;
        if ($file_name !== null) {
            $tk->HinhAnhMau = $file_name;
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



    public function getMauNgoaiThat($id)
    {
        $db = MauNgoaiThat::find($id);
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
