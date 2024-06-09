<?php

namespace App\Http\Controllers;

use App\Models\HangXe;
use App\Models\LoaiXe;
use App\Models\MauNgoaiThat;
use App\Models\MauNoiThat;
use App\Models\ModelXe;
use App\Models\PhienBanXe;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;

class ModelXeController extends Controller
{
    use TrangThaiTrait;
    /**
     * @OA\Get(
     *     path="/api/modelxe/{total}",
     *    tags={"modelxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function index($total = null)
    {
        $db = ModelXe::paginate($total);
        return $db ? $this->ok($db) : $this->errors(null);
    }
    /**
     * @OA\post(
     *     path="/api/modelxe/search",
     *    tags={"modelxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function search(Request $request)
    {
        $search = $request->input('search');
        $totalPage = $request->input('pageSize');
        $page = $request->input('page');


        $query = ModelXe::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('TenModel', 'like', '%' . $search . '%')
                    ->orWhere('MaModel', 'like', '%' . $search . '%');
            });
        }

        $db = $query->paginate($totalPage ?? ($page ?? 1));


        return $db->total() > 0 ? $this->ok($db) : $this->errors(null);
    }


    /**
     * @OA\delete(
     *     path="/api/modelxe/delete/{id}",
     *    tags={"modelxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function delete($id)
    {
        $db = ModelXe::where('MaModel', $id)->first()->delete();
        return $db ? $this->ok($db) : $this->errors(null);
    }
    /**
     * @OA\delete(
     *     path="/api/modelxe/deletes",
     *    tags={"modelxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function deletes(Request $request)
    {
        $ids = $request->input('ids');

        $db = ModelXe::whereIn('MaModel', $ids)->delete();

        return $db ? $this->ok($db) : $this->errors(null);
    }


    public function save(Request $req)
    {
        $id = $req->MaModelxe ?? null;

        // Upload HinhAnhXe và DSHinhAnhXe
        $file_name = $this->uploadFile($req, 'HinhAnhXe', 'ModelXe');
        $file_names = $this->uploadFiles($req, 'DSHinhAnhXe', 'ModelXe');

        // Lưu thông tin ModelXe
        $modelXe = $id ? ModelXe::where('MaModel', $id)->first() : new ModelXe();

        $modelXe->TenModel = $req->TenModel;
        $modelXe->MaHang = $req->MaHang;
        $modelXe->MaLoaiXe = $req->MaLoaiXe;
        $modelXe->NamSanXuat = $req->NamSanXuat;
        $modelXe->Gia = $req->Gia;
        if ($file_name !== null) {
            $modelXe->HinhAnhXe = $file_name;
        }
        if (!empty($file_names)) {
            $modelXe->DSHinhAnhXe = json_encode($file_names);
        }
        $modelXe->L100 = $req->L100;
        $modelXe->NhienLieu = $req->NhienLieu;
        $modelXe->HopSo = $req->HopSo;
        $modelXe->MoTa = $req->MoTa;
        $modelXe->save();

        // Lưu thông tin PhiênBanXe liên kết với ModelXe
        $phienBans = $req->input('phienBans');
        foreach ($phienBans as $phienBanData) {
            $maphienban = $phienBanData['MaPhienBan'] ?? null;
            $phienBan = $maphienban ? PhienBanXe::where('MaPhienBan', $maphienban)->first() : new PhienBanXe();
            $phienBan->MaModel = $modelXe->MaModel;
            $phienBan->TenPhienBan = $phienBanData['TenPhienBan'];
            $phienBan->save();

            // Lưu thông tin MauNgoaiThat liên kết với PhiênBanXe
            $mauNgoaiThats = $phienBanData['mauNgoaiThats'];
            foreach ($mauNgoaiThats as $mauNgoaiThatData) {
                $mamaungoaithat = $mauNgoaiThatData['MaMauNgoaiThat'] ?? null;

                $mauNgoaiThat = $mamaungoaithat ? MauNgoaiThat::where('MaMauNgoaiThat', $mamaungoaithat)->first() : new MauNgoaiThat();
                $mauNgoaiThat->MaPhienBan = $phienBan->MaPhienBan;
                $mauNgoaiThat->TenMauNgoaiThat = $mauNgoaiThatData['TenMauNgoaiThat'];

                $file_maungoai = $this->uploadFile($req, 'HinhAnhMauNgoaiThat', 'uploads');
                if ($file_maungoai !== null) {
                    $mauNgoaiThat->HinhAnhMau = $file_maungoai;
                }

                $mauNgoaiThat->save();

                // Lưu thông tin MauNoiThat liên kết với MauNgoaiThat
                $mauNoiThats = $mauNgoaiThatData['mauNoiThats'];
                foreach ($mauNoiThats as $mauNoiThatData) {
                    $mamaunoithat = $mauNoiThatData['MaMauNoiThat'] ?? null;
                    $mauNoiThat = $mamaunoithat ? MauNoiThat::where('MaMauNoiThat', $mamaunoithat)->first() : new MauNoiThat();
                    $mauNoiThat->MaMauNgoaiThat = $mauNgoaiThat->MaMauNgoaiThat;
                    $mauNoiThat->TenMauNoiThat = $mauNoiThatData['TenMauNoiThat'];

                    $file_maunoi = $this->uploadFile($req, 'HinhAnhMauNoiThat', 'uploads');
                    if ($file_maunoi !== null) {
                        $mauNoiThat->HinhAnhMau = $file_maunoi;
                    }
                    $mauNoiThat->SoLuong = $mauNoiThatData['SoLuong'];

                    $mauNoiThat->save();
                }
            }
        }

        return $modelXe ? $this->ok($modelXe) : $this->errors(null);
    }




    public function getModelXe($id)
    {
        $db = ModelXe::where("MaModel", $id)->first();
        return $db ? $this->ok($db) : $this->errors(null);
    }

    public function selectHangandLoai()
    {
        $lx = LoaiXe::all();
        $hx = HangXe::all();

        $db = [
            "LoaiXe" => $lx,
            "HangXe" => $hx,
        ];

        return $db ? $this->ok($db) : $this->errors(null);
    }
}
