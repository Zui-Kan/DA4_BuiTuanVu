<?php

namespace App\Http\Controllers;

use App\Models\KhachHang;
use App\Models\Users;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;

class KhachHangController extends Controller
{
    use TrangThaiTrait;



    /**
     * @OA\post(
     *     path="/api/khachhang/search",
     *    tags={"khachhang"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function search(Request $request)
    {
        $search = $request->input('search');
        $page = $request->input('page');
        $totalPage = $request->input('pageSize');

        $query = KhachHang::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('HoVaTen', 'like', '%' . $search . '%')
                    ->orWhere('SDT', 'like', '%' . $search . '%')
                    ->orWhere('TaiKhoanID', 'like', '%' . $search . '%')
                    ->orWhere('MaKhachHang', 'like', '%' . $search . '%')
                    ->orWhere('Email', 'like', '%' . $search . '%');
            });
        }
        $db = $query->paginate($totalPage ?? ($page ?? 1));
        return $db->total() > 0 ? $this->ok($db) : $this->errors(null);
    }

    /**
     * @OA\Get(
     *     path="/api/khachhang/{total}",
     *    tags={"khachhang"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function index($total = null)
    {
        $db = KhachHang::paginate($total);
        return $db ? $this->ok($db) : $this->errors(null);
    }

    /**
     * @OA\delete(
     *     path="/api/khachhang/delete/{id}",
     *    tags={"khachhang"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function delete($id)
    {
        $db = KhachHang::where('MaKhachHang', $id)->first()->delete();
        return $db ? $this->ok($db) : $this->errors(null);
    }
    /**
     * @OA\delete(
     *     path="/api/khachhang/deletes",
     *    tags={"khachhang"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function deletes(Request $request)
    {
        $ids = $request->input('ids');

        $db = KhachHang::whereIn('MaKhachHang', $ids)->delete();

        return $db ? $this->ok($db) : $this->errors(null);
    }

    /**
     * @OA\post(
     *     path="/api/khachhang/save/{id}",
     *    tags={"khachhang"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function save(Request $res)
    {
        $id = $res->maKhachHang;

        $tk = $id ? KhachHang::where('MaKhachHang', $id)->first() : new KhachHang();
        $tk->TaiKhoanID = $res->TaiKhoanID;
        $tk->HoVaTen = $res->HoVaTen;
        $tk->Email = $res->Email;
        $tk->SDT = $res->SDT;
        $tk->GioiTinh = $res->GioiTinh;
        $tk->CMND = $res->CMND;
        $tk->DiaChi = $res->DiaChi;

        return $tk->save() ? $this->ok($tk) : $this->errors(null);
    }



    /**
     * @OA\Get(
     *     path="/api/khachhang/get/{id}",
     *    tags={"khachhang"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function getkhachhang($id)
    {
        $db = KhachHang::find($id);
        return $db ? $this->ok($db) : $this->errors(null);
    }

    public function getRoleKhachHang()
    {
        $db = Users::get();
        return $db ? $this->ok($db) : $this->errors(null);
    }
}
