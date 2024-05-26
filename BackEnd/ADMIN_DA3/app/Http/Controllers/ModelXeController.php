<?php

namespace App\Http\Controllers;

use App\Models\ModelXe;
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
        $totalPage = $request->input('totalPage');

        $query = ModelXe::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('TenModel', 'like', '%' . $search . '%')
                    ->orWhere('MaHang', 'like', '%' . $search . '%')
                    ->orWhere('Gia', 'like', '%' . $search . '%')
                    ->orWhere('NamSanXuat', 'like', '%' . $search . '%');
            });
        }

        $db = $query->paginate($totalPage ?? 5);
        $kq =  ['ketqua' => $db, 'timkiem' => $query];

        return $db->total() > 0 ? $this->ok($kq) : $this->errors(null);
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

    /**
     * @OA\post(
     *     path="/api/modelxe/save/{id}",
     *    tags={"modelxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function save(Request $res, $id = null)
    {
        $file_name = $this->uploadFile($res, 'image_upload', 'uploads');


        $file_names = $this->uploadFiles($res, 'image_uploads', 'uploads');

        $tk = $id ? ModelXe::where('MaModel', $id)->first() : new ModelXe();


        $tk->TenModel = $res->TenModel;
        $tk->MaHang = $res->MaHang;
        $tk->MaLoaiXe = $res->MaLoaiXe;
        $tk->NamSanXuat = $res->NamSanXuat;
        $tk->Gia = $res->Gia;
        $tk->MoTa = $res->MoTa;

        if ($file_name !== null) {
            $tk->HinhAnhXe = $file_name;
        }
        if (!empty($file_names)) {
            $tk->DSHinhAnhXe = json_encode($file_names);
        }

        $db = $tk->save();
        return $db ? $this->ok($db) : $this->errors(null);
    }


    /**
     * @OA\post(
     *     path="/api/modelxe/filtermodels",
     *    tags={"modelxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function filterModels(Request $request)
    {
        $minPrice = $request->input('min_price');
        $maxPrice = $request->input('max_price');
        $namSanXuat = $request->input('namsanxuat');
        $maHang = $request->input('mahang');
        $maLoaiXe = $request->input('maloaixe');

        $query = ModelXe::query();

        if ($minPrice !== null) {
            $query->where('Gia', '>=', $minPrice);
        }

        if ($maxPrice !== null) {
            $query->where('Gia', '<=', $maxPrice);
        }

        if ($namSanXuat !== null) {
            $query->where('NamSanXuat', $namSanXuat);
        }

        if ($maHang !== null) {
            $query->where('MaHang', $maHang);
        }

        if ($maLoaiXe !== null) {
            $query->where('MaLoaiXe', $maLoaiXe);
        }

        $result = $query->get();

        return $result ? $this->ok($result) : $this->errors(null);
    }
}
