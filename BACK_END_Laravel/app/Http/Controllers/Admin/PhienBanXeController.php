<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller; 
use App\Models\PhienBanXe;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;

class PhienBanXeController extends Controller
{

    use TrangThaiTrait;
    /**
     * @OA\post(
     *     path="/api/phienbanxe/search",
     *    tags={"phienbanxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */

    public function search(Request $request)
    {
        $search = $request->input('search');
        $totalPage = $request->input('totalPage');

        $query = PhienBanXe::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('MaPhienBan', 'like', '%' . $search . '%')
                    ->orWhere('MaModel', 'like', '%' . $search . '%')
                    ->orWhere('TenPhienBan', 'like', '%' . $search . '%');
            });
        }

        $db = $query->paginate($totalPage ?? 5);
        $kq =  ['ketqua' => $db, 'timkiem' => $query];

        return $db->total() > 0 ? $this->ok($kq) : $this->errors(null);
    }
    /**
     * @OA\Get(
     *     path="/api/phienbanxe/{total}",
     *    tags={"phienbanxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function index($total = null)
    {
        $db = PhienBanXe::paginate($total);
        return $db ? $this->ok($db) : $this->errors(null);
    }


    /**
     * @OA\delete(
     *     path="/api/phienbanxe/delete/{id}",
     *    tags={"phienbanxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function delete($id)
    {
        $db = PhienBanXe::where('MaPhienBan', $id)->first()->delete();
        return $db ? $this->ok($db) : $this->errors(null);
    }
    /**
     * @OA\delete(
     *     path="/api/phienbanxe/deletes",
     *    tags={"phienbanxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function deletes(Request $request)
    {
        $ids = $request->input('ids');

        $db = PhienBanXe::whereIn('MaPhienBan', $ids)->delete();
        return $db ? $this->ok($db) : $this->errors(null);
    }

    /**
     * @OA\post(
     *     path="/api/phienbanxe/save/{id}",
     *    tags={"phienbanxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */

    public function save(Request $res, $id = null)
    {
        $tk = $id ? PhienBanXe::where('MaPhienBan', $id)->first() : new PhienBanXe();


        $tk->MaModel = $res->MaModel;
        $tk->TenPhienBan = $res->TenPhienBan;
        $db = $tk->save();
        return $db ? $this->ok($db) : $this->errors(null);
    }



    /**
     * @OA\Get(
     *     path="/api/phienbanxe/get/{id}",
     *    tags={"phienbanxe"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function getPhienBanXe($id)
    {
        $db = PhienBanXe::find($id);
        return $db ? $this->ok($db) : $this->errors(null);
    }
}
