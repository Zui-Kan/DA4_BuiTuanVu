<?php

namespace App\Http\Controllers;

use App\Models\TaiKhoan;
use App\Models\User;
use App\Traits\TrangThaiTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class TaiKhoanController extends Controller
{
    use TrangThaiTrait;
    public function login(Request $request)
    {
        try {
            $tenTaiKhoan = $request->TenTaiKhoan;
            $matKhau = $request->MatKhau;

            // Kiểm tra xem tài khoản có tồn tại không
            $taiKhoan = TaiKhoan::where('TenTaiKhoan', $tenTaiKhoan)->first();
            if (!$taiKhoan || $matKhau != $taiKhoan->MatKhau) {
                return $this->errors("Tài khoản hoặc mật khẩu không đúng!");

            } else {
                return response()->json([
                    'data' => $taiKhoan,
                    'status_code' => 200,
                    'message' => 'Đăng nhập thành công'
                ]);
            }
        } catch (\Exception $e) {
            Log::error($e->getMessage()); // Thêm dòng này
            return response()->json([
                'data' => null,
                'status_code' => 500,
                'message' => 'Đã xảy ra lỗi không xác định, vui lòng thử lại sau.'
            ], 500);
        }
    }

    public function search(Request $request)
    {
        $search = $request->input('search');
        $totalPage = $request->input('totalPage');

        $query = TaiKhoan::query();
        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('TenTaiKhoan', 'like', '%' . $search . '%')
                    ->orWhere('SDT', 'like', '%' . $search . '%')
                    ->orWhere('Email', 'like', '%' . $search . '%');
            });
        }

        $db = $query->paginate($totalPage ?? 5);
        $kq =  ['ketqua' => $db, 'timkiem' => $query];

        return $db->total() > 0 ? $this->ok($kq) : $this->errors(null);
    }

    public function index($total = null)
    {
        $db = TaiKhoan::paginate($total);
        return $db ? $this->ok($db) : $this->errors(null);
    }

    public function signup(Request $res)
    {

        if ($res->MatKhau !== $res->XacNhanMatKhau) {
            return $this->errors("Mật khẩu không khớp");
        }

        if ($res->MatKhau !== $res->XacNhanMatKhau) {
            return $this->errors('Xác nhận mật khẩu không khớp !');
        }

        // Kiểm tra xem tên tài khoản đã tồn tại chưa
        if (TaiKhoan::where('TenTaiKhoan', $res->TenTaiKhoan)->exists()) {

            return $this->errors('Tên tài khoản đã tồn tại !');
        }

        // Kiểm tra xem email đã tồn tại chưa
        if (TaiKhoan::where('Email', $res->Email)->exists()) {
            return $this->errors('Email đã tồn tại !');
        }

        // Kiểm tra xem số điện thoại đã tồn tại chưa
        if (TaiKhoan::where('SDT', $res->SDT)->exists()) {
            return $this->errors('Số điện thoại đã tồn tại !');
        }

        // Thêm tài khoản mới vào cơ sở dữ liệu
        $tk = new TaiKhoan();
        $tk->TenTaiKhoan = $res->TenTaiKhoan;
        $tk->Email = $res->Email;
        $tk->SDT = $res->SDT;
        $tk->MatKhau = $res->MatKhau;
        $tk->Quyen = 2;
        $db = $tk->save();
        return $db ? $this->ok($db) : $this->errors(null);
    }



    public function delete($id)
    {
        $db = TaiKhoan::where('MaTaiKhoan', $id)->first()->delete();
        return $db ? $this->ok($db) : $this->errors(null);
    }

    public function deletes(Request $request)
    {
        $ids = $request->input('ids');

        $db = TaiKhoan::whereIn('MaTaiKhoan', $ids)->delete();

        return $db ? $this->ok($db) : $this->errors(null);
    }


    public function save(Request $res, $id = null)
    {

        $file_name = $this->uploadFile($res, 'image_upload', 'uploads');

        $tk = $id ? TaiKhoan::where('MaTaiKhoan', $id)->first() : new TaiKhoan();
        $tk->TenTaiKhoan = $res->TenTaiKhoan;
        $tk->Email = $res->Email;
        $tk->SDT = $res->SDT;
        $tk->MatKhau = $res->MatKhau;
        $tk->Quyen = $res->Quyen;
        if ($file_name !== null) {
            $tk->AnhDaiDien = $file_name;
        }

        $db = $tk->save();
        return $db ? $this->ok($db) : $this->errors(null);
    }



    public function getTaiKhoan($id)
    {
        $db = TaiKhoan::find($id);
        return $db ? $this->ok($db) : $this->errors(null);
    }
}
