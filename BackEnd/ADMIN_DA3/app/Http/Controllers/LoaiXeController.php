<?php

namespace App\Http\Controllers;

use App\Models\LoaiXe;
use Illuminate\Http\Request;

class LoaiXeController extends Controller
{
    public function errors($loi)
    {
        return response()->json([
            'data' => null,
            'status_code' => 404,
            'message' => $loi ?? "lỗi rồi!"
        ]);
    }

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
        $totalPage = $request->input('totalPage');

        $query = LoaiXe::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('MaLoaiXe', 'like', '%' . $search . '%')
                    ->orWhere('TenLoaiXe', 'like', '%' . $search . '%');
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

    public function save(Request $res, $id = null)
    {
        $file_name = $this->uploadFile($res, 'image_upload', 'uploads');

        if ($id == 0) {
            $tk = new LoaiXe();
        } else {
            $tk = LoaiXe::where('MaLoaiXe', $id)->first();
        }

        $tk->TenLoaiXe = $res->TenLoaiXe;
        if ($file_name !== null) {
            $tk->HinhAnhLoaiXe = $file_name;
        }
        $db = $tk->save();
        return $db ? $this->ok($db) : $this->errors(null);
    }
}
