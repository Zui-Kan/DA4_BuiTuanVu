<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller; 

use App\Models\LoaiXe;
use Illuminate\Http\Request;
use App\Traits\TrangThaiTrait;

class LoaiXeController extends Controller
{
    use TrangThaiTrait;

    /**
     * @OA\post(
     *     path="/api/loaixe/search",
     *    tags={"loaixe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function search(Request $request)
    {
        $search = $request->input('search');
        $page = $request->input('page');
        $totalPage = $request->input('pageSize');

        $query = LoaiXe::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('MaLoaiXe', 'like', '%' . $search . '%')
                    ->orWhere('TenLoaiXe', 'like', '%' . $search . '%');
            });
        }

        $db = $query->paginate($totalPage ?? ($page ?? 1));

        return $db->total() > 0 ? $this->ok($db) : $this->errors(null);
    }


    /**
     * @OA\Get(
     *     path="/api/loaixe/{total}",
     *    tags={"loaixe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function index($total = null)
    {
        $db = LoaiXe::paginate($total);
        return $db ? $this->ok($db) : $this->errors(null);
    }
    /**
     * @OA\delete(
     *     path="/api/loaixe/delete/{id}",
     *    tags={"loaixe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function delete($id)
    {
        $db = LoaiXe::where('MaLoaiXe', $id)->first()->delete();
        return $db ? $this->ok($db) : $this->errors(null);
    }
    /**
     * @OA\delete(
     *     path="/api/loaixe/deletes",
     *    tags={"loaixe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */

    public function deletes(Request $request)
    {
        $ids = $request->input('ids');

        $db = LoaiXe::whereIn('MaLoaiXe', $ids)->delete();

        return $db ? $this->ok($db) : $this->errors(null);
    }

    /**
     * @OA\post(
     *     path="/api/loaixe/save/{id}",
     *    tags={"loaixe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */

    public function save(Request $res)
    {
        $id = $res->MaLoaiXe;
        $file_name = $this->uploadFile($res, 'HinhAnhLoaiXe', 'LoaiXe');

        if ($id == 0) {
            $tk = new LoaiXe();
        } else {
            $tk = LoaiXe::where('MaLoaiXe', $id)->first();
        }

        $tk->TenLoaiXe = $res->TenLoaiXe;
        if ($file_name !== null) {
            $tk->HinhAnhLoaiXe = 'LoaiXe/' . $file_name;
        }
        $db = $tk->save();
        return $db ? $this->ok($db) : $this->errors(null);
    }

    public function getLoaiXe($id)
    {
        $db = LoaiXe::find($id);
        return $db ? $this->ok($db) : $this->errors(null);
    }
}
