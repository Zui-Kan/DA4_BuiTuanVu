<?php

namespace App\Http\Controllers;

use App\Models\HangXe;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;

use function Psy\debug;

class HangXeController extends Controller
{
    use TrangThaiTrait;
    /**
     * @OA\post(
     *     path="/api/hangxe/search",
     *    tags={"hangxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function search(Request $request)
    {
        $search = $request->input('search');
        $page = $request->input('page');
        $totalPage = $request->input('pageSize');

        $query = HangXe::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('MaHang', 'like', '%' . $search . '%')
                    ->orWhere('TenHang', 'like', '%' . $search . '%');
            });
        }

        $db = $query->paginate($totalPage ?? ($page ?? 1));



        return $db->total() > 0 ? $this->ok($db) : $this->errors(null);
    }

    /**
     * @OA\Get(
     *     path="/api/hangxe/{total}",
     *    tags={"hangxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function index($total = null)
    {
        $db = HangXe::paginate($total);
        return $db->total() > 0 ? $this->ok($db) : $this->errors(null);
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
        $db = HangXe::where('MaHang', $id)->first()->delete();
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
        $db = HangXe::whereIn('MaHang', $ids)->delete();
        return $db ? $this->ok($db) : $this->errors(null);
    }
    /**
     * @OA\post(
     *     path="/api/hangxe/save/{id}",
     *    tags={"hangxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */


    public function save(Request $request)
    {
        $file_name = null;
        
        $id = $request->MaHang ? $request->MaHang : null;

        // Gọi phương thức uploadFile để xử lý file upload
        $file_name = $this->uploadFile($request, 'HinhAnhHangXe', 'HangXe');

        $hangXe = $id ? HangXe::find($id) : new HangXe();


        $hangXe->TenHang = $request->TenHang;

        if ($file_name !== null) {
            $hangXe->HinhAnhHangXe = 'hangxe/' . $file_name;
        }

        if ($hangXe->save()) {
            return response()->json(['data' => $hangXe, 'status_code' => 200, 'message' => 'ok']);
        }
        return response()->json(['data' => null, 'status_code' => 500, 'message' => 'error']);
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
