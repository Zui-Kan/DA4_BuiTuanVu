<?php

namespace App\Traits;

use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;

trait TrangThaiTrait
{
    // public function __construct()
    // {
    //     $this->middleware('auth.jwt', ['except' => ['login']]);
    // }
    public function errors($loi)
    {
        return response()->json(
            [
                'data' => null,
                'status_code' => 404,
                'message' => $loi ?? "lỗi rồi!"
            ]
        );
    }

    public function ok($dt)
    {
        return response()->json([
            'data' => $dt,
            'status_code' => 200,
            'message' => 'ok'
        ]);
    }

    public function uploadFile($request, $fieldName, $path = null)
    {
        if ($request->hasFile($fieldName)) {
            $file = $request->file($fieldName);
            $file_name = uniqid() . '.' . $file->getClientOriginalExtension(); // Tạo tên duy nhất
            $destinationPath = 'D:\Đồ án 3\uploads' . DIRECTORY_SEPARATOR . $path;
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }
            $file->move($destinationPath, $file_name);
            return $file_name;
        }
        return null;
    }
    public function uploadFile2($file, $path = null)
    {
        $file_name = uniqid() . '.' . $file->getClientOriginalExtension();
        $destinationPath = 'D:\Đồ án 3\uploads' . DIRECTORY_SEPARATOR . $path;

        if (!file_exists($destinationPath)) {
            mkdir($destinationPath, 0755, true);
        }
        $file->move($destinationPath, $file_name);
        return $file_name;
    }


    public function uploadFiles(Request $request, $fieldName, $path = null)
    {
        $file_names = [];

        if ($request->hasFile($fieldName)) {
            $files = $request->file($fieldName);

            foreach ($files as $file) {
                $file_name = uniqid() . '.' . $file->getClientOriginalExtension(); // Tạo tên duy nhất
                $destinationPath = 'D:\Đồ án 3\uploads' . DIRECTORY_SEPARATOR . $path;

                if (!file_exists($destinationPath)) {
                    mkdir($destinationPath, 0755, true);
                }

                $file->move($destinationPath, $file_name);
                $file_names[] = 'ModelXe/' . $file_name;
            }
        }
        return $file_names;
    }
}
