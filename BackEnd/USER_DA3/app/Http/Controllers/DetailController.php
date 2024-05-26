<?php

namespace App\Http\Controllers;

use App\Models\BinhLuan;
use App\Models\HangXe;
use App\Models\ModelXe;
use App\Models\PhienBanXe;
use App\Models\ThongSoKyThuatXe;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;

class DetailController extends Controller
{
    use TrangThaiTrait;
    /**
     * @OA\post(
     *     path="/api/hangxe/search",
     *    tags={"hangxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */

    /**
     * @OA\Get(
     *     path="/api/hangxe/{total}",
     *    tags={"hangxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */

    public function getDetail($id = null)
    {
        $md = ModelXe::select('ModelXe.*', 'HangXe.*')
            ->join('HangXe', 'ModelXe.MaHang', '=', 'HangXe.MaHang')
            ->where('ModelXe.MaModel', $id)
            ->first();
        $phienban = PhienBanXe::where("MaModel", $id)->get();
        $tskt = ThongSoKyThuatXe::find($id);

        $loaixe = ModelXe::where('MaLoaiXe', $md->MaLoaiXe)->get();

        $binhluan = BinhLuan::select('binhluan.*', 'ctusers.HoVaTen', 'ctusers.AnhDaiDien')
            ->join('users', 'binhluan.TaiKhoanID', '=', 'users.id')
            ->join('ctusers', 'ctusers.TaiKhoanID', '=', 'users.id')
            ->where('binhluan.MaModel', $id)
            ->get();

        $db = [
            'modelXe' => $md,
            'thongSoKyThuat' => $tskt,
            'tuongTu' => $loaixe,
            'binhLuan' => $binhluan,
            'phienBan' => $phienban
        ];

        return $db ? $this->ok($db) : $this->errors(null);
    }



    /**
     * @OA\delete(
     *     path="/api/hangxe/delete/{id}",
     *    tags={"hangxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function delete($id)
    {
        $db = HangXe::where('MaHangXe', $id)->first()->delete();
        return $db ? $this->ok($db) : $this->errors(null);
    }
    /**
     * @OA\delete(
     *     path="/api/hangxe/deletes",
     *    tags={"hangxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function deletes(Request $request)
    {
        $ids = $request->input('ids');

        $db = HangXe::whereIn('MaHangXe', $ids)->delete();

        return $db ? $this->ok($db) : $this->errors(null);
    }

    /**
     * @OA\post(
     *     path="/api/hangxe/save/{id}",
     *    tags={"hangxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function save(Request $res, $id = null)
    {
        $file_name = null;

        if ($res->has('image_upload')) {
            $file = $res->image_upload;
            $file_name = $file->getClientoriginalName();
            $file->move(public_path('uploads'), $file_name);
        }

        $tk = $id ?  HangXe::where('MaHangXe', $id)->first() : new HangXe();

        $tk->TenHang = $res->TenHang;

        if ($file_name !== null) {
            $tk->HinhAnhHangXe = $file_name;
        }
        $db = $tk->save();
        return $db ? $this->ok($db) : $this->errors(null);
    }


    /**
     * @OA\Get(
     *     path="/api/hangxe/get/{id}",
     *    tags={"hangxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */

    public function getHangXe($id)
    {
        $db = HangXe::find($id);
        return $db ? $this->ok($db) : $this->errors(null);
    }
}
