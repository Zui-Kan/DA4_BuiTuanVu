<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller; 
use App\Models\HangXe;
use App\Models\LoaiXe;
use App\Models\MauNgoaiThat;
use App\Models\MauNoiThat;
use App\Models\ModelXe;
use App\Models\PhienBanXe;
use App\Models\ThongSoKyThuatXe;
use App\Traits\TrangThaiTrait;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;

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

    public function saveModel(Request $req, $id = null)
    {
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
            $modelXe->HinhAnhXe = 'ModelXe/' . $file_name;
        }
        if (!empty($file_names)) {
            $modelXe->DSHinhAnhXe = json_encode($file_names);
        }
        $modelXe->L100 = $req->L100;
        $modelXe->NhienLieu = $req->NhienLieu;
        $modelXe->HopSo = $req->HopSo;
        $modelXe->MoTa = $req->MoTa;
        $modelXe->save();

        return $modelXe ? $this->ok($modelXe->MaModel) : $this->errors(null);
    }


    public function savePhienBan(Request $req, $maModel = null)
    {
        try {

            $phienBans = $req->input('phienBans');
            foreach ($phienBans as $phienBanIndex => $phienBanData) {
                $maphienban = $phienBanData['MaPhienBan'] ?? null;
                $phienBan = $maphienban ? PhienBanXe::where('MaPhienBan', $maphienban)->first() : new PhienBanXe();
                $phienBan->MaModel = $maModel ?? 46;
                $phienBan->TenPhienBan = $phienBanData['TenPhienBan'];
                $phienBan->save();

                foreach ($phienBanData['mauNgoaiThats'] as $ngoaiThatIndex => $mauNgoaiThatData) {
                    $mamaungoaithat = $mauNgoaiThatData['MaMauNgoaiThat'] ?? null;
                    $mauNgoaiThat = $mamaungoaithat ? MauNgoaiThat::where('MaMauNgoaiThat', $mamaungoaithat)->first() : new MauNgoaiThat();
                    $mauNgoaiThat->MaPhienBan = $phienBan->MaPhienBan;
                    $mauNgoaiThat->TenMauNgoaiThat = $mauNgoaiThatData['TenMauNgoaiThat'];

                    // Xử lý upload file cho HinhAnhMauNgoaiThat
                    if ($req->hasFile("phienBans.{$phienBanIndex}.mauNgoaiThats.{$ngoaiThatIndex}.HinhAnhMauNgoaiThat")) {
                        $file_maungoai = $this->uploadFile2($req->file("phienBans.{$phienBanIndex}.mauNgoaiThats.{$ngoaiThatIndex}.HinhAnhMauNgoaiThat"), 'HinhMau');
                        if ($file_maungoai !== null) {
                            $mauNgoaiThat->HinhAnhMauNgoaiThat = 'HinhMau/' . $file_maungoai;
                        }
                    }
                    $mauNgoaiThat->save();

                    foreach ($mauNgoaiThatData['mauNoiThats'] as $noiThatIndex => $mauNoiThatData) {
                        $mamaunoithat = $mauNoiThatData['MaMauNoiThat'] ?? null;
                        $mauNoiThat = $mamaunoithat ? MauNoiThat::where('MaMauNoiThat', $mamaunoithat)->first() : new MauNoiThat();
                        $mauNoiThat->MaMauNgoaiThat = $mauNgoaiThat->MaMauNgoaiThat;
                        $mauNoiThat->TenMauNoiThat = $mauNoiThatData['TenMauNoiThat'];

                        // Xử lý upload file cho HinhAnhMauNoiThat
                        if ($req->hasFile("phienBans.{$phienBanIndex}.mauNgoaiThats.{$ngoaiThatIndex}.mauNoiThats.{$noiThatIndex}.HinhAnhMauNoiThat")) {
                            $file_maunoi = $this->uploadFile2($req->file("phienBans.{$phienBanIndex}.mauNgoaiThats.{$ngoaiThatIndex}.mauNoiThats.{$noiThatIndex}.HinhAnhMauNoiThat"), 'HinhMau');
                            if ($file_maunoi !== null) {
                                $mauNoiThat->HinhAnhMauNoiThat = 'HinhMau/' . $file_maunoi;
                            }
                        }
                        $mauNoiThat->SoLuong = $mauNoiThatData['SoLuong'];
                        $mauNoiThat->save();
                    }
                }
            }
            return response()->json(['success' => true], 200);
        } catch (Exception $e) {
            // Log the error or handle it accordingly
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function saveThongSoKyThuat(Request $req, $maModel = null)
    {
        $mathongso = $req->MaThongSoKyThuat ?? null;
        $thongso = $mathongso ? ThongSoKyThuatXe::where('MaThongSo', $mathongso)->first() : new ThongSoKyThuatXe();
        $thongso->MaModel = $maModel ?? 46;
        $thongso->PhienBanXe = $req->PhienBanXe;
        $thongso->LoaiDongCo = $req->LoaiDongCo;
        $thongso->LoaiHieuDong = $req->LoaiHieuDong;
        $thongso->MauSac = $req->MauSac;
        $thongso->CongSuat = $req->CongSuat;
        $thongso->MoMenXoan = $req->MoMenXoan;
        $thongso->LoaiNhienLieu = $req->LoaiNhienLieu;
        $thongso->KichThuoc = $req->KichThuoc;
        $thongso->NhienLieuTieuThu100KM = $req->NhienLieuTieuThu100KM;
        $thongso->HopSo = $req->HopSo;
        $thongso->TuiKhi = $req->TuiKhi;
        $thongso->TrongLuong = $req->TrongLuong;
        $thongso->save();

        return $thongso ? $this->ok($thongso) : $this->errors(null);
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



    public function TopXeBanChay()
    {
        $topCars = ModelXe::select('ModelXe.*', DB::raw('SUM(ChiTietDatHang.SoLuong) AS SoLuongXeDaBan'))
            ->leftJoin('ChiTietDatHang', 'ModelXe.MaModel', '=', 'ChiTietDatHang.MaModel')
            ->groupBy('ModelXe.MaModel')
            ->orderBy('SoLuongXeDaBan', 'DESC')
            ->limit(10)
            ->get();

        return $topCars ? $this->ok($topCars) : $this->errors(null);
    }
}
