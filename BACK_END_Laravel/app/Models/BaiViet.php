<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BaiViet extends Model
{
    use HasFactory;
    protected $table = 'BaiViet';
    protected $primaryKey = 'MaBaiViet';
    public $timestamps = false;
    public function user()
    {
        return $this->belongsTo(User::class, 'TaiKhoanID');
    }
}
