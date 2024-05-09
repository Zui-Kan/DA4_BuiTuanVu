<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NhanVien extends Model
{
    use HasFactory;
    protected $table = 'NhanVien';
    protected $primaryKey = 'MaNhanVien';
    public $timestamps = false;
}
