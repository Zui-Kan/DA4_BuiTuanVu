<?php

namespace App\Http\Controllers;

use App\Models\BaiViet;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;

class BaiVietController extends Controller
{
    use TrangThaiTrait;

    /**
     * @OA\Post(
     *     path="/api/baiviet/search",
     *     summary="Authenticate user and generate JWT token",
     *    tags={"BaiViet"},
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

        $query = BaiViet::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('MaBaiViet', 'like', '%' . $search . '%')
                    ->orWhere('MaChuDe', 'like', '%' . $search . '%')
                    ->orWhere('MaChuDe', 'like', '%' . $search . '%')
                    ->orWhere('TieuDe', 'like', '%' . $search . '%');
            });
        }

        $db = $query->paginate($totalPage ?? 5);

        $kq =  ['ketqua' => $db, 'timkiem' => $search];

        return  $db->total() > 0 ? $this->ok($kq) : $this->errors(null);
    }


    /**
     * @OA\get(
     *     path="/api/baiviet/",
     *     summary="Authenticate user and generate JWT token",
     *    tags={"BaiViet"},
     *     @OA\Parameter(
     *         name="total",
     *         in="path",
     *         description="",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response="200", description="Login successful"),
     *     @OA\Response(response="401", description="Invalid credentials")
     * )
     */
    public function index($total = null)
    {
        $db = BaiViet::paginate($total);

        return $db->total() > 0 ? $this->ok($db) : $this->errors(null);
    }

    /**
     * @OA\Delete(
     *     path="/api/baiviet/delete/{id}",
     *     summary="Authenticate user and generate JWT token",
     *    tags={"BaiViet"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response="200", description="Login successful"),
     *     @OA\Response(response="401", description="Invalid credentials")
     * )
     */
    public function delete($id)
    {
        $db = BaiViet::where('MaBaiViet', $id)->first()->delete();
        return $db ? $this->ok($db) : $this->errors(null);
    }

    /**
     * @OA\Delete(
     *     path="/api/baiviet/deletes",
     *     summary="Authenticate user and generate JWT token",
     *    tags={"BaiViet"},
     *     @OA\Parameter(
     *         name="ids",
     *         in="query",
     *         description="",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response="200", description="Login successful"),
     *     @OA\Response(response="401", description="Invalid credentials")
     * )
     */

    public function deletes(Request $request)
    {
        $ids = $request->input('ids');

        $db = BaiViet::whereIn('MaBaiViet', $ids)->delete();

        return $db ? $this->ok($db) : $this->errors(null);
    }

    /**
     * @OA\Post(
     *     path="/api/baiviet/save/{id}",
     *     summary="Authenticate user and generate JWT token",
     *    tags={"BaiViet"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="MaTaiKhoan",
     *         in="query",
     *         description="",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="MaChuDe",
     *         in="query",
     *         description="",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Parameter(
     *         name="NoiDung",
     *         in="query",
     *         description="User's password",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(response="200", description="Login successful"),
     *     @OA\Response(response="401", description="Invalid credentials")
     * )
     */
    public function save(Request $res, $id = null)
    {
        $db = $id ? BaiViet::where('MaBaiViet', $id)->first() : new BaiViet();

        $db->MaTaiKhoan = $res->MaTaiKhoan;
        $db->MaChuDe = $res->MaChuDe;
        $db->TieuDe = $res->TieuDe;
        $db->NoiDung = $res->NoiDung;
        $db = $db->save();
        return $db ? $this->ok($db) : $this->errors(null);
    }


    /**
     * @OA\Get(
     *     path="/api/baiviet/get/{id}",
     *     summary="Get logged-in user details",
     *     tags={"BaiViet"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID của bài viết",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response="200", description="Success"),
     *     security={{"bearerAuth":{}}}
     * )
     */

    public function getBaiViet($id)
    {
        $db = BaiViet::find($id);
        return $db ? $this->ok($db) : $this->errors(null);
    }
}
