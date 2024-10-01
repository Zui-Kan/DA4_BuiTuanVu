<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller; 

use App\Models\BinhLuan;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;
use App\Helpers\SwaggerHelper;

class BinhLuanController extends Controller
{

    use TrangThaiTrait;

    /**
     * @OA\Post(
     *     path="/api/binhluan/search",
     *     summary="Authenticate user and generate JWT token",
     *    tags={"BinhLuan"},
     *     @OA\Parameter(
     *         name="search",
     *         in="query",
     *         description="",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="totalPage",
     *         in="query",
     *         description="",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response="200", description="Login successful"),
     *     @OA\Response(response="401", description="Invalid credentials")
     * )
     */


    public function search(Request $request)
    {
        $search = $request->input('search');
        $totalPage = $request->input('totalPage');

        $query = BinhLuan::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('MaBinhLuan', 'like', '%' . $search . '%')
                    ->orWhere('MaTaiKhoan', 'like', '%' . $search . '%');
            });
        }

        $db = $query->paginate($totalPage ?? 5);
        $kq =  ['ketqua' => $db, 'timkiem' => $query];

        return
            $db->total() > 0 ? $this->ok($kq) : $this->errors(null);
    }


    /**
     * @OA\get(
     *     path="/api/binhluan/",
     *     summary="Authenticate user and generate JWT token",
     *    tags={"BinhLuan"},
     *     @OA\Parameter(
     *         name="total",
     *         in="path",
     *         description="",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response="200", description="Login successful"),
     *     @OA\Response(response="401", description="Invalid credentials")
     * )
     */
    public function index($total = null)
    {
        $db = BinhLuan::paginate($total);
        return $db ? $this->ok($db) : $this->errors(null);
    }


    /**
     * @OA\delete(
     *     path="/api/binhluan/delete/{id}",
     *     summary="Authenticate user and generate JWT token",
     *    tags={"BinhLuan"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response="200", description="Login successful"),
     *     @OA\Response(response="401", description="Invalid credentials")
     * )
     */
    public function delete($id)
    {
        $db = BinhLuan::where('MaBinhLuan', $id)->first()->delete();
        return $db ? $this->ok($db) : $this->errors(null);
    }

    /**
     * @OA\delete(
     *     path="/api/binhluan/deletes",
     *     summary="Authenticate user and generate JWT token",
     *    tags={"BinhLuan"},
     *     @OA\Parameter(
     *         name="ids",
     *         in="query",
     *         description="",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response="200", description="Login successful"),
     *     @OA\Response(response="401", description="Invalid credentials")
     * )
     */
    public function deletes(Request $request)
    {
        $ids = $request->input('ids');

        $db = BinhLuan::whereIn('MaBinhLuan', $ids)->delete();

        return $db ? $this->ok($db) : $this->errors(null);
    }

    /**
     * @OA\get(
     *     path="/api/binhluan/save/{id}",
     *     summary="Authenticate user and generate JWT token",
     *    tags={"BinhLuan"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="MaBaiViet",
     *         in="query",
     *         description="",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(   
     *         name="MaModel",
     *         in="query",
     *         description="",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="MaTaiKhoan",
     *         in="query",
     *         description="",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="NoiDung",
     *         in="query",
     *         description="",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response="200", description="Login successful"),
     *     @OA\Response(response="401", description="Invalid credentials")
     * )
     */
    public function save(Request $res, $id = null)
    {

        $tk = $id ? BinhLuan::where('MaBinhLuan', $id)->first() :  new BinhLuan();

        $tk->MaBaiViet = $res->MaBaiViet ?? null;
        $tk->MaModel = $res->MaModel ?? null;
        $tk->MaTaiKhoan = $res->MaTaiKhoan;
        $tk->NoiDung = $res->NoiDung;
        $db = $tk->save();
        return $db ? $this->ok($db) : $this->errors(null);
    }


    /**
     * @OA\get(
     *     path="/api/binhluan/get/{id}",
     *     summary="Authenticate user and generate JWT token",
     *    tags={"BinhLuan"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response="200", description="Login successful"),
     *     @OA\Response(response="401", description="Invalid credentials")
     * )
     */
    public function getBinhLuan($id)
    {
        $db = BinhLuan::find($id);
        return $db ? $this->ok($db) : $this->errors(null);
    }
}
