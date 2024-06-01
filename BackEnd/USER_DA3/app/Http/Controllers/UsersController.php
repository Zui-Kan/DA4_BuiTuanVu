<?php

namespace App\Http\Controllers;

use App\Models\CTusers;
use App\Models\Users;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class UsersController extends Controller
{
    use TrangThaiTrait;


    /**
     * @OA\post(
     *     path="/api/taikhoan/signup",
     *    tags={"taikhoan"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function signup(Request $res)
    {

        // Kiểm tra xem tên tài khoản đã tồn tại chưa
        if (Users::where('name', $res->name)->exists()) {
            return $this->errors('Tên tài khoản đã tồn tại !');
        }

        // Kiểm tra xem email đã tồn tại chưa
        if (Users::where('email', $res->email)->exists()) {
            return $this->errors('Email đã tồn tại !');
        }

        // Thêm tài khoản mới vào cơ sở dữ liệu
        $tk = new Users();
        $tk->name = $res->name;
        $tk->email = $res->email;
        $tk->role = 2;
        $tk->password = Hash::make($res->password);
        $db = $tk->save();

        $ct = new CTusers();
        $ct->TaiKhoanID = $tk->id;
        $ct->HoVaTen = $tk->name;
        $ct->AnhDaiDien = "img_1.jpg";
        $ct->save();

        return $db ? $this->ok($db) : $this->errors(null);
    }




    /**
     * @OA\post(
     *     path="/api/taikhoan/changepassword",
     *    tags={"taikhoan"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */

    public function changePassword(Request $res)
    {
        $db = Users::where('id', $res->id)->first();

        if (!Hash::check($res->password, $db->password)) {
            return $this->errors('Mật khẩu cũ không khớp !');
        }

        $db->password = Hash::make($res->password);

        return $db->save() ? $this->ok($db) : $this->errors(null);
    }

    /**
     * @OA\post(
     *     path="/api/taikhoan/updatectusers/{id}",
     *    tags={"taikhoan"},
     *     @OA\Response(response="200", description="Success"),
     * )
     */
    public function updateCTusers(Request $request, $id)
    {

        $ct =  CTusers::where('TaiKhoanID', $id)->first();
        $ct->HoVaTen = $request->HoVaTen;
        $ct->DiaChi = $request->DiaChi;
        $ct->SDT = $request->SDT;
        $ct->CMND = $request->CMND;
        $file_name = $this->uploadFile($request, 'image_upload', 'uploads');
        if ($file_name !== null) {
            $ct->AnhDaiDien = $file_name;
        }
        $db = $ct->save();
        return $db->save() ? $this->ok($db) : $this->errors(null);
    }


   
}
