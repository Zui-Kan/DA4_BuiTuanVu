<?php

namespace App\Http\Controllers;

use App\Models\MauNoiThat;
use Illuminate\Http\Request;

class MauNoiThatController extends Controller
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
        $db = MauNoiThat::paginate($total);
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

        $query = MauNoiThat::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('MaMauNoiThat', 'like', '%' . $search . '%')
                    ->orWhere('TenMauNoiThat', 'like', '%' . $search . '%');
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
        $db = MauNoiThat::where('MaMauNoiThat', $id)->first()->delete();
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

        $deleted = MauNoiThat::whereIn('MaMauNoiThat', $ids)->delete();

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


        if ($id == 0) {
            $tk = new MauNoiThat();
        } else {
            $tk = MauNoiThat::where('MaMauNoiThat', $id)->first();
        }

        $tk->MaMauNgoaiThat = $res->MaMauNgoaiThat;
        $tk->TenMauNoiThat = $res->TenMauNoiThat;


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



    public function getMauNoiThat($id)
    {
        $db = MauNoiThat::find($id);
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
