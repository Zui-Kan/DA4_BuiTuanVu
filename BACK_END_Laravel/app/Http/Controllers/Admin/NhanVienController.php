<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller; 
use App\Models\NhanVien;
use App\Models\Users;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;

class NhanVienController extends Controller
{
    use TrangThaiTrait;
    /**
     * @OA\post(
     *     path="/api/nhanvien/search",
     *    tags={"nhanvien"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function search(Request $request)
    {
        $search = $request->input('search');
        $page = $request->input('page');
        $totalPage = $request->input('pageSize');

        $query = NhanVien::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('MaNhanVien', 'like', '%' . $search . '%')
                    ->orWhere('TenNhanVien', 'like', '%' . $search . '%')
                    ->orWhere('ChucVu', 'like', '%' . $search . '%')
                    ->orWhere('SoDienThoai', 'like', '%' . $search . '%');
            });
        }

        $db = $query->paginate($totalPage ?? ($page ?? 1));

        return $db->total() > 0 ? $this->ok($db) : $this->errors(null);
    }

    /**
     * @OA\delete(
     *     path="/api/nhanvien/delete/{id}",
     *    tags={"nhanvien"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */

    public function delete($id)
    {
        $db = NhanVien::where('MaNhanVien', $id)->first()->delete();
        return $db ? $this->ok($db) : $this->errors(null);
    }
    /**
     * @OA\delete(
     *     path="/api/nhanvien/deletes",
     *    tags={"nhanvien"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */

    public function deletes(Request $request)
    {
        $ids = $request->input('ids');

        $db = NhanVien::whereIn('MaNhanVien', $ids)->delete();

        return $db ? $this->ok($db) : $this->errors(null);
    }

    /**
     * @OA\post(
     *     path="/api/nhanvien/save/{id}",
     *    tags={"nhanvien"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function save(Request $res)
    {
        $id = $res->MaNhanVien || null;

        $tk = $id ? NhanVien::where('MaNhanVien', $id)->first() : new NhanVien();

        $file_name = $this->uploadFile($res, 'upload_file', 'TaiKhoan');

        $tk->TaiKhoanID = $res->TaiKhoanID;
        $tk->ChucVu = $res->ChucVu;
        $tk->TenNhanVien = $res->TenNhanVien;
        $tk->DiaChi = $res->DiaChi;
        $tk->SoDienThoai = $res->SoDienThoai;
        $tk->Luong = $res->Luong;
        if ($file_name !== null) {
            $tk->AnhDaiDien = 'TaiKhoan/' . $file_name;
        }


        return $tk->save() ? $this->ok($tk) : $this->errors(null);
    }


    /**
     * @OA\Get(
     *     path="/api/nhanvien/get/{id}",
     *    tags={"nhanvien"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function getNhanVien($id)
    {
        $db = NhanVien::find($id);
        return $db ? $this->ok($db) : $this->errors(null);
    }

    public function getNhanVienbyTK($id)
    {
        $db = NhanVien::where("TaiKhoanID", $id)->first();
        return $db ? $this->ok($db) : $this->errors(null);
    }

    /**
     * @OA\Get(
     *     path="/api/taikhoan/{total}",
     *    tags={"taikhoan"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */

    public function getRoleNhanVien()
    {
        $db = Users::where('role', '!=', 2)->get();
        return $db ? $this->ok($db) : $this->errors(null);
    }
}
