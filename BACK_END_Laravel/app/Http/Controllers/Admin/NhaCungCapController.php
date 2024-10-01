<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller; 
use App\Models\NhaCungCap;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;

class NhaCungCapController extends Controller
{
    use TrangThaiTrait;
    /**
     * @OA\Get(
     *     path="/api/nhacungcap/{total}",
     *    tags={"nhacungcap"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function index($total = null)
    {
        $db = NhaCungCap::paginate($total);
        return $db ? $this->ok($db) : $this->errors(null);
    }
    /**
     * @OA\post(
     *     path="/api/nhacungcap/search",
     *    tags={"nhacungcap"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */

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
        $kq =  ['ketqua' => $db, 'timkiem' => $query];

        return $db->total() > 0 ? $this->ok($kq) : $this->errors(null);
    }

    /**
     * @OA\delete(
     *     path="/api/nhacungcap/delete/{id}",
     *    tags={"nhacungcap"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */

    public function delete($id)
    {
        $db = NhaCungCap::where('MaNhaCungCap', $id)->first()->delete();
        return $db ? $this->ok($db) : $this->errors(null);
    }
    /**
     * @OA\delete(
     *     path="/api/nhacungcap/deletes",
     *    tags={"nhacungcap"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function deletes(Request $request)
    {
        $ids = $request->input('ids');

        $db = NhaCungCap::whereIn('MaNhaCungCap', $ids)->delete();
        return $db ? $this->ok($db) : $this->errors(null);
    }

    /**
     * @OA\post(
     *     path="/api/nhacungcap/save/{id}",
     *    tags={"nhacungcap"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function save(Request $res, $id = null)
    {
        $tk = $id ? NhaCungCap::where('MaNhaCungCap', $id)->first() : new NhaCungCap();

        $tk->TenNhaCungCap = $res->TenNhaCungCap;
        $tk->Email = $res->Email;
        $tk->DiaChi = $res->DiaChi;
        $tk->SoDienThoai = $res->SoDienThoai;
        $db = $tk->save();
        return $db ? $this->ok($db) : $this->errors(null);
    }


    /**
     * @OA\Get(
     *     path="/api/nhacungcap/get/{id}",
     *    tags={"nhacungcap"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function getNhaCungCap($id)
    {
        $db = NhaCungCap::find($id);
        return $db ? $this->ok($db) : $this->errors(null);
    }
}
