<?php

namespace App\Http\Controllers\User;
use App\Http\Controllers\Controller;

use App\Models\BinhLuan;
use App\Models\HangXe;
use App\Models\MauNgoaiThat;
use App\Models\MauNoiThat;
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
        $md = ModelXe::select('ModelXe.*', 'HangXe.TenHang')
            ->join('HangXe', 'HangXe.MaHang', '=', 'ModelXe.MaHang')
            ->where('ModelXe.MaModel', $id)
            ->first();

        $phienban = PhienBanXe::where("MaModel", $id)->get();
        $tskt = ThongSoKyThuatXe::where("MaModel", $id)->first();
        $loaixe = ModelXe::where('ModelXe.MaLoaiXe', $md->MaLoaiXe)->get();


        // Fetch exterior and interior colors for all versions
        $allMauNgoaiThat = [];
        $allMauNoiThat = [];
        foreach ($phienban as $version) {
            $mauNgoaiThat = MauNgoaiThat::where('MaPhienBan', $version->MaPhienBan)->get();
            $allMauNgoaiThat[$version->MaPhienBan] = $mauNgoaiThat;

            foreach ($mauNgoaiThat as $ngoaiThat) {
                $mauNoiThat = MauNoiThat::where('MaMauNgoaiThat', $ngoaiThat->MaMauNgoaiThat)->get();
                $allMauNoiThat[$ngoaiThat->MaMauNgoaiThat] = $mauNoiThat;
            }
        }

        $db = [
            'modelXe' => $md,
            'thongSoKyThuat' => $tskt,
            'tuongTu' => $loaixe,
            'phienBan' => $phienban,
            'allMauNgoaiThat' => $allMauNgoaiThat,
            'allMauNoiThat' => $allMauNoiThat
        ];

        return $db ? $this->ok($db) : $this->errors(null);
    }
    public function hienThiBinhLuan($id = null)
    {
        if ($id) {
            $binhluan = BinhLuan::select('binhluan.*', 'ctusers.HoVaTen', 'ctusers.AnhDaiDien')
            ->join('users', 'binhluan.TaiKhoanID', '=', 'users.id')
            ->join('ctusers', 'ctusers.TaiKhoanID', '=', 'users.id')
            ->where('binhluan.MaModel', $id)
            ->get();
            return $binhluan ? $this->ok($binhluan) : $this->errors(null);
        }
    }
    public function hienthingoaithat($id = null)
    {
        if ($id) {
            $db = MauNgoaiThat::where('MaPhienBan', $id)->get();
            return $db ? $this->ok($db) : $this->errors(null);
        }
    }

    public function hienthinoithat($id = null)
    {
        if ($id) {
            $db = MauNoiThat::where('MaMauNgoaiThat', $id)->get();
            return $db ? $this->ok($db) : $this->errors(null);
        }
    }

    public function save_binhluan(Request $request)
    {
        $db = new BinhLuan();
        $db->MaModel = $request->MaModel;
        $db->TaiKhoanID = $request->TaiKhoanID;
        $db->NoiDung = $request->NoiDung;
        return $db->save() ? $this->ok($db) : $this->errors(null);
    }

    /**
     * @OA\delete(
     *     path="/api/hangxe/delete/{id}",
     *    tags={"hangxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function delete_binhluan($id)
    {
        $db = BinhLuan::where('MaBinhLuan', $id)->first()->delete();
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
