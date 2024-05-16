<?php

namespace App\Traits;

trait TrangThaiTrait
{
    public function errors($loi)
    {
        return response()->json([
            'data' => null,
            'status_code' => 404,
            'message' => $loi ?? "lỗi rồi!"
        ]);
    }

    public function ok($dt)
    {
        return response()->json([
            'data' => $dt,
            'status_code' => 200,
            'message' => 'ok'
        ]);
    }

    // 1 upload file 
    public function uploadFile($request, $fieldName, $path)
    {
        if ($request->hasFile($fieldName)) {
            $file = $request->file($fieldName);
            $file_name = $file->getClientOriginalName();
            $file->move(public_path($path), $file_name);
            return $file_name;
        }
        return null;
    }

    //upload nhiều file
    public function uploadFiles($request, $fieldName, $path)
    {
        $file_names = [];
        
        if ($request->hasFile($fieldName)) {
            $files = $request->file($fieldName);
            
            foreach ($files as $file) {
                $file_name = $file->getClientOriginalName();
                $file->move(public_path($path), $file_name);
                $file_names[] = $file_name;
            }
        }
        
        return $file_names;
    }
}
